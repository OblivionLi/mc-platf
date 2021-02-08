import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Link, Button } from '@material-ui/core'
import MaterialTable from 'material-table'
import Moment from 'react-moment'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import Swal from 'sweetalert2'
import { listTags, deleteTag } from '../../../actions/tagActions'
import Loader from '../../../components/public/loader/Loader'
import Message from '../../../components/public/alert/Message'
import AddTagScreen from './tags/AddTagScreen'
import EditTagScreen from './tags/EditTagScreen'

const TagsScreen = ({ history }) => {
    const dispatch = useDispatch()
    const user_perms = []

    const [openAddDialog, setOpenAddDialog] = useState(false)
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [requestData, setRequestData] = useState(new Date())

    const tagList = useSelector(state => state.tagList)
    const { loading, error, tags } = tagList

    const tagDelete = useSelector(state => state.tagDelete)
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete
    } = tagDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [isAdmin, setIsAdmin] = useState(false)
    const [tagId, setTagId] = useState(null)

    useEffect(() => {
        if (!userInfo || userInfo === null || userInfo.role[0].is_admin < 1) {
            history.push('/login')
        } else {
            if (!user_perms.includes('admin_view_tags')) {
                history.push('/admin')
                Swal.fire(
                    'Sorry!',
                    `You don't have access to this page.`,
                    'warning'
                )
            } else {
                setIsAdmin(true)
                dispatch(listTags())
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
        if (user_perms.includes('admin_add_tags')) {
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
        if (user_perms.includes('admin_edit_tags')) {
            setOpenEditDialog(true)
            setTagId(id)
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

    const deleteTagHandler = id => {
        user_perms.includes('admin_delete_tags')
            ? Swal.fire({
                  title: 'Are you sure?',
                  text: `You can't recover this tag after deletion!`,
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Yes, delete it!',
                  cancelButtonText: 'No, cancel!',
                  cancelButtonColor: '#d33',
                  reverseButtons: true
              }).then(result => {
                  if (result.value) {
                      dispatch(deleteTag(id))
                      setRequestData(new Date())
                      Swal.fire(
                          'Deleted!',
                          'The tag with the id ' + id + ' has been deleted.',
                          'success'
                      )
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                          'Cancelled',
                          `The selected tag is safe, don't worry :)`,
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
                                title='Tags List'
                                columns={[
                                    {
                                        title: '#',
                                        field: 'id'
                                    },
                                    {
                                        title: 'Title',
                                        field: 'name'
                                    },
                                    // {
                                    //     title: "People with this Role",
                                    //     field: "users",
                                    //     render: (tags) => {
                                    //         {
                                    //             return tags.users.length;
                                    //         }
                                    //     },
                                    // },
                                    {
                                        title: 'Added At',
                                        field: 'created_at',
                                        render: tags => {
                                            {
                                                return (
                                                    <Moment format='DD/MM/YYYY HH:mm'>
                                                        {tags.created_at}
                                                    </Moment>
                                                )
                                            }
                                        }
                                    },
                                    {
                                        title: 'Updated At',
                                        field: 'updated_at',
                                        render: tags => {
                                            {
                                                return (
                                                    <Moment format='DD/MM/YYYY HH:mm'>
                                                        {tags.updated_at}
                                                    </Moment>
                                                )
                                            }
                                        }
                                    }
                                ]}
                                data={tags.data && tags.data}
                                actions={[
                                    {
                                        icon: 'add',
                                        tooltip: 'Add Tag',
                                        isFreeAction: true,
                                        onClick: event =>
                                            handleAddDialogOpen(event)
                                    },
                                    {
                                        icon: 'edit',
                                        tooltip: 'Edit Tag',
                                        onClick: (event, rowData) => {
                                            handleEditDialogOpen(rowData.id)
                                        }
                                    },
                                    {
                                        icon: 'delete',
                                        tooltip: 'Delete Tag',
                                        onClick: (event, rowData) =>
                                            deleteTagHandler(rowData.id)
                                    }
                                ]}
                                options={{
                                    actionsColumnIndex: -1
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
                        <AddTagScreen
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
                        <EditTagScreen
                            setOpenEditDialog={setOpenEditDialog}
                            setRequestData={setRequestData}
                            tagId={tagId}
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

export default TagsScreen
