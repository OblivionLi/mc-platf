import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Link, Button } from '@material-ui/core'
import MaterialTable from 'material-table'
import Moment from 'react-moment'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import Swal from 'sweetalert2'
import AddShowCase from './AddShowCase'
import EditShowCase from './EditShowCase'
import Loader from '../../../components/public/loader/Loader'
import Message from '../../../components/public/alert/Message'
import {
    adminListShowCases,
    deleteShowCase
} from '../../../actions/showCaseActions'
import ReactPlayer from 'react-player'

const ShowCasesScreen = ({ history }) => {
    const dispatch = useDispatch()
    const user_perms = []

    const [openAddDialog, setOpenAddDialog] = useState(false)
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [requestData, setRequestData] = useState(new Date())

    const showCaseAdminList = useSelector(state => state.showCaseAdminList)
    const { loading, error, showCases } = showCaseAdminList

    const showCaseDelete = useSelector(state => state.showCaseDelete)
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete
    } = showCaseDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [isAdmin, setIsAdmin] = useState(false)
    const [showCaseId, setShowCaseId] = useState(null)

    useEffect(() => {
        if (!userInfo || userInfo === null || userInfo.role[0].is_admin < 1) {
            history.push('/login')
        } else {
            if (!user_perms.includes('admin_view_showcases')) {
                history.push('/admin')
                Swal.fire(
                    'Sorry!',
                    `You don't have access to this page.`,
                    'warning'
                )
            } else {
                setIsAdmin(true)
                dispatch(adminListShowCases())
            }
        }
    }, [dispatch, history, userInfo, requestData])

    if (!Array.isArray(user_perms) || !user_perms.length) {
        userInfo.details[0].roles[0].permissions.map(perm =>
            user_perms.push(perm.name)
        )
    }

    // handle add dialog opening
    const handleAddDialogOpen = e => {
        // open dialog
        if (user_perms.includes('admin_add_showcases')) {
            setOpenAddDialog(true)
        } else {
            Swal.fire(
                'Sorry!',
                `You don't have access to this action.`,
                'warning'
            )
        }
    }

    // handle add dialog closing
    const handleAddDialogClose = e => {
        // close dialog
        setOpenAddDialog(false)
    }

    // handle edit dialog opening
    const handleEditDialogOpen = id => {
        // open dialog
        if (user_perms.includes('admin_edit_showcases')) {
            setOpenEditDialog(true)
            setShowCaseId(id)
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

    const deleteShowCaseHandler = id => {
        user_perms.includes('admin_delete_showcases')
            ? Swal.fire({
                  title: 'Are you sure?',
                  text: "You can't recover this showcase after deletion!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Yes, delete it!',
                  cancelButtonText: 'No, cancel!',
                  cancelButtonColor: '#d33',
                  reverseButtons: true
              }).then(result => {
                  if (result.value) {
                      dispatch(deleteShowCase(id))
                      setRequestData(new Date())
                      Swal.fire(
                          'Deleted!',
                          'The show case with the id ' +
                              id +
                              ' has been deleted.',
                          'success'
                      )
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                          'Cancelled',
                          `The selected show case is safe, don't worry :)`,
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
                                title='Show Cases List'
                                columns={[
                                    {
                                        title: 'Title',
                                        field: 'name'
                                    },
                                    {
                                        title: 'Video Url',
                                        field: 'video_url'
                                    },
                                    {
                                        title: 'Date',
                                        field: 'created_at',
                                        render: showCases => {
                                            {
                                                return (
                                                    <Moment format='DD/MM/YYYY HH:mm'>
                                                        {showCases.created_at}
                                                    </Moment>
                                                )
                                            }
                                        }
                                    }
                                ]}
                                data={showCases.data && showCases.data}
                                actions={[
                                    {
                                        icon: 'add',
                                        tooltip: 'Add Show Case',
                                        isFreeAction: true,
                                        onClick: event =>
                                            handleAddDialogOpen(event)
                                    },
                                    {
                                        icon: 'edit',
                                        tooltip: 'Edit Show Case',
                                        onClick: (event, rowData) => {
                                            handleEditDialogOpen(rowData.id)
                                        }
                                    },
                                    {
                                        icon: 'delete',
                                        tooltip: 'Delete Show Case',
                                        onClick: (event, rowData) =>
                                            deleteShowCaseHandler(rowData.id)
                                    }
                                ]}
                                options={{
                                    actionsColumnIndex: -1
                                }}
                                detailPanel={rowData => {
                                    return (
                                        <div className='table-detail'>
                                            <div className='table-detail--video'>
                                                <ReactPlayer
                                                    url={rowData.video_url}
                                                    controls={true}
                                                    config={{
                                                        youtube: {
                                                            playerVars: {
                                                                showinfo: 1
                                                            }
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )
                                }}
                            />
                        )}
                    </div>

                    <Dialog
                        open={openAddDialog}
                        aria-labelledby='draggable-dialog-title'
                        onClose={handleAddDialogClose}
                        fullWidth
                    >
                        <AddShowCase
                            setOpenAddDialog={setOpenAddDialog}
                            setRequestData={setRequestData}
                        />

                        <DialogActions>
                            <Button
                                onClick={handleAddDialogClose}
                                variant='contained'
                                color='secondary'
                                className='dialog-button'
                            >
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={openEditDialog}
                        aria-labelledby='draggable-dialog-title'
                        onClose={handleEditDialogClose}
                        fullWidth
                    >
                        <EditShowCase
                            setOpenEditDialog={setOpenEditDialog}
                            setRequestData={setRequestData}
                            showCaseId={showCaseId}
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

export default ShowCasesScreen
