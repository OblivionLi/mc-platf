import {
    ADMIN_RANK_LIST_FAIL,
    ADMIN_RANK_LIST_REQUEST,
    ADMIN_RANK_LIST_RESET,
    ADMIN_RANK_LIST_SUCCESS,
    RANK_CREATE_FAIL,
    RANK_CREATE_REQUEST,
    RANK_CREATE_RESET,
    RANK_CREATE_SUCCESS,
    RANK_DELETE_FAIL,
    RANK_DELETE_REQUEST,
    RANK_DELETE_SUCCESS,
    RANK_DETAILS_FAIL,
    RANK_DETAILS_REQUEST,
    RANK_DETAILS_SUCCESS,
    RANK_EDIT_FAIL,
    RANK_EDIT_REQUEST,
    RANK_EDIT_RESET,
    RANK_EDIT_SUCCESS,
    RANK_GET_DETAILS_FAIL,
    RANK_GET_DETAILS_REQUEST,
    RANK_GET_DETAILS_RESET,
    RANK_GET_DETAILS_SUCCESS,
    RANK_LIST_FAIL,
    RANK_LIST_REQUEST,
    RANK_LIST_RESET,
    RANK_LIST_SUCCESS,
} from "../constants/rankConstants";

export const rankListReducer = (state = { ranks: [] }, action) => {
    switch (action.type) {
        case RANK_LIST_REQUEST:
            return { loading: true, ranks: [] };

        case RANK_LIST_SUCCESS:
            return { loading: false, ranks: action.payload };

        case RANK_LIST_FAIL:
            return { loading: false, error: action.payload };

        case RANK_LIST_RESET:
            return {};

        default:
            return state;
    }
};

export const rankAdminListReducer = (state = { ranks: [] }, action) => {
    switch (action.type) {
        case ADMIN_RANK_LIST_REQUEST:
            return { loading: true, ranks: [] };

        case ADMIN_RANK_LIST_SUCCESS:
            return { loading: false, ranks: action.payload };

        case ADMIN_RANK_LIST_FAIL:
            return { loading: false, error: action.payload };

        case ADMIN_RANK_LIST_RESET:
            return {};

        default:
            return state;
    }
};

export const rankGetEditDetailsReducer = (
    state = { rank: {} },
    action
) => {
    switch (action.type) {
        case RANK_GET_DETAILS_REQUEST:
            return { ...state, loading: true };

        case RANK_GET_DETAILS_SUCCESS:
            return { loading: false, rank: action.payload };

        case RANK_GET_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        case RANK_GET_DETAILS_RESET:
            return {
                rank: {},
            };
        default:
            return state;
    }
};

export const rankEditReducer = (state = { rank: {} }, action) => {
    switch (action.type) {
        case RANK_EDIT_REQUEST:
            return { loading: true };

        case RANK_EDIT_SUCCESS:
            return { loading: false, success: true, rank: action.payload };

        case RANK_EDIT_FAIL:
            return { loading: false, error: action.payload };

        case RANK_EDIT_RESET:
            return {
                rank: {},
            };
        default:
            return state;
    }
};

export const rankCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case RANK_CREATE_REQUEST:
            return { loading: true };

        case RANK_CREATE_SUCCESS:
            return { loading: false, success: true, rank: action.payload };

        case RANK_CREATE_FAIL:
            return { loading: false, error: action.payload };

        case RANK_CREATE_RESET:
            return {};

        default:
            return state;
    }
};

export const rankDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case RANK_DELETE_REQUEST:
            return { loading: true };

        case RANK_DELETE_SUCCESS:
            return { loading: false, success: true };

        case RANK_DELETE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const rankDetailsReducer = (state = { rank: {} }, action) => {
    switch (action.type) {
        case RANK_DETAILS_REQUEST:
            return { loading: true, ...state};

        case RANK_DETAILS_SUCCESS:
            return { loading: false, rank: action.payload };

        case RANK_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
