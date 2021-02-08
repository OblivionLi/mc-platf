import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Paper, Typography, Breadcrumbs, Divider, Fab, useScrollTrigger, Zoom } from '@material-ui/core'
import Navigation from '../../../components/public/Navigation'
import Loader from '../../../components/public/loader/Loader'
import Message from '../../../components/public/alert/Message'
import { listUpdateDetails } from '../../../actions/updateActions'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Footer from "../../../components/public/footer/Footer";

const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    },
    
    update: {
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

function ScrollTop (props) {
    const { children } = props
    const classes = useStyles()
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100
    })

    const handleClick = event => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor'
        )

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }

    return (
        <Zoom in={trigger}>
            <div
                onClick={handleClick}
                role='presentation'
                className={classes.root}
            >
                {children}
            </div>
        </Zoom>
    )
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired
}

const ShowUpdatesScreen = ({ match }) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const updateDetails = useSelector(state => state.updateDetails)
    const { loading, error, update } = updateDetails

    useEffect(() => {
        dispatch(listUpdateDetails(match.params.id))
    }, [match, dispatch])

    return (
        <Container>
            <span id='back-to-top-anchor'></span>
            <Navigation />

            <Paper elevation={3} className={classes.update}>
                <div className='update__info'>
                    <div className='bc'>
                        <Breadcrumbs aria-label='breadcrumb'>
                            <Link className='bc-l' to='/'>
                                Home
                            </Link>

                            <Link className='bc-l' to='/updates'>
                                Updates
                            </Link>
                            <Typography className='bc-c'>
                                {update.name}
                            </Typography>
                        </Breadcrumbs>
                    </div>
                </div>

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='error'>{error}</Message>
                ) : (
                    <>
                        <div className='update__show'>
                            <h3 className='update__show--title'>
                                {update.name}
                            </h3>
                            <div className="update_show--divider">
                                <Divider className={classes.divider} />
                            </div>
                            <h5>Ver: {update.version}</h5>
                            <h5>Admin: {update.users && update.users.name}</h5>
                        </div>

                        <div className="divider">
                            <Divider className={classes.divider} />
                        </div>

                        <Paper elevation={3} className='update__show--content'>
                            <p className='update__show--content-text'>
                                {update.full_description}
                            </p>
                        </Paper>
                    </>
                )}
            </Paper>

            <Footer />

            <ScrollTop>
                <Fab
                    color='default'
                    size='small'
                    aria-label='scroll back to top'
                >
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </Container>
    )
}

export default ShowUpdatesScreen
