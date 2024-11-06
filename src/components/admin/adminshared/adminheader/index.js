import React,{useState} from "react";
import { Link } from "react-router-dom";

const AdminHeader = ({toggleNav }) => {
    const [isDropdownOpenp, setIsDropdownOpenp] = useState(false);


    const handleMouseEnter = () => {
            setIsDropdownOpenp(true);
    };

    const handleMouseLeave = () => {
            setIsDropdownOpenp(false);
    };

    return (
        <nav className="navbar navbar-expand navbar-dark sticky-top px-4 py-0 admin-navbar">
            <Link to="index.html" className="navbar-brand d-flex d-lg-none me-4">
                <h2 className="text-primary mb-0"><i className="fa fa-user-edit"></i></h2>
            </Link>
            <span className="sidebar-toggler flex-shrink-0" onClick={toggleNav}>
                ☰ 
            </span>
            <div className="navbar-nav align-items-center ms-auto">
                <div className="nav-item dropdown">
                    <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                        <i className="fa fa-envelope me-lg-2"></i>
                        <span className="d-none d-lg-inline-flex">Message</span>
                    </Link>
                    <div className="dropdown-menu bg-transparent border-0 rounded-0 rounded-bottom m-0">
                        <Link to="#" className="dropdown-item">
                            <div className="d-flex align-items-center">
                                <img className="rounded-circle" src="https://img.freepik.com/premium-photo/indian-young-boy-with-indian-flag-his-hand_54391-2173.jpg" alt="" style={{ height: "40px", width: "40px" }} />
                                <div className="ms-2">
                                    <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                                    <small>15 minutes ago</small>
                                </div>
                            </div>
                        </Link>
                        <hr className="dropdown-divider" />
                        <a href="#" className="dropdown-item">
                            <div className="d-flex align-items-center">
                                <img className="rounded-circle" src="https://img.freepik.com/premium-photo/indian-young-boy-with-indian-flag-his-hand_54391-2173.jpg" alt="" style={{ height: "40px", width: "40px" }} />
                                <div className="ms-2">
                                    <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                                    <small>15 minutes ago</small>
                                </div>
                            </div>
                        </a>
                        <hr className="dropdown-divider" />
                        <a href="#" className="dropdown-item">
                            <div className="d-flex align-items-center">
                                <img className="rounded-circle" src="https://img.freepik.com/premium-photo/indian-young-boy-with-indian-flag-his-hand_54391-2173.jpg" alt="" style={{ height: "40px", width: "40px" }} />
                                <div className="ms-2">
                                    <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                                    <small>15 minutes ago</small>
                                </div>
                            </div>
                        </a>
                        <hr className="dropdown-divider" />
                        <a href="#" className="dropdown-item text-center">See all message</a>
                    </div>
                </div>
                <div className="nav-item dropdown">
                    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                        <i className="fa fa-bell me-lg-2"></i>
                        <span className="d-none d-lg-inline-flex">Notificatin</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                        <a href="#" className="dropdown-item">
                            <h6 className="fw-normal mb-0">Profile updated</h6>
                            <small>15 minutes ago</small>
                        </a>
                        <hr className="dropdown-divider" />
                        <a href="#" className="dropdown-item">
                            <h6 className="fw-normal mb-0">New user added</h6>
                            <small>15 minutes ago</small>
                        </a>
                        <hr className="dropdown-divider" />
                        <a href="#" className="dropdown-item">
                            <h6 className="fw-normal mb-0">Password changed</h6>
                            <small>15 minutes ago</small>
                        </a>
                        <hr className="dropdown-divider" />
                        <a href="#" className="dropdown-item text-center">See all notifications</a>
                    </div>
                </div>

                <div className="nav-item dropdown user" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"  aria-expanded={isDropdownOpenp} >
                        <img className="rounded-circle me-lg-2" src="https://img.freepik.com/premium-photo/indian-young-boy-with-indian-flag-his-hand_54391-2173.jpg" alt="" style={{height:"40px",width:"40px"}} />
                        <span className="d-none d-lg-inline-flex">John Doe</span>
                    </Link>
                    <div className={`dropdown-menu admin-profile-dropdown border-0 rounded-0 rounded-bottom m-0 ${isDropdownOpenp ? 'show' : ''}`} style={{ position: "absolute", right: 0, zIndex: '9999' }}>
                        <Link to="#" className="dropdown-item profile-dropdown-item">My Profile</Link>
                        <Link to="#" className="dropdown-item profile-dropdown-item">Settings</Link>
                        <Link to="#" className="dropdown-item profile-dropdown-item">Log Out</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default AdminHeader;