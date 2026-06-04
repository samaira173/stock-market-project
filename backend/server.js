const express = require("express");
const cors = require("cors");

const searchRoutes = require("./routes/search");
const stockRoutes = require("./routes/stock");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", searchRoutes);
app.use("/api", stockRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
