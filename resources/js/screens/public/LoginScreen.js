import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Container,
    Paper,
    Divider,
    Button,
    TextField,
    FormControlLabel,
    Grid,
    Checkbox
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import Navigation from '../../components/public/Navigation'
import { login } from '../../actions/userActions'
import Loader from '../../components/public/loader/Loader'
import Message from '../../components/public/alert/Message'
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

const LoginScreen = ({ location, history }) => {
    const classes = useStyles()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const handleRememberMe = e => {
        if (e.target.checked) {
            setRememberMe(true)
        } else {
            setRememberMe(false)
        }
    }

    const submitHandler = e => {
        e.preventDefault()

        dispatch(login(email, password, rememberMe))
    }

    return (
        <Container>
            <Navigation />

            <Paper elevation={3} className={classes.auth}>
                <div className='auth'>
                    <div className='auth__info'>
                        <h3 className='auth__info--title'>Sign In</h3>
                    </div>

                    <Divider className={classes.divider} />

                    <div className='auth__content'>
                        {error && <Message variant='error'>{error}</Message>}
                        {loading && <Loader />}
                        <form onSubmit={submitHandler}>
                            <TextField
                                variant='outlined'
                                margin='normal'
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                name='email'
                                autoComplete='email'
                                autoFocus
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />

                            <TextField
                                variant='outlined'
                                margin='normal'
                                required
                                fullWidth
                                name='password'
                                label='Password'
                                type='password'
                                id='password'
                                autoComplete='current-password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color='secondary'
                                        onClick={handleRememberMe}
                                    />
                                }
                                label='Remember me'
                            />
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                color='secondary'
                            >
                                Sign In
                            </Button>

                            <Grid container className='auth__content--grid'>
                                <Grid item xs>
                                    <Link to='/forgot-password'>
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to='/register'>
                                        {"Don't have an account? Sign Up"}
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

export default LoginScreen
