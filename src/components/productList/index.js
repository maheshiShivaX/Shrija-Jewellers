import Layout from "../layout";
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { imageurl, baseurl, DAPI_URL } from '../../_config';
import './productlist.css';

const ProductList = () => {
    const navigate = useNavigate();
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const allProductData = async () => {
        try {
            const response = await axios.get(`${baseurl}${DAPI_URL.GetProductDetail}`);

            if (response.status === 200) {
                if (response.data.isSuccess == 200) {
                    setProductData(response.data.data);
                }
            } else {
                setError("Failed to fetch CategoryData");
            }
        } catch (error) {
            setError("Please try again later.");
        }
    };

    useEffect(() => {
        allProductData();
    }, []);

    return (
        <Layout>
            <div className="container-screen productcategorylist py-5">
                {error ? (
                    <p>Error: {error}</p>
                ) : productData !== null ? (
                    productData.length > 0 ? (
                        <div className="product_list row">
                            {productData.map((item, i) => (
                                <div key={i} className="col-md-3 col-12 productlist_img">
                                    {item?.productImageDtos.length > 0 ? (
                                        // Find the first image where isHeader is true, or use a fallback
                                        item.productImageDtos.some((image) => image.isHeader) ? (
                                            item.productImageDtos.map((image, j) => (
                                                image.isHeader ? (
                                                    <img
                                                        key={j}
                                                        src={`${imageurl}${image.imgPath}`}
                                                        alt={item.productName}
                                                        className="w-100"
                                                    />
                                                ) : null
                                            ))
                                        ) : (
                                            <img
                                                src="./images/pr15.jpg"
                                                alt="Default"
                                                className="w-100 demo"
                                            />
                                        )
                                    ) : (
                                        <img
                                            src="./images/pr15.jpg"
                                            alt="Default"
                                            className="w-100 demo"
                                        />
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
        </Layout>
    )
}

export default ProductList;