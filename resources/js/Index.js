import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeScreen from "./screens/public/HomeScreen";
import AdminScreen from "./screens/admin/AdminScreen";
import ShopScreen from "./screens/public/shop/ShopScreen";
import UpdateScreen from "./screens/public/updates/UpdateScreen";
import LoginScreen from "./screens/public/LoginScreen";
import RegisterScreen from "./screens/public/RegisterScreen";
import MembersScreen from "./screens/public/MembersScreen";
import ShowCasesScreen from "./screens/public/ShowCasesScreen";
import ShowUpdatesScreen from "./screens/public/updates/ShowUpdatesScreen";
import AddReportBugScreen from "./screens/public/reports/AddReportBugScreen";
import AddReportPlayerScreen from "./screens/public/reports/AddReportPlayerScreen";
import ShowShopScreen from "./screens/public/shop/ShowShopScreen";
import CartScreen from "./screens/public/shop/CartScreen";
import PlaceOrderScreen from "./screens/public/shop/PlaceOrderScreen";
import ShowOrderScreen from "./screens/public/shop/ShowOrderScreen";
import ProfileScreen from "./screens/public/ProfileScreen";
import ForgotPasswordScreen from "./screens/public/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/public/ResetPasswordScreen";

function Index() {
    return (
        <Router>
            <Switch>
                {/* Public View */}
                <Route path="/" component={HomeScreen} exact />
                <Route path="/page/:page" component={HomeScreen} exact />
                <Route path="/page" component={HomeScreen} />

                <Route path="/updates" component={UpdateScreen} exact />
                <Route path="/updates/:page" component={UpdateScreen} exact />
                <Route path="/update/:id" component={ShowUpdatesScreen} />

                <Route path="/members" component={MembersScreen} exact />

                <Route path="/showcases" component={ShowCasesScreen} exact />
                <Route path="/showcases/:page" component={ShowCasesScreen} exact />
                <Route path="/showcases/:id" component={ShowCasesScreen} />

                <Route path="/report-bug" component={AddReportBugScreen} exact />
                <Route path="/report-player" component={AddReportPlayerScreen} exact />

                <Route path="/register" component={RegisterScreen} />
                <Route path="/login" component={LoginScreen} />
                <Route path="/profile" component={ProfileScreen} />
                <Route path="/forgot-password" component={ForgotPasswordScreen} />
                <Route path="/reset-password/:id?" component={ResetPasswordScreen} />

                {/* Admin View */}
                <Route path="/admin" component={AdminScreen} exact />

                {/* Shop View */}
                <Route path="/shop" component={ShopScreen} exact />
                <Route path="/shop/:id" component={ShowShopScreen} />

                <Route path="/cart/:id?" component={CartScreen} />
                <Route path="/placeorder" component={PlaceOrderScreen} />
                <Route path="/orders/:id" component={ShowOrderScreen} />
            </Switch>
        </Router>
    );
}

export default Index;

if (document.getElementById("app")) {
    ReactDOM.render(
        <Provider store={store}>
            <Index />
        </Provider>,
        document.getElementById("app")
    );
}
