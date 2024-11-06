export const imageurl = "https://www.indianfilms.in/ShrijaAPI/";
export const baseurl = 'https://www.indianfilms.in/ShrijaAPI/api/'
export const projectId = 4
export const projectNo = 'Shrija'
export const DAPI_URL = {
    SentOtp: 'SentOtp/SentOtp',
    VerifyOTP: 'SentOtp/VerifyOTP',
    login: 'LoginDetail/login',
    SaveLoginDetail:'LoginDetail/SaveLoginDetail',
    GetLoginDetailByUserPass:'LoginDetail/GetLoginDetailByUserPass',
    GetLoginDetailAll: 'LoginDetail/GetLoginDetailAll',
    GetUserAddressByLoginId: 'UserAddress/GetUserAddressByLoginId',
    GetLoginDetailByMobileNo: 'LoginDetail/GetLoginDetailByMobileNo',
    GetLoginDetailById: 'LoginDetail/GetLoginDetailById',

    saveProductCategory: 'ProductCategory/SaveProductCategory',
    getProductCategory: 'ProductCategory/GetProductCategoryAll',
    DeleteProductCategory: 'ProductCategory/DeleteProductCategoryById',
    IsDisplayProductCategory: 'ProductCategory/IsDisplayProductCategoryById',
    IsActiveProductCategory: 'ProductCategory/ActiveProductCategoryById',
    UploadProductCategoryImage:'ProductCategory/UploadProductCategoryImage',

    SaveProductSubCategory: 'ProductSubCategory/SaveProductSubCategory',
    GetProductSubCategoryAll: 'ProductSubCategory/GetProductSubCategoryAll',
    DeleteProductSubCategoryById: 'ProductSubCategory/DeleteProductSubCategoryById',
    IsDisplayProductSubCategoryById: 'ProductSubCategory/IsDisplayProductSubCategoryById',
    ActiveProductSubCategoryById: 'ProductSubCategory/ActiveProductSubCategoryById',
    UploadProductSubCategoryImage:'ProductSubCategory/UploadProductSubCategoryImage',
    GetProductSubCategoryByCategoryId:'ProductSubCategory/GetProductSubCategoryByCategoryId',

    GetProductDetailBySubCategoryId:'ProductDetail/GetProductDetailBySubCategoryId',
    SaveProductDetail: 'ProductDetail/SaveProductDetail',
    GetProductDetailAll: 'ProductDetail/GetProductDetailAll',
    DeleteProductDetailById: 'ProductDetail/DeleteProductDetailById',
    ActiveProductDetailById: 'ProductDetail/ActiveProductDetailById',
    GetProductDetailById:'ProductDetail/GetProductDetailById',
    GetProductDetail:'ProductDetail/GetProductDetail',

    saveSpecification: 'Specification/SaveSpecification',
    getSpecification: 'Specification/GetSpecificationAll',
    deleteSpecification: 'Specification/DeleteSpecificationById',
    isActiveSpecification: 'Specification/ActiveSpecificationById',

    SaveCartDetail: 'CartDetail/SaveCartDetail',
    GetCartDetailAll: 'CartDetail/GetCartDetailAll',
    GetCartDetailByLoginId: 'CartDetail/GetCartDetailByLoginId',
    DeleteCartDetailById: 'CartDetail/DeleteCartDetailById',
    DeleteCartDetailByLoginId: 'CartDetail/DeleteCartDetailByLoginId',
    SaveBulkCart: 'CartDetail/SaveBulkCart',

    GetState: 'State/GetState',
    SaveUserAddress: 'UserAddress/SaveUserAddress',
    GetUserAddressByLoginId: 'UserAddress/GetUserAddressByLoginId',
    GetUserAddressByLoginAddressId: 'UserAddress/GetUserAddressByLoginAddressId',

    CreateOrder: 'Checkout/CreateOrder',
    SaveProductOrder: 'ProductOrder/SaveProductOrder',
    UpdatePaymentResponse: 'ProductOrder/UpdatePaymentResponse',
    GetProductOrderByLoginId: 'ProductOrder/GetProductOrderByLoginId',

    GetCouponByIdCouponcode: 'Coupon/GetCouponByIdCouponcode',
    GetShipTracking: 'ShipmentOrder/GetShipTracking',

    GetProjectPaymentGatewayByProjectId: 'ProjectPaymentGateway/GetProjectPaymentGatewayByProjectId',
    GetProjectPaymentGatewayByProjectNo: 'ProjectPaymentGateway/GetProjectPaymentGatewayByProjectNo'
}