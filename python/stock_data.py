import sys
import json
import yfinance as yf

symbol = sys.argv[1]
ticker = yf.Ticker(symbol)
info = ticker.info
data = ticker.history(period="3mo")
close = data["Close"]
returns = close.pct_change()
volatility = returns.std()
result = {
    "symbol": symbol,
    "name":info.get("longName",symbol),
    "price":
        float(round(close.iloc[-1], 2)),
    "ma20":
        float(
            round(
                close
                .rolling(20)
                .mean()
                .iloc[-1],
                2
            )
        ),
    "ma50":
        float(
            round(
                close
                .rolling(50)
                .mean()
                .iloc[-1],
                2
            )
        ),
    "volume":
        int(data["Volume"].iloc[-1]),
    "volatility":
        float(round(volatility, 4))
}
print(json.dumps(result))