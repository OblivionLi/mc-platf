import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Container,
    Paper,
    Breadcrumbs,
    TextField,
    Button,
    Typography,
    Divider
} from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import Navigation from '../../../components/public/Navigation'
import Loader from '../../../components/public/loader/Loader'
import Message from '../../../components/public/alert/Message'
import { createReportBug } from '../../../actions/reportBugActions'
import { REPORTBUG_CREATE_RESET } from '../../../constants/reportBugConstants'
import Swal from 'sweetalert2'
import ClearIcon from '@material-ui/icons/Clear'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Footer from "../../../components/public/footer/Footer";

const useStyles = makeStyles(theme => ({
    report: {
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

    clear: {
        color: '#DE354C'
    },

    ff: {
        fontFamily: 'Courier'
    }
}))

const AddReportBugScreen = ({ history }) => {
    const classes = useStyles()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState()

    const dispatch = useDispatch()

    const reportBugCreate = useSelector(state => state.reportBugCreate)
    const { loading, success, error } = reportBugCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }

        if (success) {
            dispatch({ type: REPORTBUG_CREATE_RESET })
            // TODO:: redirect to profile
            history.push('/updates')
        }
    }, [dispatch, history, success])

    const submitHandler = e => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)

        if (image) {
            formData.append('image', image)
        }

        dispatch(createReportBug(formData))

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Bug "${title}" reported successfully`,
            showConfirmButton: false,
            timer: 3500,
            width: '65rem'
        })
    }

    return (
        <Container>
            <Navigation />

            <Paper elevation={3} className={classes.report}>
                <div className='report__info'>
                    <div className='bc'>
                        <Breadcrumbs aria-label='breadcrumb'>
                            <Link className='bc-l' to='/'>
                                Home
                            </Link>

                            <Link className='bc-l' to='/updates'>
                                Updates
                            </Link>

                            <Typography className='bc-c'>Report Bug</Typography>
                        </Breadcrumbs>
                    </div>
                </div>

                <div className='report__header'>
                    <h3 className='report__header--title'>Report Bug</h3>
                </div>

                <div className="divider">
                    <Divider className={classes.divider} />
                </div>

                <div className='report__content'>
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant='error'>{error}</Message>
                    ) : (
                        <form
                            onSubmit={submitHandler}
                            encType='multipart/form-data'
                        >
                            <div className='form'>
                                <div className='form__field'>
                                    <TextField
                                        variant='outlined'
                                        name='title'
                                        label='Title'
                                        fullWidth
                                        onChange={e => setTitle(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className='form__field'>
                                    <TextField
                                        variant='outlined'
                                        label='Description'
                                        multiline
                                        rows={4}
                                        fullWidth
                                        onChange={e =>
                                            setDescription(e.target.value)
                                        }
                                        name='description'
                                        required
                                    />
                                </div>

                                <div className='form__field'>
                                    <input
                                        id='contained-button-file'
                                        type='file'
                                        className='form__field--upl'
                                        onChange={e =>
                                            setImage(e.target.files[0])
                                        }
                                    />

                                    <label htmlFor='contained-button-file'>
                                        <Button
                                            variant='contained'
                                            color='secondary'
                                            component='span'
                                            startIcon={<PhotoCamera />}
                                            className={classes.ff}
                                        >
                                            Upload Evidence (max filezise: 5mb)
                                        </Button>
                                    </label>

                                    <p>{image ? image.name : <ClearIcon className={classes.clear} />}</p>
                                </div>
                            </div>
                            <Button
                                variant='contained'
                                color='secondary'
                                value='submit'
                                type='submit'
                                fullWidth
                                className={classes.ff}
                            >
                                Report Bug
                            </Button>
                        </form>
                    )}
                </div>
            </Paper>

            <Footer />
        </Container>
    )
}

export default AddReportBugScreen
