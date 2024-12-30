const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require('./connection');
const app = express();
const cookieParser = require("cookie-parser");
dotenv.config();

const PORT = process.env.PORT || 8073;

// Kết nối Database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Cấu hình CORS
const allowedOrigins = [
    "http://localhost:3000",  // Local development URL
    "https://fe-rfyq.onrender.com",  // Allow the frontend from Render
    "https://binhduy1402.id.vn"  // Production URL
];

app.use(cors({
    origin: (origin, callback) => {
        // Kiểm tra nếu origin hợp lệ, cho phép hoặc trả về lỗi
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,  // Cho phép gửi cookies và credentials
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Các phương thức HTTP được phép
    allowedHeaders: ["Content-Type", "Authorization"], // Các tiêu đề được phép
}));

// Định tuyến các API
const cartAPI = require('./api/cart.api');
app.use('/carts', cartAPI);

const toppingAPI = require('./api/topping.api');
app.use('/toppings', toppingAPI);

const listAPI = require('./api/list.api');
app.use('/lists', listAPI);

const orderAPI = require('./api/order.api');
app.use('/orders', orderAPI);

// Bắt đầu server
app.listen(PORT, () => {
    console.log(`Order Management Service is running on port ${PORT}`);
});
