import Layout from "../layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import './products.css';
import { imageurl, baseurl, DAPI_URL } from '../../_config';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Toaster, toast } from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux';
import { get_cart_Data, incrQuantity, decrQuantity, addToCart } from '../../redux/action';
import { decryptString } from "../../_services";
import CryptoJS from 'crypto-js';
import { Rate, Select, Breadcrumb } from 'antd';

const { Option } = Select;

const baseUrl = process.env.REACT_APP_BASE_URL;

const Products = () => {
    const SJproductSubCategoryId = localStorage.getItem('SJproductSubCategoryId');
    const productCategoryId = localStorage.getItem('SJproductCategoryId');
    const SJjwtToken = localStorage.getItem('SJjwtToken');
    const SJloginId = localStorage.getItem("SJloginId");
    const navigate = useNavigate();
    const [productData, setProductData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.cartReducer.cart) || [];

    const secretKey = CryptoJS.enc.Utf8.parse("uitsufdytuiysdifdsfdsfdhgtyuijkj");
    const iv = CryptoJS.enc.Utf8.parse("1234567890123456");

    const [formData, setFormData] = useState({
        cartItemId: 0,
        productId: 0,
        loginId: SJloginId ? Number(SJloginId) : 0,
        buyStatus: 0,
        quantity: 1,
        isActive: true,
        createdBy: 0
    });

    const truncateProductName = (productName, maxWords = 5) => {
        if (!productName) return '';

        const words = productName.split(' ');
        if (words.length <= maxWords) {
            return productName; // No truncation needed
        }

        return `${words.slice(0, maxWords).join(' ')}...`; // Truncate and add ellipsis
    };

    const calculateDiscountPercent = (mrp, unitPrice) => {
        if (mrp && unitPrice && mrp > unitPrice) {
            return ((mrp - unitPrice) / mrp) * 100;
        }
        return 0;
    };

    const [isInWishlist, setIsInWishlist] = useState(false);

    // Toggle wishlist state on click
    const handleClick = () => {
        setIsInWishlist(!isInWishlist);
    };
    const [selectedSort, setSelectedSort] = useState('default');  // default can be your initial state

    const handleSortChange = (value) => {
        // Handle the sorting logic here based on the selected value
        console.log('Selected sort option:', value);
        setSelectedSort(value);
    };

    const fetchProductData = async () => {
        try {
            const response = await axios.get(`${baseurl}${DAPI_URL.GetProductDetailBySubCategoryId}?pSubCategoryId=${SJproductSubCategoryId}`);
            if (response.status === 200) {
                if (response.data.isSuccess == 200) {
                    setProductData(response.data.data);
                }
            } else {
                setError("Failed to Fetched product data by sub category id");
            }
        } catch (error) {
            setError("Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductData();
        dispatch(get_cart_Data());
    }, [dispatch]);

    const handleSubmit = async () => {
        try {
            await dispatch(addToCart(formData));
        } catch (error) {
            toast.error("Error occurred while adding to cart.");
        }
    };

    const onProductDetail = (item) => {
        localStorage.setItem('SJproductId', item?.productId);
        navigate(`/category/${productCategoryId}/productsubcategory/${SJproductSubCategoryId}/products/${item?.productId}/productdetail`);
    }

    const onAddCart = (item) => {
        setFormData(prevData => ({
            ...prevData,
            productId: item?.productId
        }));

        if (item.productId > 0) {
            handleSubmit(item?.productId);
        }
    }

    const onBuyNow = (item) => {
        setFormData(prevData => ({
            ...prevData,
            productId: item?.productId
        }));

        if (SJloginId) {
            handleSubmit(item?.productId);
            navigate("/shippingaddress");
        } else {
            handleSubmit(item?.productId);
            navigate('/login');
        }
    }

    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    const breadcrumbItems = [
        {
            label: 'Home',
            path: '/',
        },
        {
            label: 'Subcategory',
            path: `/category/${productCategoryId}/productsubcategory`,
        },
        {
            label: 'Product',
            path: `/category/${productCategoryId}/productsubcategory/${SJproductSubCategoryId}/products`
        }
    ];

    return (
        <Layout>
            <section className="product_wepper_main">
                <div className="container-screen">
                    <div className="py-3">
                        <div className="breadcrumb_data my-2">
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
                        <div className="hedding_product d-flex justify-content-end align-items-center py-3">
                            <div className="icon_wepper d-flex align-items-center">
                                <h6>Sort by : </h6>
                                <div style={{ paddingLeft: '10px' }}>
                                    <Select
                                        defaultValue="default"
                                        value={selectedSort}
                                        style={{ width: 200 }}
                                        onChange={handleSortChange}
                                    >
                                        <Option value="default">Default</Option>
                                        <Option value="priceLowToHigh">Price: Low to High</Option>
                                        <Option value="priceHighToLow">Price: High to Low</Option>
                                        <Option value="rating">Rating</Option>
                                        <Option value="newest">Newest</Option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-3 filter_sidebar">
                                <div className="widget sidebar-tags">
                                    <div className="widget-title open">
                                        <h3 className="sidebar-title text-uppercase">
                                            <span>Shop by Category</span>
                                            <a data-href="https://www.voylla.com/collections/women-earrings" href="javascript:void(0)" className="clear"
                                                style={{ display: 'none' }}>
                                                Clear
                                            </a>
                                        </h3>
                                    </div>
                                    <div className="widget-content d-block">
                                        <ul className="list-tags p-0 list-unstyled">
                                            <li className="item">
                                                <input type="checkbox" value="hoops" />
                                                <label>
                                                    Necklace
                                                </label>
                                            </li>
                                            <li className="item">

                                                <input type="checkbox" value="jhumkis" />
                                                <label>
                                                    Ring
                                                </label>

                                            </li>
                                            <li className="item">

                                                <input type="checkbox" value="stud" />
                                                <label>
                                                    Bracelate
                                                </label>

                                            </li>
                                            <li className="item">

                                                <input type="checkbox" value="long" />
                                                <label>
                                                    Earring
                                                </label>

                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="widget sidebar-tags pt-4">
                                    <div className="widget-title open">
                                        <h3 className="sidebar-title text-uppercase">
                                            <span>Shop by type</span>
                                            <a data-href="https://www.voylla.com/collections/women-earrings" href="javascript:void(0)" className="clear"
                                                style={{ display: 'none' }}>
                                                Clear
                                            </a>
                                        </h3>
                                    </div>
                                    <div className="widget-content d-block">
                                        <ul className="list-tags p-0 list-unstyled">
                                            <li className="item">
                                                <input type="checkbox" value="hoops" />
                                                <label>
                                                    Gold
                                                </label>
                                            </li>
                                            <li className="item">

                                                <input type="checkbox" value="jhumkis" />
                                                <label>
                                                    Silver
                                                </label>

                                            </li>
                                            <li className="item">

                                                <input type="checkbox" value="stud" />
                                                <label>
                                                    Diamond
                                                </label>

                                            </li>
                                            <li className="item">

                                                <input type="checkbox" value="long" />
                                                <label>
                                                    Simple
                                                </label>

                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="widget sidebar-tags pt-4">
                                    <div className="widget-title open">
                                        <h3 className="sidebar-title text-uppercase">
                                            <span>Shop by Price</span>
                                            <a data-href="https://www.voylla.com/collections/women-earrings" href="javascript:void(0)" className="clear"
                                                style={{ display: 'none' }}>
                                                Clear
                                            </a>
                                        </h3>
                                    </div>
                                    <div className="widget-content d-block">
                                        <ul className="list-tags p-0 list-unstyled">
                                            <li className="item">
                                                <input type="checkbox" value="hoops" />
                                                <label>
                                                    0-399
                                                </label>
                                            </li>
                                            <li className="item">

                                                <input type="checkbox" value="jhumkis" />
                                                <label>
                                                    400-799
                                                </label>

                                            </li>
                                            <li className="item">

                                                <input type="checkbox" value="stud" />
                                                <label>
                                                    800-1099
                                                </label>

                                            </li>
                                            <li className="item">

                                                <input type="checkbox" value="long" />
                                                <label>
                                                    1100-1999
                                                </label>

                                            </li>
                                            <li className="item">

                                                <input type="checkbox" value="chand-bali" />
                                                <label>
                                                    2000 & Above
                                                </label>

                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-9">
                                {error ? (
                                    <p>Error: {error}</p>
                                ) : productData !== null ? (
                                    productData.length > 0 ? (
                                        <div className="row mt-2">
                                            {productData?.map((item, i) => {
                                                const discountPercent = calculateDiscountPercent(item.mrp, item.unitPrice);
                                                return (
                                                    <React.Fragment key={i}>
                                                        <div className="col-lg-3 col-md-3 col-sm-6 col-12 col-6 mb-5">
                                                            <span onClick={() => onProductDetail(item)} className="product_img_wepper" style={{ cursor: 'pointer' }}>
                                                                {item?.productImageDtos.length > 0 ? (
                                                                    item.productImageDtos.map((image, j) => (
                                                                        image.isHeader ? (
                                                                            <div className="img_hover_wrapper">
                                                                                <img
                                                                                    key={j}
                                                                                    src={`${imageurl}${image.imgPath}`}
                                                                                    alt={item.productName}
                                                                                    className="w-100"
                                                                                />
                                                                            </div>
                                                                        ) : null
                                                                    ))
                                                                ) : (
                                                                    <div className="img_hover_wrapper">
                                                                        <img src="./images/Shrija web 1.png" alt="Default" className="w-100 demo" />
                                                                    </div>
                                                                )}

                                                                <div className="product_content_wepper">
                                                                    <h2 title={item?.productName} style={{ cursor: 'pointer' }}>
                                                                        {truncateProductName(item?.productName)}
                                                                    </h2>
                                                                </div>

                                                            </span>
                                                            <div className="product_content_wepper mt-0">
                                                                <div className="py-2 d-flex justify-content-between align-items-center" style={{ paddingRight: '5px' }}>
                                                                    <Rate disabled defaultValue={5} style={{ fontSize: '18px' }} />
                                                                    <div>
                                                                        <svg
                                                                            version="1.1"
                                                                            id="Capa_1"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            viewBox="0 0 512 512"
                                                                            width='25'
                                                                            height='25'
                                                                            style={{ enableBackground: 'new 0 0 512 512' }}
                                                                            onClick={handleClick}
                                                                        >
                                                                            <g width="100%" height="100%" transform="matrix(1,0,0,1,0,0)">
                                                                                <path
                                                                                    d="M368,32c73.627-0.011,133.323,59.669,133.333,133.296c0,0.011,0,0.027,0,0.037C501.333,298.667,298.667,480,256,480S10.667,298.667,10.667,165.333C10.661,91.701,70.347,32.005,143.979,32c45.28-0.005,87.467,22.976,112.021,61.013C280.533,54.96,322.725,31.979,368,32z"
                                                                                    fill={isInWishlist ? '#FF0000' : '#f54b55'}
                                                                                    fillOpacity="0"
                                                                                    stroke="none"
                                                                                />
                                                                                <g style={{ opacity: 0.08 }}>
                                                                                    <path
                                                                                        d="M256,426.667c-39.845,0-219.173-158.133-242.725-287.643c-1.733,8.661-2.608,17.477-2.608,26.309C10.667,298.667,213.333,480,256,480s245.333-181.333,245.333-314.667c0-8.832-0.875-17.648-2.608-26.309C475.173,268.533,295.845,426.667,256,426.667z"
                                                                                        fill="#ffffff"
                                                                                        fillOpacity="1"
                                                                                        stroke="none"
                                                                                    />
                                                                                </g>
                                                                                <path
                                                                                    d="M256,490.667c-52.048,0-256-190.309-256-325.333c0-49.115,24.629-94.341,65.893-120.981c62.363-40.267,144.491-26.064,190.101,30.469c27.163-33.744,67.989-53.488,111.941-53.488c0.027,0,0.043,0,0.069,0h0.037c79.392,0.011,143.968,64.608,143.957,144C512,300.357,308.053,490.667,256,490.667z M143.797,42.699c-22.779,0-45.808,6.325-66.336,19.573c-35.147,22.693-56.128,61.221-56.128,103.061c0,127.339,199.355,304,234.667,304s234.667-176.661,234.667-304c0.011-67.632-54.997-122.656-122.624-122.667c-0.005,0-0.048,0-0.048,0c-0.016,0-0.043,0-0.059,0c-41.819,0-80.309,20.976-102.976,56.128c-1.957,3.045-5.333,4.885-8.96,4.885l0,0c-3.621,0-6.997-1.84-8.96-4.885C223.605,62.496,184.096,42.699,143.797,42.699z"
                                                                                    fill="#ffffff"
                                                                                    fillOpacity="1"
                                                                                    stroke="none"
                                                                                />
                                                                            </g>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <div className="price">
                                                                    <p className="unit_price">₹{item.unitPrice}</p>
                                                                    <del>₹{item.mrp}</del>
                                                                    {discountPercent > 0 && (
                                                                        <p className="discount_percent mb-0">{`(${discountPercent.toFixed(0)}% off)`}</p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="bttn_wepper row py-2">
                                                                <div className="col-6">
                                                                    <button className="add_to_cart_btn w-100" onClick={() => onAddCart(item)} style={{ cursor: 'pointer' }}>Add To Cart</button>
                                                                </div>
                                                                <div className="col-6">
                                                                    <button onClick={() => onBuyNow()} className="buy_now_btn_product w-100">Buy Now</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                )
                                            })}
                                        </div>
                                    ) : (
                                        <p>No data avaiable</p>
                                    )
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout >
    )
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default Products;