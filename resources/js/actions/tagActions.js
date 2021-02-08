import Axios from "axios";
import {
    TAG_CREATE_FAIL,
    TAG_CREATE_REQUEST,
    TAG_CREATE_SUCCESS,
    TAG_DELETE_FAIL,
    TAG_DELETE_REQUEST,
    TAG_DELETE_SUCCESS,
    TAG_EDIT_FAIL,
    TAG_EDIT_REQUEST,
    TAG_EDIT_SUCCESS,
    TAG_GET_DETAILS_FAIL,
    TAG_GET_DETAILS_REQUEST,
    TAG_GET_DETAILS_SUCCESS,
    TAG_LIST_FAIL,
    TAG_LIST_REQUEST,
    TAG_LIST_SUCCESS,
} from "../constants/tagConstants";

export const listTags = () => async (dispatch, getState) => {
    try {
        dispatch({ type: TAG_LIST_REQUEST });

        const { data } = await Axios.get(`/api/auth/tags`);

        dispatch({ type: TAG_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: TAG_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getEditTagDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: TAG_GET_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "aplication/json",
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/auth/tags/${id}`, config);

        dispatch({ type: TAG_GET_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: TAG_GET_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const editTag = (id, name) => async (dispatch, getState) => {
    try {
        dispatch({ type: TAG_EDIT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.patch(
            `/api/auth/tags/${id}`,
            { name },
            config
        );

        dispatch({ type: TAG_EDIT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: TAG_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createTag = (name) => async (dispatch, getState) => {
    try {
        dispatch({ type: TAG_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.post(
            "/api/auth/tags",
            {name},
            config
        );

        dispatch({ type: TAG_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: TAG_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteTag = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: TAG_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.delete(
            `/api/auth/tags/${id}`,
            config
        );

        dispatch({ type: TAG_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: TAG_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
