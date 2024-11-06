import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import axios from "axios";
import { DAPI_URL,baseurl } from "../../../_config";
import { decryptString } from "../../../_services";
import CryptoJS from 'crypto-js';
import './register.css';

const Register = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const secretKey = CryptoJS.enc.Utf8.parse("uitsufdytuiysdifdsfdsfdhgtyuijkj");
    const iv = CryptoJS.enc.Utf8.parse("1234567890123456");

    const [formData, setFormData] = useState({
        Name: "",
        EmailId: "",
        MobileNo: "",
        Password: "",
        ConfirmPassword: "",
        CreatedBy: 0,
        RoleId: 1
    });

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

    const onRegister = async (e) => {
        e.preventDefault();
        if (!validateEmail(formData.EmailId)) {
            toast.error("Please enter a valid Email Address");
            return;
        }

        if (!validatePhoneNumber(formData.MobileNo)) {
            toast.error("Please enter a valid mobile number");
            return;
        }

        if (formData.Password !== formData.ConfirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post(`${baseurl}${DAPI_URL?.SaveLoginDetail}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 200) {
                if (response.data.isSuccess == 200) {
                    const encryptedData = response.data?.data;
                    if (!encryptedData || typeof encryptedData !== 'string' || encryptedData.trim() === '') {
                        throw new Error("Invalid or empty encrypted data format");
                    }

                    const result = decryptString(encryptedData, secretKey, iv);

                    const parsedData = JSON.parse(result);

                    const jwtToken = response.data.token;
                    localStorage.setItem('jwtToken', jwtToken);
                    const { loginId } = parsedData;
                    localStorage.setItem('loginId', loginId);
                    localStorage.setItem('user', 'true');
                    toast.success("Registration successful!");
                    // if (cartData.length > 0 && cartData != null) {
                        // dispatch(syncCartAfterLogin());
                        // navigate('/cart');
                    // } else {
                        navigate('/');
                    // }
                }
                else {

                    alert("You are already registered. Please login.");
                    navigate('/login');
                }
            } else {
                toast.error("Failed to submit form data");
            }
        } catch (error) {
            toast.error("Please try again later.");
        } finally {
            setFormData({
                Name: "",
                EmailId: "",
                MobileNo: "",
                Password: "",
                ConfirmPassword: "",
            })
        }
    };

    return (
        <>
            <div className="userregister">
                <Toaster/>
                <div className="" style={{ backgroundColor: "transparent" }}>
                    <Header />
                </div>
                <section className="py-5">
                    <div className="container userform-main h-100">
                        <div className="d-md-flex justify-content-between">
                            <div className="form-content col-md-6">
                                <h1 className="mb-md-4 mb-2">WELCOME BUDDY</h1>
                                <p>Lorem ipsum dolor sit amet consectetur. Sit bibendum pellentesque id faucibus diam. Eu risus augue platea a sem quis pharetra.</p>
                            </div>
                            <div className="col-xl-4 col-lg-5 col-md-6 userregisterform">
                                <div className="userform-heading text-center">
                                    <h4>Register</h4>
                                </div>
                                <form onSubmit={onRegister}>
                                    <div className="form-outline mb-4">
                                        <input
                                            type="text"
                                            name="Name"
                                            className="form-control"
                                            placeholder="Full Name"
                                            required
                                            value={formData.Name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input
                                            type="email"
                                            name="EmailId"
                                            className="form-control"
                                            placeholder="Email"
                                            required
                                            value={formData.EmailId}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input
                                            type="text"
                                            name="MobileNo"
                                            className="form-control"
                                            placeholder="Mobile Number"
                                            required
                                            value={formData.MobileNo}
                                            onChange={handleChange}
                                            maxLength={10}
                                        />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input
                                            type="password"
                                            name="Password"
                                            className="form-control"
                                            placeholder="Password"
                                            required
                                            value={formData.Password}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input
                                            type="password"
                                            name="ConfirmPassword"
                                            className="form-control"
                                            placeholder="Confirm Password"
                                            required
                                            value={formData.ConfirmPassword}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="user-registerbtn text-white mb-2">
                                        <button type="submit">Register</button>
                                    </div>
                                </form>
                                <Toaster position="top-right" />
                                <div className="userformlinks d-flex justify-content-center align-items-center">
                                    <span className="acno-text text-white">Already have an account?</span>
                                    <Link to="/login" className="register pl-1 login_btn"><span>Login</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}

export default Register;