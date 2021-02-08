import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Link, Button } from '@material-ui/core'
import MaterialTable from 'material-table'
import Moment from 'react-moment'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import Swal from 'sweetalert2'
import AddRank from './AddRank'
import EditRank from './EditRank'
import Loader from '../../../components/public/loader/Loader'
import Message from '../../../components/public/alert/Message'
import { adminListRanks, deleteRank } from '../../../actions/rankActions'

const RanksScreen = ({ history }) => {
    const dispatch = useDispatch()
    const user_perms = []

    const [openAddDialog, setOpenAddDialog] = useState(false)
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [requestData, setRequestData] = useState(new Date())

    const rankAdminList = useSelector(state => state.rankAdminList)
    const { loading, error, ranks } = rankAdminList

    const rankDelete = useSelector(state => state.rankDelete)
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete
    } = rankDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [isAdmin, setIsAdmin] = useState(false)
    const [rankId, setRankId] = useState(null)

    if (!Array.isArray(user_perms) || !user_perms.length) {
        userInfo.details[0].roles[0].permissions.map(perm =>
            user_perms.push(perm.name)
        )
    }

    useEffect(() => {
        if (!userInfo || userInfo === null || userInfo.role[0].is_admin < 1) {
            history.push('/login')
        } else {
            if (!user_perms.includes('admin_view_ranks')) {
                history.push('/admin')
                Swal.fire(
                    'Sorry!',
                    `You don't have access to this page.`,
                    'warning'
                )
            } else {
                setIsAdmin(true)
                dispatch(adminListRanks())
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
        if (user_perms.includes('admin_add_ranks')) {
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
        if (user_perms.includes('admin_edit_ranks')) {
            setOpenEditDialog(true)
            setRankId(id)
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

    const deleteRankHandler = id => {
        user_perms.includes('admin_delete_ranks')
            ? Swal.fire({
                  title: 'Are you sure?',
                  text: "You can't recover this rank after deletion!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Yes, delete it!',
                  cancelButtonText: 'No, cancel!',
                  cancelButtonColor: '#d33',
                  reverseButtons: true
              }).then(result => {
                  if (result.value) {
                      dispatch(deleteRank(id))
                      setRequestData(new Date())
                      Swal.fire(
                          'Deleted!',
                          'The rank with the id ' + id + ' has been deleted.',
                          'success'
                      )
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                          'Cancelled',
                          `The selected rank is safe, don't worry :)`,
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
                                title='Ranks List'
                                columns={[
                                    {
                                        title: 'Title',
                                        field: 'name'
                                    },
                                    {
                                        title: 'Type',
                                        field: 'type'
                                    },
                                    {
                                        title: 'Price',
                                        field: 'price'
                                    },
                                    {
                                        title: 'Discount',
                                        field: 'discount',
                                        render: ranks => {
                                            {
                                                return !ranks.discount
                                                    ? '0%'
                                                    : `${ranks.discount}%`
                                            }
                                        }
                                    },
                                    {
                                        title: 'Date',
                                        field: 'created_at',
                                        render: ranks => {
                                            {
                                                return (
                                                    <Moment format='DD/MM/YYYY HH:mm'>
                                                        {ranks.created_at}
                                                    </Moment>
                                                )
                                            }
                                        }
                                    }
                                ]}
                                data={ranks.data && ranks.data}
                                actions={[
                                    {
                                        icon: 'add',
                                        tooltip: 'Add Rank',
                                        isFreeAction: true,
                                        onClick: event =>
                                            handleAddDialogOpen(event)
                                    },
                                    {
                                        icon: 'edit',
                                        tooltip: 'Edit Rank',
                                        onClick: (event, rowData) => {
                                            handleEditDialogOpen(rowData.id)
                                        }
                                    },
                                    {
                                        icon: 'delete',
                                        tooltip: 'Delete Rank',
                                        onClick: (event, rowData) =>
                                            deleteRankHandler(rowData.id)
                                    }
                                ]}
                                options={{
                                    actionsColumnIndex: -1
                                }}
                                detailPanel={rowData => {
                                    return (
                                        <div className='table-detail'>
                                            <h4>Access List</h4>
                                            <div className='table-detail--accs'>
                                                {rowData.kit === 1 && (
                                                    <p>Kit</p>
                                                )}
                                                {rowData.full_access === 1 && (
                                                    <p>Full Access</p>
                                                )}
                                                {rowData.edit_server === 1 && (
                                                    <p>Edit Server</p>
                                                )}
                                                {rowData.bypass_uri === 1 && (
                                                    <p>Bypass Uri</p>
                                                )}
                                                {rowData.essentials === 1 && (
                                                    <p>Essentials</p>
                                                )}
                                                {rowData.mute === 1 && (
                                                    <p>Mute</p>
                                                )}
                                                {rowData.kick === 1 && (
                                                    <p>Kick</p>
                                                )}
                                                {rowData.temp_ban === 1 && (
                                                    <p>Temp Ban</p>
                                                )}
                                                {rowData.fly === 1 && (
                                                    <p>Fly</p>
                                                )}
                                                {rowData.clearchat === 1 && (
                                                    <p>Clearchat</p>
                                                )}
                                                {rowData.keep_inv === 1 && (
                                                    <p>Keep Inv</p>
                                                )}
                                                {rowData.keep_exp === 1 && (
                                                    <p>Keep Exp</p>
                                                )}
                                                {rowData.jail === 1 && (
                                                    <p>Jail</p>
                                                )}
                                                {rowData.nickname === 1 && (
                                                    <p>Nickname</p>
                                                )}
                                                {rowData.world_edit === 1 && (
                                                    <p>World Edit</p>
                                                )}
                                                {rowData.enderchat === 1 && (
                                                    <p>Enderchest</p>
                                                )}
                                                {rowData.gamemode === 1 && (
                                                    <p>Gamemode</p>
                                                )}
                                                {rowData.color_nickname ===
                                                    1 && <p>Color Nickname</p>}
                                                {rowData.money === 1 && (
                                                    <p>Money {rowData.money}</p>
                                                )}
                                                {rowData.protection_blocks ===
                                                    1 && (
                                                    <p>
                                                        Protection blocks{' '}
                                                        {
                                                            rowData.protection_blocks
                                                        }
                                                    </p>
                                                )}
                                                {rowData.tp === 1 && (
                                                    <p>Tp {rowData.tp}</p>
                                                )}
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
                        <AddRank
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
                        <EditRank
                            setOpenEditDialog={setOpenEditDialog}
                            setRequestData={setRequestData}
                            rankId={rankId}
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

export default RanksScreen
