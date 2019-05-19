import Axios from 'axios';

const axiosInstance = Axios.create({
  baseURL: 'http://server-ecommerce.komangmahendra.me',
});

export default axiosInstance;
