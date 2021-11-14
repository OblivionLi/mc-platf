import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import {
    Drawer,
    AppBar,
    Toolbar,
    List,
    CssBaseline,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    useTheme,
    Button,
    Collapse,
    Menu,
    MenuItem
} from '@material-ui/core'

import DashboardIcon from '@material-ui/icons/Dashboard'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Loader from '../../components/public/loader/Loader'
import AnnouncementIcon from '@material-ui/icons/Announcement'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import DashboardScreen from '../admin/DashboardScreen'
import UpdatesScreen from '../admin/updates/UpdatesScreen'
import BarChartIcon from '@material-ui/icons/BarChart'
import BugReportIcon from '@material-ui/icons/BugReport'
import RecentActorsIcon from '@material-ui/icons/RecentActors'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ReportBugScreen from '../admin/reports/ReportBugScreen'
import ReportPlayerScreen from './reports/ReportPlayerScreen'
import { logout } from '../../actions/userActions'
import GameModesScreen from './gamemodes/GameModesScreen'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import UsersScreen from './users/UsersScreen'
import RolesScreen from './users/RolesScreen'
import PermissionsScreen from './users/PermissionsScreen'
import PeopleIcon from '@material-ui/icons/People'
import ListAltIcon from '@material-ui/icons/ListAlt'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import TagsScreen from './users/TagsScreen'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import ShowCasesScreen from './showcases/ShowCasesScreen'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'
import RanksScreen from './ranks/RanksScreen'
import StoreIcon from '@material-ui/icons/Store'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import LinkIcon from '@material-ui/icons/Link';
import OrderScreen from './shop/OrderScreen'
import MediaScreen from './media/MediaScreen'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: 36
    },
    hide: {
        display: 'none'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap'
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1
        }
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}))

const AdminScreen = ({ history }) => {
    const classes = useStyles()
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [open3, setOpen3] = useState(false)

    const [anchorEl2, setAnchorEl2] = useState(null)

    const dispatch = useDispatch()

    const handleClose = () => {
        setAnchorEl2(null)
    }

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [isAdmin, setIsAdmin] = useState(false)

    function handleClick () {
        setOpen2(!open2)
    }

    function handleClick2 () {
        setOpen3(!open3)
    }

    useEffect(() => {
        if (!userInfo || userInfo === null || userInfo.role[0].is_admin < 1) {
            history.push('/login')
        } else {
            setIsAdmin(true)
        }
    }, [dispatch])

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const logoutHandler = () => {
        dispatch(logout())
        history.push('/login')
    }

    return (
        <div className={classes.root}>
            {!isAdmin ? (
                <Loader />
            ) : (
                <>
                    <Router>
                        <CssBaseline />
                        <AppBar
                            position='fixed'
                            className={clsx(classes.appBar, {
                                [classes.appBarShift]: open
                            })}
                        >
                            <Toolbar className='toolbar-nav'>
                                <div className='toolbar-nav--left'>
                                    <IconButton
                                        color='inherit'
                                        aria-label='open drawer'
                                        onClick={handleDrawerOpen}
                                        edge='start'
                                        className={clsx(classes.menuButton, {
                                            [classes.hide]: open
                                        })}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Typography variant='h6' noWrap>
                                        Administration Area
                                    </Typography>
                                </div>

                                <div className='toolbar-nav--right'>
                                    <ul className='toolbar-nav--right--links'>
                                        <li className='toolbar-nav--right--item'>
                                            <Button
                                                variant='contained'
                                                href='/'
                                                className='toolbar-nav--right-btn'
                                            >
                                                Home
                                            </Button>
                                        </li>

                                        <li className='toolbar-nav--right--item'>
                                            <Button
                                                variant='contained'
                                                aria-controls='auth-menu'
                                                aria-haspopup='true'
                                                onClick={e =>
                                                    setAnchorEl2(
                                                        e.currentTarget
                                                    )
                                                }
                                                className='toolbar-nav--right-btn'
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
                                                    <a href='/profile'>
                                                        Profile
                                                    </a>
                                                </MenuItem>

                                                <MenuItem onClick={handleClose}>
                                                    <Link
                                                        to='/'
                                                        onClick={logoutHandler}
                                                    >
                                                        Logout
                                                    </Link>
                                                </MenuItem>
                                            </Menu>
                                        </li>
                                    </ul>
                                </div>
                            </Toolbar>
                        </AppBar>
                        <Drawer
                            variant='permanent'
                            className={clsx(classes.drawer, {
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open
                            })}
                            classes={{
                                paper: clsx({
                                    [classes.drawerOpen]: open,
                                    [classes.drawerClose]: !open
                                })
                            }}
                        >
                            <div className={classes.toolbar}>
                                <IconButton onClick={handleDrawerClose}>
                                    {theme.direction === 'rtl' ? (
                                        <ChevronRightIcon />
                                    ) : (
                                        <ChevronLeftIcon />
                                    )}
                                </IconButton>
                            </div>
                            <Divider />
                            <List>
                                <ListItem button>
                                    <ListItemIcon>
                                        <DashboardIcon />
                                    </ListItemIcon>
                                    <Link to='/admin' className='admin--links'>
                                        Dashboard
                                    </Link>
                                </ListItem>

                                <ListItem button>
                                    <ListItemIcon>
                                        <AnnouncementIcon />
                                    </ListItemIcon>
                                    <Link
                                        to='/admin/updates'
                                        className='admin--links'
                                    >
                                        Updates
                                    </Link>
                                </ListItem>

                                <ListItem button onClick={handleClick}>
                                    <ListItemIcon>
                                        <BarChartIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary='Reports'
                                        className='admin--links-drop'
                                    />
                                    {open2 ? (
                                        <ExpandLessIcon />
                                    ) : (
                                        <ExpandMoreIcon />
                                    )}
                                </ListItem>
                                <Collapse
                                    in={open2}
                                    timeout='auto'
                                    unmountOnExit
                                    className='reportsMenu'
                                >
                                    <Divider />
                                    <List>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <BugReportIcon />
                                            </ListItemIcon>
                                            <Link
                                                to='/admin/report-bugs'
                                                className='admin--links'
                                            >
                                                Bugs
                                            </Link>
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <RecentActorsIcon />
                                            </ListItemIcon>
                                            <Link
                                                to='/admin/report-players'
                                                className='admin--links'
                                            >
                                                Players
                                            </Link>
                                        </ListItem>
                                    </List>
                                </Collapse>

                                <ListItem button>
                                    <ListItemIcon>
                                        <AccountTreeIcon />
                                    </ListItemIcon>
                                    <Link
                                        to='/admin/gamemodes'
                                        className='admin--links'
                                    >
                                        Game Modes
                                    </Link>
                                </ListItem>

                                <ListItem button>
                                    <ListItemIcon>
                                        <VideoLibraryIcon />
                                    </ListItemIcon>
                                    <Link
                                        to='/admin/showcases'
                                        className='admin--links'
                                    >
                                        Show Cases
                                    </Link>
                                </ListItem>

                                <ListItem button onClick={handleClick2}>
                                    <ListItemIcon>
                                        <ListAltIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary='Members'
                                        className='admin--links-drop'
                                    />
                                    {open3 ? (
                                        <ExpandLessIcon />
                                    ) : (
                                        <ExpandMoreIcon />
                                    )}
                                </ListItem>
                                <Collapse
                                    in={open3}
                                    timeout='auto'
                                    unmountOnExit
                                    className='reportsMenu'
                                >
                                    <Divider />
                                    <List>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <PeopleIcon />
                                            </ListItemIcon>
                                            <Link
                                                to='/admin/users'
                                                className='admin--links'
                                            >
                                                Users
                                            </Link>
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <SupervisorAccountIcon />
                                            </ListItemIcon>
                                            <Link
                                                to='/admin/roles'
                                                className='admin--links'
                                            >
                                                Roles
                                            </Link>
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <RemoveCircleIcon />
                                            </ListItemIcon>
                                            <Link
                                                to='/admin/permissions'
                                                className='admin--links'
                                            >
                                                Permissions
                                            </Link>
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <LocalOfferIcon />
                                            </ListItemIcon>
                                            <Link
                                                to='/admin/tags'
                                                className='admin--links'
                                            >
                                                Tags
                                            </Link>
                                        </ListItem>
                                    </List>
                                </Collapse>
                            </List>

                            <Divider />
                            <List>
                                <ListItem button>
                                    <ListItemIcon>
                                        <StoreIcon />
                                    </ListItemIcon>
                                    <Link
                                        to='/admin/ranks'
                                        className='admin--links'
                                    >
                                        Ranks
                                    </Link>
                                </ListItem>

                                <ListItem button>
                                    <ListItemIcon>
                                        <ShoppingBasketIcon />
                                    </ListItemIcon>
                                    <Link
                                        to='/admin/orders'
                                        className='admin--links'
                                    >
                                        Orders
                                    </Link>
                                </ListItem>
                            </List>
                            <Divider />
                            <List>
                                <ListItem button>
                                    <ListItemIcon>
                                        <LinkIcon />
                                    </ListItemIcon>
                                    <Link
                                        to='/admin/medias'
                                        className='admin--links'
                                    >
                                        Media Links
                                    </Link>
                                </ListItem>
                            </List>
                        </Drawer>
                        <main className={classes.content}>
                            <div className={classes.toolbar} />

                            <Switch>
                                <Route
                                    path='/admin'
                                    component={DashboardScreen}
                                    exact
                                />

                                <Route
                                    path='/admin/updates'
                                    component={UpdatesScreen}
                                />

                                <Route
                                    path='/admin/report-bugs'
                                    component={ReportBugScreen}
                                />

                                <Route
                                    path='/admin/report-players'
                                    component={ReportPlayerScreen}
                                />

                                <Route
                                    path='/admin/gamemodes'
                                    component={GameModesScreen}
                                />

                                <Route
                                    path='/admin/users'
                                    component={UsersScreen}
                                />

                                <Route
                                    path='/admin/roles'
                                    component={RolesScreen}
                                />

                                <Route
                                    path='/admin/permissions'
                                    component={PermissionsScreen}
                                />

                                <Route
                                    path='/admin/tags'
                                    component={TagsScreen}
                                />

                                <Route
                                    path='/admin/showcases'
                                    component={ShowCasesScreen}
                                />

                                <Route
                                    path='/admin/ranks'
                                    component={RanksScreen}
                                />

                                <Route
                                    path='/admin/orders'
                                    component={OrderScreen}
                                />

                                <Route
                                    path='/admin/medias'
                                    component={MediaScreen}
                                />

                            </Switch>
                        </main>
                    </Router>
                </>
            )}
        </div>
    )
}

export default AdminScreen
