import axiosInstance from './axiosInstance';

// auth service functions: login, logout, register

export const loginService = async (email: string, password: string) => {
    const response = await axiosInstance.post(
        "/api/auth/login", 
        { email, password }, 
        { withCredentials: true 
    });
    return response.data;
};