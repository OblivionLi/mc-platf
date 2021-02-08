import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Container,
    Paper,
    Button,
    TextField,
    Grid,
    Divider
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import Navigation from '../../components/public/Navigation'
import Loader from '../../components/public/loader/Loader'
import Message from '../../components/public/alert/Message'
import { register } from '../../actions/userActions'
import { withStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    auth: {
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
    }
}))

const RegisterScreen = ({ location, history }) => {
    const classes = useStyles()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = e => {
        e.preventDefault()

        if (password != passwordConfirmation) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password, passwordConfirmation))
        }
    }

    return (
        <Container>
            <Navigation />

            <Paper elevation={3} className={classes.auth}>
                <div className="auth">

                
                <div className='auth__info'>
                    <h3 className='auth__info--title'>Sign Up</h3>
                </div>

                <Divider className={classes.divider} />

                <div className='auth__content'>
                    {message && <Message variant='error'>{message}</Message>}
                    {error && <Message variant='error'>{error}</Message>}
                    {loading && <Loader />}
                    <form onSubmit={submitHandler}>
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

                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password (min 6 chars)'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            name='confirm_password'
                            label='Confirm Password'
                            type='password'
                            id='confirm_password'
                            autoComplete='current-password'
                            value={passwordConfirmation}
                            onChange={e =>
                                setPasswordConfirmation(e.target.value)
                            }
                        />

                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='secondary'
                        >
                            Sign Up
                        </Button>

                        <Grid container className='auth__content--grid'>
                            <Grid item>
                                <Link to='/login'>
                                    {'Already having an account? Sign In'}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                </div>
            </Paper>
        </Container>
    )
}

export default RegisterScreen
