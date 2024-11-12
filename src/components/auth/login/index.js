import { useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import axios from "axios";
import { DAPI_URL, baseurl } from "../../../_config";
import { decryptString } from "../../../_services";
import CryptoJS from 'crypto-js';
import './login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ph, setPh] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [loginDetail, setLoginDetail] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [jwtToken, setJwtToken] = useState('')
    const [isPassword, setIsPassword] = useState(true);
    const [isMobileNumber, setIsMobileNumber] = useState(false);

    const secretKey = CryptoJS.enc.Utf8.parse("uitsufdytuiysdifdsfdsfdhgtyuijkj");
    const iv = CryptoJS.enc.Utf8.parse("1234567890123456");

    const validatePhoneNumber = (phone) => {
        const isValid = /^\d{10}$/.test(phone) && parseInt(phone[0], 10);
        return isValid;
    };

    const onPasswordLogin = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${baseurl}${DAPI_URL.GetLoginDetailByUserPass}`, {
                params: {
                    pUserName: email,
                    pPassword: password
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status == 200) {
                if (response.data.isSuccess === 200) {
                    const encryptedData = response.data?.data;
                    if (!encryptedData || typeof encryptedData !== 'string' || encryptedData.trim() === '') {
                        throw new Error("Invalid or empty encrypted data format");
                    }

                    const result = decryptString(encryptedData, secretKey, iv);

                    const parsedData = JSON.parse(result);
                    localStorage.setItem('user', 'true');
                    localStorage.setItem('SJloginId', parsedData[0].loginId);
                    localStorage.setItem('SJjwtToken', response.data.token);
                    toast.success("Login Successfully");
                    navigate('/');
                } else {
                    alert('You are not registered');
                    navigate('/register');
                }
            }
        } catch (error) {
            toast.error("Please try again later.");
        } finally {
            setLoading(false);
            setEmail("");
            setPassword("");
        }
    };

    const getLoginDetailByMobileNo = async (mobileNo) => {
        setLoading(true);
        try {
            const response = await axios.post(`${baseurl}${DAPI_URL.login}`, {
                mobileNo: mobileNo
            });

            if (response.status === 200) {
                if (response.data.isSuccess == 200 && response.data.data.length > 0) {
                    const encryptedData = response.data?.data;
                    if (!encryptedData || typeof encryptedData !== 'string' || encryptedData.trim() === '') {
                        throw new Error("Invalid or empty encrypted data format");
                    }

                    const result = decryptString(encryptedData, secretKey, iv);

                    const parsedData = JSON.parse(result);

                    setLoginDetail(parsedData[0]);

                    const token = response.data.token;
                    setJwtToken(token)
                }
            } else {
                toast.error("Mobile number not registered");
                setLoginDetail(null);
            }
        } catch (error) {
            toast.error("Mobile number not registered");
        } finally {
            setLoading(false);
        }
    };

    const handleMobileChange = (e) => {
        const value = e.target.value;
        const numericValue = value.replace(/[^0-9]/g, '');

        if (value !== numericValue) {
            alert("You can enter only numbers.");
        }

        setPh(numericValue.slice(0, 10));

        if (numericValue.length === 10) {
            getLoginDetailByMobileNo(numericValue);
        } else {
            setLoginDetail(null);
        }
    };

    const sendOtp = async () => {
        if (!validatePhoneNumber(ph)) {
            toast.error("Please Enter Valid Mobile Number");
            return;
        }

        const phoneNumber = ph.toString();
        if (!loginDetail) {
            toast.error("Mobile number is not registered");
            navigate('/register');
            return;
        }

        setLoading(true);
        const apiUrl = `${baseurl}${DAPI_URL.SentOtp}`;

        try {
            const response = await axios.post(apiUrl, {
                mobileNo: `${phoneNumber}`
            }, { timeout: 5000 });

            if (response.status === 200) {
                if (response.data.isSuccess == 200) {
                    setShowOtpInput(true);
                    toast.success("OTP Sent Successfully");
                }
            }
        } catch (error) {
            toast.error("Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async () => {
        if (!otp) {
            toast.error("Please enter the OTP");
            return;
        }

        setLoading(true);
        const apiUrl = `${baseurl}${DAPI_URL.VerifyOTP}`;

        try {
            const response = await axios.post(apiUrl, {
                mobileNo: `${ph}`,
                OTP: otp,
            });

            if (response.status == 200) {
                if (response.data.isSuccess === 200) {
                    localStorage.setItem('user', 'true');
                    localStorage.setItem('SJloginId', loginDetail.loginId);
                    localStorage.setItem('SJjwtToken', jwtToken);
                    toast.success("OTP Verified Successfully");
                    // if (cartData.length > 0 && cartData != null) {
                    // dispatch(syncCartAfterLogin());
                    navigate('/cart');
                    // } else {
                    //     navigate('/');
                    // }
                } else {
                    toast.error("OTP Verification failed");
                }
            }
            else {
                toast.error("OTP Verification failed");
            }
        } catch (error) {
            toast.error("Failed to Verify OTP");
        } finally {
            setLoading(false);
        }
    };

    const OnLoginType = () => setIsMobileNumber(prev => !prev);

    return (
        <>
            <div className="userlogin">
                <Toaster position="top-right" />
                <div className="" style={{ backgroundColor: "transparent" }}>
                    <Header />
                </div>
                <section className="py-5">
                    <div className="container-screen userform-main h-100">
                        <div className="d-md-flex justify-content-between">
                            <div className="form-content col-md-6">
                                <h1 className="mb-4">WELCOME BUDDY</h1>
                                <p>Lorem ipsum dolor sit amet consectetur. Sit bibendum pellentesque id faucibus diam. Eu risus augue platea a sem quis pharetra.</p>
                            </div>
                            <div className="col-xl-4 col-lg-5 col-md-6 userloginform">
                                <div className="userform-heading text-center">
                                    <h4>Login</h4>
                                </div>
                                {/* <form>
                                    <div className="form-outline mb-4">
                                        <input type="email" id="typeEmailX-2" className="form-control" required placeholder="Email" />
                                    </div>

                                    <div className="form-outline mb-2">
                                        <input type="password" id="typePasswordX-2" className="form-control" required placeholder="Password" />
                                    </div>
                                    <div className="form-check form-check-inline mb-4 d-flex justify-content-between">
                                        <div>
                                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                                            <span>Remember me</span>
                                        </div>
                                        <Link to="/forgotpassword" className="forgot-password"><span>Forgot Password</span></Link>
                                    </div>
                                    <div className="user-loginbtn text-white mb-2">
                                        <button onClick={onLogin}>Login</button>
                                        <Toaster position="top-right" />
                                    </div>
                                </form> */}
                                <form onSubmit={(e) => e.preventDefault()}>
                                    {isMobileNumber ? (
                                        <>
                                            <div className="form-outline mb-3">
                                                <input
                                                    type="text"
                                                    name="mobile"
                                                    id="mobile"
                                                    placeholder="Enter Mobile Number"
                                                    value={ph}
                                                    onChange={handleMobileChange}
                                                    disabled={showOtpInput}
                                                    style={{ flex: 1 }}
                                                    maxLength={10}
                                                    className="form-control"
                                                />
                                            </div>

                                            {showOtpInput && (
                                                <div className="otp_input form-outline mb-3">
                                                    {/* <label htmlFor="otp">OTP</label> */}
                                                    <input
                                                        type="text"
                                                        name="otp"
                                                        id="otp"
                                                        placeholder="Enter OTP"
                                                        value={otp}
                                                        onChange={(e) => setOtp(e.target.value)}
                                                        className="form-control"
                                                    />
                                                </div>
                                            )}

                                            <div className="user-loginbtn text-white mb-3">
                                                <button
                                                    type="button"
                                                    className="otp_btn"
                                                    onClick={showOtpInput ? verifyOtp : sendOtp}
                                                    disabled={loading}
                                                >
                                                    {showOtpInput ? 'Verify OTP' : 'Send OTP'}
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="form-outline mb-3">
                                                <input
                                                    name="email"
                                                    id="email"
                                                    className="form-control"
                                                    required
                                                    type="email"
                                                    placeholder="Enter EmailId"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>

                                            <div className="form-outline mb-3">
                                                <input
                                                    name="password"
                                                    type="password"
                                                    id="password"
                                                    className="form-control"
                                                    required
                                                    placeholder="Enter Your Password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-check form-check-inline mb-4 d-flex justify-content-between">
                                                <div>
                                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                                                    <span>Remember me</span>
                                                </div>
                                                <Link to="/forgotpassword" className="forgot-password"><span>Forgot Password</span></Link>
                                            </div>
                                            <div className="user-loginbtn text-white mb-2">
                                                <button
                                                    type="button"
                                                    onClick={onPasswordLogin}
                                                    disabled={loading}
                                                >
                                                    {loading ? "Logging in..." : "Login"}
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </form>
                                <div className="d-sm-flex justify-content-between pt-2">
                                    {showOtpInput ? <p
                                        onClick={sendOtp}
                                        disabled={loading}
                                        className="resend_otp"
                                        style={{ color: '#7471fd', cursor: 'pointer' }}
                                    >Resend</p> : null}
                                    <div className="userformlinks d-flex justify-content-center align-items-center">
                                        <span className="acno-text text-white">Don't have account?</span>
                                        <Link to="/register" className="register pl-1"><span>Register</span></Link>
                                    </div>
                                </div>
                                <div className="d-sm-flex justify-content-center pt-2">
                                    <p className="mb-0 login_btn" onClick={OnLoginType} style={{ color: '#166cfd', cursor: 'pointer' }}>{isMobileNumber ? "Login with UserName & Password" : "Login with OTP"}</p>
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

export default Login;