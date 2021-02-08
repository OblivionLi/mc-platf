import Axios from "axios";

import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
} from "../constants/cartConstants";

export const addToCart = (id) => async (dispatch, getState) => {

    const {
        userLogin: { userInfo },
    } = getState();

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.access_token}`,
        },
    };

    const { data } = await Axios.get(`/api/auth/ranks/${id}`, config);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            rank: data.id,
            type: data.type,
            name: data.name,
            discount: data.discount,
            price: data.price,
        }
    });

    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
    );
};

export const removeFromCart = id => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    });

    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
    );
};

