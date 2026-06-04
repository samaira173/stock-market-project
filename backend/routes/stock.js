const express = require("express");
const { exec } = require("child_process");

const router = express.Router();

router.get("/stock/:symbol", (req, res) => {
  const symbol = req.params.symbol;

  exec(
    `python python/stock_data.py ${symbol}`,

    (error, stdout, stderr) => {
      if (error) {
        console.error(error);

        return res.status(500).json({
          error: error.message,
        });
      }

      if (stderr) {
        console.error(stderr);
      }

      try {
        const data = JSON.parse(stdout);

        res.json(data);
      } catch (parseError) {
        console.error(parseError);

        res.status(500).json({
          error: "Failed to parse Python response",
        });
      }
    },
  );
});

module.exports = router;
