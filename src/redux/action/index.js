import { ADD_TO_CART, REMOVE_ITEM, GET_ALL_CART_DATA } from "./actionTypes";
import { DAPI_URL, baseurl } from '../../_config';
import axios from "axios";
import toast from "react-hot-toast";
import { decryptString } from "../../_services";
import CryptoJS from 'crypto-js';

export const get_cart_Data = () => async (dispatch) => {
    const SJloginId = localStorage.getItem('SJloginId');
    const SJjwtToken = localStorage.getItem('SJjwtToken');
    if (SJloginId) {
        try {
            const response = await axios.get(`${baseurl}${DAPI_URL?.GetCartDetailByLoginId}?pLoginId=${SJloginId}`, {
                headers: {
                    'Authorization': `Bearer ${SJjwtToken}`,
                },
            });
            if (response.data.data) {
                dispatch({ type: GET_ALL_CART_DATA, payload: response.data.data });
            } else {
                dispatch({ type: GET_ALL_CART_DATA, payload: [] });
            }
        } catch (error) {
            dispatch({ type: GET_ALL_CART_DATA, payload: [] });
        }
    } else {

        const localCartData = JSON.parse(localStorage.getItem('cart')) || [];
        dispatch({ type: GET_ALL_CART_DATA, payload: localCartData });
    }
};

const getProductDetailById = async (productId) => {
    const secretKey = CryptoJS.enc.Utf8.parse("uitsufdytuiysdifdsfdsfdhgtyuijkj");
    const iv = CryptoJS.enc.Utf8.parse("1234567890123456");
    try {
        const response = await axios.get(`${baseurl}${DAPI_URL?.GetProductDetailById}?pProductDetailId=${productId}`);

        const encryptedData = response.data?.data;
        if (!encryptedData || typeof encryptedData !== 'string' || encryptedData.trim() === '') {
            throw new Error("Invalid or empty encrypted data format");
        }

        const result = decryptString(encryptedData, secretKey, iv);

        const parsedData = JSON.parse(result);

        if (parsedData) {
            return parsedData[0];
        } else {
            throw new Error("Product not found");
        }
    } catch (error) {
        // console.error('Error fetching product data:', error);
        throw error;
    }
};


export const addToCart = (formData) => async (dispatch) => {
    const SJloginId = localStorage.getItem('SJloginId');
    const SJjwtToken = localStorage.getItem('SJjwtToken');

    if (SJloginId) {
        try {
            const response = await axios.post(`${baseurl}${DAPI_URL?.SaveCartDetail}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${SJjwtToken}`
                },
            });
            if (response.status === 200) {
                dispatch({ type: ADD_TO_CART, payload: response.data.data });
            } else {
                toast.error("Failed to add item to cart");
            }
        } catch (error) {
            // console.error('Error adding to cart:', error);
            toast.error("An error occurred. Please try again.");
        }
    } else {
        try {
            const productDetails = await getProductDetailById(formData.productId);

            const localCartData = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItem = localCartData.find(item => item.productId === productDetails.productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                localCartData.push({ ...productDetails, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(localCartData));
            dispatch({ type: ADD_TO_CART, payload: { ...productDetails, quantity: 1 } });
            // toast.success("Item added to local cart successfully");
        } catch (error) {
            toast.error("Error occurred while fetching product details.");
        }
    }
};

export const syncCartAfterLogin = () => async (dispatch) => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    const SJloginId = localStorage.getItem('SJloginId');
    const SJjwtToken = localStorage.getItem('SJjwtToken');

    if (SJloginId && cartData.length > 0) {
        try {
            const items = cartData.map(item => ({
                productId: item.productId,
                loginId: Number(SJloginId),
                buyStatus: 0,
                quantity: item.quantity,
                isActive: true,
                createdBy: 0,
            }));
            const response = await axios.post(`${baseurl}${DAPI_URL?.SaveBulkCart}`, items, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${SJjwtToken}`
                },
            });

            if (response.status === 200) {
                localStorage.removeItem('cart');
                dispatch({ type: ADD_TO_CART, payload: response.data });
            } else {
                toast.error("Failed to sync local cart.");
            }
        } catch (error) {
            // console.error('Error syncing cart:', error);
            toast.error("An error occurred while syncing the cart. Please try again.");
        }
    } else {
    }
};

export const removeItem = (id) => {
    return {
        type: REMOVE_ITEM,
        payload: id
    };
};

export const deleteItem = (item) => async (dispatch) => {
    // const { cartReducer: { cart } } = getState();
    const SJloginId = localStorage.getItem('SJloginId');
    const SJjwtToken = localStorage.getItem('SJjwtToken');
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (!isConfirmed) {
        return;
    }

    if (SJloginId) {
        try {
            const response = await axios.get(`${baseurl}${DAPI_URL?.DeleteCartDetailByLoginId}`, {
                headers: {
                    Authorization: `Bearer ${SJjwtToken}`
                },
                params: {
                    pCartDetailId: item?.cartItemId,
                    LoginId: SJloginId
                }
            });

            if (response.status === 200) {
                dispatch(get_cart_Data());
            } else {
                toast.error("Failed to delete item");
            }
        } catch (error) {
            // console.error('Error deleting item:', error.response || error.message || error);
        }
    } else {
        const localCartData = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCartData = localCartData.filter(cartItem => cartItem.productId !== item.productId);

        localStorage.setItem('cart', JSON.stringify(updatedCartData));
        dispatch(get_cart_Data());
    }
};


export const incrQuantity = (item) => async (dispatch, getState) => {
    const SJloginId = localStorage.getItem('SJloginId');
    const SJjwtToken = localStorage.getItem('SJjwtToken');
    if (SJloginId) {
        const formData = {
            productId: item.productId,
            loginId: SJloginId,
            buyStatus: 0,
            quantity: 1,
            isActive: true,
            createdBy: 0
        };

        try {
            await axios.post(`${baseurl}${DAPI_URL?.SaveCartDetail}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${SJjwtToken}`,
                }
            });
            dispatch(get_cart_Data());
        } catch (error) {
            // console.error('Error occurred while adding to cart:', error);
        }
    } else {
        const localCartData = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = localCartData.find(cartItem => cartItem.productId === item.productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            localCartData.push({ ...item, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(localCartData));
        dispatch(get_cart_Data());
    }
};

export const decrQuantity = (item) => async (dispatch, getState) => {
    const SJloginId = localStorage.getItem('SJloginId');
    const SJjwtToken = localStorage.getItem('SJjwtToken');
    // const { cartReducer: { cart } } = getState();
    if (SJloginId) {
        const formData = {
            productId: item.productId,
            loginId: SJloginId,
            buyStatus: 0,
            quantity: - 1,
            isActive: true,
            createdBy: 0
        };

        try {
            await axios.post(`${baseurl}${DAPI_URL?.SaveCartDetail}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${SJjwtToken}`,
                }
            });
            dispatch(get_cart_Data());
        } catch (error) {
            // console.error('Error occurred while adding to cart:', error);
        }
    } else {
        const localCartData = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = localCartData.find(cartItem => cartItem.productId === item.productId);

        if (existingItem) {
            existingItem.quantity -= 1;
        } else {
            localCartData.push({ ...item, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(localCartData));
        dispatch(get_cart_Data());
    }
};