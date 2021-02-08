import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Container,
    Paper,
    Typography,
    Breadcrumbs,
    Button,
    Divider,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Navigation from "../../../components/public/Navigation";
import Loader from "../../../components/public/loader/Loader";
import Message from "../../../components/public/alert/Message";
import { listRankDetails } from "../../../actions/rankActions";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
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

    btn: {
        marginTop: '1rem',
        fontFamily: 'Courier'
    },

    check: {
        color: 'rgb(53, 222, 76)'
    },

    clear: {
        color: '#DE354C'
    },

    benefits: {
        width: '50%',
        margin: '0 auto',
        padding: '1.5rem 0',
        background: '#283747',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'wrap',
        color: '#F3F3F3',

        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    }
}))

const ShowShopScreen = ({ history, match }) => {
    const classes = useStyles()
    const dispatch = useDispatch();

    const rankDetails = useSelector((state) => state.rankDetails);
    const { loading, error, rank } = rankDetails;

    useEffect(() => {
        dispatch(listRankDetails(match.params.id));
    }, [dispatch]);

    const addToCartHandler = e => {
        history.push(`/cart/${match.params.id}`)
    }

    return (
        <Container>
            <Navigation />

            <Paper elevation={3} className={classes.shop}>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="error">{error}</Message>
                ) : (
                    <>
                        <div className="shop__info">
                            <div className="bc">
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link className="bc-l" to="/">
                                        Home
                                    </Link>

                                    <Link className="bc-l" to="/shop">
                                        Shop
                                    </Link>
                                    <Typography className="bc-c">
                                        {rank.name}
                                    </Typography>
                                </Breadcrumbs>
                            </div>
                        </div>

                        <div className="shop__content">
                            <div className="shop__content--cart">
                                <h3>{rank.name}</h3>
                                <h6>&euro;{rank.price}</h6>
                                <Button
                                    variant="contained"
                                    onClick={addToCartHandler}
                                    className={classes.btn}
                                >
                                    Add To Cart
                                </Button>
                            </div>

                            <div className="shop__content--title">
                                <h4>Benefits</h4>
                                <Divider className={classes.divider} />
                            </div>

                            <Paper className={classes.benefits}>
                                <div className="shop__content--benefits-item">
                                    <p>Kit Command: {rank.kit}</p>
                                </div>
                                <div className="shop__content--benefits-item">
                                    <p>
                                        Protection Blocks:{" "}
                                        {rank.protection_blocks}
                                    </p>
                                </div>
                                <div className="shop__content--benefits-item">
                                    <p>Ingame Money: {rank.money}</p>
                                </div>
                                <div className="shop__content--benefits-item">
                                    <p>
                                        Full Access:{" "}
                                        {rank.full_access === 1 ? (
                                            <CheckIcon className={classes.check} />
                                        ) : (
                                            <ClearIcon className={classes.clear} />
                                        )}
                                    </p>
                                </div>
                                <div className="shop__content--benefits-item">
                                    <p>
                                        Edit Server Config:{" "}
                                        {rank.server_config === 1 ? (
                                            <CheckIcon className={classes.check} />
                                        ) : (
                                            <ClearIcon className={classes.clear} />
                                        )}
                                    </p>
                                </div>
                                <div className="shop__content--benefits-item">
                                    <p>
                                        Bypass Uri:{" "}
                                        {rank.bypass_uri === 1 ? (
                                            <CheckIcon className={classes.check} />
                                        ) : (
                                            <ClearIcon className={classes.clear} />
                                        )}
                                    </p>
                                </div>
                                <div className="shop__content--benefits-item">
                                    <p>
                                        Essentials:{" "}
                                        {rank.essentials === 1 ? (
                                            <CheckIcon className={classes.check} />
                                        ) : (
                                            <ClearIcon className={classes.clear} />
                                        )}
                                    </p>
                                </div>
                                <div className="shop__content--benefits-item">
                                    <p>
                                        Mute Command:{" "}
                                        {rank.mute === 1 ? (
                                            <CheckIcon className={classes.check} />
                                        ) : (
                                            <ClearIcon className={classes.clear} />
                                        )}
                                    </p>
                                </div>
                                <div className="shop__content--benefits-item">
                                    <p>
                                        Kick Command:{" "}
                                        {rank.kick === 1 ? (
                                            <CheckIcon className={classes.check} />
                                        ) : (
                                            <ClearIcon className={classes.clear} />
                                        )}
                                    </p>
                                </div>
                                <div className="shop__content--benefits-item">
                                    <p>
                                        Temp. Ban Command:{" "}
                                        {rank.temp_ban === 1 ? (
                                            <CheckIcon className={classes.check} />
                                        ) : (
                                            <ClearIcon className={classes.clear} />
                                        )}
                                    </p>
                                </div>
                                <div className="shop__content--benefits-item">
                                    <p>
                                        Fly Command:{" "}
                                        {rank.fly === 1 ? (
                                            <CheckIcon className={classes.check} />
                                        ) : (
                                            <ClearIcon className={classes.clear} />
                                        )}
                                    </p>
                                </div>
                                <div className="shop__content--benefits-item">
                                    <p>
                                        Clearchat Command:{" "}
                                        {rank.clear_chat === 1 ? (
                                            <CheckIcon className={classes.check} />
                                        ) : (
                                            <ClearIcon className={classes.clear} />
                                        )}
                                    </p>
                                </div>
                                <div className="shop__content--benefits-item">
                                    <p>
                                        Keep Inv on Death:{" "}
                                        {rank.keep_inv === 1 ? (
                                            <CheckIcon className={classes.check} />
                                        ) : (
                                            <ClearIcon className={classes.clear} />
                                        )}
                                    </p>
                                </div>
                                <div className="shop__content--benefits-item">
                                    <p>
                                        Keep Exp on Death:{" "}
                                        {rank.keep_exp === 1 ? (
                                            <CheckIcon className={classes.check} />
                                        ) : (
                                            <ClearIcon className={classes.clear} />
                                        )}
                                    </p>
                                </div>
                                <div className="shop__content--benefits-item">
                                    <p>
                                        Jail:{" "}
                                        {rank.jail === 1 ? (
                                            <CheckIcon className={classes.check} />
                                        ) : (
                                            <ClearIcon className={classes.clear} />
                                        )}
                                    </p>
                                </div>
                                <div className="shop__content--benefits-item">
                                    <p>
                                        Custom Nickname:{" "}
                                        {rank.nickname === 1 ? (
                                            <CheckIcon className={classes.check} />
                                        ) : (
                                            <ClearIcon className={classes.clear} />
                                        )}
                                    </p>
                                </div>
                                <div className="shop__content--benefits-item">
                                    <p>
                                        World Edit Access:{" "}
                                        {rank.world_edit === 1 ? (
                                            <CheckIcon className={classes.check} />
                                        ) : (
                                            <ClearIcon className={classes.clear} />
                                        )}
                                    </p>
                                </div>
                                <div className="shop__content--benefits-item">
                                    <p>
                                        Have Enderchest:{" "}
                                        {rank.enderchat === 1 ? (
                                            <CheckIcon className={classes.check} />
                                        ) : (
                                            <ClearIcon className={classes.clear} />
                                        )}
                                    </p>
                                </div>
                                <div className="shop__content--benefits-item">
                                    <p>
                                        Access to Gamemode Command:{" "}
                                        {rank.gamemode === 1 ? (
                                            <CheckIcon className={classes.check} />
                                        ) : (
                                            <ClearIcon className={classes.clear} />
                                        )}
                                    </p>
                                </div>
                                <div className="shop__content--benefits-item">
                                    <p>
                                        Custom Colored Nickname:{" "}
                                        {rank.color_nickname === 1 ? (
                                            <CheckIcon className={classes.check} />
                                        ) : (
                                            <ClearIcon className={classes.clear} />
                                        )}
                                    </p>
                                </div>
                                <div className="shop__content--benefits-item">
                                    <p>
                                        Teleport Command:{" "}
                                        {rank.tp === 1 ? (
                                            <CheckIcon className={classes.check} />
                                        ) : (
                                            <ClearIcon className={classes.clear} />
                                        )}
                                    </p>
                                </div>
                            </Paper>
                        </div>
                    </>
                )}
            </Paper>

            <Footer />
        </Container>
    );
};

export default ShowShopScreen;
