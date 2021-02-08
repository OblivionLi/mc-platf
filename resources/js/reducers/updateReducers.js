import {
    UPDATE_LIST_REQUEST,
    UPDATE_LIST_SUCCESS,
    UPDATE_LIST_FAIL,
    UPDATE_CREATE_REQUEST,
    UPDATE_CREATE_SUCCESS,
    UPDATE_CREATE_FAIL,
    UPDATE_CREATE_RESET,
    UPDATE_DELETE_REQUEST,
    UPDATE_DELETE_SUCCESS,
    UPDATE_DELETE_FAIL,
    UPDATE_EDIT_REQUEST,
    UPDATE_EDIT_SUCCESS,
    UPDATE_EDIT_FAIL,
    UPDATE_EDIT_RESET,
    UPDATE_GET_DETAILS_REQUEST,
    UPDATE_GET_DETAILS_SUCCESS,
    UPDATE_GET_DETAILS_FAIL,
    UPDATE_GET_DETAILS_RESET,
    UPDATE_LIST_RESET,
    UPDATE_DETAILS_SUCCESS,
    UPDATE_DETAILS_FAIL,
    UPDATE_DETAILS_REQUEST,
    ADMIN_UPDATE_LIST_REQUEST,
    ADMIN_UPDATE_LIST_SUCCESS,
    ADMIN_UPDATE_LIST_FAIL,
    ADMIN_UPDATE_LIST_RESET,
} from "../constants/updateConstants";

export const updateListReducer = (state = { updates: [] }, action) => {
    switch (action.type) {
        case UPDATE_LIST_REQUEST:
            return { loading: true, updates: [] };

        case UPDATE_LIST_SUCCESS:
            return { loading: false, updates: action.payload };

        case UPDATE_LIST_FAIL:
            return { loading: false, error: action.payload };

        case UPDATE_LIST_RESET:
            return {};

        default:
            return state;
    }
};

export const updateAdminListReducer = (state = { updates: [] }, action) => {
    switch (action.type) {
        case ADMIN_UPDATE_LIST_REQUEST:
            return { loading: true, updates: [] };

        case ADMIN_UPDATE_LIST_SUCCESS:
            return { loading: false, updates: action.payload };

        case ADMIN_UPDATE_LIST_FAIL:
            return { loading: false, error: action.payload };

        case ADMIN_UPDATE_LIST_RESET:
            return {};

        default:
            return state;
    }
};

export const updateCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_CREATE_REQUEST:
            return { loading: true };

        case UPDATE_CREATE_SUCCESS:
            return { loading: false, success: true, update: action.payload};

        case UPDATE_CREATE_FAIL:
            return { loading: false, error: action.payload};

        case UPDATE_CREATE_RESET:
            return {};

        default:
            return state;
    }
}

export const updateDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_DELETE_REQUEST:
            return { loading: true };

        case UPDATE_DELETE_SUCCESS:
            return { loading: false, success: true };

        case UPDATE_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default: 
            return state;
    }
}

export const updateEditReducer = (state = { update: {} }, action) => {
    switch (action.type) {
        case UPDATE_EDIT_REQUEST:
            return { loading: true };

        case UPDATE_EDIT_SUCCESS:
            return { loading: false, success: true, update: action.payload };

        case UPDATE_EDIT_FAIL:
            return { loading: false, error: action.payload }

        case UPDATE_EDIT_RESET:
            return { update: {} }

        default: 
            return state;
    }
}

export const updateGetEditDetailsReducer = (state = { update: {} }, action) => {
    switch (action.type) {
        case UPDATE_GET_DETAILS_REQUEST:
            return { ...state, loading: true };

        case UPDATE_GET_DETAILS_SUCCESS:
            return { loading: false, update: action.payload };

        case UPDATE_GET_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        case UPDATE_GET_DETAILS_RESET:
            return {
                update: {}
            };
        default:
            return state;
    }
};

export const updateDetailsReducer = (state = { update: {} }, action) => {
    switch (action.type) {
        case UPDATE_DETAILS_REQUEST:
            return { loading: true, ...state};

        case UPDATE_DETAILS_SUCCESS:
            return { loading: false, update: action.payload };

        case UPDATE_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};