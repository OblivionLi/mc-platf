import React from 'react'
import { Paper, Divider, Link } from '@material-ui/core'
import { FaDiscord, FaTwitter, FaFacebook, FaSteam, FaYoutube } from 'react-icons/fa'
import { withStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    header: {
        background: 'rgba(0, 0, 0, 0.9)' /* fallback for old browsers */,
        background:
            '-webkit-linear-gradient(to right, rgba(15, 155, 15, 0.4), rgba(0, 0, 0, 0.8))',
        background:
            'linear-gradient(to right, rgba(15, 155, 15, 0.4), rgba(0, 0, 0, 0.8))',
        marginTop: '3.5rem',
        padding: '5.5rem 0'
    },
}))

const Header = () => {
    const classes = useStyles()
    return (
        <Paper elevation={3} className={classes.header}>
            <div className='header__info'>
                <h2 className='header__info--title'>
                    Welcome to the Overworld, we've been expecting you
                </h2>
                <div className='header__info--title-div'>
                    <Divider />
                </div>
                <h4 className='header__info--server'>play.mcfree.ro</h4>
                <div className='header__info--title-div2'>
                    <Divider />
                </div>
                <h5 className='header__info--ip'>188.212.102.91:25565</h5>
            </div>

            <div className='header__content'>
                <div className='header__content--divider'>
                    <span className='header__content--divider-text'>
                        Connect with us on
                    </span>
                </div>

                <div className='header__content--media'>
                    <Link href='https://discord.gg/GPxBw258Dr' className='header__content--media-link'>
                        <FaDiscord className='header__content--media-logo' />
                    </Link>

                    <Link href='https://www.youtube.com/channel/UC3Chbfd5vUDD6AfeYQSeyBw' className='header__content--media-link'>
                        <FaYoutube className='header__content--media-logo' />
                    </Link>

                    {/*
                    <Link href='#' className='header__content--media-link'>
                        <FaFacebook className='header__content--media-logo' />
                    </Link>

                    <Link href='#' className='header__content--media-link'>
                        <FaSteam className='header__content--media-logo' />
                    </Link> */}
                </div>
            </div>
        </Paper>
    )
}

export default Header
