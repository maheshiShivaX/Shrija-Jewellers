import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const navigate = useNavigate();
    const SJjwtToken = localStorage.getItem('SJjwtToken');

    const isTokenExpired = (token) => {
        if (!token) return true;
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        return payload.exp < currentTime;
    };

    useEffect(() => {
        if (isTokenExpired(SJjwtToken)) {
            localStorage.removeItem('loginId');
            localStorage.removeItem('user');
            // navigate('/login');
        }
    }, [SJjwtToken, navigate]);
};

export default useAuth;
