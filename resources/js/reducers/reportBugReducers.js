import {
    REPORTBUG_CREATE_FAIL,
    REPORTBUG_CREATE_REQUEST,
    REPORTBUG_CREATE_RESET,
    REPORTBUG_CREATE_SUCCESS,
    REPORTBUG_DELETE_FAIL,
    REPORTBUG_DELETE_REQUEST,
    REPORTBUG_DELETE_SUCCESS,
    REPORTBUG_EDIT_FAIL,
    REPORTBUG_EDIT_REQUEST,
    REPORTBUG_EDIT_RESET,
    REPORTBUG_EDIT_SUCCESS,
    REPORTBUG_GET_DETAILS_FAIL,
    REPORTBUG_GET_DETAILS_REQUEST,
    REPORTBUG_GET_DETAILS_RESET,
    REPORTBUG_GET_DETAILS_SUCCESS,
    REPORTBUG_LIST_FAIL,
    REPORTBUG_LIST_REQUEST,
    REPORTBUG_LIST_RESET,
    REPORTBUG_LIST_SUCCESS,
} from "../constants/reportBugConstants";

export const reportBugListReducer = (state = { reportBugs: [] }, action) => {
    switch (action.type) {
        case REPORTBUG_LIST_REQUEST:
            return { loading: true, reportBugs: [] };

        case REPORTBUG_LIST_SUCCESS:
            return { loading: false, reportBugs: action.payload };

        case REPORTBUG_LIST_FAIL:
            return { loading: false, error: action.payload };

        case REPORTBUG_LIST_RESET:
            return {};

        default:
            return state;
    }
};


export const reportBugGetEditDetailsReducer = (state = { reportBug: {} }, action) => {
    switch (action.type) {
        case REPORTBUG_GET_DETAILS_REQUEST:
            return { ...state, loading: true };

        case REPORTBUG_GET_DETAILS_SUCCESS:
            return { loading: false, reportBug: action.payload };

        case REPORTBUG_GET_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        case REPORTBUG_GET_DETAILS_RESET:
            return {
                reportBug: {}
            };
        default:
            return state;
    }
};

export const reportBugEditReducer = (state = { reportBug: {} }, action) => {
    switch (action.type) {
        case REPORTBUG_EDIT_REQUEST:
            return { loading: true };

        case REPORTBUG_EDIT_SUCCESS:
            return { loading: false, success: true, reportBug: action.payload };

        case REPORTBUG_EDIT_FAIL:
            return { loading: false, error: action.payload };

        case REPORTBUG_EDIT_RESET:
            return {
                reportBug: {}
            };
        default:
            return state;
    }
};

export const reportBugCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case REPORTBUG_CREATE_REQUEST:
            return { loading: true };

        case REPORTBUG_CREATE_SUCCESS:
            return { loading: false, success: true, reportBug: action.payload};

        case REPORTBUG_CREATE_FAIL:
            return { loading: false, error: action.payload};

        case REPORTBUG_CREATE_RESET:
            return {};

        default:
            return state;
    }
}

export const reportBugDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case REPORTBUG_DELETE_REQUEST:
            return { loading: true };

        case REPORTBUG_DELETE_SUCCESS:
            return { loading: false, success: true };

        case REPORTBUG_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default: 
            return state;
    }
}