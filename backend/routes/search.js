const express = require("express");

const router = express.Router();

const stocks = require("../data/stocks.json");

router.get("/search", (req, res) => {
  const query = req.query.q;
  const type = req.query.type || "name";

  if (!query) {
    return res.json([]);
  }

  const search = query.toLowerCase();

  let results = [];

  if (type === "symbol") {
    results = stocks.filter((stock) =>
      stock.Symbol.toLowerCase().startsWith(search),
    );

    results.sort((a, b) => {
      const aExact = a.Symbol.toLowerCase() === search;

      const bExact = b.Symbol.toLowerCase() === search;

      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;

      return a.Symbol.localeCompare(b.Symbol);
    });
  } else {
    results = stocks.filter((stock) =>
      stock.Name.toLowerCase().includes(search),
    );

    results.sort((a, b) => {
      const aStarts = a.Name.toLowerCase().startsWith(search);

      const bStarts = b.Name.toLowerCase().startsWith(search);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      return a.Name.localeCompare(b.Name);
    });
  }

  res.json(results.slice(0, 15));
});

module.exports = router;
