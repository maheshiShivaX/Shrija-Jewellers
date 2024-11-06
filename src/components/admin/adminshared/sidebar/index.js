import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const sideMenu = [
    {
        menuName: "Dashboard",
        icon: "fa fa-tachometer-alt",
        link: "/admin/dashboard"
    },
    {
        menuName: "Masters",
        icon: "fa fa-laptop",
        submenu: [
            {
                subMenuName: "Product Category",
                link: '/admin/masters/productcategory'
            },
            {
                subMenuName: "Product Sub Category",
                link: '/admin/masters/productsubcategory'
            },
            {
                subMenuName: "Product Detail",
                link: '/admin/masters/productdetail'
            },
            {
                subMenuName: "Specification",
                link: '/admin/masters/specification'
            },
        ]
    },
];

const AdminSideBar = () => {
    const [activeItem, setActiveItem] = useState(0);
    const [sideMenuDropdown, setSideMenuDropdown] = useState(null);

    const toggleDropdown = (item) => {
        setSideMenuDropdown(prevItem => (prevItem === item ? null : item));
    };

    const handleItemClick = (e) => {
        setActiveItem(e);
    };

    return (
        <>
            <div className="sidebar pb-3">
                <nav className="navbar  navbar-dark sidebarcontent">
                    <Link to="/" className="navbar-brand mx-4 mb-2 pt-3">
                        <h3 className="text-primary sidebar-logo"><img src='./images/logo.png' /></h3>
                    </Link>
                    <div className="navbar-nav w-100">
                        {sideMenu?.map((item, i) => (
                            <React.Fragment key={i}>
                                <div className="nav-item dropdown">
                                    <Link to={item.link} className={`nav-link ${activeItem === i ? 'active' : ''} `} onClick={()=>handleItemClick(i)}>
                                        <div
                                            className={`d-flex justify-content-between align-items-center"`}
                                            data-bs-toggle="dropdown"
                                            onClick={() => toggleDropdown(item)}
                                        >
                                            <div className='d-flex align-items-center' style={{ gap: "5px" }}>
                                                <i className={`${item.icon}`}></i>
                                                <span>{item?.menuName}</span>
                                            </div>
                                            {item?.submenu && (
                                                <div className='d-flex align-items-center'>
                                                    <svg width="15" height="12" viewBox="0 0 8 5" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg" className={`arrow mb-0 ${sideMenuDropdown === item ? 'rotate' : ''}`}>
                                                        <path
                                                            d="M4.00012 0.74955L7.18213 3.9315L6.12146 4.99219L4.00012 2.87085L1.87882 4.99219L0.81817 3.9315L4.00012 0.74955Z"
                                                            fill="#747684" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                    {item?.submenu && sideMenuDropdown === item && (
                                        <div className="dropdown-content">
                                            {item.submenu.map((element, j) => (
                                                <Link to={element.link} className="dropdown-item" key={j}>
                                                    <li>{element?.subMenuName}</li>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </nav >
            </div >
        </>
    )
}

export default AdminSideBar;