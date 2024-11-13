import React, { useState, useEffect } from "react";
import Layout from "../layout";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { imageurl, DAPI_URL, baseurl, projectId, projectNo } from '../../_config';
import { useSelector, useDispatch } from 'react-redux';
import { get_cart_Data, addToCart, incrQuantity, decrQuantity, deleteItem } from '../../redux/action';
import useRazorpay from "react-razorpay";
import { useNavigate, useParams, Link } from "react-router-dom";
import { decryptString } from "../../_services";
import CryptoJS from 'crypto-js';
import './checkout.css'


const Checkout = () => {
    const SJjwtToken = localStorage.getItem('SJjwtToken');
    const navigate = useNavigate();
    const cartData = useSelector((state) => state.cartReducer.cart);
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stateData, setStateData] = useState([]);
    const [districtData, setDistrictData] = useState([]);
    const [couponCode, setCouponCode] = useState('');
    const [referralCode, setReferralCode] = useState('')
    const [discountApplied, setDiscountApplied] = useState(false);
    const [userAddressByLoginAddressId, setUserAddressByLoginAddressId] = useState([]);
    const SJloginId = localStorage.getItem('SJloginId');
    const SJselectedAddressId = localStorage.getItem('SJselectedAddressId');
    const [discountAmount, setDiscountAmount] = useState(0);
    const [discountCode, setDiscountCode] = useState('');
    const [isFormopen, setIsFormopen] = useState(false);
    const [projectPaymentGateway, setProjectPaymentGateway] = useState([]);

    const secretKey = CryptoJS.enc.Utf8.parse("uitsufdytuiysdifdsfdsfdhgtyuijkj");
    const iv = CryptoJS.enc.Utf8.parse("1234567890123456");

    const deliveryCharge = 0.00;

    // coupone code apply api integration
    const applyCoupon = () => {
        getCouponCode();
    };

    const getCouponCode = async () => {
        if (!couponCode) {
            setError("Please enter a coupon code.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.get(`${baseurl}${DAPI_URL?.GetCouponByIdCouponcode}?pCouponCode=${encodeURIComponent(couponCode)}`, {
                headers: {
                    'Authorization': `Bearer ${SJjwtToken}`,
                },
            });
            if (response.status === 200) {
                if (response.data.isSuccess === 200) {
                    const encryptedData = response.data?.data;
                    if (!encryptedData || typeof encryptedData !== 'string' || encryptedData.trim() === '') {
                        throw new Error("Invalid or empty encrypted data format");
                    }


                    const result = decryptString(encryptedData, secretKey, iv);

                    const parsedData = JSON.parse(result);

                    const couponData = parsedData[0];

                    if (couponData && couponData.isActive) {
                        setDiscountAmount(couponData?.couponValue);
                        setDiscountCode(couponData?.couponCode);
                        setDiscountApplied(true);
                        toast.success(`Coupon applied! Discount: ₹${couponData.couponValue}`);
                        setProductFormData(prevData => ({
                            ...prevData,
                            discount: couponData.couponValue,
                            discountCode: couponData.couponCode
                        }));
                    }
                } else {
                    alert("Coupon is inactive or not valid.");
                    setDiscountApplied(false);
                }
            } else {
                setError("Failed to fetch coupon data.");
                setDiscountApplied(false);
            }
        } catch (error) {
            setError("Please try again later.");
            setDiscountApplied(false);
        } finally {
            setLoading(false);
            setCouponCode('');
        }
    };

    useEffect(() => {
        getCouponCode();
    }, [])

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                await dispatch(get_cart_Data());
            } catch (error) {
                // console.error('Failed to fetch cart data:', error);
                toast.error("Failed to fetch cart data");
            } finally {
                setLoading(false);
            }
        };

        fetchCartData();
    }, [dispatch]);

    // cart total calculation
    const cartTotal = cartData?.map(item => {
        return item.unitPrice * item.quantity;
    }).reduce((preVal, curVal) => {
        return preVal + curVal;
    }, 0);

    const subtotal = typeof cartTotal === 'number' ? cartTotal.toFixed(2) : '0.00';
    const totalAmount = parseFloat(subtotal) + deliveryCharge - (discountApplied ? discountAmount : 0);

    useEffect(() => {
        const cartTotal = cartData?.map(item => {
            return item.unitPrice * item.quantity;
        }).reduce((preVal, curVal) => {
            return preVal + curVal;
        }, 0);

        const subtotal = typeof cartTotal === 'number' ? cartTotal.toFixed(2) : '0.00';
        const totalAmount = parseFloat(subtotal) + deliveryCharge - (discountApplied ? discountAmount : 0);

        setProductFormData((prevData) => ({
            ...prevData,
            orderAmount: totalAmount.toFixed(2),
        }));
    }, [cartData, discountApplied, deliveryCharge, discountAmount]);

    // fetch user address by login and address id
    const getUserAddressByLoginAddressId = async () => {
        try {
            const response = await axios.get(`${baseurl}${DAPI_URL?.GetUserAddressByLoginAddressId}?pLoginId=${SJloginId}&pAddressId=${SJselectedAddressId}`, {
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
                    setUserAddressByLoginAddressId(parsedData[0]);
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

    const getProjectPaymentGatewayByProjectId = async () => {
        try {
            const response = await axios.get(`${baseurl}${DAPI_URL?.GetProjectPaymentGatewayByProjectNo}?pProjectNo=${projectNo}`, {
                headers: {
                    'Authorization': `Bearer ${SJjwtToken}`,
                },
            });

            if (response.status === 200) {
                if (response.data.isSuccess == 200) {
                    setProjectPaymentGateway(response.data.data);
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
        getUserAddressByLoginAddressId();
        getProjectPaymentGatewayByProjectId();
    }, [SJloginId]);

    // data of send on create order function for payment gateway
    const [productFormData, setProductFormData] = useState({
        addressId: SJselectedAddressId,
        orderId: 0,
        loginId: SJloginId,
        shippingCharge: deliveryCharge,
        discount: discountAmount ? discountAmount : 0,
        discountCode: discountCode ? discountCode : '',
        referralCode: "",
        orderAmount: totalAmount.toFixed(2),
        paymentGatewayTypeId: 2,
        projectNo: projectNo
    });

    // Handle payment method change
    const handlePaymentMethodChange = (event) => {
        const selectedPaymentMethod = parseInt(event.target.value);

        setProductFormData((prevData) => ({
            ...prevData,
            paymentGatewayTypeId: selectedPaymentMethod
        }));
    };

    // const [Razorpay] = useRazorpay();

    // const onCreateOrder = async () => {
    //     try {
    //         const response = await axios.post(`${baseurl}${DAPI_URL?.SaveProductOrder}`, {
    //             orderId: productFormData.orderId,
    //             loginId: productFormData.loginId,
    //             shippingCharge: productFormData.shippingCharge,
    //             discount: productFormData.discount,
    //             discountCode: productFormData.discountCode,
    //             referralCode: productFormData.referralCode,
    //             orderAmount: productFormData.orderAmount,
    //             paymentGatewayTypeId: productFormData.paymentGatewayTypeId,
    //             addressId: productFormData.addressId,
    //             projectNo: productFormData.projectNo
    //         },
    //             {
    //                 headers: {
    //                     'Authorization': `Bearer ${SJjwtToken}`,

    //                 },
    //             });

    //         if (response.status === 200) {
    //             if (response.data.isSuccess == 1) {
    //                 const result = response.data;

    //                 // phonepe paymentgateway 
    //                 if (productFormData.paymentGatewayTypeId == 2) {

    //                     const redirectUrl = result.data.url;

    //                     window.location.href = redirectUrl;

    //                 }
    //                 // razorpay paymentgateway
    //                 else if (productFormData.paymentGatewayTypeId == 1) {
    //                     loadRazorpayScript();
    //                     const options = {
    //                         key: result.key,
    //                         amount: result.data.amount,
    //                         currency: result.data.currency,
    //                         name: result.data.name,
    //                         description: result.data.description,
    //                         image: result.data.image,
    //                         order_id: result.data.order_id,
    //                         prefill: result.data.prefill,
    //                         theme: result.data.theme,
    //                         callback_url: result.data.callback_url,
    //                         notes: result.data.notes
    //                     };
    //                     const paymentObject = new Razorpay(options);
    //                     paymentObject.open();
    //                 }

    //                 // cash on delivery
    //                 else if (productFormData.paymentGatewayTypeId == 3) {
    //                     const redirectUrl = result.data.url;

    //                     window.location.href = redirectUrl;
    //                 }
    //             }
    //         } else {
    //             alert('technical issue! please try again later')
    //         }
    //     } catch (error) {
    //         setError("Payment Failed. Please try again later.");
    //     } finally {
    //         // setProductFormData({
    //         //     addressId: selectedAddressId,
    //         //     orderId: 0,
    //         //     loginId: loginId,
    //         //     discount: 0,
    //         //     discountCode: '',
    //         //     referralCode: "",
    //         //     orderAmount: 0,
    //         //     paymentGatewayTypeId: 2
    //         // });
    //         setDiscountApplied(false);
    //         setDiscountAmount(0);
    //         setDiscountCode('');
    //         setCouponCode('');
    //     }
    // };

    const loadRazorpayScript = async () => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }


    return (
        <Layout>
            <section class="bg_pic pt-4 pb-5">
                <div class="container-screen">
                    <h3 className="text-white pb-2">Delivery Address</h3>
                    <div className="row">
                        <div className="col-xl-8 col-md-7 col-12">
                            {userAddressByLoginAddressId && userAddressByLoginAddressId != null ?
                                <div>
                                    <div class="from_wepper">
                                        <>
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div className="loginid_data d-flex align-items-start">
                                                    <div className="loginid_address">
                                                        <span className="userName">{userAddressByLoginAddressId?.name}</span>
                                                        <h6 className="text-white">{userAddressByLoginAddressId?.contatctNo}</h6>
                                                        <span className="mb-0">
                                                            {userAddressByLoginAddressId?.addressLine1} {userAddressByLoginAddressId?.addressLine2} {userAddressByLoginAddressId?.city} {userAddressByLoginAddressId?.stateName} {userAddressByLoginAddressId?.countryName} {userAddressByLoginAddressId?.pincode}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    </div>
                                    <div className="add_more_address_btn mt-2">
                                        <Link to='/shippingaddress' className="text-white">Change Address</Link>
                                    </div>
                                </div>
                                :
                                null
                            }
                        </div>

                        <div className="d-flex justify-content-center col-xl-4 col-md-5 col-12">
                            <div className="checkout_card w-100">
                                <div className="order-total d-flex justify-content-start align-items-center">
                                    <span className="main-total fw-bold">Order Summary</span>
                                </div>
                                <div className="payment-detail">
                                    <div className="card-border-bottom d-flex justify-content-between align-items-center">
                                        <span className="subtotal">Subtotal</span>
                                        <span className="amount">₹ {subtotal}</span>
                                    </div>
                                    <div className="card-border-bottom d-flex justify-content-between align-items-center">
                                        <span className="shipping">Shipping (Standard)</span>
                                        <span className="amount">Free</span>
                                    </div>
                                    {discountApplied && (
                                        <div className="card-border-bottom d-flex justify-content-between align-items-center">
                                            <span className="left_heading">Discount</span>
                                            <span className="right_text">₹ {discountAmount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="card-border-bottom d-flex justify-content-between align-items-center">
                                        <span className="subtotal">Total</span>
                                        <span className="amount">₹ {totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>
                                {isFormopen == false ?
                                    subtotal != 0 && subtotal != null ?
                                        <div className="checkout mt-md-2 pt-2">
                                            <button className="" >Place Order</button>
                                        </div> :
                                        <button className="cart_btn_add" >
                                            <Link to='/'>Continue Shopping</Link>
                                        </button>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Checkout;