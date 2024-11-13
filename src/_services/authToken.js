import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const CheckToken = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('SJjwtToken');

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const expirationTime = decodedToken.exp * 1000;

                const currentTime = Date.now();

                if (currentTime >= expirationTime) {
                    localStorage.removeItem('loginId');
                    localStorage.removeItem('SJjwtToken');

                    setIsLoggedIn(false);

                    navigate('/login');
                } else {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                setIsLoggedIn(false);
            }
        } else {
            setIsLoggedIn(false);
            navigate('/login');
        }
    }, [navigate, setIsLoggedIn]);

    return null;
};

export default CheckToken;
