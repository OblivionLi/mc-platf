import React from "react";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    item: {
        fontFamily: 'Courier'
    }
}))

const GameModesPaginate = ({ page, count }) => {
    const classes = useStyles()
    return (
        <Pagination
            color="primary"
            page={page}
            count={count}
            renderItem={(item) => (
                <PaginationItem
                    className={classes.item}
                    component={Link}
                    to={`/page${item.page === 1 ? "" : `/${item.page}`}`}
                    {...item}
                />
            )}
        />
    );
};

export default GameModesPaginate;
