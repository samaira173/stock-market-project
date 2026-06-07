const searchBox = document.getElementById("searchBox");

const resultsDiv = document.getElementById("results");

const stockCard = document.getElementById("stockCard");

searchBox.addEventListener("input", async () => {
  const query = searchBox.value.trim();

  const type = getSearchType();

  if (type === "name" && query.length < 2) {
    resultsDiv.innerHTML = "";
    return;
  }

  try {
    const type = getSearchType();

    const response = await fetch(
      `http://localhost:3000/api/search?q=${query}&type=${type}`
    );

    const stocks = await response.json();

    displayResults(stocks);
  } catch (error) {
    console.error(error);
  }
});

function getSearchType() {
  return document.querySelector('input[name="searchType"]:checked').value;
}

function displayResults(stocks) {
  resultsDiv.innerHTML = "";

  if (stocks.length === 0) {
    resultsDiv.innerHTML = `
      <div class="result">
        No matching stocks found
      </div>
    `;
    return;
  }

  stocks.forEach((stock) => {
    const div = document.createElement("div");

    div.classList.add("result");

    const searchType = getSearchType();

    if (searchType === "symbol") {
      div.innerHTML = `
        <div class="result-symbol">
          ${stock.Symbol}
        </div>

        <div class="result-name">
          ${stock.Name}
        </div>
      `;
    } else {
      div.innerHTML = `
        <div class="result-symbol">
          ${stock.Name}
        </div>

        <div class="result-name">
          (${stock.Symbol})
        </div>
      `;
    }

    div.addEventListener("click", () => {
      loadStock(stock.Symbol);
    });

    resultsDiv.appendChild(div);
  });
}

async function loadStock(symbol) {
  try {
    stockCard.innerHTML = "<p>Loading...</p>";

    const response = await fetch(`http://localhost:3000/api/stock/${symbol}`);

    const stock = await response.json();

    resultsDiv.innerHTML = "";

    searchBox.value = symbol;

    renderStock(stock);
  } catch (error) {
    console.error(error);
  }
}

function renderStock(stock) {
  stockCard.innerHTML = `
    <div class="card">

      <h2>${stock.name}</h2>

      <p>${stock.symbol}</p>

      <div class="grid">

        <div class="metric">
          <div class="label">Current Price</div>
          <div class="value">$${stock.price}</div>
        </div>

        <div class="metric">
          <div class="label">MA20</div>
          <div class="value">${stock.ma20}</div>
        </div>

        <div class="metric">
          <div class="label">MA50</div>
          <div class="value">${stock.ma50}</div>
        </div>

        <div class="metric">
          <div class="label">Volume</div>
          <div class="value">
            ${stock.volume.toLocaleString()}
          </div>
        </div>

        <div class="metric">
          <div class="label">Volatility</div>
          <div class="value">${stock.volatility}</div>
        </div>

      </div>

    </div>
  `;
}
