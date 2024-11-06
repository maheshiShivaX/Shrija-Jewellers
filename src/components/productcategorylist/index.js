import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout";
import './productcategorylist.css';
import axios from 'axios';
import { imageurl, baseurl } from '../../_config';

const categoryList = [
    {
        name: 'NECKLACES',
        image: './images/category.jpg',
        link: ''
    },
    {
        name: 'NECKLACES',
        image: './images/category.jpg',
        link: ''
    },
    {
        name: 'NECKLACES',
        image: './images/category.jpg',
        link: ''
    },
    {
        name: 'NECKLACES',
        image: './images/category.jpg',
        link: ''
    },
    {
        name: 'NECKLACES',
        image: './images/category.jpg',
        link: ''
    }
]

const ProductCategoryList = () => {
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
        navigate(`/productsubcategory/${item?.productCategoryId}`);
    };

    return (
        <Layout>
            <div className="container-screen productcategorylist py-5">
                <div>
                    {/* <div>
                        topsection
                    </div> */}
                    {error ? (
                        <p>Error: {error}</p>
                    ) : categoryData !== null ? (
                        categoryData.length > 0 ? (
                            <div className="categorylist row">
                                {categoryData?.map((item, i) => (
                                    <div key={i} className='col-md-3 col-12 categorylist_img' onClick={() => handleCategoryChange(item)}>
                                        {item.imgPath ? (
                                            <>
                                                <img src={`${imageurl}${item?.imgPath}`} alt="" className="product-img" />
                                            </>
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                        <h4>{item?.displayName}</h4>
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