import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Link, Button } from '@material-ui/core'
import MaterialTable from 'material-table'
import Moment from 'react-moment'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import Swal from 'sweetalert2'
import AddUpdates from './AddUpdates'
import EditUpdates from './EditUpdates'
import Loader from '../../../components/public/loader/Loader'
import Message from '../../../components/public/alert/Message'
import { adminListUpdates, deleteUpdate } from '../../../actions/updateActions'

const UpdatesScreen = ({ history }) => {
    const dispatch = useDispatch()
    const user_perms = []

    const [openAddDialog, setOpenAddDialog] = useState(false)
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [requestData, setRequestData] = useState(new Date())

    const updateAdminList = useSelector(state => state.updateAdminList)
    const { loading, error, updates } = updateAdminList

    const updateDelete = useSelector(state => state.updateDelete)
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete
    } = updateDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [isAdmin, setIsAdmin] = useState(false)
    const [updateId, setUpdateId] = useState(null)

    useEffect(() => {
        if (!userInfo || userInfo === null || userInfo.role[0].is_admin < 1) {
            history.push('/login')
        } else {
            if (!user_perms.includes('admin_view_updates')) {
                history.push('/admin')
                Swal.fire(
                    'Sorry!',
                    `You don't have access to this page.`,
                    'warning'
                )
            } else {
                setIsAdmin(true)
                dispatch(adminListUpdates())
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
        if (user_perms.includes('admin_add_updates')) {
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
        if (user_perms.includes('admin_edit_updates')) {
            setOpenEditDialog(true)
            setUpdateId(id)
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

    const deleteUpdateHandler = id => {
        user_perms.includes('admin_delete_updates')
            ? Swal.fire({
                  title: 'Are you sure?',
                  text: "You can't recover this update after deletion!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Yes, delete it!',
                  cancelButtonText: 'No, cancel!',
                  cancelButtonColor: '#d33',
                  reverseButtons: true
              }).then(result => {
                  if (result.value) {
                      dispatch(deleteUpdate(id))
                      setRequestData(new Date())
                      Swal.fire(
                          'Deleted!',
                          'The update with the id ' + id + ' has been deleted.',
                          'success'
                      )
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                          'Cancelled',
                          `The selected update is safe, don't worry :)`,
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
                                title='Updates List'
                                columns={[
                                    {
                                        title: 'Name',
                                        field: 'name',
                                        render: updates => {
                                            return (
                                                <Link
                                                    href={`/update/${updates.id}`}
                                                >
                                                    {updates.name}
                                                </Link>
                                            )
                                        }
                                    },
                                    {
                                        title: 'Admin',
                                        field: 'users.name',
                                        render: updates => {
                                            {
                                                return updates.users.name
                                            }
                                        }
                                    },
                                    { title: 'Version', field: 'version' },
                                    {
                                        title: 'Date',
                                        field: 'updated_at',
                                        render: updates => {
                                            {
                                                return (
                                                    <Moment format='DD/MM/YYYY HH:mm'>
                                                        {updates.created_at}
                                                    </Moment>
                                                )
                                            }
                                        }
                                    }
                                ]}
                                data={updates.data && updates.data}
                                actions={[
                                    {
                                        icon: 'add',
                                        tooltip: 'Add Update',
                                        isFreeAction: true,
                                        onClick: event =>
                                            handleAddDialogOpen(event)
                                    },
                                    {
                                        icon: 'edit',
                                        tooltip: 'Edit Update',
                                        onClick: (event, rowData) => {
                                            handleEditDialogOpen(rowData.id)
                                        }
                                    },
                                    {
                                        icon: 'delete',
                                        tooltip: 'Delete Update',
                                        onClick: (event, rowData) =>
                                            deleteUpdateHandler(rowData.id)
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
                                                <p>
                                                    {rowData.brief_description}
                                                </p>
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
                        <AddUpdates
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
                        <EditUpdates
                            setOpenEditDialog={setOpenEditDialog}
                            setRequestData={setRequestData}
                            updateId={updateId}
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

export default UpdatesScreen
