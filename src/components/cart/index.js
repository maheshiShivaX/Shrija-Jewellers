import React, { useState, useEffect } from "react";
import Layout from "../layout";
import { toast } from "react-hot-toast";
import './cart.css';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { get_cart_Data, addToCart, incrQuantity, decrQuantity, deleteItem } from '../../redux/action';
import { decryptString } from "../../_services";
import CryptoJS from 'crypto-js';
import { imageurl, DAPI_URL, baseurl } from '../../_config';
import axios from "axios";

const Cart = () => {
    const SJjwtToken = localStorage.getItem('SJjwtToken');
    const cartData = useSelector((state) => state.cartReducer.cart);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const SJloginId = localStorage.getItem("SJloginId");
    const navigate = useNavigate();
    const [userAddress, setUserAdderss] = useState([]);
    const secretKey = CryptoJS.enc.Utf8.parse("uitsufdytuiysdifdsfdsfdhgtyuijkj");
    const iv = CryptoJS.enc.Utf8.parse("1234567890123456");

    useEffect(() => {
        dispatch(get_cart_Data());
    }, [dispatch]);

    const handleIncrementQuantity = async (item) => {
        setLoading(true);
        try {
            await dispatch(incrQuantity(item));
        } catch (error) {
            toast.error('Error occurred while adding to cart.');
        } finally {
            setLoading(false);
        }
    };

    const handleDecrementQuantity = async (item) => {
        setLoading(true);
        try {
            await dispatch(decrQuantity(item));
        } catch (error) {
            toast.error('Error occurred while adding to cart.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteItem = async (item) => {
        setLoading(true);
        try {
            await dispatch(deleteItem(item));
        } catch (error) {
            toast.error('Error occurred while adding to cart.');
        } finally {
            setLoading(false);
        }
    };

    const cartTotal = cartData?.map(item => {
        return item.unitPrice * item.quantity;
    }).reduce((preVal, curVal) => {
        return preVal + curVal;
    }, 0);

    const formattedTotal = typeof cartTotal === 'number' ? cartTotal.toFixed(2) : '0.00';

    const filteredData = cartData.filter(row => row.quantity != null && row.quantity > 0);


    const getUserAddressByLoginId = async () => {
        try {
            const response = await axios.get(`${baseurl}${DAPI_URL?.GetUserAddressByLoginId}?pLoginId=${SJloginId}`, {
                headers: {
                    'Authorization': `Bearer ${SJjwtToken}`,
                },
            });

            const encryptedData = response.data?.data;
            if (!encryptedData || typeof encryptedData !== 'string' || encryptedData.trim() === '') {
                throw new Error("Invalid or empty encrypted data format");
            }

            const result = decryptString(encryptedData, secretKey, iv);

            const parsedData = JSON.parse(result);

            if (response.status === 200) {
                if (response.data.isSuccess == 200) {
                    setUserAdderss(parsedData);
                    localStorage.setItem('SJselectedAddressId', parsedData[0].addressId);
                }
            } else {
                setError("Failed to fetch address Data");
            }
        } catch (error) {
            setError("Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserAddressByLoginId();
    }, [])

    const onProccedPay = () => {
        if (SJloginId) {
            if (userAddress != null && userAddress.length > 0) {
                navigate("/checkout");
            } else {
                navigate("/shippingaddress");
            }
        }
        else {
            navigate(`/login`);
        }
    }

    const onProductDetail = (item) => {
        localStorage.setItem('SJproductId', item?.productId);
        localStorage.setItem('SJproductCategoryId', item?.productCategoryId);
        localStorage.setItem('SJproductSubCategoryId', item?.productSubCategoryId);
        // navigate(`/category/${item?.productCategoryId}/productsubcategory/${item?.productSubCategoryId}/products/${item?.productId}/productdetail`);
    }

    return (
        <Layout>
            <div className="container-screen cart-main py-md-5 py-4 ">
                <div className="cart-heading">
                    <h1>My Cart</h1>
                </div>
                <div className="row cart mt-lg-5 mt-0 justify-content-between">
                    <div className="cart-content col-xl-7 col-md-6 col-12 pb-4">
                        {filteredData && filteredData.length > 0 ? (
                            filteredData?.map((item, i) => (
                                <div className="cart-detail row mb-sm-auto mb-3">
                                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
                                        <div className="p-image ">
                                            {item?.productImageDtos && item?.productImageDtos.length > 0 ?
                                                item?.productImageDtos.map((image, j) => (
                                                    image.isHeader ?
                                                        <img
                                                            onClick={() => onProductDetail(item)}
                                                            style={{ cursor: 'pointer' }}
                                                            key={image.productImageId}
                                                            src={`${imageurl}${image.imgPath}`}
                                                            alt={`Product Image ${j + 1}`}
                                                        /> : null
                                                ))
                                                : ''
                                            }
                                        </div>
                                    </div>
                                    <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-9 col-sm-6 col-12">
                                        <div className="product-cart-detail ">
                                            <h5 className="mb-md-auto mb-1" onClick={() => onProductDetail(item)} style={{ cursor: 'pointer' }}>{item?.displayName}</h5>
                                            <div className="mt-1 ring_size" style={{ color: "#D0D0D0" }}>
                                                <span>Ring Size : </span>
                                                <span>9</span>
                                            </div>
                                            <div className="d-md-flex align-items-center mt-3 count_weepr" style={{ color: "#D0D0D0", fontWeight: "600", gap: "20px" }}>
                                                {/* <span>Metal TypeYellow Gold</span> */}
                                                <div className="d-flex justify-content-between align-items-center" style={{gap:'20px'}}>
                                                    <div className="d-flex cart-plus-minus" >
                                                        <span onClick={() => handleDecrementQuantity(item)} style={{ cursor: 'pointer' }}>
                                                            <svg id="Layer_2" height="25" viewBox="0 0 512 512" width="25" xmlns="http://www.w3.org/2000/svg" data-name="Layer 2">
                                                                <g transform="matrix(1,0,0,1,0,0)">
                                                                    <g id="Icon">
                                                                        <g id="_40" data-name="40">
                                                                            <rect
                                                                                id="Background"
                                                                                fill="#2492ff00"
                                                                                height="512"
                                                                                rx="150"
                                                                                width="512"
                                                                                stroke="none"
                                                                            />
                                                                            <rect
                                                                                fill="#ffffffff"
                                                                                height="50"
                                                                                rx="25"
                                                                                width="290"
                                                                                x="111"
                                                                                y="231"
                                                                                stroke="none"
                                                                            />
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                        </span>
                                                        <span>{item?.quantity}</span>
                                                        <span onClick={() => handleIncrementQuantity(item)} disabled={loading} style={{ cursor: 'pointer' }}>
                                                            <svg id="Layer_2" height="25" viewBox="0 0 512 512" width="25" xmlns="http://www.w3.org/2000/svg" data-name="Layer 2">
                                                                <g transform="matrix(1,0,0,1,0,0)">
                                                                    <g id="Icon">
                                                                        <g id="_39" data-name="39">
                                                                            <rect
                                                                                id="Background"
                                                                                fill="#2492ff00"
                                                                                height="512"
                                                                                rx="150"
                                                                                width="512"
                                                                                stroke="none"
                                                                            />
                                                                            <path
                                                                                d="M376 231H281v-95c0-13.81-11.19-25-25-25-13.81 0-25 11.19-25 25v95H136c-13.81 0-25 11.19-25 25 0 13.81 11.19 25 25 25h95v95c0 13.81 11.19 25 25 25 13.81 0 25-11.19 25-25v-95h95c13.81 0 25-11.19 25-25 0-13.81-11.19-25-25-25z"
                                                                                fill="#ffffffff"
                                                                                stroke="none"
                                                                            />
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    <span style={{ fontSize: "20px" }}>₹{item?.unitPrice}</span>
                                                </div>
                                                <div className="cart-buttons remove_btn">
                                                    <div className="clear" onClick={() => handleDeleteItem(item)} disabled={loading}>
                                                        <button>Remove Item</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-white py-3">Cart is Empty</div>
                        )}
                        <div className="cart-buttons mt-3">
                            <div className="continue">
                                <Link to="/"><p>Continue Shopping</p></Link>
                            </div>
                        </div>
                    </div>
                    {filteredData && formattedTotal != 0 && formattedTotal != null ? (
                        <div className="pcard d-flex justify-content-center col-xl-4 col-md-5 col-12  mt-md-0 mt-4">
                            <div className="cart-paydetail w-100">
                                <div className="order-total d-flex justify-content-center align-items-center">
                                    <span className="main-total fw-bold">Order Summary</span>
                                </div>
                                <div className="payment-detail">
                                    <div className="card-border-bottom d-flex justify-content-between align-items-center">
                                        <span className="subtotal">Subtotal</span>
                                        <span className="amount">₹ {formattedTotal}</span>
                                    </div>
                                    {/* <div className="card-border-bottom d-flex justify-content-between align-items-center">
                                    <span className="save">You Saved</span>
                                    <span className="amount">- ₹1,890</span>
                                </div>
                                <div className="card-border-bottom d-flex justify-content-between align-items-center">
                                    <span className="coupon">Coupon Discount</span>
                                    <span className="amount">Apply Coupon</span>
                                </div>
                                <div className="card-border-bottom d-flex justify-content-between align-items-center">
                                    <span className="shipping">Shipping (Standard)</span>
                                    <span className="amount">Free</span>
                                </div> */}
                                </div>
                                {/* <div className="order-total d-flex justify-content-between align-items-center pt-2">
                                <span className="main-total fw-bold">Total Cost </span>
                                <span className="amount">₹10,710</span>
                            </div> */}

                                <div className="checkout mt-md-2 pt-2">
                                    <button onClick={onProccedPay}>
                                        Checkout
                                    </button>
                                </div>

                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </Layout>
    )
}

export default Cart;

{/* <div className="btn-wraper">
                                <button
                                    className="bg-indigo-400 py-2 px-4 rounded-lg text-white font-semibold"
                                    onClick={() => (props.addToCartHandler())}
                                >Add To Cart</button>

                                <button
                                    className="bg-indigo-400 py-2 px-4 rounded-lg text-white font-semibold"
                                    onClick={() => (props.removeToCartHandler())}
                                >Remove To Cart</button>
                            </div> */}