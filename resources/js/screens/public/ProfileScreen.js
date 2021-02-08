import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Paper, Button, TextField, Divider } from '@material-ui/core'
import MaterialTable from 'material-table'
import Navigation from '../../components/public/Navigation'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import { orderUserList } from '../../actions/orderActions'
import Message from '../../components/public/alert/Message'
import Loader from '../../components/public/loader/Loader'
import Moment from 'react-moment'
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Swal from "sweetalert2";

const useStyles = makeStyles(theme => ({
    profile: {
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

    check: {
        color: 'rgb(53, 222, 76)'
    },

    clear: {
        color: '#DE354C'
    },
}))

const ProfileScreen = ({ history }) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const listUserOrder = useSelector(state => state.listUserOrder)
    const { loading: loadingOrders, error: errorOrders, orders } = listUserOrder

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                dispatch(orderUserList(user.id))
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = e => {
        e.preventDefault()

        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile(user.id, name, email, password))
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Profile Updated!`,
                showConfirmButton: false,
                timer: 2500,
                width: '65rem'
            });
        }
    }

    return (
        <Container>
            <Navigation />

            <Paper elevation={3} className={classes.profile}>
                <div className='profile__header'>
                    <h3 className='profile__header--title'>My Profile</h3>
                    <h5>Site Role: {user.roles && user.roles[0].name}</h5>
                    <h5>Server Tag: {user.tags && user.tags[0].name}</h5>
                </div>

                <div className='divider'>
                    <Divider className={classes.divider} />
                </div>

                <div className='profile__content'>
                    {message && <Message variant='error'>{message}</Message>}
                    {error && <Message variant='error'>{error}</Message>}
                    {/* {success && (
                        <Message variant='success'>Profile Updated</Message>
                    )} */}
                    {loading && <Loader />}
                    <h3>Account Settings</h3>
                    <Divider className={classes.divider} />
                    <div className='profile__content--form'>
                        <form onSubmit={submitHandler}>
                            <div className='form__field'>
                                <TextField
                                    variant='outlined'
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='username'
                                    label='Username'
                                    name='username'
                                    autoComplete='username'
                                    autoFocus
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>

                            <div className='form__field'>
                                <TextField
                                    variant='outlined'
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='email'
                                    label='Email Address'
                                    name='email'
                                    autoComplete='email'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>

                            <div className='form__field'>
                                <TextField
                                    variant='outlined'
                                    margin='normal'
                                    fullWidth
                                    name='password'
                                    label='Password (min 6 chars)'
                                    type='password'
                                    id='password'
                                    autoComplete='current-password'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>

                            <div className='form__field'>
                                <TextField
                                    variant='outlined'
                                    margin='normal'
                                    fullWidth
                                    name='confirm_password'
                                    label='Confirm Password'
                                    type='password'
                                    id='confirm_password'
                                    autoComplete='current-password'
                                    value={confirmPassword}
                                    onChange={e =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </div>
                            <Button
                                variant='contained'
                                color='secondary'
                                value='submit'
                                type='submit'
                                fullWidth
                            >
                                Update Profile
                            </Button>
                        </form>
                    </div>

                    <h3>My Orders</h3>
                    <Divider className={classes.divider} />
                    <div className="profile__content--orders">
                        {loadingOrders ? (
                            <Loader />
                        ) : errorOrders ? (
                            <Message variant='error'>{errorOrders}</Message>
                        ) : (
                            <MaterialTable
                                columns={[
                                    {
                                        title: 'Ordered At',
                                        field: 'created_at',
                                        render: orders => {
                                            return (
                                                <Moment format='DD/MM/YYYY HH:mm'>
                                                    {orders.created_at}
                                                </Moment>
                                            )
                                        }
                                    },
                                    {
                                        title: 'Total to Pay',
                                        field: 'total_price',
                                        render: orders => {
                                            return orders.total_price
                                        }
                                    },
                                    {
                                        title: 'Paid',
                                        field: 'is_paid',
                                        render: orders => {
                                            return (
                                                <>
                                                    {orders.is_paid > 0 ? (
                                                        <CheckIcon className={classes.check} />
                                                    ) : (
                                                        <ClearIcon className={classes.clear} />
                                                    )}
                                                </>
                                            )
                                        }
                                    },
                                    {
                                        title: 'Delivered',
                                        field: 'is_delivered',
                                        render: orders => {
                                            return (
                                                <>
                                                    {orders.is_delivered > 0 ? (
                                                        <CheckIcon className={classes.check} />
                                                    ) : (
                                                        <ClearIcon className={classes.clear} />
                                                    )}
                                                </>
                                            )
                                        }
                                    }
                                ]}
                                data={orders && orders}
                                actions={[
                                    {
                                        icon: () => <ShoppingBasketIcon />,
                                        tooltip: 'Display Order',
                                        onClick: (event, rowData) =>
                                            history.push(
                                                `/orders/${rowData.id}`
                                            )
                                    }
                                ]}
                                options={{
                                    actionsColumnIndex: -1
                                }}
                                detailPanel={rowData => {
                                    return (
                                        <div className='table-detail'>
                                            <h4>Ranks Bought</h4>
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
                </div>
            </Paper>
        </Container>
    )
}

export default ProfileScreen
