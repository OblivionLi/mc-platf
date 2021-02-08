import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Container,
    Paper,
    Card,
    CardActionArea,
    CardContent,
    CardActions,
    Typography,
    Breadcrumbs,
    Button,
    Divider
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import Navigation from '../../../components/public/Navigation'
import { listRanks } from '../../../actions/rankActions'
import Loader from '../../../components/public/loader/Loader'
import Message from '../../../components/public/alert/Message'
import { withStyles, makeStyles } from '@material-ui/core/styles'
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

    cards: {
        background: '#283747',
        padding: '2rem',
        color: '#F3F3F3'
    },

    title: {
        fontFamily: 'Courier'
    },

    links: {
        fontFamily: 'Courier',
        color: '#F3F3F3',

        '&:hover': {
            color: '#F3F3F3'
        }
    },

    d: {
        fontFamily: 'Courier',
        color: '#DE354C'
    }
}))

const ShopScreen = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const rankList = useSelector(state => state.rankList)
    const { loading, error, ranks } = rankList

    useEffect(() => {
        dispatch(listRanks())
    }, [dispatch])

    return (
        <Container>
            <Navigation />

            <Paper elevation={3} className={classes.shop}>
                <div className='shop__info'>
                    <div className='bc'>
                        <Breadcrumbs aria-label='breadcrumb'>
                            <Link className='bc-l' to='/'>
                                Home
                            </Link>

                            <Typography className='bc-c'>Shop</Typography>
                        </Breadcrumbs>
                    </div>
                </div>

                <div className='shop__content'>
                    <div className='shop__content--title'>
                        <h3>Vips</h3>
                        <Divider className={classes.divider} />
                    </div>
                    <div className='shop__content--vip'>
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <Message variant='error'>{error}</Message>
                        ) : (
                            <>
                                {ranks.data &&
                                    ranks.data.map(rank => {
                                        {
                                            return (
                                                rank.type === 'vip' && (
                                                    <Card
                                                        key={rank.id}
                                                        className={
                                                            classes.cards
                                                        }
                                                    >
                                                        <CardActionArea>
                                                            <CardContent>
                                                                <Typography
                                                                    gutterBottom
                                                                    variant='h5'
                                                                    component='h5'
                                                                    className={
                                                                        classes.title
                                                                    }
                                                                >
                                                                    {rank.name}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            <Button
                                                                size='small'
                                                                color='primary'
                                                            >
                                                                <Link
                                                                    to={`/shop/${rank.id}`}
                                                                    className={
                                                                        classes.links
                                                                    }
                                                                >
                                                                    See benefits
                                                                </Link>
                                                            </Button>

                                                            <span
                                                                className={
                                                                    classes.d
                                                                }
                                                            >
                                                                &euro;
                                                                {rank.price}
                                                            </span>
                                                        </CardActions>
                                                    </Card>
                                                )
                                            )
                                        }
                                    })}
                            </>
                        )}
                    </div>

                    <div className='shop__content--title'>
                        <h3>Admins</h3>
                        <Divider className={classes.divider} />
                    </div>
                    <div className='shop__content--admin'>
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <Message variant='error'>{error}</Message>
                        ) : (
                            <>
                                {ranks.data &&
                                    ranks.data.map(rank => {
                                        {
                                            return (
                                                rank.type === 'admin' && (
                                                    <Card
                                                        key={rank.id}
                                                        className={
                                                            classes.cards
                                                        }
                                                    >
                                                        <CardActionArea>
                                                            <CardContent>
                                                                <Typography
                                                                    gutterBottom
                                                                    variant='h5'
                                                                    component='h5'
                                                                    className={
                                                                        classes.title
                                                                    }
                                                                >
                                                                    {rank.name}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            <Button
                                                                size='small'
                                                                color='primary'
                                                            >
                                                                <Link
                                                                    to={`/shop/${rank.id}`}
                                                                    className={
                                                                        classes.links
                                                                    }
                                                                >
                                                                    See benefits
                                                                </Link>
                                                            </Button>

                                                            <span
                                                                className={
                                                                    classes.d
                                                                }
                                                            >
                                                                &euro;
                                                                {rank.price}
                                                            </span>
                                                        </CardActions>
                                                    </Card>
                                                )
                                            )
                                        }
                                    })}
                            </>
                        )}
                    </div>
                </div>
            </Paper>

            <Footer />
        </Container>
    )
}

export default ShopScreen
