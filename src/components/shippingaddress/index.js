import React, { useState, useEffect } from "react";
import Layout from "../layout";
import './shippingaddress.css'
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { DAPI_URL, baseurl } from '../../_config';
import { useSelector, useDispatch } from 'react-redux';
import { get_cart_Data} from '../../redux/action';
import { useNavigate } from "react-router-dom";
import { decryptString } from "../../_services";
import CryptoJS from 'crypto-js';
import editIcon from '../../edit.svg'

const ShippingAddress = () => {
    const SJjwtToken = localStorage.getItem('SJjwtToken');
    const cartData = useSelector((state) => state.cartReducer.cart);
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stateData, setStateData] = useState([]);
    const [districtData, setDistrictData] = useState([]);
    const [discountApplied, setDiscountApplied] = useState(false);
    const navigate = useNavigate();
    const SJloginId = localStorage.getItem("SJloginId");
    const [userAddress, setUserAdderss] = useState([]);
    const [addMoreAddress, setAddMoreAddress] = useState(false);
    const [loginDetailById, setLognDetailById] = useState([]);
    const [editAddressId, setEditAddressId] = useState();
    const secretKey = CryptoJS.enc.Utf8.parse("uitsufdytuiysdifdsfdsfdhgtyuijkj");
    const iv = CryptoJS.enc.Utf8.parse("1234567890123456");
    const [selectedAddressIds, setSelectedAddressIds] = useState(null);

    const deliveryCharge = 0.00;

    const cartTotal = cartData?.map(item => {
        const price = parseFloat(item.unitPrice) || 0;
        const quantity = parseInt(item.quantity, 10) || 0;
        return price * quantity;
    }).reduce((preVal, curVal) => {
        return preVal + curVal;
    }, 0) || 0;

    const subtotal = typeof cartTotal === 'number' ? cartTotal.toFixed(2) : '0.00';
    const totalAmount = parseFloat(subtotal) + deliveryCharge;

    useEffect(() => {
        const cartTotal = cartData?.map(item => {
            const price = parseFloat(item.unitPrice) || 0;
            const quantity = parseInt(item.quantity, 10) || 0;
            return price * quantity;
        }).reduce((preVal, curVal) => {
            return preVal + curVal;
        }, 0) || 0;

        const subtotal = typeof cartTotal === 'number' ? cartTotal.toFixed(2) : '0.00';
        const totalAmount = parseFloat(subtotal) + deliveryCharge;

    }, [cartData, deliveryCharge]);

    const [formData, setFormData] = useState({
        addressId: 0,
        loginId: SJloginId,
        addressTypeId: 1,
        name: loginDetailById.name || "",
        addressLine1: "",
        addressLine2: "",
        landmark: "city",
        city: "",
        stateId: 0,
        countryId: 1,
        pincode: "",
        emailId: loginDetailById.emailId || "",
        contatctNo: String(loginDetailById.mobileNo || ""),
        isActive: true,
    });

    const getLognDetailById = async () => {
        try {
            const response = await axios.get(`${baseurl}${DAPI_URL?.GetLoginDetailById}?pLoginDetailId=${SJloginId}`, {
                headers: {
                    'Authorization': `Bearer ${SJjwtToken}`,
                },
            });

            if (response.status === 200) {
                if (response.data.isSuccess === 200 && response.data.data[0] != null) {
                    setLognDetailById(response.data.data[0]);
                }
            } else {
                setError("Failed to fetch address Data");
            }
        } catch (error) {
            // console.error('Error fetching address data:', error);
            setError("Please try again later.");
        } finally {
            setLoading(false);
        }
    };

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
                if (response.data.isSuccess === 200) {
                    // const sortedAddresses = parsedData.sort((a, b) => b.addressId - a.addressId);
                    setUserAdderss(parsedData);
                    // if (sortedAddresses.length > 0) {
                    //     localStorage.setItem('selectedAddressId', sortedAddresses[sortedAddresses.length - 1].addressId);
                    // }
                    // if(!selectedAddressIds) {
                    localStorage.setItem('selectedAddressId', parsedData[0].addressId);
                    // }

                }
            } else {
                setError("Failed to fetch address Data");
            }
        } catch (error) {
            // console.error('Error fetching address data:', error);
            setError("Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getStateData();
        getUserAddressByLoginId();
        getLognDetailById();
    }, [SJloginId]);

    const getStateData = async () => {
        try {
            const response = await axios.get(`${baseurl}${DAPI_URL?.GetState}`, {
                headers: {
                    'Authorization': `Bearer ${SJjwtToken}`,
                },
            });
            if (response.status === 200) {
                setStateData(response?.data?.data);
            } else {
                setError("Failed to fetch product Data");
            }
        } catch (error) {
            // console.error('Error fetching product data:', error);
            setError("Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateEmail = (email) => {
        const isValid = /^[^\s@]+@[^\s@]+\.(com|in|co.in[a-z]{2,})$/.test(email);
        return isValid;
    };

    const validatePhoneNumber = (phone) => {
        const isValid = /^\d{10}$/.test(phone) && /^[0-9]/.test(phone);
        return isValid;
    };

    const onUserDetailSave = async (e) => {
        e.preventDefault();
        if (!validatePhoneNumber(formData.contatctNo)) {
            toast.error("Please enter a valid mobile number");
            return;
        }

        if (!validateEmail(formData.emailId)) {
            toast.error("Please enter a valid Email Address");
            return;
        }

        try {
            const response = await axios.post(`${baseurl}${DAPI_URL?.SaveUserAddress}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${SJjwtToken}`,
                }
            });
            // debugger;
            if (response.status === 200) {
                if (response.data.isSuccess === 200) {
                    if (selectedAddressIds !== response.data.data.addressId) {
                        localStorage.setItem('selectedAddressId', selectedAddressIds);
                    } else {
                        localStorage.setItem('selectedAddressId', response.data.data.addressId);
                    }
                    await getUserAddressByLoginId();
                    // navigate("/checkout");
                } else {
                    alert('failed to add address Please try again!')
                }
            } else {
                toast.error("Failed to submit form data");
            }
        } catch (error) {
            toast.error("Please try again later.");
        } finally {
            setShowForm(false);
            setFormData({
                addressId: 0,
                loginId: 0,
                addressTypeId: 1,
                name: "",
                addressLine1: "",
                addressLine2: "",
                landmark: "",
                city: "",
                stateId: 0,
                countryId: 1,
                pincode: "",
                emailId: "",
                contatctNo: "",
                isActive: true,
            });
        }
    };

    useEffect(() => {
        dispatch(get_cart_Data());
    }, [dispatch, SJloginId]);

    const handleAddressSelect = (addressId) => {
        if (addressId != null) {
            localStorage.setItem('SJselectedAddressId', addressId);
        }
    };

    const onCheckout = () => {
        navigate('/checkout');
    };

    const [showForm, setShowForm] = useState(false);

    const handleAddAddressClick = () => {
        setFormData({
            addressId: 0,
            loginId: SJloginId,
            addressTypeId: 1,
            name: loginDetailById.name || "",
            addressLine1: "",
            addressLine2: "",
            landmark: "",
            city: "",
            // districtId: 0,
            stateId: 0,
            countryId: 1,
            pincode: "",
            emailId: loginDetailById.emailId || "",
            contatctNo: String(loginDetailById.mobileNo || ""),
            isActive: true,
            // createdBy: 0
        });
        setShowForm(true);
    };

    const handleBackToAddresses = () => {
        setShowForm(false);
    };

    const onEdit = (item) => {
        setEditAddressId(item?.addressId)
        setShowForm(true);
        setFormData({
            ...formData,
            addressId: item?.addressId,
            loginId: SJloginId,
            addressTypeId: 1,
            name: item?.name || "",
            addressLine1: item?.addressLine1,
            addressLine2: item?.addressLine2,
            landmark: "city",
            city: item?.city,
            stateId: item?.stateId,
            countryId: 1,
            pincode: item?.pincode,
            emailId: item?.emailId || "",
            contatctNo: String(item?.contatctNo || ""),
            isActive: true,
        })
        setSelectedAddressIds(item?.addressId);
    }

    return (
        <Layout>
            <Toaster />
            <section class="bg_pic pt-4 pb-5">
                <div class="container">
                    <h3 className="text-white pb-2">Delivery Address</h3>
                    <div className="row">
                        <div className="col-xl-8 col-md-7 col-12">
                            {userAddress != null && userAddress.length > 0 && !showForm ? (
                                <div>
                                    <div class="from_wepper">
                                        <span>Select a delivery address from your address book or enter a new one for delivery.</span>
                                        {userAddress?.map((item, i) => (
                                            <>

                                                <div className="d-flex justify-content-between align-items-start">
                                                    <div className="loginid_data d-flex align-items-start" style={{ gap: '6px' }}>
                                                        <input
                                                            type="radio"
                                                            id={`selectaddress-${i}`}
                                                            name="selectaddress"
                                                            className="mt-2 select_address_button"
                                                            value={item.addressId}
                                                            defaultChecked={i === 0}
                                                            onClick={() => handleAddressSelect(item.addressId)}
                                                        />
                                                        <div className="loginid_address">
                                                            <span className="userName">{item?.name}</span>
                                                            <h6 className="text-white">{item?.contatctNo}</h6>
                                                            <span className="mb-0">
                                                                {item?.addressLine1} {item?.addressLine2} {item?.city} {item?.stateName} {item?.countryName} {item?.pincode}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => onEdit(item)} className="edit_button">
                                                        <img src={editIcon} alt="" />
                                                    </button>
                                                </div>
                                                <div className="address_bottom_border"></div>
                                            </>
                                        ))}
                                    </div>
                                    <div className="add_more_address_btn mt-2">
                                        <button className="text-white" onClick={handleAddAddressClick}>+ Address</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div class="from_wepper">
                                        <span>Select a delivery address from your address book or enter a new one for delivery.</span>
                                        <form onSubmit={onUserDetailSave}>
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            id="fullname"
                                                            className="form-control"
                                                            placeholder="Full Name"
                                                            required
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-sm-6 col-12">
                                                    <div class="form-group">
                                                        <input
                                                            type="email"
                                                            name="emailId"
                                                            id="email"
                                                            className="form-control"
                                                            placeholder="Email"
                                                            required
                                                            value={formData.emailId}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-sm-6 col-12">
                                                    <div class="form-group">
                                                        <input
                                                            type="text"
                                                            name="contatctNo"
                                                            id="mobilenumber"
                                                            className="form-control"
                                                            placeholder="Mobile Number"
                                                            required
                                                            value={formData.contatctNo}
                                                            onChange={handleChange}
                                                            maxLength={10}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-sm-6 col-12">
                                                    <div class="form-group">
                                                        <input
                                                            type="text"
                                                            name="addressLine1"
                                                            id="addressline1"
                                                            className="form-control"
                                                            placeholder="Address Line1"
                                                            required
                                                            value={formData.addressLine1}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-sm-6 col-12">
                                                    <div class="form-group">
                                                        <input
                                                            type="text"
                                                            name="addressLine2"
                                                            id="addressline2"
                                                            className="form-control"
                                                            placeholder="Address Line2"
                                                            value={formData.addressLine2}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-sm-6 col-12">
                                                    <div class="form-group">
                                                        <select
                                                            name="countryId"
                                                            id="country"
                                                            className="form-control"
                                                            value={formData.countryId}
                                                            onChange={handleChange}
                                                            required
                                                        >
                                                            <option value="0">Select country</option>
                                                            <option value="1">India</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-sm-6 col-12">
                                                    <div class="form-group">
                                                        <select
                                                            name="stateId"
                                                            id="state"
                                                            className="form-control"
                                                            value={formData.stateId}
                                                            onChange={handleChange}
                                                            required
                                                        >
                                                            <option value="0" className="option">Select state</option>
                                                            {stateData?.map((state, i) => (
                                                                <option key={state.stateId} value={state.stateId} className="option">{state?.stateName}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-sm-6 col-12">
                                                    <div class="form-group">
                                                        <input
                                                            type="text"
                                                            name="city"
                                                            id="city"
                                                            className="form-control"
                                                            placeholder="City"
                                                            required
                                                            value={formData.city}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-sm-6 col-12">
                                                    <div class="form-group">
                                                        <input
                                                            type="text"
                                                            name="pincode"
                                                            id="zip"
                                                            className="form-control"
                                                            placeholder="Zip / postal code"
                                                            required
                                                            value={formData.pincode}
                                                            onChange={handleChange}
                                                            maxLength={6}
                                                        />
                                                    </div>
                                                </div>
                                                <button type="submit" id="" class="button_con">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                    {userAddress != null && showForm ?
                                        <div className="add_more_address_btn mt-2">
                                            <button className="text-white" onClick={handleBackToAddresses}>Back</button>
                                        </div> : null
                                    }
                                </>
                            )}
                        </div>

                        <div className="pcard d-flex justify-content-center col-xl-4 col-md-5 col-12">
                            <div className="address_checkout_card w-100">
                                <div className="order-total d-flex justify-content-start align-items-center">
                                    <span className="main-total fw-bold">Order Summary</span>
                                </div>
                                <div className="payment-detail">
                                    <div className="card-border-bottom d-flex justify-content-between align-items-center">
                                        <span className="subtotal">Subtotal</span>
                                        <span className="amount">₹ {totalAmount}</span>
                                    </div>
                                </div>
                                {userAddress.length && showForm === false ? (
                                    <div className="checkout mt-md-2 pt-2">
                                        <button onClick={onCheckout} className="" >Checkout</button>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default ShippingAddress;