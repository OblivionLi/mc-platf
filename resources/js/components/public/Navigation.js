import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Button,
    Menu,
    MenuItem,
    Badge,
    IconButton,
    Divider,
    Paper
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/userActions'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { withStyles, makeStyles } from '@material-ui/core/styles'

const StyledBadge = withStyles(theme => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px'
    }
}))(Badge)

const useStyles = makeStyles(theme => ({
    items: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

    item: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        fontFamily: 'Courier'
    },

    navigation: {
        background: 'rgba(0, 0, 0, 0.9)' /* fallback for old browsers */,
        background:
            '-webkit-linear-gradient(to right, rgba(15, 155, 15, 0.4), rgba(0, 0, 0, 0.8))',
        background:
            'linear-gradient(to right, rgba(15, 155, 15, 0.4), rgba(0, 0, 0, 0.8))'
    },

    btn: {
        color: '#F3F3F3'
    },

    links: {
        color: '#3C1874',
        fontFamily: 'Courier',
        '&:hover': {
            color: '#F3F3F3',
            background: 'rgba(40, 55, 71, 0.5)'
        },
        padding: '.5rem 1rem',
        width: '100%'
    },

    menuBtn: {
        fontFamily: 'Courier'
    }
}))

const Navigation = () => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [anchorEl1, setAnchorEl1] = React.useState(null)
    const [anchorEl2, setAnchorEl2] = React.useState(null)

    const handleClose = () => {
        setAnchorEl(null)
        setAnchorEl1(null)
        setAnchorEl2(null)
    }

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <Paper className={classes.navigation}>
            <nav className='navigation__nav'>
                <ul className='navigation__nav--links'>
                    <li className='navigation__nav--item'>
                        <Link to='/' className='navigation__nav--link'>
                            Home
                        </Link>
                    </li>

                    <li className='navigation__nav--item'>
                        <Link to='/shop' className='navigation__nav--link'>
                            Shop
                        </Link>
                    </li>

                    <li className='navigation__nav--item'>
                        <IconButton
                            aria-label='cart'
                            onClick={e => setAnchorEl(e.currentTarget)}
                            className={classes.btn}
                        >
                            <StyledBadge badgeContent={cart.cartItems.length}>
                                <ShoppingCartIcon />
                            </StyledBadge>
                        </IconButton>
                        {/* </Button> */}
                        <Menu
                            id='cart-menu'
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            className={classes.items}
                        >
                            {cart.cartItems.map((item, index) => (
                                <MenuItem onClick={handleClose} key={index}>
                                    <p className={classes.item}>
                                        {item.name} - &euro;{item.price}
                                    </p>
                                    <Divider />
                                </MenuItem>
                            ))}

                            <MenuItem onClick={handleClose}>
                                <Link className={classes.links} to='/cart'>
                                    Go to Cart
                                </Link>
                            </MenuItem>
                        </Menu>
                    </li>
                </ul>

                <div>
                    <img
                        className='navigation__nav--brand'
                        src='/images/navbar-brand.png'
                        onMouseOver={e =>
                            (e.currentTarget.src = '/images/navbar-brand2.png')
                        }
                        onMouseLeave={e =>
                            (e.currentTarget.src = '/images/navbar-brand.png')
                        }
                    />
                </div>

                <ul className='navigation__nav--links'>
                    <li className='navigation__nav--item'>
                        <Button
                            variant='contained'
                            aria-controls='server-menu'
                            aria-haspopup='true'
                            onClick={e => setAnchorEl1(e.currentTarget)}
                            className={classes.menuBtn}
                        >
                            Server
                        </Button>
                        <Menu
                            id='server-menu'
                            anchorEl={anchorEl1}
                            keepMounted
                            open={Boolean(anchorEl1)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>
                                <Link className={classes.links} to='/updates'>
                                    Updates
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Link className={classes.links} to='/showcases'>
                                    Showcases
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Link className={classes.links} to='/members'>
                                    Members
                                </Link>
                            </MenuItem>
                        </Menu>
                    </li>

                    {userInfo ? (
                        <li className='navigation__nav--item'>
                            <Button
                                variant='contained'
                                aria-controls='auth-menu'
                                aria-haspopup='true'
                                onClick={e => setAnchorEl2(e.currentTarget)}
                                className={classes.menuBtn}
                            >
                                {userInfo.name}
                            </Button>
                            <Menu
                                id='auth-menu'
                                anchorEl={anchorEl2}
                                keepMounted
                                open={Boolean(anchorEl2)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Link
                                        className={classes.links}
                                        to='/profile'
                                    >
                                        Profile
                                    </Link>
                                </MenuItem>
                                {userInfo.role[0].is_admin > 0 ? (
                                    <MenuItem onClick={handleClose}>
                                        <Link
                                            className={classes.links}
                                            to='/admin'
                                        >
                                            Admin Area
                                        </Link>
                                    </MenuItem>
                                ) : (
                                    ''
                                )}
                                <MenuItem onClick={handleClose}>
                                    <Link
                                        className={classes.links}
                                        to='/'
                                        onClick={logoutHandler}
                                    >
                                        Logout
                                    </Link>
                                </MenuItem>
                            </Menu>
                        </li>
                    ) : (
                        <li className='navigation__nav--item'>
                            <Link to='/login'>
                                <Button
                                    variant='contained'
                                    aria-haspopup='true'
                                    className={classes.menuBtn}
                                >
                                    Sign In
                                </Button>
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </Paper>
    )
}

export default Navigation
