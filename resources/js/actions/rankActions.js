import Axios from "axios";
import {
    ADMIN_RANK_LIST_FAIL,
    ADMIN_RANK_LIST_REQUEST,
    ADMIN_RANK_LIST_SUCCESS,
    RANK_CREATE_FAIL,
    RANK_CREATE_REQUEST,
    RANK_CREATE_SUCCESS,
    RANK_DELETE_FAIL,
    RANK_DELETE_REQUEST,
    RANK_DELETE_SUCCESS,
    RANK_DETAILS_FAIL,
    RANK_DETAILS_REQUEST,
    RANK_DETAILS_SUCCESS,
    RANK_EDIT_FAIL,
    RANK_EDIT_REQUEST,
    RANK_EDIT_SUCCESS,
    RANK_GET_DETAILS_FAIL,
    RANK_GET_DETAILS_REQUEST,
    RANK_GET_DETAILS_SUCCESS,
    RANK_LIST_FAIL,
    RANK_LIST_REQUEST,
    RANK_LIST_SUCCESS,
} from "../constants/rankConstants";

export const listRanks = () => async (dispatch, getState) => {
    try {
        dispatch({ type: RANK_LIST_REQUEST });

        const { data } = await Axios.get(`/api/auth/ranks`);

        dispatch({ type: RANK_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: RANK_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listRankDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: RANK_DETAILS_REQUEST });

        const { data } = await Axios.get(`/api/auth/ranks/${id}/details`);

        dispatch({ type: RANK_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: RANK_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const adminListRanks = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_RANK_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/auth/admin/ranks`, config);

        dispatch({ type: ADMIN_RANK_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ADMIN_RANK_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getEditRankDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: RANK_GET_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "aplication/json",
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/auth/ranks/${id}`, config);

        dispatch({ type: RANK_GET_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: RANK_GET_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const editRank = (
    id,
    name,
    type,
    price,
    discount,
    kit,
    full_access,
    edit_server,
    bypass_uri,
    essentials,
    mute,
    kick,
    temp_ban,
    fly,
    clearchat,
    keep_inv,
    keep_exp,
    jail,
    nickname,
    world_edit,
    enderchest,
    gamemode,
    color_nickname,
    money,
    protection_blocks,
    tp
) => async (dispatch, getState) => {
    try {
        dispatch({ type: RANK_EDIT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.patch(
            `/api/auth/ranks/${id}`,
            {
                name,
                type,
                price,
                discount,
                kit,
                full_access,
                edit_server,
                bypass_uri,
                essentials,
                mute,
                kick,
                temp_ban,
                fly,
                clearchat,
                keep_inv,
                keep_exp,
                jail,
                nickname,
                world_edit,
                enderchest,
                gamemode,
                color_nickname,
                money,
                protection_blocks,
                tp,
            },
            config
        );

        dispatch({ type: RANK_EDIT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: RANK_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createRank = (
    name,
    type,
    price,
    discount,
    kit,
    full_access,
    edit_server,
    bypass_uri,
    essentials,
    mute,
    kick,
    temp_ban,
    fly,
    clearchat,
    keep_inv,
    keep_exp,
    jail,
    nickname,
    world_edit,
    enderchest,
    gamemode,
    color_nickname,
    money,
    protection_blocks,
    tp
) => async (dispatch, getState) => {
    try {
        dispatch({ type: RANK_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.post(
            "/api/auth/ranks",
            {
                name,
                type,
                price,
                discount,
                kit,
                full_access,
                edit_server,
                bypass_uri,
                essentials,
                mute,
                kick,
                temp_ban,
                fly,
                clearchat,
                keep_inv,
                keep_exp,
                jail,
                nickname,
                world_edit,
                enderchest,
                gamemode,
                color_nickname,
                money,
                protection_blocks,
                tp,
            },
            config
        );

        dispatch({ type: RANK_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: RANK_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteRank = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: RANK_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.delete(`/api/auth/ranks/${id}`, config);

        dispatch({ type: RANK_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: RANK_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
