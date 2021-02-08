import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    getOrderDetails,
    deliverOrder,
    payOrder
} from '../../../actions/orderActions'
import {
    ORDER_PAY_RESET,
    ORDER_DELIVER_RESET
} from '../../../constants/orderConstants'
import {
    Container,
    Paper,
    Breadcrumbs,
    Typography,
    Button,
    Grid,
    Divider,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@material-ui/core'
import Loader from '../../../components/public/loader/Loader'
import Message from '../../../components/public/alert/Message'
import Navigation from '../../../components/public/Navigation'
import { makeStyles } from '@material-ui/core/styles'
import Footer from '../../../components/public/footer/Footer'

const useStyles = makeStyles(theme => ({
    payment: {
        padding: '3.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        color: '#283747'
    },

    divider: {
        background: '#DE354C'
    },

    shop: {
        background: 'rgba(0, 0, 0, 0.9)' /* fallback for old browsers */,
        background:
            '-webkit-linear-gradient(to right, rgba(15, 155, 15, 0.4), rgba(0, 0, 0, 0.8))',
        background:
            'linear-gradient(to right, rgba(15, 155, 15, 0.4), rgba(0, 0, 0, 0.8))',
        marginTop: '3.5rem',
        padding: '5.5rem 0',
        color: '#F3F3F3'
    }
}))

const ShowOrderScreen = ({ match, history }) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [sdkReady, setSdkReady] = useState(false)
    const [perms, setPerms] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const cart = useSelector(state => state.cart)
    const orderId = match.params.id

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }

        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get(
                '/api/auth/config/paypal'
            )
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?&client-id=${clientId}&currency=EUR`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (!order || successDeliver || order.id != orderId || successPay) {
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (order.is_paid == 0) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }

        console.log(userInfo)

        if (order && order.user_id == userInfo.id || userInfo.role[0].is_admin > 0) {
            setPerms(true)
        }
    }, [dispatch, orderId, successDeliver, order, successPay])

    const deliverHandler = () => {
        dispatch(deliverOrder(order.id))
    }

    const successPaymentHandler = () => {
        dispatch(payOrder(orderId))
    }

    return loading ? (
        <Loader />
    ) : perms ? (
        <Container>
            <Navigation />

            <Paper elevation={3} className={classes.shop}>
                <div className='shop__info'>
                    <div className='bc'>
                        <Breadcrumbs aria-label='breadcrumb'>
                            <Link className='bc-l' to='/'>
                                Home
                            </Link>

                            <Link className='bc-l' to='/shop'>
                                Shop
                            </Link>
                            <Typography className='bc-c'>
                                Order '{order && order.id}' Details
                            </Typography>
                        </Breadcrumbs>
                    </div>
                </div>

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='error'>{error}</Message>
                ) : (
                    <div className='shop__placeorder'>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Paper className={classes.payment}>
                                    <div>
                                        <h4>User Info</h4>
                                        <div className='shop__placeorder--info'>
                                            <Divider
                                                className={classes.divider}
                                            />
                                            <div>
                                                <h6>Name:</h6>
                                                <p>{order.users.name}</p>
                                            </div>
                                            <Divider
                                                className={classes.divider}
                                            />

                                            <div>
                                                <h6>Email:</h6>
                                                <a
                                                    href={`mailto:${order.users.email}`}
                                                >
                                                    {order.users.email}
                                                </a>
                                            </div>
                                            <Divider
                                                className={classes.divider}
                                            />
                                            <div className='shop__placeorder--info-d'>
                                                <h6>Deliver Status:</h6>
                                                {order.is_delivered > 0 ? (
                                                    <Message variant='success'>
                                                        Delivered on{' '}
                                                        {order.delivered_at}
                                                    </Message>
                                                ) : (
                                                    <Message variant='warning'>
                                                        Not Delivered
                                                    </Message>
                                                )}
                                            </div>

                                            <Divider
                                                className={classes.divider}
                                            />
                                            <div>
                                                <h6>Payment Method: PayPal</h6>
                                            </div>

                                            <div>
                                                <h6>Pay Status:</h6>
                                                {order.is_paid > 0 ? (
                                                    <Message variant='success'>
                                                        Paid on {order.paid_at}
                                                    </Message>
                                                ) : (
                                                    <Message variant='warning'>
                                                        Not Paid
                                                    </Message>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <Divider className={classes.divider} />
                                        <h4>Ordered Items</h4>

                                        <TableContainer component={Paper}>
                                            <Table
                                                className={classes.table}
                                                aria-label='simple table'
                                            >
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>#</TableCell>
                                                        <TableCell align='right'>
                                                            Name
                                                        </TableCell>
                                                        <TableCell align='right'>
                                                            Discount
                                                        </TableCell>
                                                        <TableCell align='right'>
                                                            Price
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {order.ranks.map(
                                                        (item, index) => (
                                                            <TableRow
                                                                key={index}
                                                            >
                                                                <TableCell
                                                                    component='th'
                                                                    scope='row'
                                                                >
                                                                    {index + 1}
                                                                </TableCell>
                                                                <TableCell align='right'>
                                                                    <Link
                                                                        to={`/shop/${item.id}`}
                                                                    >
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </Link>
                                                                </TableCell>
                                                                <TableCell align='right'>
                                                                    {!item.discount
                                                                        ? '0%'
                                                                        : `${item.discount}%`}
                                                                </TableCell>
                                                                <TableCell align='right'>
                                                                    &euro;
                                                                    <strike>
                                                                        {
                                                                            item.price
                                                                        }
                                                                    </strike>
                                                                    - &euro;
                                                                    {(
                                                                        item.price -
                                                                        (item.price *
                                                                            item.discount) /
                                                                            100
                                                                    ).toFixed(
                                                                        2
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Paper className={classes.payment}>
                                    <h5>Order Status</h5>

                                    <Message
                                        variant={
                                            order.status === 'PENDING'
                                                ? 'warning'
                                                : 'success'
                                        }
                                    >
                                        {order.status}
                                    </Message>
                                    <Divider className={classes.divider} />

                                    <h5>Total:</h5>
                                    <p>
                                        &euro;
                                        {order.total_price}
                                    </p>
                                    <Divider className={classes.divider} />

                                    {error && (
                                        <Message variant='error'>
                                            {error}
                                        </Message>
                                    )}

                                    {loadingDeliver && <Loader />}
                                    {userInfo &&
                                        userInfo.role &&
                                        userInfo.role[0].name == 'SuperAdmin' &&
                                        // !order.is_paid &&
                                        order.is_delivered == 0 && (
                                            <Button
                                                variant='contained'
                                                color='secondary'
                                                onClick={deliverHandler}
                                            >
                                                Mark as Delivered
                                            </Button>
                                        )}

                                    {order.is_paid == 0 && (
                                        <div>
                                            {loadingPay && <Loader />}
                                            {!sdkReady ? (
                                                <Loader />
                                            ) : (
                                                <PayPalButton
                                                    amount={order.total_price}
                                                    currency='EUR'
                                                    onSuccess={
                                                        successPaymentHandler
                                                    }
                                                />
                                            )}
                                        </div>
                                    )}
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                )}
            </Paper>

            <Footer />
        </Container>
    ) : (
        <a href='/'>Go Back</a>
    )
}

export default ShowOrderScreen
