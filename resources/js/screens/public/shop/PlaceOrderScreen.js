import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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
import Navigation from '../../../components/public/Navigation'
import Message from '../../../components/public/alert/Message'
import { createOrder } from '../../../actions/orderActions'
import { removeFromCart } from '../../../actions/cartActions'
import { makeStyles } from '@material-ui/core/styles'
import Footer from '../../../components/public/footer/Footer'

const useStyles = makeStyles(theme => ({
    shop: {
        background: 'rgba(0, 0, 0, 0.9)' /* fallback for old browsers */,
        background:
            '-webkit-linear-gradient(to right, rgba(15, 155, 15, 0.4), rgba(0, 0, 0, 0.8))',
        background:
            'linear-gradient(to right, rgba(15, 155, 15, 0.4), rgba(0, 0, 0, 0.8))',
        marginTop: '3.5rem',
        padding: '5.5rem 0',
        color: '#F3F3F3'
    },

    divider: {
        background: '#DE354C'
    },

    payment: {
        padding: '3.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        // background: '#283747',
        color: '#283747',
    }, 

    root: {
        fontFamily: 'Courier',
        background: 'red'
    }
}))

const PlaceOrderScreen = ({ history }) => {
    const classes = useStyles()

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    cart.itemsPrice = cartItems.reduce(
        (acc, item) => acc + parseFloat(item.price),
        0
    )

    cart.discountPrice = cartItems.reduce(
        (acc, item) =>
            acc +
            parseFloat(item.price) -
            (parseFloat(item.price) * item.discount) / 100,
        0
    )

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {
        if (success) {
            cartItems.map(item => {
                dispatch(removeFromCart(item.rank))
            })
            history.push(`/orders/${order.id}`)
        }
    }, [history, success, cart])

    const placeOrderHandler = () => {
        dispatch(createOrder(cart.cartItems, paymentMethod, cart.discountPrice))
    }

    return (
        <Container>
            <Navigation />

            <Paper elevation={3} className={classes.shop}>
                {cartItems.length === 0 ? (
                    <Message variant='warning'>
                        Your cart is empty <Link to={`/shop`}>Go Back</Link>
                    </Message>
                ) : (
                    <>
                        <div className='shop__info'>
                            <div className='bc'>
                                <Breadcrumbs aria-label='breadcrumb'>
                                    <Link className='bc-l' to='/'>
                                        Home
                                    </Link>

                                    <Link className='bc-l' to='/shop'>
                                        Shop
                                    </Link>

                                    <Link className='bc-l' to='/cart'>
                                        Cart
                                    </Link>
                                    <Typography className='bc-c'>
                                        Place Order
                                    </Typography>
                                </Breadcrumbs>
                            </div>
                        </div>

                        <div className='shop__placeorder'>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Paper className={classes.payment}>
                                        <div>
                                            <Divider className={classes.divider} />
                                            <h5>Payment Method: PayPal</h5>
                                        </div>

                                        <div>
                                            <Divider className={classes.divider} />
                                            <h5>Order Items</h5>

                                            <TableContainer component={Paper} className={classes.table}>
                                                <Table
                                                    className={classes.table}
                                                    aria-label='simple table'
                                                >
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>
                                                                #
                                                            </TableCell>
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
                                                        {cartItems.map(
                                                            (item, index) => (
                                                                <TableRow
                                                                    key={index}
                                                                >
                                                                    <TableCell
                                                                        component='th'
                                                                        scope='row'
                                                                    >
                                                                        {index +
                                                                            1}
                                                                    </TableCell>
                                                                    <TableCell align='right'>
                                                                        <Link
                                                                            to={`/shop/${item.rank}`}
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
                                        <h5>Subtotal:</h5>
                                        <span>
                                            &euro;{cart.itemsPrice.toFixed(2)}
                                        </span>
                                        <Divider className={classes.divider} />

                                        <h5>Total with Discount:</h5>
                                        <span>
                                            <strike>
                                                &euro;
                                                {cart.itemsPrice.toFixed(2)}
                                            </strike>{' '}
                                            - &euro;
                                            {cart.discountPrice.toFixed(2)}
                                        </span>
                                        <Divider className={classes.divider} />

                                        {error && (
                                            <Message variant='error'>
                                                {error}
                                            </Message>
                                        )}

                                        <Button
                                            variant='contained'
                                            color='secondary'
                                            onClick={placeOrderHandler}
                                        >
                                            Place Order
                                        </Button>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div>
                    </>
                )}
            </Paper>

            <Footer />
        </Container>
    )
}

export default PlaceOrderScreen
