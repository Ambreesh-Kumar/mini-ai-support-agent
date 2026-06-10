const express = require("express");
const cors = require("cors");
require("dotenv").config();
const queryRoutes = require("./routes/queryRoutes");
const statsRoutes = require("./routes/statsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/query", queryRoutes);
app.use("/stats", statsRoutes);

app.get("/health", (req, res) => {
  res.json({
    status: "ok"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});