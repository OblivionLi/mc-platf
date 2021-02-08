import Axios from 'axios'
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_USER_LIST_REQUEST,
    ORDER_USER_LIST_SUCCESS,
    ORDER_USER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ADMIN_ORDER_LIST_SUCCESS,
    ADMIN_ORDER_LIST_FAIL,
    ADMIN_ORDER_LIST_REQUEST
} from '../constants/orderConstants'

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`
            }
        }

        const { data } = await Axios.get('/api/auth/orders', config)

        dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const adminListOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_ORDER_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        };

        const { data } = await Axios.get(`/api/auth/admin/orders`, config);

        dispatch({ type: ADMIN_ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ADMIN_ORDER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createOrder = (cartItems, paymentMethod, discountPrice) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'aplication/json',
                Authorization: `Bearer ${userInfo.access_token}`
            }
        }

        const { data } = await Axios.post(
            'api/auth/orders',
            {
                cartItems,
                paymentMethod,
                discountPrice
            },
            config
        )

        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getOrderDetails = id => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'aplication/json',
                Authorization: `Bearer ${userInfo.access_token}`
            }
        }

        const { data } = await Axios.get(`/api/auth/orders/${id}`, {
            ...config
        })

        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const payOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAY_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`
            }
        }

        const { data } = await Axios.patch(
            `/api/auth/orders/${id}/pay`, {},
            config
        )

        dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const deliverOrder = id => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DELIVER_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`
            }
        }

        const { data } = await Axios.patch(
            `/api/auth/orders/${id}/delivered`,
            {},
            config
        )

        dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const orderUserList = id => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_USER_LIST_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'aplication/json',
                Authorization: `Bearer ${userInfo.access_token}`
            }
        }

        const { data } = await Axios.get(`/api/auth/myorders/${id}`, {
            ...config
        })

        dispatch({ type: ORDER_USER_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ORDER_USER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
