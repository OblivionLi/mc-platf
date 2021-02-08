import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Link, Button } from '@material-ui/core'
import MaterialTable from 'material-table'
import Moment from 'react-moment'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import Swal from 'sweetalert2'
import Loader from '../../../components/public/loader/Loader'
import Message from '../../../components/public/alert/Message'
import {
    listReportBugs,
    deleteReportBug
} from '../../../actions/reportBugActions'
import EditReportBugsScreen from './EditReportBugsScreen'

const ReportBugScreen = ({ history }) => {
    const dispatch = useDispatch()
    const user_perms = []

    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [requestData, setRequestData] = useState(new Date())

    const reportBugList = useSelector(state => state.reportBugList)
    const { loading, error, reportBugs } = reportBugList

    const reportBugDelete = useSelector(state => state.reportBugDelete)
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete
    } = reportBugDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [isAdmin, setIsAdmin] = useState(false)
    const [reportBugId, setReportBugId] = useState(null)

    useEffect(() => {
        if (!userInfo || userInfo === null || userInfo.role[0].is_admin < 1) {
            history.push('/login')
        } else {
            if (!user_perms.includes('admin_view_rbugs')) {
                history.push('/admin')
                Swal.fire(
                    'Sorry!',
                    `You don't have access to this page.`,
                    'warning'
                )
            } else {
                setIsAdmin(true)
                dispatch(listReportBugs())
            }
        }
    }, [dispatch, history, userInfo, requestData, successDelete])

    if (!Array.isArray(user_perms) || !user_perms.length) {
        userInfo.details[0].roles[0].permissions.map(perm =>
            user_perms.push(perm.name)
        )
    }

    // handle edit dialog opening
    const handleEditDialogOpen = id => {
        // open dialog
        if (user_perms.includes('admin_edit_rbugs')) {
            setOpenEditDialog(true)
            setReportBugId(id)
        } else {
            Swal.fire(
                'Sorry!',
                `You don't have access to this action.`,
                'warning'
            )
        }
    }

    // handle edit dialog closing
    const handleEditDialogClose = e => {
        // close dialog
        setOpenEditDialog(false)
    }

    const deleteBugReport = id => {
        user_perms.includes('admin_delete_rbugs')
            ? Swal.fire({
                  title: 'Are you sure?',
                  text: "You can't recover this bug report after deletion!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Yes, delete it!',
                  cancelButtonText: 'No, cancel!',
                  cancelButtonColor: '#d33',
                  reverseButtons: true
              }).then(result => {
                  if (result.value) {
                      dispatch(deleteReportBug(id))
                      // setRequestData(new Date());
                      Swal.fire(
                          'Deleted!',
                          'The bug report with the id ' +
                              id +
                              ' has been deleted.',
                          'success'
                      )
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                          'Cancelled',
                          `The selected bug report is safe, don't worry :)`,
                          'error'
                      )
                  }
              })
            : Swal.fire(
                  'Sorry!',
                  `You don't have access to this action.`,
                  'warning'
              )
    }

    return (
        <Paper elevation={3} className='admin__header'>
            {!isAdmin ? (
                <Loader />
            ) : (
                <>
                    <div className='admin__header--content'>
                        {loadingDelete && <Loader />}
                        {errorDelete && (
                            <Message variant='error'>{errorDelete}</Message>
                        )}
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <Message variant='error'>{error}</Message>
                        ) : (
                            <MaterialTable
                                title='Bug Reports List'
                                columns={[
                                    {
                                        title: 'Title',
                                        field: 'title'
                                    },
                                    {
                                        title: 'Who Reported',
                                        field: 'users.name',
                                        render: reportBugs => {
                                            {
                                                return reportBugs.users.name
                                            }
                                        }
                                    },
                                    { title: 'Status', field: 'status' },
                                    {
                                        title: 'Date',
                                        field: 'updated_at',
                                        render: reportBugs => {
                                            {
                                                return (
                                                    <Moment format='DD/MM/YYYY HH:mm'>
                                                        {reportBugs.created_at}
                                                    </Moment>
                                                )
                                            }
                                        }
                                    }
                                ]}
                                data={reportBugs.data && reportBugs.data}
                                actions={[
                                    {
                                        icon: 'edit',
                                        tooltip: 'Edit Bug Report',
                                        onClick: (event, rowData) => {
                                            handleEditDialogOpen(rowData.id)
                                        }
                                    },
                                    {
                                        icon: 'delete',
                                        tooltip: 'Delete Bug Report',
                                        onClick: (event, rowData) =>
                                            deleteBugReport(rowData.id)
                                    }
                                ]}
                                options={{
                                    actionsColumnIndex: -1
                                }}
                                detailPanel={rowData => {
                                    return (
                                        <div className='table-detail'>
                                            <div className='table-detail--img'>
                                                {rowData.image !=
                                                    'no-image' && (
                                                    <img
                                                        src={`http://127.0.0.1:8000/storage/${rowData.image}`}
                                                        alt={rowData.title}
                                                    />
                                                )}
                                            </div>

                                            <div className='table-detail--desc'>
                                                <p>{rowData.description}</p>
                                            </div>
                                        </div>
                                    )
                                }}
                            />
                        )}
                    </div>

                    <Dialog
                        open={openEditDialog}
                        aria-labelledby='draggable-dialog-title'
                        onClose={handleEditDialogClose}
                        fullWidth
                    >
                        <EditReportBugsScreen
                            setOpenEditDialog={setOpenEditDialog}
                            setRequestData={setRequestData}
                            reportBugId={reportBugId}
                        />

                        <DialogActions>
                            <Button
                                onClick={handleEditDialogClose}
                                variant='contained'
                                color='secondary'
                                className='dialog-button'
                            >
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
        </Paper>
    )
}

export default ReportBugScreen
