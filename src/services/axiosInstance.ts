import axios from 'axios';

// backend api url
const API_URL = '';

// tạo một instance của axios với cấu hình mặc định
// để có thể tái sử dụng trong toàn bộ ứng dụng

const axiosInstance = axios.create({
	baseURL: API_URL,
	withCredentials: true,
});

export default axiosInstance;
