import Axios from "axios";
import {
    REPORTPLAYER_CREATE_FAIL,
    REPORTPLAYER_CREATE_REQUEST,
    REPORTPLAYER_CREATE_SUCCESS,
    REPORTPLAYER_DELETE_FAIL,
    REPORTPLAYER_DELETE_REQUEST,
    REPORTPLAYER_DELETE_SUCCESS,
    REPORTPLAYER_EDIT_FAIL,
    REPORTPLAYER_EDIT_REQUEST,
    REPORTPLAYER_EDIT_SUCCESS,
    REPORTPLAYER_GET_DETAILS_FAIL,
    REPORTPLAYER_GET_DETAILS_REQUEST,
    REPORTPLAYER_GET_DETAILS_SUCCESS,
    REPORTPLAYER_LIST_FAIL,
    REPORTPLAYER_LIST_REQUEST,
    REPORTPLAYER_LIST_SUCCESS,
} from "../constants/reportPlayerConstants";

export const listReportPlayers = () => async (
    dispatch,
    getState
) => {
    try {
        dispatch({ type: REPORTPLAYER_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(
            `/api/auth/report-players`,
            config
        );

        dispatch({ type: REPORTPLAYER_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: REPORTPLAYER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getEditReportPlayerDetails = id => async (dispatch, getState) => {
    try {
        dispatch({ type: REPORTPLAYER_GET_DETAILS_REQUEST });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                "Content-Type": "aplication/json",
                Authorization: `Bearer ${userInfo.access_token}`
            }
        };

        const { data } = await Axios.get(`/api/auth/report-players/${id}`, config);

        dispatch({ type: REPORTPLAYER_GET_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: REPORTPLAYER_GET_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const editReportPlayer = (id, status) => async (dispatch, getState) => {
    try {
        dispatch({ type: REPORTPLAYER_EDIT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.patch(
            `/api/auth/report-players/${id}`,
            { status },
            config
        );

        dispatch({ type: REPORTPLAYER_EDIT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: REPORTPLAYER_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createReportPlayer = (formData) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({ type: REPORTPLAYER_CREATE_REQUEST });

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
            "/api/auth/report-players",
            formData,
            config
        );

        dispatch({ type: REPORTPLAYER_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: REPORTPLAYER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteReportPlayer = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: REPORTPLAYER_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.delete(`/api/auth/report-players/${id}`, config);

        dispatch({ type: REPORTPLAYER_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: REPORTPLAYER_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
