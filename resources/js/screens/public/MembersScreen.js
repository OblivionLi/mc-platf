import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Container,
    Paper,
    Breadcrumbs,
    Typography,
    Divider
} from '@material-ui/core'
import Navigation from '../../components/public/Navigation'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import Loader from '../../components/public/loader/Loader'
import Message from '../../components/public/alert/Message'
import { listTags } from '../../actions/tagActions'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Footer from '../../components/public/footer/Footer'

const useStyles = makeStyles(theme => ({
    member: {
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
    },

    content2: {
        background: '#283747',
        color: '#F3F3F3',
        marginTop: '1.5rem'
    }
}))

const MembersScreen = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const tagList = useSelector(state => state.tagList)
    const { loading, error, tags } = tagList

    useEffect(() => {
        dispatch(listTags())
    }, [dispatch])

    return (
        <Container>
            <Navigation />

            <Paper elevation={3} className={classes.member}>
                <div className='member__info'>
                    <div className='bc'>
                        <Breadcrumbs aria-label='breadcrumb'>
                            <Link className='bc-l' to='/'>
                                Home
                            </Link>

                            <Typography className='bc-c'>Members</Typography>
                        </Breadcrumbs>
                    </div>
                </div>

                <div className='member__header'>
                    <h3 className='member__header--title'>
                        Server Members and Staff
                    </h3>
                </div>

                <div className='divider'>
                    <Divider className={classes.divider} />
                </div>

                <div className='member__content'>
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant='error'>{error}</Message>
                    ) : (
                        <>
                            <Paper className={classes.content}>
                                <div className='member__content--wrapper'>
                                    <h4>Staff</h4>

                                    <Divider className={classes.divider} />
                                    <div className='member__content--players'>
                                        {tags.data &&
                                            tags.data.map(tag => {
                                                if (
                                                    tag.name === 'Fondator' ||
                                                    tag.name === 'Moderator' ||
                                                    tag.name === 'Admin' ||
                                                    tag.name ===
                                                        'SuperModerator' ||
                                                    tag.name ===
                                                        'SupremeGuard' ||
                                                    tag.name === 'Guardian' ||
                                                    tag.name === 'Helper' ||
                                                    tag.name === 'VIP' ||
                                                    tag.name === 'Loyal'
                                                ) {
                                                    return tag.users.map(
                                                        user => (
                                                            <p
                                                                key={user.id}
                                                                className={
                                                                    tag.name ===
                                                                    'Fondator'
                                                                        ? 'fondator'
                                                                        : ''
                                                                }
                                                            >
                                                                {user.name}
                                                            </p>
                                                        )
                                                    )
                                                }
                                            })}
                                    </div>
                                </div>
                            </Paper>

                            <Paper className={classes.content2}>
                                <div className='member__content--wrapper'>
                                    <h4>
                                        Players:{' '}
                                        {tags.data &&
                                            tags.data.map(player => {
                                                if (player.name === 'Player') {
                                                    return player.users.length
                                                }
                                            })}
                                    </h4>
                                    <Divider className={classes.divider} />
                                    <div className='member__content--players'>
                                        {tags.data &&
                                            tags.data.map(
                                                tag =>
                                                    tag.name === 'Player' &&
                                                    tag.users.map(user => (
                                                        <h5 key={user.id}>
                                                            {user.name}
                                                        </h5>
                                                    ))
                                            )}
                                    </div>
                                </div>
                            </Paper>
                        </>
                    )}
                </div>
            </Paper>

            <Footer />
        </Container>
    )
}

export default MembersScreen
