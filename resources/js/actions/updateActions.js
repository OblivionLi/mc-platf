import Axios from "axios";
import {
    UPDATE_LIST_REQUEST,
    UPDATE_LIST_SUCCESS,
    UPDATE_LIST_FAIL,
    UPDATE_CREATE_FAIL,
    UPDATE_CREATE_SUCCESS,
    UPDATE_CREATE_REQUEST,
    UPDATE_DELETE_REQUEST,
    UPDATE_DELETE_SUCCESS,
    UPDATE_DELETE_FAIL,
    UPDATE_EDIT_REQUEST,
    UPDATE_EDIT_SUCCESS,
    UPDATE_EDIT_FAIL,
    UPDATE_GET_DETAILS_REQUEST,
    UPDATE_GET_DETAILS_SUCCESS,
    UPDATE_GET_DETAILS_FAIL,
    UPDATE_LIST_RESET,
    UPDATE_DETAILS_REQUEST,
    UPDATE_DETAILS_SUCCESS,
    UPDATE_DETAILS_FAIL,
    ADMIN_UPDATE_LIST_REQUEST,
    ADMIN_UPDATE_LIST_FAIL,
    ADMIN_UPDATE_LIST_SUCCESS,
} from "../constants/updateConstants";

export const listUpdates = (page = "") => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_LIST_REQUEST });

        const { data } = await Axios.get(`/api/auth/updates?page=${page}`);

        dispatch({ type: UPDATE_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const adminListUpdates = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_UPDATE_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/auth/admin/updates`, config);

        dispatch({ type: ADMIN_UPDATE_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ADMIN_UPDATE_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createUpdate = (formData) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.post(
            "/api/auth/updates",
            formData,
            config
        );

        dispatch({ type: UPDATE_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const editUpdate = (
    id,
    name,
    version,
    brief_description,
    full_description
) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_EDIT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.patch(
            `/api/auth/updates/${id}`,
            { name, version, brief_description, full_description },
            config
        );

        dispatch({ type: UPDATE_EDIT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteUpdate = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.delete(`/api/auth/updates/${id}`, config);

        dispatch({ type: UPDATE_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getEditUpdateDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_GET_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "aplication/json",
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/auth/updates/${id}`, config);

        dispatch({ type: UPDATE_GET_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_GET_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listUpdateDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_DETAILS_REQUEST });

        const { data } = await Axios.get(`/api/auth/update/${id}`);

        dispatch({ type: UPDATE_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
