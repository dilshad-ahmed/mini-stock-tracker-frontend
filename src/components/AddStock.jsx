import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utils/helper";

const AddStock = () => {
  const [stock, setStock] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    setStock({ ...stock, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${BASE_URL}/api/set-stock`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stock),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to save data");
        }
      })
      .then((data) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="main-container">
      <h2 className="mb-1 text-center">AddStock</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-style"
          onChange={handleChange}
          name="name"
          required
          placeholder="Enter Stock Name"
        />
        <br />
        <input
          type="text"
          className="input-style"
          onChange={handleChange}
          name="symbol"
          required
          placeholder="Enter Stock Code"
        />{" "}
        <br />
        <input
          type="text"
          className="input-style"
          onChange={handleChange}
          name="price"
          required
          placeholder="Current Price"
        />
        <input className="add-stock-btn" value={"Add Stock"} type="submit" />
      </form>
      <Link className="style-text" to="/">
        View All Stocks
      </Link>
    </div>
  );
};

export default AddStock;
