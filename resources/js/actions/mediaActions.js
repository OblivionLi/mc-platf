import Axios from "axios";
import {
    MEDIA_CREATE_FAIL,
    MEDIA_CREATE_REQUEST,
    MEDIA_CREATE_SUCCESS,
    MEDIA_DELETE_FAIL,
    MEDIA_DELETE_REQUEST,
    MEDIA_DELETE_SUCCESS,
    MEDIA_EDIT_FAIL,
    MEDIA_EDIT_REQUEST,
    MEDIA_EDIT_SUCCESS,
    MEDIA_GET_DETAILS_FAIL,
    MEDIA_GET_DETAILS_REQUEST,
    MEDIA_GET_DETAILS_SUCCESS,
    MEDIA_LIST_FAIL,
    MEDIA_LIST_REQUEST,
    MEDIA_LIST_SUCCESS,
} from "../constants/mediaConstants";

export const listMedias = () => async (dispatch, getState) => {
    try {
        dispatch({ type: MEDIA_LIST_REQUEST });

        const { data } = await Axios.get(`/api/auth/media`);

        dispatch({ type: MEDIA_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: MEDIA_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getEditMediaDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: MEDIA_GET_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "aplication/json",
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/auth/media/${id}`, config);

        dispatch({ type: MEDIA_GET_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: MEDIA_GET_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const editMedia = (id, name, href) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({ type: MEDIA_EDIT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.patch(
            `/api/auth/media/${id}`,
            { name, href },
            config
        );

        dispatch({ type: MEDIA_EDIT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: MEDIA_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createMedia = (name, href) => async (dispatch, getState) => {
    try {
        dispatch({ type: MEDIA_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.post(
            "/api/auth/media",
            {name, href},
            config
        );

        dispatch({ type: MEDIA_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: MEDIA_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteMedia = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: MEDIA_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.delete(
            `/api/auth/media/${id}`,
            config
        );

        dispatch({ type: MEDIA_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: MEDIA_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
