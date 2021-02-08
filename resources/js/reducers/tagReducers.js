import {
    TAG_CREATE_FAIL,
    TAG_CREATE_REQUEST,
    TAG_CREATE_RESET,
    TAG_CREATE_SUCCESS,
    TAG_DELETE_FAIL,
    TAG_DELETE_REQUEST,
    TAG_DELETE_SUCCESS,
    TAG_EDIT_FAIL,
    TAG_EDIT_REQUEST,
    TAG_EDIT_RESET,
    TAG_EDIT_SUCCESS,
    TAG_GET_DETAILS_FAIL,
    TAG_GET_DETAILS_REQUEST,
    TAG_GET_DETAILS_RESET,
    TAG_GET_DETAILS_SUCCESS,
    TAG_LIST_FAIL,
    TAG_LIST_REQUEST,
    TAG_LIST_RESET,
    TAG_LIST_SUCCESS,
} from "../constants/tagConstants";

export const tagListReducer = (state = { tags: [] }, action) => {
    switch (action.type) {
        case TAG_LIST_REQUEST:
            return { loading: true, tags: [] };

        case TAG_LIST_SUCCESS:
            return { loading: false, tags: action.payload };

        case TAG_LIST_FAIL:
            return { loading: false, error: action.payload };

        case TAG_LIST_RESET:
            return {};

        default:
            return state;
    }
};

export const tagGetEditDetailsReducer = (
    state = { tag: {} },
    action
) => {
    switch (action.type) {
        case TAG_GET_DETAILS_REQUEST:
            return { ...state, loading: true };

        case TAG_GET_DETAILS_SUCCESS:
            return { loading: false, tag: action.payload };

        case TAG_GET_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        case TAG_GET_DETAILS_RESET:
            return {
                tag: {},
            };
        default:
            return state;
    }
};

export const tagEditReducer = (state = { tag: {} }, action) => {
    switch (action.type) {
        case TAG_EDIT_REQUEST:
            return { loading: true };

        case TAG_EDIT_SUCCESS:
            return { loading: false, success: true, tag: action.payload };

        case TAG_EDIT_FAIL:
            return { loading: false, error: action.payload };

        case TAG_EDIT_RESET:
            return {
                tag: {},
            };
        default:
            return state;
    }
};

export const tagCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case TAG_CREATE_REQUEST:
            return { loading: true };

        case TAG_CREATE_SUCCESS:
            return { loading: false, success: true, tag: action.payload };

        case TAG_CREATE_FAIL:
            return { loading: false, error: action.payload };

        case TAG_CREATE_RESET:
            return {};

        default:
            return state;
    }
};

export const tagDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case TAG_DELETE_REQUEST:
            return { loading: true };

        case TAG_DELETE_SUCCESS:
            return { loading: false, success: true };

        case TAG_DELETE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
