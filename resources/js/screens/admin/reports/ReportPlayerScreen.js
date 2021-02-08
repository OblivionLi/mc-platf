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
    listReportPlayers,
    deleteReportPlayer
} from '../../../actions/reportPlayerActions'
import EditReportPlayerScreen from './EditReportPlayerScreen'

const ReportPlayerScreen = ({ history }) => {
    const dispatch = useDispatch()
    const user_perms = []

    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [requestData, setRequestData] = useState(new Date())

    const reportPlayerList = useSelector(state => state.reportPlayerList)
    const { loading, error, reportPlayers } = reportPlayerList

    const reportPlayerDelete = useSelector(state => state.reportPlayerDelete)
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete
    } = reportPlayerDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [isAdmin, setIsAdmin] = useState(false)
    const [reportPlayerId, setReportPlayerId] = useState(null)

    useEffect(() => {
        if (!userInfo || userInfo === null || userInfo.role[0].is_admin < 1) {
            history.push('/login')
        } else {
            if (!user_perms.includes('admin_view_rplayers')) {
                history.push('/admin')
                Swal.fire(
                    'Sorry!',
                    `You don't have access to this page.`,
                    'warning'
                )
            } else {
                setIsAdmin(true)
                dispatch(listReportPlayers())
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
        if (user_perms.includes('admin_edit_rplayers')) {
            setOpenEditDialog(true)
            setReportPlayerId(id)
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

    const deletePlayerReport = id => {
        user_perms.includes('admin_delete_rplayers')
            ? Swal.fire({
                  title: 'Are you sure?',
                  text: "You can't recover this player report after deletion!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Yes, delete it!',
                  cancelButtonText: 'No, cancel!',
                  cancelButtonColor: '#d33',
                  reverseButtons: true
              }).then(result => {
                  if (result.value) {
                      dispatch(deleteReportPlayer(id))
                      // setRequestData(new Date());
                      Swal.fire(
                          'Deleted!',
                          'The player report with the id ' +
                              id +
                              ' has been deleted.',
                          'success'
                      )
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                          'Cancelled',
                          `The selected player report is safe, don't worry :)`,
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
                                title='Player Reports List'
                                columns={[
                                    {
                                        title: 'Title',
                                        field: 'title'
                                    },
                                    {
                                        title: 'Accuser',
                                        field: 'users.name',
                                        render: reportPlayers => {
                                            {
                                                return reportPlayers.users.name
                                            }
                                        }
                                    },
                                    {
                                        title: 'Accused',
                                        field: 'user_reported'
                                    },
                                    {
                                        title: 'Judge',
                                        field: 'admin_name',
                                        render: reportPlayers => {
                                            {
                                                return reportPlayers.admin_name
                                                    ? reportPlayers.admin_name
                                                    : '-'
                                            }
                                        }
                                    },
                                    {
                                        title: 'Status',
                                        field: 'status'
                                    },
                                    {
                                        title: 'Date',
                                        field: 'updated_at',
                                        render: reportPlayers => {
                                            {
                                                return (
                                                    <Moment format='DD/MM/YYYY HH:mm'>
                                                        {
                                                            reportPlayers.created_at
                                                        }
                                                    </Moment>
                                                )
                                            }
                                        }
                                    }
                                ]}
                                data={reportPlayers.data && reportPlayers.data}
                                actions={[
                                    {
                                        icon: 'edit',
                                        tooltip: 'Edit Player Report',
                                        onClick: (event, rowData) => {
                                            handleEditDialogOpen(rowData.id)
                                        }
                                    },
                                    {
                                        icon: 'delete',
                                        tooltip: 'Delete Player Report',
                                        onClick: (event, rowData) =>
                                            deletePlayerReport(rowData.id)
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
                        <EditReportPlayerScreen
                            setOpenEditDialog={setOpenEditDialog}
                            setRequestData={setRequestData}
                            reportPlayerId={reportPlayerId}
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

export default ReportPlayerScreen
