import CryptoJS from 'crypto-js';
import { baseurl, DAPI_URL } from '../_config';
import axios from 'axios';

const secretKey = CryptoJS.enc.Utf8.parse("uitsufdytuiysdifdsfdsfdhgtyuijkj");
const iv = CryptoJS.enc.Utf8.parse("1234567890123456");

export const decryptString = (encryptedData, key, iv) => {
    const decrypteData = CryptoJS.AES.decrypt(
        { ciphertext: CryptoJS.enc.Base64.parse(encryptedData) },
        key,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }
    );

    const result = decrypteData.toString(CryptoJS.enc.Utf8);
    return result;
};

export const getProductSpecificationData = async () => {
    const SJjwtToken = localStorage.getItem('SJjwtToken');

    if (!SJjwtToken) {
        throw new Error("Authorization token is missing.");
    }

    try {
        const response = await axios.get(`${baseurl}${DAPI_URL.GetProductSpecificationAll}`, {
            headers: {
                Authorization: `Bearer ${SJjwtToken}`,
            }
        });

        // If the response is successful, return the response data
        if (response.status === 200 && response.data.isSuccess === 200) {
            return response.data.data;  
        } else {
            throw new Error("Failed to fetch product specification data.");
        }
    } catch (error) {
        // Handle errors, either from axios or from invalid responses
        throw new Error(error.response?.data?.message || "Please try again later.");
    }
};