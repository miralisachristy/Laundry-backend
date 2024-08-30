const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const OutletName = require("./routes/OutletName.js");
const authRoutes = require("./routes/auth.js");
const PORT = process.env.PORT || 5000;
const serviceRoutes = require("./routes/serviceRoutes");
const outletRoutes = require("./routes/outletRoutes"); // Import outletRoutes
const customerRoutes = require("./routes/customerRoutes"); // Import customerRoutes
const userRoutes = require("./routes/userRoutes"); // Import userRoutes
const statusRoutes = require("./routes/statusRoutes"); // Import statusRoutes
const paymentStatusRoutes = require("./routes/paymentStatusRoutes"); // Import paymentStatusRoutes
const paymentMethodRoutes = require("./routes/paymentMethodRoutes"); // Import paymentMethodRoutes
const transactionDetailsRoutes = require("./routes/transactionDetailsRoutes"); // Import transactionDetailsRoutes
const transactionsRoutes = require("./routes/transactionsRoutes"); // Import transactionsRoutes
const paymentRoutes = require("./routes/paymentRoutes"); // Import paymentRoutes
const historyRoutes = require("./routes/historyRoutes"); // Import historyRoutes

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON bodies
app.use("/api/laundry", OutletName); // Use the routes from .js
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/outlets", outletRoutes); // Use the routes from outletRoutes.js
app.use("/api/customers", customerRoutes); // Use the routes from customerRoutes.js
app.use("/api/users", userRoutes); // Use the routes from userRoutes.js
app.use("/api/status", statusRoutes); // Use the routes from statusRoutes.js
app.use("/api/payment-status", paymentStatusRoutes); // Use the routes from paymentStatusRoutes.js
app.use("/api/payment-methods", paymentMethodRoutes); // Use the routes from paymentMethodRoutes.js
app.use("/api/transaction-details", transactionDetailsRoutes); // Use the routes from transactionDetailsRoutes.js
app.use("/api/transactions", transactionsRoutes); // Use the routes from transactionsRoutes.js
app.use("/api/payments", paymentRoutes); // Use the routes from paymentRoutes.js
app.use("/api/history", historyRoutes); // Use the routes from historyRoutes.js

app.get("/", (req, res) => {
  res.send("Welcome to the Laundry Backend API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
