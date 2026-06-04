import yfinance as yf
from indicators import add_indicators
ticker = yf.Ticker("AAPL")
data = ticker.history(period="3mo")
data = add_indicators(data)
print(data.tail())