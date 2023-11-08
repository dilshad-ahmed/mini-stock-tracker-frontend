import React, { useState } from 'react'
import './App.css'
import StockPriceTracker from './components/StockPriceTracker'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddStock from './components/AddStock'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StockPriceTracker />}>
          </Route>
          <Route path='/add-stock' element={<AddStock />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
