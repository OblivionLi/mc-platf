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
import { adminListOrders } from '../../../actions/orderActions'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'

const OrderScreen = ({ history }) => {
    const dispatch = useDispatch()
    const user_perms = []

    const [requestData, setRequestData] = useState(new Date())

    const orderAdminList = useSelector(state => state.orderAdminList)
    const { loading, error, orders } = orderAdminList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [isAdmin, setIsAdmin] = useState(false)
    const [orderId, setOrderId] = useState(null)

    useEffect(() => {
        if (!userInfo || userInfo === null || userInfo.role[0].is_admin < 1) {
            history.push('/login')
        } else {
            if (!user_perms.includes('admin_view_orders')) {
                history.push('/admin')
                Swal.fire(
                    'Sorry!',
                    `You don't have access to this page.`,
                    'warning'
                )
            } else {
                setIsAdmin(true)
                dispatch(adminListOrders())
            }
        }
    }, [dispatch, history, userInfo, requestData])

    if (!Array.isArray(user_perms) || !user_perms.length) {
        userInfo.details[0].roles[0].permissions.map(perm =>
            user_perms.push(perm.name)
        )
    }

    return (
        <Paper elevation={3} className='admin__header'>
            {!isAdmin ? (
                <Loader />
            ) : (
                <>
                    <div className='admin__header--content'>
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <Message variant='error'>{error}</Message>
                        ) : (
                            <MaterialTable
                                title='Orders List'
                                columns={[
                                    {
                                        title: 'Ordered By',
                                        field: 'users.name'
                                    },
                                    {
                                        title: 'Status',
                                        field: 'status'
                                    },
                                    {
                                        title: 'Total Price',
                                        field: 'total_price'
                                    },
                                    {
                                        title: 'Paid At',
                                        field: 'paid_at',
                                        render: orders => {
                                            return (
                                                <>
                                                    {!orders.paid_at ? (
                                                        '--/--/---- --/--'
                                                    ) : (
                                                        <Moment format='DD/MM/YYYY HH:mm'>
                                                            {orders.paid_at}
                                                        </Moment>
                                                    )}
                                                </>
                                            )
                                        }
                                    },
                                    {
                                        title: 'Delivered At',
                                        field: 'delivered_at',
                                        render: orders => {
                                            return (
                                                <>
                                                    {!orders.delivered_at ? (
                                                        '--/--/---- --/--'
                                                    ) : (
                                                        <Moment format='DD/MM/YYYY HH:mm'>
                                                            {
                                                                orders.delivered_at
                                                            }
                                                        </Moment>
                                                    )}
                                                </>
                                            )
                                        }
                                    },
                                    {
                                        title: 'Created At',
                                        field: 'created_at',
                                        render: orders => {
                                            return (
                                                <Moment format='DD/MM/YYYY HH:mm'>
                                                    {orders.created_at}
                                                </Moment>
                                            )
                                        }
                                    }
                                ]}
                                data={orders.data && orders.data}
                                detailPanel={rowData => {
                                    return (
                                        <div className='table-detail'>
                                            <h4>Ordered Items</h4>
                                            <Link
                                                href={`/orders/${rowData.id}`}
                                            >
                                                Display Order
                                            </Link>
                                            <div className='table-detail--accs'>
                                                {rowData.ranks.map(rank => (
                                                    <p key={rank.id}>
                                                        {rank.name}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                }}
                            />
                        )}
                    </div>
                </>
            )}
        </Paper>
    )
}

export default OrderScreen
