import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Container,
    Paper,
    Breadcrumbs,
    Typography,
    Grid,
    Divider
} from '@material-ui/core'
import Navigation from '../../components/public/Navigation'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import Loader from '../../components/public/loader/Loader'
import Message from '../../components/public/alert/Message'
import { listShowCase } from '../../actions/showCaseActions'
import Paginate from '../../components/public/ShowCasesPaginate'
import ReactPlayer from 'react-player'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Footer from '../../components/public/footer/Footer'

const useStyles = makeStyles(theme => ({
    showcase: {
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

    content: {
        background: '#283747',
        color: '#F3F3F3'
    }
}))

const ShowCasesScreen = ({ match }) => {
    const classes = useStyles()
    const page = match.params.page || 1

    const dispatch = useDispatch()

    const showCaseList = useSelector(state => state.showCaseList)
    const { loading, error, showCases } = showCaseList

    const { meta } = showCases

    let current_page = meta && meta.current_page
    let last_page = meta && meta.last_page

    useEffect(() => {
        dispatch(listShowCase(page))
    }, [dispatch, page])

    return (
        <Container>
            <Navigation />

            <Paper elevation={3} className={classes.showcase}>
                <div className='showcase__info'>
                    <div className='bc'>
                        <Breadcrumbs aria-label='breadcrumb'>
                            <Link className='bc-l' to='/'>
                                Home
                            </Link>

                            <Typography className='bc-c'>Showcases</Typography>
                        </Breadcrumbs>
                    </div>
                </div>

                <div className='member__header'>
                    <h3 className='member__header--title'>
                        Server Showcase Videos
                    </h3>
                </div>

                <div className='divider'>
                    <Divider className={classes.divider} />
                </div>

                <div className='showcase__content'>
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant='error'>{error}</Message>
                    ) : (
                        <>
                            <div className='showcase__content--videos'>
                                {showCases.data &&
                                    showCases.data.map(showCase => (
                                        <div
                                            className='showcase__content--videos-video'
                                            key={showCase.id}
                                        >
                                            <h5>{showCase.name}</h5>
                                            <Divider className={classes.divider} />
                                            <ReactPlayer
                                                url={showCase.video_url}
                                                controls={true}
                                                config={{
                                                    youtube: {
                                                        playerVars: {
                                                            showinfo: 1
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>
                                    ))}
                            </div>
                        </>
                    )}
                </div>
                {showCases.data && showCases.data.length > 0 && !loading && (
                    <div className='pagination'>
                        <Paginate page={current_page} count={last_page} />
                    </div>
                )}
            </Paper>

            <Footer />
        </Container>
    )
}

export default ShowCasesScreen
