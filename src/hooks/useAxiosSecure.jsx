import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'https://decoration-booking-system-server.vercel.app', 
});



const useAxiosSecure = () => {

    const {user, logOut} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        // request interceptor
        const requestInterceptor = axiosSecure.interceptors.request.use(config=> {
                config.headers.Authorization = `Bearer ${user?.accessToken}`;
                return config;
            })

        // interceptor response
        const responseInterceptor = axiosSecure.interceptors.response.use(response => response, async (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {

                    const statusCode = error.response.status;
                    if(statusCode === 401 || statusCode === 403){
                        // logout user
                        logOut()
                        .then(() => {
                            navigate('/login');
                        })
                        .catch(err => {
                            console.error('Error logging out user:', err);
                        });
                    }
                }
                return Promise.reject(error);
            });

            return () => {
                axiosSecure.interceptors.request.eject(requestInterceptor);
                axiosSecure.interceptors.response.eject(responseInterceptor);
            };
    },[user, logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;