import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Container,
    Paper,
    Breadcrumbs,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Grid,
    Divider
} from "@material-ui/core";
import Navigation from "../../../components/public/Navigation";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Loader from "../../../components/public/loader/Loader";
import Message from "../../../components/public/alert/Message";
import { listUpdates } from "../../../actions/updateActions";
import Paginate from "../../../components/public/Paginate";
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Footer from "../../../components/public/footer/Footer";

const useStyles = makeStyles(theme => ({
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
    },

    btns: {
        width: '12rem',
        fontFamily: 'Courier',

        [theme.breakpoints.down('xs')]: {
            width: '100%',
        }
    },

    title: {
        fontFamily: 'Courier',
    },

    description: {
        fontFamily: 'Courier',
    },

    links: {
        fontFamily: 'Courier',
        color: '#DE354C',

        '&:hover': {
            color: '#283747'
        }
    },

    d: {
        fontFamily: 'Courier',
    }
}))

const UpdateScreen = ({ match }) => {
    const classes = useStyles()
    const page = match.params.page || 1;

    const dispatch = useDispatch();

    const updateList = useSelector((state) => state.updateList);
    const { loading, error, updates } = updateList;

    const { meta } = updates;

    let current_page = meta && meta.current_page;
    let last_page = meta && meta.last_page;

    useEffect(() => {
        dispatch(listUpdates(page));
    }, [dispatch, page]);

    return (
        <Container>
            <Navigation />

            <Paper elevation={3} className={classes.update}>
                <div className="update__info">
                    <div className="bc">
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link className="bc-l" to="/">
                                Home
                            </Link>

                            <Typography className="bc-c">Updates</Typography>
                        </Breadcrumbs>
                    </div>
                </div>

                <div className="update__content">
                    <div className="update__content__header">
                        <h3 className="update__header--title">
                            Updates
                        </h3>

                        <div className="update__content__header--btns">
                            <Link to="/report-bug">
                                <Button variant="contained" className={classes.btns}>
                                    Report Bug
                                </Button>
                            </Link>

                            <Link to="/report-player">
                                <Button variant="contained" className={classes.btns}>
                                    Report Player
                                </Button>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="divider">
                        <Divider className={classes.divider} />
                    </div>
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant="error">{error}</Message>
                    ) : (
                        <>
                            <div className="update__content--cards">
                                <Grid container spacing={3}>
                                    {updates.data &&
                                        updates.data.map((upd) => (
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                key={upd.id}
                                                className="header__content--card"
                                            >
                                                <Card>
                                                    <CardActionArea>
                                                        <CardMedia
                                                            title={upd.name}
                                                        >
                                                            <img
                                                                src={
                                                                    upd.image !=
                                                                    "no-image"
                                                                        ? `http://127.0.0.1:8000/storage/${upd.image}`
                                                                        : `http://127.0.0.1:8000/images/unknown.webp`
                                                                }
                                                                alt={upd.name}
                                                                className="header__content--cards-item_img"
                                                            />
                                                        </CardMedia>
                                                        <CardContent>
                                                            <Typography
                                                                gutterBottom
                                                                variant="h5"
                                                                component="h5"
                                                                className={classes.title}
                                                            >
                                                                {upd.name}
                                                            </Typography>
                                                            <Divider className={classes.divider} />
                                                            <Typography
                                                                variant="body2"
                                                                color="textSecondary"
                                                                component="p"
                                                                className={classes.title}
                                                            >
                                                                {
                                                                    upd.brief_description
                                                                }
                                                            </Typography>
                                                        </CardContent>
                                                    </CardActionArea>
                                                    <CardActions className="update__content--cards-acts">
                                                        <Button
                                                            size="small"
                                                            color="primary"
                                                        >
                                                            <Link
                                                                to={`/update/${upd.id}`}
                                                                className={
                                                                    classes.links
                                                                }
                                                            >
                                                                Learn More
                                                            </Link>
                                                        </Button>

                                                        <span
                                                            className={
                                                                classes.d
                                                            }
                                                        >
                                                            <Moment fromNow>
                                                                {upd.created_at}
                                                            </Moment>
                                                        </span>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        ))}
                                </Grid>
                            </div>
                        </>
                    )}
                </div>
                {updates.data && updates.data.length > 0 && !loading && (
                    <div className="pagination">
                        <Paginate page={current_page} count={last_page} />
                    </div>
                )}
            </Paper>

            <Footer />
        </Container>
    );
};

export default UpdateScreen;
