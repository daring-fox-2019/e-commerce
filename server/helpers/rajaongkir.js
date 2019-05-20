require('dotenv').config();
const axios = require('axios');

const rajaOngkir = axios.create({
  baseURL: `https://api.rajaongkir.com/starter`,
  headers: {
    key: process.env.RAJAONGKIR
  }
})

module.exports = rajaOngkir