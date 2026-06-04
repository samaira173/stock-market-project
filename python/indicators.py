def add_indicators(df):
    df["MA20"] = (
        df["Close"]
        .rolling(20)
        .mean()
    )
    df["MA50"] = (
        df["Close"]
        .rolling(50)
        .mean()
    )
    df["Return"] = (
        df["Close"]
        .pct_change()
    )
    return df