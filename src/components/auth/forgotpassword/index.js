import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import './forgotpassword.css';
import Header from "../../layout/header";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const onSubmit = () => {
        toast.success('Sent Link on your Email Successfully');
        
        setTimeout(() => {
          navigate("/login");
        }, 500); 
      };
    


    return (
        <div className="forgotpassword">
            <div className="desktop-header" style={{ backgroundColor: "transparent" }}>
                <Header />
            </div>
            <section className="py-5 vh-100">
                <div className="container userform-main h-100">
                    <div className="d-flex justify-content-center">
                        <div className="col-4 userloginform">
                            <div className="userform-heading text-center">
                                <h4>Forgot Password</h4>
                            </div>
                            <form>
                                <div className="form-outline mb-4">
                                    <input type="email" id="typeEmailX-2" className="form-control" required placeholder="Email/Mobile Number" />
                                </div>

                                {/* <div className="form-outline mb-4">
                                    <input type="password" id="typePasswordX-2" className="form-control" required placeholder="Password" />
                                </div> */}
                                <div className="user-loginbtn text-white mb-2">
                                    <button onClick={onSubmit}>Submit</button>
                                    <Toaster position="top-right" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ForgotPassword;