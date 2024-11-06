import React, { useState, useEffect } from "react";
import AdminLayout from "../../adminshared/layout";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { imageurl, DAPI_URL } from '../../../../_config';

const baseUrl = process.env.REACT_APP_BASE_URL;

const AdminSpecification = () => {
    const [isFormopen, setIsFormopen] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [specificationData, setSpecificationData] = useState([]);
    const [specificationId, setspecificationId] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        displayName: '',
        isActive: false
    });

    const handleReset = () => {
        setFormData({
            name: '',
            displayName: '',
            isActive: false
        });
    };

    const fetchSpecificationData = async () => {
        try {
            const response = await axios.get(`${baseUrl}${DAPI_URL.getSpecification}`);
            if (response.status === 200) {
                setSpecificationData(response.data.data);
            } else {
                setError("Failed to fetch product Data");
            }
        } catch (error) {
            setError("Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const onSave = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseUrl}${DAPI_URL?.saveSpecification}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                fetchSpecificationData();
                toast.success("Save Successfully");
            } else {
                setError("Failed to submit form data");
            }
        } catch (error) {
            // console.error('Error submitting form data:', error.response || error.message || error);
            setError("Please try again later.");
        }
        finally {
            setFormData({
                name: '',
                displayName: '',
                isActive: false
            });
            setIsFormopen(false);
        }
    };

    const onEdit = (item) => {
        setspecificationId(item?.specificationId)
        setIsFormopen(true);
        setFormData({
            ...formData,
            specificationId: item.specificationId,
            name: item?.name,
            displayName: item?.displayName,
            isActive: item?.isActive
        })
    }

    const onDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this item?");

        if (!isConfirmed) {
            return;
        }

        try {
            const response = await axios.get(`${baseUrl}${DAPI_URL.deleteSpecification}`, {
                params: {
                    pSpecificationId: id
                }
            });

            if (response.status === 200) {
                toast.success("Delete Successfully");
                fetchSpecificationData();
            } else {
                setError("Failed to delete category");
            }
        } catch (error) {
            // console.error('Error deleting category:', error.response || error.message || error);
            setError("Please try again later.");
        }
    };

    const isActiveToggle = async (id) => {
        try {
            const response = await axios.get(`${baseUrl}${DAPI_URL.isActiveSpecification}`, {
                params: {
                    pSpecificationId: id
                }
            });
            if (response.status === 200) {
                toast.success("Update Successfully");
                fetchSpecificationData();
            } else {
                setError("Failed to Update category");
            }
        } catch (error) {
            console.error('Error Updating category:', error.response || error.message || error);
            setError("Please try again later.");
        }
    }

    const onOpen = () => {
        setspecificationId(null)
        setFormData({
            name: '',
            displayName: '',
            isActive: false
        });
        setIsFormopen(true)
    }

    useEffect(() => {
        fetchSpecificationData();
    }, []);

    return (
        <AdminLayout>
            <div className="px-4">
                <div className="admin-page mt-3 d-sm-flex justify-content-between align-items-center">
                    <div className="admin-heading" style={{ gap: "20px" }}>
                        <h4 className="mb-0">Product Specification</h4>
                    </div>
                    <div className="add_btn">
                        <button onClick={onOpen}>Add Specification</button>
                    </div>
                </div>
                <div >
                    <div className="datatable mt-4">
                        <div className="table-sec">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Display Name</th>
                                        <th>isActive</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {error ? (
                                    <p>Error: {error}</p>
                                ) : specificationData !== null ? (
                                    specificationData.length > 0 ? (
                                        <tbody>
                                            {specificationData?.map((item, i) => (
                                                <tr key={i}>
                                                    <td>{item?.name}</td>
                                                    <td>{item?.displayName}</td>
                                                    <td onClick={() => isActiveToggle(item?.specificationId)} className="active-toggle">
                                                        <button>
                                                            {item?.isActive ? "Active" : "Deactive"}
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex" style={{ gap: "10px" }}>
                                                            <span onClick={() => { onEdit(item) }} title="Edit">
                                                                <svg id="Layer_1" viewBox="0 0 512 512" width="18" height="18" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                                    <g transform="matrix(1,0,0,1,0,0)">
                                                                        <g id="Layer_2">
                                                                            <g id="Layer_1_copy_4">
                                                                                <g id="_74">
                                                                                    <path d="m41.3 512c-22.8 0-41.3-18.5-41.3-41.3 0-2.6.2-5.2.7-7.7l27.3-144.8c1.5-8.2 5.5-15.7 11.4-21.5l274-274c14.7-14.7 35.1-22.7 57.7-22.7 8.1 0 16.1 1 24 2.8 25.5 5.9 51.1 20.7 72.2 41.8s36 46.7 41.8 72.2c7.4 31.9.2 61.7-19.8 81.7l-274 274c-5.9 5.9-13.4 9.8-21.5 11.4l-144.8 27.4c-2.5.5-5.1.7-7.7.7zm51.8-93.1 72.9-13.8 182-182-59.1-59.1-182 182zm313.3-254.2 23.1-23.1c.2-5.4-3.8-21.8-20.6-38.5-10.1-10.2-22-17.4-32.4-19.8-1.8-.4-3.7-.7-5.5-.7h-.7l-23 23z" fill="#526484" />
                                                                                    <path d="m499.4 119.1c-5.4-23.7-19.4-47.6-39.1-67.4s-43.8-33.7-67.4-39.1c-28.5-6.6-54.9-.4-72.3 17.1l-274 274c-4.5 4.4-7.5 10.1-8.7 16.3l-27.4 144.9c-3.2 17 8 33.4 24.9 36.6 1.9.4 3.9.5 5.8.5s3.9-.2 5.8-.5l145-27.4c6.2-1.2 11.9-4.2 16.3-8.6l274-274c17.5-17.5 23.7-43.9 17.1-72.4zm-328.5 295.3-90.3 17 17-90.3 191.3-191.3 73.3 73.3zm267.2-267.2-31.7 31.7-73.2-73.3 31.7-31.7c1-1 5.6-2.3 14-.4 12.2 2.8 25.8 11 37.2 22.4 23.5 23.7 25.6 47.7 22 51.3z" fill="url(#gradient1)" />
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <defs>
                                                                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                                                            <stop offset="0%" stopColor="#526484" />
                                                                            <stop offset="100%" stopColor="#0063ff" />
                                                                        </linearGradient>
                                                                    </defs>
                                                                </svg>
                                                            </span>
                                                            <span onClick={() => onDelete(item?.specificationId)} title="Delete">
                                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                                                                    <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" fill="#526484"></path>
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    ) : (
                                        <p>No data available</p>
                                    )
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
                <div id="entryformContainer" className={`adminform entryform ${isFormopen ? 'open' : ''}`}>
                    <div className="closebtn">
                        <button className="" onClick={() => setIsFormopen(false)} >
                            <svg clipRule="evenodd" fillRule="evenodd" height="30" imageRendering="optimizeQuality" shapeRendering="geometricPrecision" textRendering="geometricPrecision" viewBox="0 0 6.82666 6.82666" width="30" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" >
                                <g transform="matrix(1,0,0,1,0,0)">
                                    <g id="Layer_x0020_1">
                                        <rect fill="#ffffff00" height="6.827" rx="1.507" width="6.827" stroke="none" />
                                        <path d="m2.21002 1.41333-.79669.79669 1.20331 1.20331-1.20331 1.20331.79669.79669 1.20331-1.20331 1.20332 1.20331.79668-.79669-1.2033-1.20331 1.2033-1.20331-.79669-.79669-1.20331 1.2033z" fill="#fffffe" stroke="none" />
                                    </g>
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div className="enForm">
                        <div className="text-center form-heading">
                            <h4>Add Product Category</h4>
                        </div>
                        <form onSubmit={onSave}>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Name</label>
                                <input type="text" className="form-control" id="name" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Display Name</label>
                                <input type="text" className="form-control" id="displayName" name="displayName" placeholder="Display Name" value={formData.displayName} onChange={handleChange} required/>
                            </div>
                            <div className="form-group d-flex">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="isActive" name="isActive" value={formData.isActive} onChange={handleChange} />
                                </div>
                                <label htmlFor="exampleFormControlInput1">isActive</label>
                            </div>
                            <div className="d-flex form-buttons" style={{ gap: "15px" }}>
                                <div className="submit-btn pt-2">
                                    <button type="submit">{specificationId ? 'Update' : 'Submit'}</button>
                                </div>
                                <div className="reset-btn pt-2">
                                    <button className="button" onClick={handleReset}>Reset</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <Toaster position="top-right" />
            </div>
        </AdminLayout>
    )
}

export default AdminSpecification;