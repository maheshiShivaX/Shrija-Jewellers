import React, { useState, useEffect } from "react";
import axios from "axios";
import './productsubcategory.css';
import Layout from "../layout";
import { imageurl,baseurl } from '../../_config';
import { Link, useNavigate,useParams } from 'react-router-dom';

const ProductSubCategory = () => {
    const productCategoryId = localStorage.getItem('SJproductCategoryId');
    const { id } = useParams();
    const navigate = useNavigate();
    const [subCategoryData, setSubCategoryData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchSubCategoryData = async () => {

        try {
            let url = `${baseurl}ProductSubCategory/`;
            if (productCategoryId === null) {
                url += `GetProductSubCategory`;
            } else {
                url += `GetProductSubCategoryByCategoryId?pProductCategoryId=${productCategoryId}`;
            }
            const response = await axios.get(url);
            if (response.status === 200) {
                if(response.data.isSuccess == 200){
                    setSubCategoryData(response.data.data);
                }
            } else {
                setError("Failed to fetch Category Data");
            }
        } catch (error) {
            console.error('Error fetching category data:', error);
            setError("Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubCategoryData();
    }, [id]);

    const subCategoryChange = (item) => {
        localStorage.setItem('SJproductSubCategoryId', item?.productSubCategoryId);
        navigate(`/products/${item?.productSubCategoryId}`);
    };

    return (
        <Layout>
            <div>
                <section className="listing_container_header">
                    <div className="container-screen">                     
                        {error ? (
                            <p>Error: {error}</p>
                        ) : subCategoryData !== null ? (
                            subCategoryData.length > 0 ? (
                                <div className="row pt-5">
                                    {subCategoryData?.map((item, i) => (
                                        <div className="col-lg-3 col-sm-6 col-12 mb-3" key={i}>
                                            <div className="product_wepper">
                                                <span onClick={() => subCategoryChange(item)}>
                                                    {item.imgPath ? (
                                                        <>
                                                            <img src={`${imageurl}${item?.imgPath}`} alt="" />
                                                        </>
                                                    ) : (
                                                        <span>No Image</span>
                                                    )}
                                                    <div className="content_category">
                                                        <p>{item?.displayName}</p>
                                                    </div>
                                                </span>                                              
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
                </section>
            </div >
        </Layout >
    )
}

export default ProductSubCategory;