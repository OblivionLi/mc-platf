import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Link, Button } from '@material-ui/core'
import MaterialTable from 'material-table'
import Moment from 'react-moment'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import Swal from 'sweetalert2'
import AddGameMode from './AddGameMode'
import EditGameMode from './EditGameMode'
import Loader from '../../../components/public/loader/Loader'
import Message from '../../../components/public/alert/Message'
import {
    adminListGameModes,
    deleteGameMode
} from '../../../actions/gameModeActions'

const GameModesScreen = ({ history }) => {
    const dispatch = useDispatch()
    const user_perms = []

    const [openAddDialog, setOpenAddDialog] = useState(false)
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [requestData, setRequestData] = useState(new Date())

    const gameModeAdminList = useSelector(state => state.gameModeAdminList)
    const { loading, error, gameModes } = gameModeAdminList

    const gameModeDelete = useSelector(state => state.gameModeDelete)
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete
    } = gameModeDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [isAdmin, setIsAdmin] = useState(false)
    const [gameModeId, setGameModeId] = useState(null)

    if (!Array.isArray(user_perms) || !user_perms.length) {
        userInfo.details[0].roles[0].permissions.map(perm =>
            user_perms.push(perm.name)
        )
    }

    useEffect(() => {
        if (!userInfo || userInfo === null || userInfo.role[0].is_admin < 1) {
            history.push('/login')
        } else {
            if (!user_perms.includes('admin_view_gamemodes')) {
                history.push('/admin')
                Swal.fire(
                    'Sorry!',
                    `You don't have access to this page.`,
                    'warning'
                )
            } else {
                setIsAdmin(true)
                dispatch(adminListGameModes())
            }
        }
    }, [dispatch, history, userInfo, requestData])

    // handle add dialog opening
    const handleAddDialogOpen = e => {
        // open dialog
        if (user_perms.includes('admin_add_gamemodes')) {
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
        if (user_perms.includes('admin_edit_gamemodes')) {
            setOpenEditDialog(true)
            setGameModeId(id)
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

    const deleteGameModeHandler = id => {
        user_perms.includes('admin_delete_gamemodes')
            ? Swal.fire({
                  title: 'Are you sure?',
                  text: "You can't recover this game mode after deletion!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Yes, delete it!',
                  cancelButtonText: 'No, cancel!',
                  cancelButtonColor: '#d33',
                  reverseButtons: true
              }).then(result => {
                  if (result.value) {
                      dispatch(deleteGameMode(id))
                      setRequestData(new Date())
                      Swal.fire(
                          'Deleted!',
                          'The game mode with the id ' +
                              id +
                              ' has been deleted.',
                          'success'
                      )
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                          'Cancelled',
                          `The selected game mode is safe, don't worry :)`,
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
                                title='Game Modes List'
                                columns={[
                                    {
                                        title: 'Title',
                                        field: 'title'
                                    },
                                    {
                                        title: 'Added By',
                                        field: 'users.name',
                                        render: gameModes => {
                                            {
                                                return gameModes.users.name
                                            }
                                        }
                                    },
                                    {
                                        title: 'Date',
                                        field: 'created_at',
                                        render: gameModes => {
                                            {
                                                return (
                                                    <Moment format='DD/MM/YYYY HH:mm'>
                                                        {gameModes.created_at}
                                                    </Moment>
                                                )
                                            }
                                        }
                                    }
                                ]}
                                data={gameModes.data && gameModes.data}
                                actions={[
                                    {
                                        icon: 'add',
                                        tooltip: 'Add Game Mode',
                                        isFreeAction: true,
                                        onClick: event =>
                                            handleAddDialogOpen(event)
                                    },
                                    {
                                        icon: 'edit',
                                        tooltip: 'Edit Game Mode',
                                        onClick: (event, rowData) => {
                                            handleEditDialogOpen(rowData.id)
                                        }
                                    },
                                    {
                                        icon: 'delete',
                                        tooltip: 'Delete Game Mode',
                                        onClick: (event, rowData) =>
                                            deleteGameModeHandler(rowData.id)
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
                        open={openAddDialog}
                        aria-labelledby='draggable-dialog-title'
                        onClose={handleAddDialogClose}
                        fullWidth
                    >
                        <AddGameMode
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
                        <EditGameMode
                            setOpenEditDialog={setOpenEditDialog}
                            setRequestData={setRequestData}
                            gameModeId={gameModeId}
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

export default GameModesScreen
