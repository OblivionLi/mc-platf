import Axios from "axios";
import {
    ADMIN_SHOWCASE_LIST_FAIL,
    ADMIN_SHOWCASE_LIST_REQUEST,
    ADMIN_SHOWCASE_LIST_SUCCESS,
    SHOWCASE_CREATE_FAIL,
    SHOWCASE_CREATE_REQUEST,
    SHOWCASE_CREATE_SUCCESS,
    SHOWCASE_DELETE_FAIL,
    SHOWCASE_DELETE_REQUEST,
    SHOWCASE_DELETE_SUCCESS,
    SHOWCASE_EDIT_FAIL,
    SHOWCASE_EDIT_REQUEST,
    SHOWCASE_EDIT_SUCCESS,
    SHOWCASE_GET_DETAILS_FAIL,
    SHOWCASE_GET_DETAILS_REQUEST,
    SHOWCASE_GET_DETAILS_SUCCESS,
    SHOWCASE_LIST_FAIL,
    SHOWCASE_LIST_REQUEST,
    SHOWCASE_LIST_SUCCESS,
} from "../constants/showCaseConstants";

export const listShowCase = (page = "") => async (dispatch, getState) => {
    try {
        dispatch({ type: SHOWCASE_LIST_REQUEST });

        const { data } = await Axios.get(`/api/auth/showcases?page=${page}`);

        dispatch({ type: SHOWCASE_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SHOWCASE_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const adminListShowCases = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_SHOWCASE_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/auth/admin/showcases`, config);

        dispatch({ type: ADMIN_SHOWCASE_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ADMIN_SHOWCASE_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getEditShowCaseDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: SHOWCASE_GET_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "aplication/json",
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/auth/showcases/${id}`, config);

        dispatch({ type: SHOWCASE_GET_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SHOWCASE_GET_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const editShowCase = (id, name, video_url) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({ type: SHOWCASE_EDIT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.patch(
            `/api/auth/showcases/${id}`,
            { name, video_url },
            config
        );

        dispatch({ type: SHOWCASE_EDIT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SHOWCASE_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createShowCase = (name, video_url) => async (dispatch, getState) => {
    try {
        dispatch({ type: SHOWCASE_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.post(
            "/api/auth/showcases",
            {name, video_url},
            config
        );

        dispatch({ type: SHOWCASE_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SHOWCASE_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteShowCase = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: SHOWCASE_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.delete(
            `/api/auth/showcases/${id}`,
            config
        );

        dispatch({ type: SHOWCASE_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SHOWCASE_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
