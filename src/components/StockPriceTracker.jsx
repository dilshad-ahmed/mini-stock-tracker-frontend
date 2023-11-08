import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../Utils/helper";

function StockPriceTracker() {
  const [selectedStock, setSelectedStock] = useState("");
  const [stocks, setStocks] = useState([]);

  const [currentPrice, setCurrentPrice] = useState(null);
  const previousInputValue = useRef();

  const handleStockChange = (event) => {
    setSelectedStock(event.target.value);
  };

  useEffect(() => {
    // Function to fetch and update stock price
    const fetchStockPrice = async () => {
      if (!selectedStock) {
        return;
      }
      try {
        const response = await fetch(
          `${BASE_URL}/api/stock/${selectedStock}`
        );
        const data = await response.json();
        setCurrentPrice(data.price);
        setSelectedStock(data.symbol);
      } catch (error) {
        console.error("Error fetching stock price:", error);
      }
    };

    fetchStockPrice();

    // Set up an interval to fetch stock price updates every minute
    const intervalId = setInterval(fetchStockPrice, 6000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [selectedStock]);

  useEffect(() => {
    // function to get the list of stocks from the database
    const getStocks = async () => {
      try {
        // const response = await fetch("http://localhost:8000/api/stocks-list");
        const response = await fetch(`${BASE_URL}/api/stocks-list`);
        const data = await response.json();
        setStocks(data?.stocks);
        if (!selectedStock) {
          setSelectedStock(data?.stocks[0]?.symbol);
        }
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };
    getStocks();
  }, []);

  useEffect(() => {
    previousInputValue.current = currentPrice;
  }, [currentPrice]);

  return (
    <div className="main-container">
      <h2 className="mb-1 text-center">Stock Price Tracker</h2>
      <div className="d-flex mb-1">
        <label className="pr-1">Select Stock: </label>
        <select value={selectedStock} onChange={handleStockChange}>
          {stocks.map((stock) => (
            <option key={stock.symbol} value={stock.symbol}>
              {stock.name}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-gray">
        <p>Selected Stock: {selectedStock}</p>
        <p>previous Price: ${previousInputValue.current || ""}</p>
        <p>
          Current Price:{" "}
          {currentPrice === null ? (
            "Loading..."
          ) : (
            <span
              className={
                currentPrice > previousInputValue.current ? "green" : "red"
              }
            >
              ${currentPrice}
            </span>
          )}
        </p>
      </div>
      <Link className="add-stock-btn" to="/add-stock">
        Add Stock
      </Link>
    </div>
  );
}

export default StockPriceTracker;
