import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Container,
    Paper,
    Breadcrumbs,
    Typography,
    Button,
    Grid,
    Divider
} from '@material-ui/core'
import MaterialTable from 'material-table'
import Navigation from '../../../components/public/Navigation'
import Message from '../../../components/public/alert/Message'
import { addToCart, removeFromCart } from '../../../actions/cartActions'
import { makeStyles } from '@material-ui/core/styles'
import Footer from '../../../components/public/footer/Footer'

const useStyles = makeStyles(theme => ({
    payment: {
        padding: '3.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        color: '#283747',
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
    },
}))

const CartScreen = ({ match, location, history }) => {
    const classes = useStyles()
    const rankId = match.params.id

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    cart.itemsPrice = cartItems.reduce(
        (acc, item) => acc + parseFloat(item.price),
        0
    )

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }

        if (rankId) {
            dispatch(addToCart(rankId))
        }
    }, [dispatch, rankId])

    const removeFromCartHandler = id => {
        dispatch(removeFromCart(id))
        history.push('/cart')
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=placeorder')
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
                                    <Typography className='bc-c'>
                                        Cart
                                    </Typography>
                                </Breadcrumbs>
                            </div>
                        </div>

                        <div className='shop__cart'>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <MaterialTable
                                        title='Cart List'
                                        className={classes.payment}
                                        columns={[
                                            {
                                                title: 'Name',
                                                field: 'name',
                                                render: cartItems => {
                                                    return (
                                                        <Link
                                                            to={`/shop/${cartItems.rank}`}
                                                        >
                                                            {cartItems.name}
                                                        </Link>
                                                    )
                                                }
                                            },
                                            {
                                                title: 'Type',
                                                field: 'type',
                                                render: cartItems => {
                                                    {
                                                        return cartItems.type
                                                    }
                                                }
                                            },
                                            {
                                                title: 'Discount',
                                                field: 'discount',
                                                render: cartItems => {
                                                    {
                                                        return !cartItems.discount
                                                            ? '0%'
                                                            : `${cartItems.discount}%`
                                                    }
                                                }
                                            },
                                            {
                                                title: 'Price',
                                                field: 'price',
                                                render: cartItems => {
                                                    {
                                                        return <span>&euro;{cartItems.price}</span>
                                                    }
                                                }
                                            }
                                        ]}
                                        data={cartItems && cartItems}
                                        actions={[
                                            {
                                                icon: 'delete',
                                                tooltip: 'Remove Item',
                                                onClick: (event, rowData) =>
                                                    removeFromCartHandler(
                                                        rowData.rank
                                                    )
                                            }
                                        ]}
                                        options={{
                                            actionsColumnIndex: -1,
                                            rowStyle: {fontFamily: 'Courier'},
                                            searchFieldStyle: {fontFamily: 'Courier'}
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Paper className={classes.payment}>
                                        <h5>Subtotal: </h5>
                                        <span>
                                            &euro;
                                            {cartItems
                                                .reduce(
                                                    (acc, item) =>
                                                        acc +
                                                        parseFloat(item.price),
                                                    0
                                                )
                                                .toFixed(2)}
                                        </span>
                                        <Divider className={classes.divider} />

                                        <h5>Total with Discount: </h5>
                                        <span>
                                            <strike>
                                                &euro;
                                                {cart.itemsPrice.toFixed(2)}
                                            </strike>{' '}
                                            - &euro;
                                            {cartItems
                                                .reduce(
                                                    (acc, item) =>
                                                        acc +
                                                        (item.price -
                                                            (item.price *
                                                                item.discount) /
                                                                100),
                                                    0
                                                )
                                                .toFixed(2)}
                                        </span>
                                        <Divider className={classes.divider} />

                                        <Button
                                            variant='contained'
                                            color='secondary'
                                            onClick={checkoutHandler}
                                        >
                                            Proceed to checkout
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

export default CartScreen
