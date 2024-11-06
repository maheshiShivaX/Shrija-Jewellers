import React, { useState, useEffect } from "react";
import AdminLayout from "../../adminshared/layout";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { imageurl, DAPI_URL } from '../../../../_config';

const baseUrl = process.env.REACT_APP_BASE_URL;

const AdminProductCategory = () => {
    const [isFormopen, setIsFormopen] = useState(false);
    const [isFormopenu, setIsFormopenu] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [productCategoryId, setProductCategoryId] = useState(null);

    const [formData, setFormData] = useState({
        categoryCode: '',
        categoryName: '',
        displayName: '',
        displayDesc: '',
        file: null,
        imgPath: '',
        isDisplay: false,
        isActive: false
    });

    const [uploadFormData, setUploadFormData] = useState({
        productCategoryId: null,
        file: null,
        imgPath: '',
    });

    const fetchCategoryData = async () => {
        try {
            const response = await axios.get(`${baseUrl}${DAPI_URL?.getProductCategory}`);

            if (response.status === 200) {
                setCategoryData(response.data.data);
            } else {
                setError("Failed to fetch Category Data");
            }
        } catch (error) {
            // console.error('Error fetching category data:', error);
            setError("Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : (type === 'file' ? files[0] : value)
        }));
    };

    const onSave = async (e) => {
        e.preventDefault();
        try {
            const API_URL = `${baseUrl}${DAPI_URL?.saveProductCategory}`;

            const response = await axios.post(API_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                // setCategoryData(prevCategoryData => [...prevCategoryData, response.data.data]);
                fetchCategoryData();
                toast.success("Save Successfully");
            } else {
                setError("Failed to submit form data");
            }
        } catch (error) {
            // console.error('Error submitting form data:', error.response || error.message || error);
            setError("Please try again later.");
        } finally {
            setProductCategoryId(null);
            setFormData({
                categoryCode: '',
                categoryName: '',
                displayName: '',
                displayDesc: '',
                isDisplay: false,
                isActive: false,
                file: null,
                imgPath: null
            });
            setIsFormopen(false);
        }
    };

    const onDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this item?");

        if (!isConfirmed) {
            return;
        }

        try {
            const response = await axios.get(`${baseUrl}${DAPI_URL?.DeleteProductCategory}`, {
                params: {
                    pProductCategoryId: id
                }
            });

            if (response.status === 200) {
                toast.success("Delete Successfully");
                fetchCategoryData();
            } else {
                setError("Failed to delete category");
            }
        } catch (error) {
            // console.error('Error deleting category:', error.response || error.message || error);
            setError("Please try again later.");
        }
    };

    const handleReset = () => {
        setFormData({
            categoryCode: '',
            categoryName: '',
            displayName: '',
            displayDesc: '',
            isDisplay: false,
            file: null,
            imgPath: null,
            isDisplay: false,
            isActive: false
        });
    };

    const onEdit = (item) => {
        setProductCategoryId(item?.productCategoryId)
        setIsFormopen(true);
        setFormData({
            ...formData,
            productCategoryId: item?.productCategoryId,
            categoryCode: item?.categoryCode,
            categoryName: item?.categoryName,
            displayName: item?.displayName,
            displayDesc: item?.displayDesc,
            isDisplay: item?.isDisplay,
            file: item?.file,
            imgPath: item?.imgPath,
            isActive: item?.isActive
        })
    }

    const isDisplayToggle = async (id) => {
        try {
            const response = await axios.get(`${baseUrl}${DAPI_URL?.IsDisplayProductCategory}`, {
                params: {
                    pProductCategoryId: id
                }
            });
            if (response.status === 200) {
                toast.success("Update Successfully");
                fetchCategoryData();
            } else {
                setError("Failed to Update category");
            }
        } catch (error) {
            console.error('Error Updating category:', error.response || error.message || error);
            setError("Please try again later.");
        }
    }

    const isActiveToggle = async (id) => {
        try {
            const response = await axios.get(`${baseUrl}${DAPI_URL?.IsActiveProductCategory}`, {
                params: {
                    pProductCategoryId: id
                }
            });
            if (response.status === 200) {
                toast.success("Update Successfully");
                fetchCategoryData();
            } else {
                setError("Failed to Update category");
            }
        } catch (error) {
            console.error('Error Updating category:', error.response || error.message || error);
            setError("Please try again later.");
        }
    }

    const onOpen = () => {
        setProductCategoryId(null);
        setFormData({
            categoryCode: '',
            categoryName: '',
            displayName: '',
            displayDesc: '',
            isDisplay: false,
            isActive: false,
            file: '',
            imgPath: 'null'
        });
        setIsFormopen(true);
    }

    // upload image
    const onUploadForm = (item) => {
        setUploadFormData(prevState => ({
            ...prevState,
            productCategoryId: item.productCategoryId,
        }));
        setIsFormopenu(true)
    }

    const handleFileChange = async (event) => {
        event.preventDefault();
        const { name, value, type, checked, files } = event.target;

        setUploadFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : (type === 'file' ? files[0] : value)
        }));
    };

    const onUpload = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseUrl}${DAPI_URL?.UploadProductCategoryImage}`, uploadFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                toast.success("Upload Successful");
                fetchCategoryData();
                setIsFormopenu(false)
            } else {
                setError("Failed to upload image");
            }
        } catch (error) {
            setError("Please try again later.");
        }
    }

    return (
        <AdminLayout>
            <div className="px-4">
                <div className="admin-page mt-3 d-sm-flex justify-content-between align-items-center">
                    <div className="admin-heading" style={{ gap: "20px" }}>
                        <h4 className="mb-0">Product Category</h4>
                    </div>
                    <div className="add_btn">
                        <button onClick={() => onOpen()}>Add Product Category</button>
                    </div>
                </div>
                <div >
                    <div className="datatable mt-4">
                        <div className="table-sec">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Category Code</th>
                                        <th>Category Name</th>
                                        <th>Display Name</th>
                                        <th>Display Description</th>
                                        <th>isDisplay</th>
                                        <th>isActive</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {error ? (
                                    <p>Error: {error}</p>
                                ) : categoryData !== null ? (
                                    categoryData.length > 0 ? (
                                        <tbody>
                                            {categoryData?.map((item, i) => (
                                                <tr key={i}>
                                                    <td className="table-product-image">
                                                        {item.imgPath ? (
                                                            <>
                                                                <img src={`${imageurl}${item?.imgPath}`} alt="" onClick={() => onUploadForm(item)} />
                                                            </>
                                                        ) : (
                                                            <span>No Image</span>
                                                        )}
                                                    </td>
                                                    <td>{item?.categoryCode}</td>
                                                    <td>{item?.categoryName}</td>
                                                    <td>{item?.displayName}</td>
                                                    <td>{item?.displayDesc}</td>
                                                    <td onClick={() => isDisplayToggle(item?.productCategoryId)}>
                                                        {item?.isDisplay ? (
                                                            <svg fill="none" height="20" viewBox="0 0 12 12" width="20" xmlns="http://www.w3.org/2000/svg">
                                                                <g transform="matrix(1,0,0,1,0,0)">
                                                                    <path d="M0 9h5v2H3v1h6v-1H7v-2h5V0H0z" fill="#526484" stroke="none" />
                                                                </g>
                                                            </svg>
                                                        ) : (
                                                            <svg viewBox="0 0 20 20" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                                                                <g transform="matrix(1,0,0,1,0,0)">
                                                                    <path d="M19 0H1c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h5v2h-1c-.6 0-1 .4-1 1s.4 1 1 1h10c.6 0 1-.4 1-1s-.4-1-1-1h-1v-2h5c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1zm-7 18h-4v-2h4zm6-4H2V4h16z" fill="#526484" />
                                                                    <path d="M7.3 10.7c.4.4 1 .4 1.4 0l1.3-1.3 1.3 1.3c.4.4 1 .4 1.4 0s.4-1 0-1.4l-1.3-1.3 1.3-1.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-1.3 1.3-1.3-1.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.3 1.3-1.3 1.3c-.4.4-.4 1 0 1.4z" fill="#526484" />
                                                                </g>
                                                            </svg>
                                                        )}</td>
                                                    <td onClick={() => isActiveToggle(item?.productCategoryId)} className="active-toggle">
                                                        <button>
                                                            {item?.isActive ? "Active" : "Deactive"}
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex" style={{ gap: "10px" }}>
                                                            <span
                                                                onClick={() => { onEdit(item) }}
                                                                title="Edit"
                                                            >
                                                                <svg
                                                                    id="Layer_1"
                                                                    viewBox="0 0 512 512"
                                                                    width="18"
                                                                    height="18"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                >
                                                                    <g transform="matrix(1,0,0,1,0,0)">
                                                                        <g id="Layer_2">
                                                                            <g id="Layer_1_copy_4">
                                                                                <g id="_74">
                                                                                    <path
                                                                                        d="m41.3 512c-22.8 0-41.3-18.5-41.3-41.3 0-2.6.2-5.2.7-7.7l27.3-144.8c1.5-8.2 5.5-15.7 11.4-21.5l274-274c14.7-14.7 35.1-22.7 57.7-22.7 8.1 0 16.1 1 24 2.8 25.5 5.9 51.1 20.7 72.2 41.8s36 46.7 41.8 72.2c7.4 31.9.2 61.7-19.8 81.7l-274 274c-5.9 5.9-13.4 9.8-21.5 11.4l-144.8 27.4c-2.5.5-5.1.7-7.7.7zm51.8-93.1 72.9-13.8 182-182-59.1-59.1-182 182zm313.3-254.2 23.1-23.1c.2-5.4-3.8-21.8-20.6-38.5-10.1-10.2-22-17.4-32.4-19.8-1.8-.4-3.7-.7-5.5-.7h-.7l-23 23z"
                                                                                        fill="#526484"
                                                                                    />
                                                                                    <path
                                                                                        d="m499.4 119.1c-5.4-23.7-19.4-47.6-39.1-67.4s-43.8-33.7-67.4-39.1c-28.5-6.6-54.9-.4-72.3 17.1l-274 274c-4.5 4.4-7.5 10.1-8.7 16.3l-27.4 144.9c-3.2 17 8 33.4 24.9 36.6 1.9.4 3.9.5 5.8.5s3.9-.2 5.8-.5l145-27.4c6.2-1.2 11.9-4.2 16.3-8.6l274-274c17.5-17.5 23.7-43.9 17.1-72.4zm-328.5 295.3-90.3 17 17-90.3 191.3-191.3 73.3 73.3zm267.2-267.2-31.7 31.7-73.2-73.3 31.7-31.7c1-1 5.6-2.3 14-.4 12.2 2.8 25.8 11 37.2 22.4 23.5 23.7 25.6 47.7 22 51.3z"
                                                                                        fill="url(#gradient1)"
                                                                                    />
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
                                                            <span
                                                                onClick={() => onDelete(item?.productCategoryId)}
                                                                title="Delete"
                                                            >
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
                            <svg
                                clipRule="evenodd"
                                fillRule="evenodd"
                                height="30"
                                imageRendering="optimizeQuality"
                                shapeRendering="geometricPrecision"
                                textRendering="geometricPrecision"
                                viewBox="0 0 6.82666 6.82666"
                                width="30"
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                            >
                                <g transform="matrix(1,0,0,1,0,0)">
                                    <g id="Layer_x0020_1">
                                        <rect
                                            fill="#ffffff00" // Semi-transparent white
                                            height="6.827"
                                            rx="1.507"
                                            width="6.827"
                                            stroke="none"
                                        />
                                        <path
                                            d="m2.21002 1.41333-.79669.79669 1.20331 1.20331-1.20331 1.20331.79669.79669 1.20331-1.20331 1.20332 1.20331.79668-.79669-1.2033-1.20331 1.2033-1.20331-.79669-.79669-1.20331 1.2033z"
                                            fill="#fffffe" // White fill
                                            stroke="none"
                                        />
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
                                <label htmlFor="exampleFormControlInput1">Category Code</label>
                                <input type="text" className="form-control" id="categoryCode" name="categoryCode" placeholder="Category Code" value={formData.categoryCode} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Category Name</label>
                                <input type="text" className="form-control" id="categoryName" name="categoryName" placeholder="Category Name" value={formData.categoryName} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Display Name</label>
                                <input type="text" className="form-control" id="displayName" name="displayName" placeholder="Display Name" value={formData.displayName} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Display Description</label>
                                <input type="text" className="form-control" id="displayDesc" name="displayDesc" placeholder="Display Description" value={formData.displayDesc} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="formFile">Product Image</label>
                                <input type="file" className="form-control" id="file" name="file" accept="image/png, image/jpeg" onChange={handleChange} />
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Image</label>
                                <input type="file" className="form-control" id="imgPath" name="imgPath" placeholder="Display Description" value={formData.imgPath} onChange={handleChange} />
                            </div> */}
                            <div className="form-group d-flex">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="isDisplay" name="isDisplay" checked={formData.isDisplay} onChange={handleChange} />
                                </div>
                                <label htmlFor="exampleFormControlInput1">isDisplay</label>
                            </div>
                            <div className="form-group d-flex">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="isActive" name="isActive" checked={formData.isActive} onChange={handleChange} />
                                </div>
                                <label htmlFor="exampleFormControlInput1">isActive</label>
                            </div>
                            <div className="d-flex form-buttons" style={{ gap: "15px" }}>
                                <div className="submit-btn pt-2">
                                    <button type="submit">{productCategoryId ? 'Update' : 'Submit'}</button>
                                </div>
                                <div className="reset-btn pt-2">
                                    <button className="" onClick={handleReset}>Reset</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div id="entryformContainer" className={`adminform entryform ${isFormopenu ? 'open' : ''}`}>
                    <div className="closebtn">
                        <button className="" onClick={() => setIsFormopenu(false)} >
                            close
                        </button>
                    </div>
                    <div className="enForm">
                        <form onSubmit={onUpload}>
                            <div className="form-group">
                                <input type="file" className="form-control" id="file" name="file" accept="image/png, image/jpeg" onChange={(event) => handleFileChange(event)} />
                            </div>
                            <div className="d-flex form-buttons" style={{ gap: "15px" }}>
                                <div className="submit-btn pt-2">
                                    <button type="submit">Submit</button>
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

export default AdminProductCategory;