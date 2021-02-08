import Axios from "axios";
import {
    ADMIN_GAMEMODE_LIST_FAIL,
    ADMIN_GAMEMODE_LIST_REQUEST,
    ADMIN_GAMEMODE_LIST_SUCCESS,
    GAMEMODE_CREATE_FAIL,
    GAMEMODE_CREATE_REQUEST,
    GAMEMODE_CREATE_SUCCESS,
    GAMEMODE_DELETE_FAIL,
    GAMEMODE_DELETE_REQUEST,
    GAMEMODE_DELETE_SUCCESS,
    GAMEMODE_EDIT_FAIL,
    GAMEMODE_EDIT_REQUEST,
    GAMEMODE_EDIT_SUCCESS,
    GAMEMODE_GET_DETAILS_FAIL,
    GAMEMODE_GET_DETAILS_REQUEST,
    GAMEMODE_GET_DETAILS_SUCCESS,
    GAMEMODE_LIST_FAIL,
    GAMEMODE_LIST_REQUEST,
    GAMEMODE_LIST_SUCCESS,
} from "../constants/gameModeConstants";

export const listGameModes = (page = "") => async (dispatch, getState) => {
    try {
        dispatch({ type: GAMEMODE_LIST_REQUEST });

        const { data } = await Axios.get(`/api/auth/gamemodes?page=${page}`);

        dispatch({ type: GAMEMODE_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GAMEMODE_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const adminListGameModes = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_GAMEMODE_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/auth/admin/gamemodes`, config);

        dispatch({ type: ADMIN_GAMEMODE_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ADMIN_GAMEMODE_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getEditGameModeDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: GAMEMODE_GET_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "aplication/json",
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/auth/gamemodes/${id}`, config);

        dispatch({ type: GAMEMODE_GET_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GAMEMODE_GET_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const editGameMode = (id, title, description) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({ type: GAMEMODE_EDIT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.patch(
            `/api/auth/gamemodes/${id}`,
            { title, description },
            config
        );

        dispatch({ type: GAMEMODE_EDIT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GAMEMODE_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createGameMode = (formData) => async (dispatch, getState) => {
    try {
        dispatch({ type: GAMEMODE_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.post(
            "/api/auth/gamemodes",
            formData,
            config
        );

        dispatch({ type: GAMEMODE_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GAMEMODE_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteGameMode = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: GAMEMODE_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.delete(
            `/api/auth/gamemodes/${id}`,
            config
        );

        dispatch({ type: GAMEMODE_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GAMEMODE_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
