import {
    REPORTPLAYER_GET_DETAILS_FAIL,
    REPORTPLAYER_GET_DETAILS_REQUEST,
    REPORTPLAYER_GET_DETAILS_RESET,
    REPORTPLAYER_GET_DETAILS_SUCCESS,
    REPORTPLAYER_LIST_FAIL,
    REPORTPLAYER_LIST_REQUEST,
    REPORTPLAYER_LIST_RESET,
    REPORTPLAYER_LIST_SUCCESS,
    REPORTPLAYER_EDIT_FAIL,
    REPORTPLAYER_EDIT_REQUEST,
    REPORTPLAYER_EDIT_RESET,
    REPORTPLAYER_EDIT_SUCCESS,
    REPORTPLAYER_CREATE_REQUEST,
    REPORTPLAYER_CREATE_SUCCESS,
    REPORTPLAYER_CREATE_FAIL,
    REPORTPLAYER_CREATE_RESET,
    REPORTPLAYER_DELETE_REQUEST,
    REPORTPLAYER_DELETE_SUCCESS,
    REPORTPLAYER_DELETE_FAIL,
} from "../constants/reportPlayerConstants";

export const reportPlayerListReducer = (
    state = { reportPlayers: [] },
    action
) => {
    switch (action.type) {
        case REPORTPLAYER_LIST_REQUEST:
            return { loading: true, reportPlayers: [] };

        case REPORTPLAYER_LIST_SUCCESS:
            return { loading: false, reportPlayers: action.payload };

        case REPORTPLAYER_LIST_FAIL:
            return { loading: false, error: action.payload };

        case REPORTPLAYER_LIST_RESET:
            return {};

        default:
            return state;
    }
};

export const reportPlayerGetEditDetailsReducer = (state = { reportPlayer: {} }, action) => {
    switch (action.type) {
        case REPORTPLAYER_GET_DETAILS_REQUEST:
            return { ...state, loading: true };

        case REPORTPLAYER_GET_DETAILS_SUCCESS:
            return { loading: false, reportPlayer: action.payload };

        case REPORTPLAYER_GET_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        case REPORTPLAYER_GET_DETAILS_RESET:
            return {
                reportPlayer: {}
            };
        default:
            return state;
    }
};


export const reportPlayerEditReducer = (state = { reportPlayer: {} }, action) => {
    switch (action.type) {
        case REPORTPLAYER_EDIT_REQUEST:
            return { loading: true };

        case REPORTPLAYER_EDIT_SUCCESS:
            return { loading: false, success: true, reportPlayer: action.payload };

        case REPORTPLAYER_EDIT_FAIL:
            return { loading: false, error: action.payload };

        case REPORTPLAYER_EDIT_RESET:
            return {
                reportPlayer: {}
            };
        default:
            return state;
    }
};

export const reportPlayerCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case REPORTPLAYER_CREATE_REQUEST:
            return { loading: true };

        case REPORTPLAYER_CREATE_SUCCESS:
            return { loading: false, success: true, reportPlayer: action.payload};

        case REPORTPLAYER_CREATE_FAIL:
            return { loading: false, error: action.payload};

        case REPORTPLAYER_CREATE_RESET:
            return {};

        default:
            return state;
    }
}

export const reportPlayerDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case REPORTPLAYER_DELETE_REQUEST:
            return { loading: true };

        case REPORTPLAYER_DELETE_SUCCESS:
            return { loading: false, success: true };

        case REPORTPLAYER_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default: 
            return state;
    }
}