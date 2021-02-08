import Axios from "axios";
import {
    REPORTBUG_CREATE_FAIL,
    REPORTBUG_CREATE_REQUEST,
    REPORTBUG_CREATE_SUCCESS,
    REPORTBUG_DELETE_FAIL,
    REPORTBUG_DELETE_REQUEST,
    REPORTBUG_DELETE_SUCCESS,
    REPORTBUG_EDIT_FAIL,
    REPORTBUG_EDIT_REQUEST,
    REPORTBUG_EDIT_SUCCESS,
    REPORTBUG_GET_DETAILS_FAIL,
    REPORTBUG_GET_DETAILS_REQUEST,
    REPORTBUG_GET_DETAILS_SUCCESS,
    REPORTBUG_LIST_FAIL,
    REPORTBUG_LIST_REQUEST,
    REPORTBUG_LIST_SUCCESS,
} from "../constants/reportBugConstants";

export const listReportBugs = () => async (
    dispatch,
    getState
) => {
    try {
        dispatch({ type: REPORTBUG_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(
            `/api/auth/report-bugs`,
            config
        );

        dispatch({ type: REPORTBUG_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: REPORTBUG_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getEditReportBugDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: REPORTBUG_GET_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "aplication/json",
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/auth/report-bugs/${id}`, config);

        dispatch({ type: REPORTBUG_GET_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: REPORTBUG_GET_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const editReportBug = (id, status) => async (dispatch, getState) => {
    try {
        dispatch({ type: REPORTBUG_EDIT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.patch(
            `/api/auth/report-bugs/${id}`,
            { status },
            config
        );

        dispatch({ type: REPORTBUG_EDIT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: REPORTBUG_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createReportBug = (formData) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({ type: REPORTBUG_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.post(
            "/api/auth/report-bugs",
            formData,
            config
        );

        dispatch({ type: REPORTBUG_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: REPORTBUG_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const deleteReportBug = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: REPORTBUG_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.delete(`/api/auth/report-bugs/${id}`, config);

        dispatch({ type: REPORTBUG_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: REPORTBUG_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
