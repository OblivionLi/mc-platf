import {
    ADMIN_GAMEMODE_LIST_FAIL,
    ADMIN_GAMEMODE_LIST_REQUEST,
    ADMIN_GAMEMODE_LIST_RESET,
    ADMIN_GAMEMODE_LIST_SUCCESS,
    GAMEMODE_CREATE_FAIL,
    GAMEMODE_CREATE_REQUEST,
    GAMEMODE_CREATE_RESET,
    GAMEMODE_CREATE_SUCCESS,
    GAMEMODE_DELETE_FAIL,
    GAMEMODE_DELETE_REQUEST,
    GAMEMODE_DELETE_SUCCESS,
    GAMEMODE_EDIT_FAIL,
    GAMEMODE_EDIT_REQUEST,
    GAMEMODE_EDIT_RESET,
    GAMEMODE_EDIT_SUCCESS,
    GAMEMODE_GET_DETAILS_FAIL,
    GAMEMODE_GET_DETAILS_REQUEST,
    GAMEMODE_GET_DETAILS_RESET,
    GAMEMODE_GET_DETAILS_SUCCESS,
    GAMEMODE_LIST_FAIL,
    GAMEMODE_LIST_REQUEST,
    GAMEMODE_LIST_RESET,
    GAMEMODE_LIST_SUCCESS,
} from "../constants/gameModeConstants";

export const gameModeListReducer = (state = { gameModes: [] }, action) => {
    switch (action.type) {
        case GAMEMODE_LIST_REQUEST:
            return { loading: true, gameModes: [] };

        case GAMEMODE_LIST_SUCCESS:
            return { loading: false, gameModes: action.payload };

        case GAMEMODE_LIST_FAIL:
            return { loading: false, error: action.payload };

        case GAMEMODE_LIST_RESET:
            return {};

        default:
            return state;
    }
};

export const gameModeAdminListReducer = (state = { gameModes: [] }, action) => {
    switch (action.type) {
        case ADMIN_GAMEMODE_LIST_REQUEST:
            return { loading: true, gameModes: [] };

        case ADMIN_GAMEMODE_LIST_SUCCESS:
            return { loading: false, gameModes: action.payload };

        case ADMIN_GAMEMODE_LIST_FAIL:
            return { loading: false, error: action.payload };

        case ADMIN_GAMEMODE_LIST_RESET:
            return {};

        default:
            return state;
    }
};

export const gameModeGetEditDetailsReducer = (
    state = { gameMode: {} },
    action
) => {
    switch (action.type) {
        case GAMEMODE_GET_DETAILS_REQUEST:
            return { ...state, loading: true };

        case GAMEMODE_GET_DETAILS_SUCCESS:
            return { loading: false, gameMode: action.payload };

        case GAMEMODE_GET_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        case GAMEMODE_GET_DETAILS_RESET:
            return {
                gameMode: {},
            };
        default:
            return state;
    }
};

export const gameModeEditReducer = (state = { gameMode: {} }, action) => {
    switch (action.type) {
        case GAMEMODE_EDIT_REQUEST:
            return { loading: true };

        case GAMEMODE_EDIT_SUCCESS:
            return { loading: false, success: true, gameMode: action.payload };

        case GAMEMODE_EDIT_FAIL:
            return { loading: false, error: action.payload };

        case GAMEMODE_EDIT_RESET:
            return {
                gameMode: {},
            };
        default:
            return state;
    }
};

export const gameModeCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case GAMEMODE_CREATE_REQUEST:
            return { loading: true };

        case GAMEMODE_CREATE_SUCCESS:
            return { loading: false, success: true, gameMode: action.payload };

        case GAMEMODE_CREATE_FAIL:
            return { loading: false, error: action.payload };

        case GAMEMODE_CREATE_RESET:
            return {};

        default:
            return state;
    }
};

export const gameModeDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case GAMEMODE_DELETE_REQUEST:
            return { loading: true };

        case GAMEMODE_DELETE_SUCCESS:
            return { loading: false, success: true };

        case GAMEMODE_DELETE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
