const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const OutletName = require("./routes/OutletName");
const authRoutes = require("./routes/authRoutes");
const PORT = process.env.PORT || 4000;
const serviceRoutes = require("./routes/serviceRoutes");
const outletRoutes = require("./routes/outletRoutes"); // Import outletRoutes
const customerRoutes = require("./routes/customerRoutes"); // Import customerRoutes
const userRoutes = require("./routes/userRoutes"); // Import userRoutes
const transactionDetailsRoutes = require("./routes/transactionDetailsRoutes"); // Import transactionDetailsRoutes
const transactionsRoutes = require("./routes/transactionsRoutes"); // Import transactionsRoutes
const paymentRoutes = require("./routes/paymentRoutes"); // Import paymentRoutes
const path = require("path");

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON bodies
app.use("/api/laundry", OutletName); // Use the routes from .js
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/outlets", outletRoutes); // Use the routes from outletRoutes.js
app.use("/api/customers", customerRoutes); // Use the routes from customerRoutes.js
app.use("/api/users", userRoutes); // Use the routes from userRoutes.js
app.use("/api/transaction-details", transactionDetailsRoutes); // Use the routes from transactionDetailsRoutes.js
app.use("/api/transactions", transactionsRoutes); // Use the routes from transactionsRoutes.js
app.use("/api/payments", paymentRoutes); // Use the routes from paymentRoutes.js

app.use("/upload", express.static(path.join(__dirname, "upload")));

app.get("/", (req, res) => {
  res.send("Welcome to the Laundry Backend API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
