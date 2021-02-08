import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    userRegisterReducer,
    userLoginReducer,
    userListReducer,
    userGetEditDetailsReducer,
    userEditReducer,
    userDeleteReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userResetPassReducer,
    getUserResetReducer
} from "./reducers/userReducers";
import {
    updateListReducer,
    updateCreateReducer,
    updateDeleteReducer,
    updateEditReducer,
    updateGetEditDetailsReducer,
    updateDetailsReducer,
    updateAdminListReducer,
} from "./reducers/updateReducers";
import {
    reportBugListReducer,
    reportBugGetEditDetailsReducer,
    reportBugEditReducer,
    reportBugCreateReducer,
    reportBugDeleteReducer,
} from "./reducers/reportBugReducers";
import {
    reportPlayerListReducer,
    reportPlayerGetEditDetailsReducer,
    reportPlayerEditReducer,
    reportPlayerCreateReducer,
    reportPlayerDeleteReducer,
} from "./reducers/reportPlayerReducers";

import {
    gameModeListReducer,
    gameModeGetEditDetailsReducer,
    gameModeEditReducer,
    gameModeCreateReducer,
    gameModeDeleteReducer,
    gameModeAdminListReducer,
} from "./reducers/gameModeReducers";

import {
    roleListReducer,
    roleGetEditDetailsReducer,
    roleEditReducer,
    roleCreateReducer,
    roleDeleteReducer,
} from "./reducers/roleReducers";

import {
    permissionListReducer,
    permissionGetEditDetailsReducer,
    permissionEditReducer,
    permissionCreateReducer,
    permissionDeleteReducer,
} from "./reducers/permissionReducers";

import {
    tagListReducer,
    tagGetEditDetailsReducer,
    tagEditReducer,
    tagCreateReducer,
    tagDeleteReducer,
} from "./reducers/tagReducers";

import {
    showCaseListReducer,
    showCaseGetEditDetailsReducer,
    showCaseEditReducer,
    showCaseCreateReducer,
    showCaseDeleteReducer,
    showCaseAdminListReducer,
} from "./reducers/showCaseReducers";

import {
    rankListReducer,
    rankGetEditDetailsReducer,
    rankEditReducer,
    rankCreateReducer,
    rankDeleteReducer,
    rankAdminListReducer,
    rankDetailsReducer
} from "./reducers/rankReducers";

import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderUserListReducer,
    orderListReducer,
    orderDeliverReducer,
    orderAdminListReducer,
} from "./reducers/orderReducers";

import { cartReducer } from "./reducers/cartReducers";

const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userList: userListReducer,
    userGetEditDetails: userGetEditDetailsReducer,
    userEdit: userEditReducer,
    userDelete: userDeleteReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userResetPass: userResetPassReducer,
    getUserReset: getUserResetReducer,
    
    updateList: updateListReducer,
    updateCreate: updateCreateReducer,
    updateDelete: updateDeleteReducer,
    updateEdit: updateEditReducer,
    updateGetEditDetails: updateGetEditDetailsReducer,
    updateDetails: updateDetailsReducer,
    updateAdminList: updateAdminListReducer,

    reportBugList: reportBugListReducer,
    reportBugGetEditDetails: reportBugGetEditDetailsReducer,
    reportBugEdit: reportBugEditReducer,
    reportBugCreate: reportBugCreateReducer,
    reportBugDelete: reportBugDeleteReducer,

    reportPlayerList: reportPlayerListReducer,
    reportPlayerGetEditDetails: reportPlayerGetEditDetailsReducer,
    reportPlayerEdit: reportPlayerEditReducer,
    reportPlayerCreate: reportPlayerCreateReducer,
    reportPlayerDelete: reportPlayerDeleteReducer,

    gameModeList: gameModeListReducer,
    gameModeAdminList: gameModeAdminListReducer,
    gameModeGetEditDetails: gameModeGetEditDetailsReducer,
    gameModeEdit: gameModeEditReducer,
    gameModeCreate: gameModeCreateReducer,
    gameModeDelete: gameModeDeleteReducer,

    roleList: roleListReducer,
    roleGetEditDetails: roleGetEditDetailsReducer,
    roleEdit: roleEditReducer,
    roleCreate: roleCreateReducer,
    roleDelete: roleDeleteReducer,

    permissionList: permissionListReducer,
    permissionGetEditDetails: permissionGetEditDetailsReducer,
    permissionEdit: permissionEditReducer,
    permissionCreate: permissionCreateReducer,
    permissionDelete: permissionDeleteReducer,
    
    tagList: tagListReducer,
    tagGetEditDetails: tagGetEditDetailsReducer,
    tagEdit: tagEditReducer,
    tagCreate: tagCreateReducer,
    tagDelete: tagDeleteReducer,

    showCaseList: showCaseListReducer,
    showCaseAdminList: showCaseAdminListReducer,
    showCaseGetEditDetails: showCaseGetEditDetailsReducer,
    showCaseEdit: showCaseEditReducer,
    showCaseCreate: showCaseCreateReducer,
    showCaseDelete: showCaseDeleteReducer,
    
    rankList: rankListReducer,
    rankAdminList: rankAdminListReducer,
    rankGetEditDetails: rankGetEditDetailsReducer,
    rankEdit: rankEditReducer,
    rankCreate: rankCreateReducer,
    rankDelete: rankDeleteReducer,
    rankDetails: rankDetailsReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderList: orderListReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    listUserOrder: orderUserListReducer,
    orderAdminList: orderAdminListReducer,

    cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
    },

    userLogin: {
        userInfo: userInfoFromStorage,
    },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
