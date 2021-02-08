import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Link, Button } from '@material-ui/core'
import Moment from 'react-moment'
import Swal from 'sweetalert2'
import { listUsers } from '../../actions/userActions'
import Loader from '../../components/public/loader/Loader'
import { Line, Bar } from 'react-chartjs-2'
import { withStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    dashboard: {
        background: 'rgba(0, 0, 0, 0.9)' /* fallback for old browsers */,
        background:
            '-webkit-linear-gradient(to right, rgba(15, 155, 15, 0.4), rgba(0, 0, 0, 0.8))',
        background:
            'linear-gradient(to right, rgba(15, 155, 15, 0.4), rgba(0, 0, 0, 0.8))',
        marginTop: '3.5rem',
        padding: '5.5rem 0',
        color: '#F3F3F3',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
}))

const DashboardScreen = ({ history }) => {
    const dispatch = useDispatch()
    const classes = useStyles()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if (!userInfo || userInfo === null || userInfo.role[0].is_admin < 1) {
            history.push('/login')
        } else {
            setIsAdmin(true)
            dispatch(listUsers())
        }
    }, [dispatch, history, userInfo])

    return (
        <Paper elevation={3} className={classes.dashboard}>
            {!isAdmin ? <Loader /> : <>
                <h1>Welcome to the Admin Panel</h1>
                <p>One rule: Be careful what you add/edit/delete.</p>
            </>}
        </Paper>
    )
}

export default DashboardScreen
