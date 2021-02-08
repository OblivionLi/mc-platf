import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
    Container,
    useScrollTrigger,
    Fab,
    Zoom,
    Paper,
    Divider,
    Grid,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography
} from '@material-ui/core'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { listGameModes } from '../../actions/gameModeActions'
import Moment from 'react-moment'
import Navigation from '../../components/public/Navigation'
import Header from '../../components/public/homescreen/Header'
import Loader from '../../components/public/loader/Loader'
import Message from '../../components/public/alert/Message'
import GameModesPaginate from '../../components/public/GameModesPaginate'
import TextLoop from 'react-text-loop'
import Footer from '../../components/public/footer/Footer'

const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    },

    header: {
        background: 'rgba(0, 0, 0, 0.9)' /* fallback for old browsers */,
        background:
            '-webkit-linear-gradient(to right, rgba(15, 155, 15, 0.4), rgba(0, 0, 0, 0.8))',
        background:
            'linear-gradient(to right, rgba(15, 155, 15, 0.4), rgba(0, 0, 0, 0.8))',
        marginTop: '3.5rem',
        padding: '5.5rem 0'
    },

    title: {
        fontFamily: 'Courier',
    },

    description: {
        fontFamily: 'Courier',
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

const HomeScreen = ({ match }) => {
    const classes = useStyles()
    const page = match.params.page || 1

    const dispatch = useDispatch()

    const gameModeList = useSelector(state => state.gameModeList)
    const { loading, error, gameModes } = gameModeList

    const { meta } = gameModes

    let current_page = meta && meta.current_page
    let last_page = meta && meta.last_page

    useEffect(() => {
        dispatch(listGameModes(page))
    }, [dispatch, page])

    return (
        <Container>
            <span id='back-to-top-anchor'></span>
            <Navigation />

            <Header />

            {/* Game Modes */}
            <Paper elevation={3} className={classes.header}>
                <div className='header__info'>
                    <h3 className='header__info--title'>Server Game Modes</h3>
                    <div className='header__info--title-div'>
                        <Divider />
                    </div>
                </div>

                <div className='header__content'>
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant='error'>{error}</Message>
                    ) : (
                        <>
                            <div className='header__content--cards'>
                                <Grid container spacing={3}>
                                    {gameModes.data &&
                                    gameModes.data.length !== 0 ? (
                                        gameModes.data &&
                                        gameModes.data.map(mode => (
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                key={mode.id}
                                                className='header__content--card'
                                            >
                                                <Paper className='header__content--cards-item'>
                                                    <Card>
                                                        <CardActionArea>
                                                            <CardMedia
                                                                title={
                                                                    mode.title
                                                                }
                                                            >
                                                                <img
                                                                    src={
                                                                        mode.image !=
                                                                        'no-image'
                                                                            ? `http://www.mcfree.ro/storage/${mode.image}`
                                                                            : 'http://www.mcfree.ro/images/minecraft-alt.jpg'
                                                                    }
                                                                    alt={
                                                                        mode.title
                                                                    }
                                                                    className='header__content--cards-item_img'
                                                                />
                                                            </CardMedia>
                                                            <CardContent>
                                                                <Typography
                                                                    gutterBottom
                                                                    variant='h5'
                                                                    component='h5'
                                                                    className={classes.title}
                                                                >
                                                                    {mode.title}
                                                                </Typography>
                                                                <Divider className={classes.divider} />
                                                                <Typography
                                                                    variant='body2'
                                                                    component='p'
                                                                    className={classes.description}
                                                                >
                                                                    {
                                                                        mode.description
                                                                    }
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            <Moment fromNow>
                                                                {
                                                                    mode.created_at
                                                                }
                                                            </Moment>
                                                        </CardActions>
                                                    </Card>
                                                </Paper>
                                            </Grid>
                                        ))
                                    ) : (
                                        <Grid
                                            container
                                            direction='row'
                                            justify='center'
                                            alignItems='center'
                                        >
                                            <Paper className='header__content--cards-item no-data'>
                                                <Card>
                                                    <CardActionArea>
                                                        <CardMedia>
                                                            <img
                                                                src={`http://www.mcfree.ro/images/unknown.webp`}
                                                                className='header__content--cards-item_imgun'
                                                            />
                                                        </CardMedia>
                                                        <CardContent>
                                                            <Typography
                                                                gutterBottom
                                                                variant='h5'
                                                                component='h2'
                                                            >
                                                                <TextLoop
                                                                    springConfig={{
                                                                        stiffness: 180,
                                                                        damping: 8
                                                                    }}
                                                                >
                                                                    <span>
                                                                        ?
                                                                    </span>
                                                                    <span>
                                                                        Unknown
                                                                    </span>
                                                                    <span>
                                                                        *Creeper
                                                                        hisses*
                                                                    </span>
                                                                </TextLoop>{' '}
                                                            </Typography>
                                                            <Typography
                                                                variant='body2'
                                                                color='textSecondary'
                                                                component='p'
                                                            >
                                                                Coming Soon
                                                            </Typography>
                                                        </CardContent>
                                                    </CardActionArea>
                                                </Card>
                                            </Paper>
                                        </Grid>
                                    )}
                                </Grid>
                            </div>
                        </>
                    )}
                </div>
                {!loading && (
                    <div className='pagination'>
                        <GameModesPaginate
                            page={current_page}
                            count={last_page}
                        />
                    </div>
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

export default HomeScreen
