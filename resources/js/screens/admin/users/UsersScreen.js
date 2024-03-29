import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Link, Button } from '@material-ui/core'
import MaterialTable from 'material-table'
import Moment from 'react-moment'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import Swal from 'sweetalert2'
import { listUsers, deleteUser } from '../../../actions/userActions'
import Loader from '../../../components/public/loader/Loader'
import Message from '../../../components/public/alert/Message'
import EditUsersScreen from './EditUsersScreen'

const UsersScreen = ({ history }) => {
    const dispatch = useDispatch()
    const user_perms = []

    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [requestData, setRequestData] = useState(new Date())

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userDelete = useSelector(state => state.userDelete)
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete
    } = userDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [isAdmin, setIsAdmin] = useState(false)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        if (!userInfo || userInfo === null || userInfo.role[0].is_admin < 1) {
            history.push('/login')
        } else {
            if (!user_perms.includes('admin_view_users')) {
                history.push('/admin')
                Swal.fire(
                    'Sorry!',
                    `You don't have access to this page.`,
                    'warning'
                )
            } else {
                setIsAdmin(true)
                dispatch(listUsers())
            }
        }
    }, [dispatch, history, userInfo, requestData])

    if (!Array.isArray(user_perms) || !user_perms.length) {
        userInfo.details[0].roles[0].permissions.map(perm =>
            user_perms.push(perm.name)
        )
    }

    // handle edit dialog opening
    const handleEditDialogOpen = id => {
        // open dialog

        if (user_perms.includes('admin_edit_users')) {
            setOpenEditDialog(true)
            setUserId(id)
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

    const deleteUserHandler = id => {
        user_perms.includes('admin_delete_users')
            ? Swal.fire({
                  title: 'Are you sure?',
                  text: `You can't recover this user after deletion!`,
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Yes, delete it!',
                  cancelButtonText: 'No, cancel!',
                  cancelButtonColor: '#d33',
                  reverseButtons: true
              }).then(result => {
                  if (result.value) {
                      dispatch(deleteUser(id))
                      setRequestData(new Date())
                      Swal.fire(
                          'Deleted!',
                          'The user with the id ' + id + ' has been deleted.',
                          'success'
                      )
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                          'Cancelled',
                          `The selected user is safe, don't worry :)`,
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
                                title='Users List'
                                columns={[
                                    {
                                        title: 'Username',
                                        field: 'name'
                                    },
                                    {
                                        title: 'Email',
                                        field: 'email'
                                    },
                                    {
                                        title: 'Role',
                                        field: 'roles[0].name',
                                        render: users => {
                                            {
                                                const role =
                                                    (users.roles &&
                                                        users.roles[0]) ||
                                                    {}
                                                return role.name
                                            }
                                        }
                                    },
                                    {
                                        title: 'Tag',
                                        field: 'tags[0].name',
                                        render: users => {
                                            {
                                                const tag =
                                                    (users.tags &&
                                                        users.tags[0]) ||
                                                    {}
                                                return tag.name
                                                    ? tag.name
                                                    : 'Player'
                                            }
                                        }
                                    },
                                    {
                                        title: 'Created At',
                                        field: 'created_at',
                                        render: users => {
                                            {
                                                return (
                                                    <Moment format='DD/MM/YYYY HH:mm'>
                                                        {users.created_at}
                                                    </Moment>
                                                )
                                            }
                                        }
                                    },
                                    {
                                        title: 'Updated At',
                                        field: 'updated_at',
                                        render: users => {
                                            {
                                                return (
                                                    <Moment format='DD/MM/YYYY HH:mm'>
                                                        {users.updated_at}
                                                    </Moment>
                                                )
                                            }
                                        }
                                    }
                                ]}
                                data={users && users}
                                actions={[
                                    rowData => ({
                                        icon: 'edit',
                                        tooltip: 'Edit User',
                                        onClick: (event, rowData) => {
                                            handleEditDialogOpen(rowData.id)
                                        }
                                    }),

                                    rowData => ({
                                        icon: 'delete',
                                        tooltip: 'Delete User',
                                        onClick: (event, rowData) =>
                                            deleteUserHandler(rowData.id)
                                    })
                                ]}
                                options={{
                                    actionsColumnIndex: -1
                                }}
                                detailPanel={rowData => {
                                    return (
                                        <div className='table-detail'>
                                            <div className='table-detail--par'>
                                                {rowData.roles[0] &&
                                                    rowData.roles[0].permissions.map(
                                                        permission => (
                                                            <p
                                                                key={
                                                                    permission.id
                                                                }
                                                            >
                                                                {
                                                                    permission.name
                                                                }
                                                            </p>
                                                        )
                                                    )}
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
                        <EditUsersScreen
                            setOpenEditDialog={setOpenEditDialog}
                            setRequestData={setRequestData}
                            userId={userId}
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

export default UsersScreen
