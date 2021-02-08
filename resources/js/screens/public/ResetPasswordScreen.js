import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Paper, Button, TextField, Grid, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Navigation from '../../components/public/Navigation'
import Loader from '../../components/public/loader/Loader'
import Message from '../../components/public/alert/Message'
import { resetPass, getUserToReset } from '../../actions/userActions'
import Swal from 'sweetalert2'
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

const ResetPasswordScreen = ({ history, match }) => {
    const classes = useStyles()
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userResetPass = useSelector(state => state.userResetPass)
    const { loading, error } = userResetPass

    const getUserReset = useSelector(state => state.getUserReset)
    const { userReset } = getUserReset

    useEffect(() => {
        if (!userReset) {
            dispatch(getUserToReset(match.params.id))
        } else {
            setEmail(userReset && userReset[0].email)
        }
    }, [userReset])

    const submitHandler = e => {
        e.preventDefault()

        if (password != passwordConfirmation) {
            setMessage('Passwords do not match')
        } else {
            dispatch(resetPass(email, password, passwordConfirmation))

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Password has been reseted.`,
                showConfirmButton: false,
                timer: 3500,
                width: '65rem'
            })
            history.push('/login')
        }
    }

    return (
        <Container>
            <Navigation />

            <Paper elevation={3} className={classes.auth}>
                <div className='auth'>
                    <div className='auth__info'>
                        <h3 className='auth__info--title'>Reset Password</h3>
                    </div>

                    <Divider className={classes.divider} />

                    <div className='auth__content'>
                        {message && (
                            <Message variant='error'>{message}</Message>
                        )}
                        {error && <Message variant='error'>{error}</Message>}
                        {loading && <Loader />}
                        <form onSubmit={submitHandler}>
                            <TextField
                                variant='outlined'
                                margin='normal'
                                required
                                fullWidth
                                name='password'
                                label='New Password (min 6 chars)'
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
                                Reset Password
                            </Button>
                        </form>
                    </div>
                </div>
            </Paper>
        </Container>
    )
}

export default ResetPasswordScreen
