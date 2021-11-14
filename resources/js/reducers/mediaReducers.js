import {
    MEDIA_CREATE_FAIL,
    MEDIA_CREATE_REQUEST,
    MEDIA_CREATE_RESET,
    MEDIA_CREATE_SUCCESS,
    MEDIA_DELETE_FAIL,
    MEDIA_DELETE_REQUEST,
    MEDIA_DELETE_SUCCESS,
    MEDIA_EDIT_FAIL,
    MEDIA_EDIT_REQUEST,
    MEDIA_EDIT_RESET,
    MEDIA_EDIT_SUCCESS,
    MEDIA_GET_DETAILS_FAIL,
    MEDIA_GET_DETAILS_REQUEST,
    MEDIA_GET_DETAILS_RESET,
    MEDIA_GET_DETAILS_SUCCESS,
    MEDIA_LIST_FAIL,
    MEDIA_LIST_REQUEST,
    MEDIA_LIST_RESET,
    MEDIA_LIST_SUCCESS,
} from "../constants/mediaConstants";

export const mediaListReducer = (state = { medias: [] }, action) => {
    switch (action.type) {
        case MEDIA_LIST_REQUEST:
            return { loading: true, medias: [] };

        case MEDIA_LIST_SUCCESS:
            return { loading: false, medias: action.payload };

        case MEDIA_LIST_FAIL:
            return { loading: false, error: action.payload };

        case MEDIA_LIST_RESET:
            return {};

        default:
            return state;
    }
};

export const mediaGetEditDetailsReducer = (
    state = { media: {} },
    action
) => {
    switch (action.type) {
        case MEDIA_GET_DETAILS_REQUEST:
            return { ...state, loading: true };

        case MEDIA_GET_DETAILS_SUCCESS:
            return { loading: false, media: action.payload };

        case MEDIA_GET_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        case MEDIA_GET_DETAILS_RESET:
            return {
                media: {},
            };
        default:
            return state;
    }
};

export const mediaEditReducer = (state = { media: {} }, action) => {
    switch (action.type) {
        case MEDIA_EDIT_REQUEST:
            return { loading: true };

        case MEDIA_EDIT_SUCCESS:
            return { loading: false, success: true, media: action.payload };

        case MEDIA_EDIT_FAIL:
            return { loading: false, error: action.payload };

        case MEDIA_EDIT_RESET:
            return {
                media: {},
            };
        default:
            return state;
    }
};

export const mediaCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case MEDIA_CREATE_REQUEST:
            return { loading: true };

        case MEDIA_CREATE_SUCCESS:
            return { loading: false, success: true, media: action.payload };

        case MEDIA_CREATE_FAIL:
            return { loading: false, error: action.payload };

        case MEDIA_CREATE_RESET:
            return {};

        default:
            return state;
    }
};

export const mediaDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case MEDIA_DELETE_REQUEST:
            return { loading: true };

        case MEDIA_DELETE_SUCCESS:
            return { loading: false, success: true };

        case MEDIA_DELETE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
