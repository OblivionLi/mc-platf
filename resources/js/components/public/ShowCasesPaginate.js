import React from "react";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

const ShowCasesPaginate = ({ page, count }) => {
    return (
        <Pagination
            page={page}
            count={count}
            renderItem={(item) => (
                <PaginationItem
                    component={Link}
                    to={`/showcases${item.page === 1 ? "" : `/${item.page}`}`}
                    {...item}
                />
            )}
        />
    );
};

export default ShowCasesPaginate;
