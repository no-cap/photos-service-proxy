const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const PORT = 3333;

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

const galleryProxy = createProxyMiddleware({ target: 'ec2-54-193-120-194.us-west-1.compute.amazonaws.com', changeOrigin: true });
app.use('/photosForRestaurant', galleryProxy);

const restaurantProxy = createProxyMiddleware({ target: 'http://ec2-13-57-213-120.us-west-1.compute.amazonaws.com', changeOrigin: true });
app.use('/currentRestaurant', restaurantProxy);
app.use('/restaurant', restaurantProxy);

const dishesProxy = createProxyMiddleware({ target: '54.176.124.249:3000', changeOrigin: true });
app.use('/popularDishes/**', dishesProxy);

const reviewsProxy = createProxyMiddleware({ target: 'http://3.101.42.194:3003', changeOrigin: true });
app.use('/api/restaurants/**', reviewsProxy);
app.use('/api/restaurant/**', reviewsProxy);



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});