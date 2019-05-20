import Axios from 'axios';

const axiosInstance = Axios.create({
  //baseURL: 'http://server-ecommerce.komangmahendra.me',
  baseURL: 'http://localhost:3000'
});

export default axiosInstance;
