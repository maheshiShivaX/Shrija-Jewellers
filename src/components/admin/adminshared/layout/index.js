import React, { useState,useEffect } from "react";
import AdminHeader from "../adminheader";
import AdminSideBar from "../sidebar";


const AdminLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleNav = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    useEffect(() => {
        const container = document.getElementById("container");
        if (isSidebarOpen) {
            container.classList.add("sidebar-open");
        } else {
            container.classList.remove("sidebar-open");
        }
    }, [isSidebarOpen]);

    return (
        <div id="container" className="container-fluid position-relative d-flex p-0">
            <div id="mySidebar" className="sidebar">
                <AdminSideBar />
            </div>

            <div id="main" className="content">
                <AdminHeader toggleNav={toggleNav} />
                {children}
            </div>
        </div>
    )
}

export default AdminLayout;