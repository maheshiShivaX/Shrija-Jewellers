import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout";
import './productcategorylist.css';
import axios from 'axios';
import { imageurl, baseurl } from '../../_config';

const ProductCategoryList = () => {
    const productCategoryId = localStorage.getItem('SJproductCategoryId');
    const navigate = useNavigate();
    const [categoryData, setCategoryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const categortData = async () => {
        try {
            const response = await axios.get(`${baseurl}ProductCategory/GetProductCategory`);

            if (response.status === 200) {
                if (response.data.isSuccess == 200) {
                    setCategoryData(response.data.data);
                }
            } else {
                setError("Failed to fetch CategoryData");
            }
        } catch (error) {
            setError("Please try again later.");
        }
    };

    useEffect(() => {
        categortData();
    }, []);

    const handleCategoryChange = (item) => {
        localStorage.setItem('SJproductCategoryId', item?.productCategoryId);
        navigate(`/category/${item?.productCategoryId}/productsubcategory`);
    };

    const breadcrumbItems = [
        {
            label: 'Home',
            path: '/',
        },
        {
            label: 'Category',
            path: `/productcategorylist`,
        }
    ];

    return (
        <Layout>
            <div className="container-screen productcategorylist pt-4 pb-5">
                <div>
                    <div className="breadcrumb_data pb-5">
                        {breadcrumbItems.map((item, index) => (
                            <span key={index}>
                                <Link to={item.path}>{item.label}</Link>

                                {/* Only render the separator (SVG) if it's not the last item */}
                                {index < breadcrumbItems.length - 1 && (
                                    <svg
                                        id="Layer_2"
                                        viewBox="0 0 512 512"
                                        width="20"
                                        height="20"
                                        version="1.1"
                                    >
                                        <g width="100%" height="100%" transform="matrix(1, 0, 0, 1, 0, 0)">
                                            <g id="Icon">
                                                <g id="_22" data-name="22">
                                                    <rect
                                                        id="Background"
                                                        fill="#1770ff"
                                                        height="512"
                                                        rx="150"
                                                        width="512"
                                                        fillOpacity="0"
                                                        stroke="none"
                                                    />
                                                    <path
                                                        d="m323.8 80.48c1.5-3.3 4.42-4.95 8.78-4.95s8.92 1.05 13.72 3.15c11.1 5.1 18.29 11.1 21.6 18 1.2 2.1 1.8 4.05 1.8 5.85s-.3 3.3-.9 4.5l-180.15 324.95c-1.8 3-4.95 4.5-9.45 4.5s-9-1.05-13.5-3.15c-11.41-5.4-18.75-11.4-22.05-18-.9-1.8-1.35-3.53-1.35-5.17s.45-3.23 1.35-4.72z"
                                                        fill="#ffffff"
                                                        stroke="none"
                                                    />
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                )}
                            </span>
                        ))}
                    </div>
                    {error ? (
                        <p>Error: {error}</p>
                    ) : categoryData !== null ? (
                        categoryData.length > 0 ? (
                            <div className="categorylist row">
                                {categoryData?.map((item, i) => (
                                    <div key={i} className='col-md-3 col-12 categorylist_img mb-4 pb-4' onClick={() => handleCategoryChange(item)}>
                                        <div className='border_box_content'> 
                                            {item.imgPath ? (
                                                <>
                                                    <div className="img_hover_wrapper">
                                                        <img src={`${imageurl}${item?.imgPath}`} alt="" className="product-img" />
                                                    </div>
                                                </>
                                            ) : (
                                                <span>No Image</span>
                                            )}
                                            <h4 className='py-2'>{item?.displayName}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No data available</p>
                        )
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default ProductCategoryList;