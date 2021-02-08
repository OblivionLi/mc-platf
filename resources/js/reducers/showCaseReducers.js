import {
    SHOWCASE_LIST_FAIL,
    SHOWCASE_LIST_REQUEST,
    SHOWCASE_LIST_RESET,
    SHOWCASE_LIST_SUCCESS,
    ADMIN_SHOWCASE_LIST_REQUEST,
    ADMIN_SHOWCASE_LIST_SUCCESS,
    ADMIN_SHOWCASE_LIST_FAIL,
    ADMIN_SHOWCASE_LIST_RESET,
    SHOWCASE_GET_DETAILS_REQUEST,
    SHOWCASE_GET_DETAILS_SUCCESS,
    SHOWCASE_GET_DETAILS_FAIL,
    SHOWCASE_GET_DETAILS_RESET,
    SHOWCASE_EDIT_REQUEST,
    SHOWCASE_EDIT_SUCCESS,
    SHOWCASE_EDIT_FAIL,
    SHOWCASE_EDIT_RESET,
    SHOWCASE_CREATE_REQUEST,
    SHOWCASE_CREATE_SUCCESS,
    SHOWCASE_CREATE_FAIL,
    SHOWCASE_CREATE_RESET,
    SHOWCASE_DELETE_REQUEST,
    SHOWCASE_DELETE_SUCCESS,
    SHOWCASE_DELETE_FAIL
} from "../constants/showCaseConstants";

export const showCaseListReducer = (state = { showCases: [] }, action) => {
    switch (action.type) {
        case SHOWCASE_LIST_REQUEST:
            return { loading: true, showCases: [] };

        case SHOWCASE_LIST_SUCCESS:
            return { loading: false, showCases: action.payload };

        case SHOWCASE_LIST_FAIL:
            return { loading: false, error: action.payload };

        case SHOWCASE_LIST_RESET:
            return {};

        default:
            return state;
    }
};

export const showCaseAdminListReducer = (state = { showCases: [] }, action) => {
    switch (action.type) {
        case ADMIN_SHOWCASE_LIST_REQUEST:
            return { loading: true, showCases: [] };

        case ADMIN_SHOWCASE_LIST_SUCCESS:
            return { loading: false, showCases: action.payload };

        case ADMIN_SHOWCASE_LIST_FAIL:
            return { loading: false, error: action.payload };

        case ADMIN_SHOWCASE_LIST_RESET:
            return {};

        default:
            return state;
    }
};

export const showCaseGetEditDetailsReducer = (
    state = { showCase: {} },
    action
) => {
    switch (action.type) {
        case SHOWCASE_GET_DETAILS_REQUEST:
            return { ...state, loading: true };

        case SHOWCASE_GET_DETAILS_SUCCESS:
            return { loading: false, showCase: action.payload };

        case SHOWCASE_GET_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        case SHOWCASE_GET_DETAILS_RESET:
            return {
                showCase: {},
            };
        default:
            return state;
    }
};

export const showCaseEditReducer = (state = { showCase: {} }, action) => {
    switch (action.type) {
        case SHOWCASE_EDIT_REQUEST:
            return { loading: true };

        case SHOWCASE_EDIT_SUCCESS:
            return { loading: false, success: true, showCase: action.payload };

        case SHOWCASE_EDIT_FAIL:
            return { loading: false, error: action.payload };

        case SHOWCASE_EDIT_RESET:
            return {
                showCase: {},
            };
        default:
            return state;
    }
};

export const showCaseCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case SHOWCASE_CREATE_REQUEST:
            return { loading: true };

        case SHOWCASE_CREATE_SUCCESS:
            return { loading: false, success: true, showCase: action.payload };

        case SHOWCASE_CREATE_FAIL:
            return { loading: false, error: action.payload };

        case SHOWCASE_CREATE_RESET:
            return {};

        default:
            return state;
    }
};

export const showCaseDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case SHOWCASE_DELETE_REQUEST:
            return { loading: true };

        case SHOWCASE_DELETE_SUCCESS:
            return { loading: false, success: true };

        case SHOWCASE_DELETE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
