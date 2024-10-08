const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const PORT = process.env.PORT;
const inventoryRoutes = require("./routes/inventoryRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const outletRoutes = require("./routes/outletRoutes"); // Import outletRoutes
const customerRoutes = require("./routes/customerRoutes"); // Import customerRoutes
const userRoutes = require("./routes/userRoutes"); // Import userRoutes
const transactionDetailsRoutes = require("./routes/transactionDetailsRoutes"); // Import transactionDetailsRoutes
const transactionsRoutes = require("./routes/transactionsRoutes"); // Import transactionsRoutes
const paymentRoutes = require("./routes/paymentRoutes"); // Import paymentRoutes
const quotaRoutes = require("./routes/quotaRoutes");
const quotaDailyHistoryRoutes = require("./routes/quotaDailyHistoryRoutes");
const path = require("path");

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON bodies
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/outlets", outletRoutes); // Use the routes from outletRoutes.js
app.use("/api/customers", customerRoutes); // Use the routes from customerRoutes.js
app.use("/api/users", userRoutes); // Use the routes from userRoutes.js
app.use("/api/transaction-details", transactionDetailsRoutes); // Use the routes from transactionDetailsRoutes.js
app.use("/api/transactions", transactionsRoutes); // Use the routes from transactionsRoutes.js
app.use("/api/payments", paymentRoutes); // Use the routes from paymentRoutes.js
app.use("/api/quotas", quotaRoutes);
app.use("/api/quotas-daily-history", quotaDailyHistoryRoutes);

app.use("/upload", express.static(path.join(__dirname, "upload")));

app.get("/", (req, res) => {
  res.send("Welcome to the Laundry Backend API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
