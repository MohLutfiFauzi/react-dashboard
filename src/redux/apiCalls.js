import {
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    addUserStart,
    addUserSuccess,
    addUserFailure,
    loginFailure,
    loginStart,
    loginSuccess,
    getUserStart,
    getUserSuccess,
    getUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    updateCurrentUserSuccess
} from "./userRedux";

import {
    getProductStart,
    getProductSuccess,
    getProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure
} from "./productRedux";

import {
    getOrderStart,
    getOrderSuccess,
    getOrderFailure,
    deleteOrderStart,
    deleteOrderSuccess,
    deleteOrderFailure,
    updateOrderStart,
    updateOrderSuccess,
    updateOrderFailure,
    addOrderStart,
    addOrderSuccess,
    addOrderFailure,
} from "./orderRedux"

import { publicRequest } from "../requestMethods";

// ORDERS

export const getOrders = async (dispatch) => {
    dispatch(getOrderStart());
    try {
        const res = await publicRequest.get("/orders");
        dispatch(getOrderSuccess(res.data));
    } catch (err) {
        dispatch(getOrderFailure());
    }
}

export const deleteOrder = async (id, dispatch) => {
    dispatch(deleteOrderStart());
    try {
        const res = await publicRequest.delete(`/orders/${id}`)
        dispatch(deleteOrderSuccess(res.data));
    } catch (err) {
        dispatch(deleteOrderFailure());
    }
}

export const updateOrder = async (id, order, dispatch) => {
    dispatch(updateOrderStart());
    try {
        // update
        dispatch(updateOrderSuccess({ id, order }));
    } catch (err) {
        dispatch(updateOrderFailure());
    }
};

export const addOrder = async (order, dispatch) => {
    dispatch(addOrderStart());
    try {
        const res = await publicRequest.post(`/orders`, order);
        dispatch(addOrderSuccess(res.data));
    } catch (err) {
        dispatch(addOrderFailure());
    }
};

// USERS

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};

export const getUsers = async (dispatch) => {
    dispatch(getUserStart());
    try {
        const res = await publicRequest.get("/users");
        dispatch(getUserSuccess(res.data));
    } catch (err) {
        dispatch(getUserFailure());
    }
}

export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
        const res = await publicRequest.delete(`/users/${id}`)
        dispatch(deleteUserSuccess(res.data));
    } catch (err) {
        dispatch(deleteUserFailure());
    }
}

export const updateUser = async (dispatch, user) => {
    dispatch(updateUserStart());
    try {
        const res = await publicRequest.put(`/users/${user._id}`, user);
        dispatch(updateUserSuccess(res.data));
    } catch (err) {
        dispatch(updateUserFailure());
    }
};

export const updateCurrentUser = async (dispatch, user) => {
    dispatch(updateUserStart());
    try {
        const res = await publicRequest.put(`/users/${user._id}`, user);
        dispatch(updateCurrentUserSuccess(res.data));
    } catch (err) {
        dispatch(updateUserFailure());
    }
};

export const addUser = async (user, dispatch) => {
    dispatch(addUserStart());
    try {
        const res = await publicRequest.post(`/users`, user);
        dispatch(addUserSuccess(res.data));
    } catch (err) {
        dispatch(addUserFailure());
    }
};

// PRODUCTS

export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
        const res = await publicRequest.get("/products");
        dispatch(getProductSuccess(res.data));
    } catch (err) {
        dispatch(getProductFailure());
    }
};

export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
        const res = await publicRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(res.data));
    } catch (err) {
        dispatch(deleteProductFailure());
    }
};

export const updateProduct = async (dispatch, product) => {
    dispatch(updateProductStart());
    try {
        const res = await publicRequest.put(`/products/${product._id}`, product);
        dispatch(updateProductSuccess(res.data));
    } catch (err) {
        dispatch(updateProductFailure());
    }
};

export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
        const res = await publicRequest.post(`/products`, product);
        dispatch(addProductSuccess(res.data));
    } catch (err) {
        dispatch(addProductFailure());
    }
};
