import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data_2330, setData_2330] = useState([]);
  const [data_2603, setData_2603] = useState([]);
  const [data_2618, setData_2618] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3500/stock/2330').then((response) => {
      setData_2330(response.data);
    })
    axios.get('http://localhost:3500/stock/2603').then((response) => {
      setData_2603(response.data);
    })
    axios.get('http://localhost:3500/stock/2618').then((response) => {
      setData_2618(response.data);
    })
  }, []) 
  return (
    <>
    <div className="container stock-table-all">
    <h2>TWSE 臺灣證券交易所 - 個股日成交資訊</h2>
    <hr />
    <h4>台積電</h4>
      <table className="table table-hover table-borderless stock-table">
        <thead>
          <tr>
            <td>stock id</td>
            <td>date</td>
            <td>open price</td>
            <td>close price</td>
            <td>high price</td>
            <td>low price</td>
            <td>delta price</td>
            <td>transactions</td>
            <td>volume</td>
            <td>amount</td>
          </tr>
        </thead>
        <tbody>
          {data_2330.map((value,index) => {
            return (
              <tr key={value.stock_id}>
                <td>{value.stock_id}</td>
                <td>{value.date}</td>
                <td>{value.open_price}</td>
                <td>{value.close_price}</td>
                <td>{value.high_price}</td>
                <td>{value.low_price}</td>
                <td>{value.delta_price}</td>
                <td>{value.transactions}</td>
                <td>{value.volume}</td>
                <td>{value.amount}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <hr />
      <h4>長榮</h4>
      <table className="table table-hover table-borderless stock-table">
        <thead>
          <tr>
            <td>stock id</td>
            <td>date</td>
            <td>open price</td>
            <td>close price</td>
            <td>high price</td>
            <td>low price</td>
            <td>delta price</td>
            <td>transactions</td>
            <td>volume</td>
            <td>amount</td>
          </tr>
        </thead>
        <tbody>
          {data_2603.map((value,index) => {
            return (
              <tr key={value.stock_id}>
                <td>{value.stock_id}</td>
                <td>{value.date}</td>
                <td>{value.open_price}</td>
                <td>{value.close_price}</td>
                <td>{value.high_price}</td>
                <td>{value.low_price}</td>
                <td>{value.delta_price}</td>
                <td>{value.transactions}</td>
                <td>{value.volume}</td>
                <td>{value.amount}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <hr />
      <h4>長榮航</h4>
      <table className="table table-hover table-borderless stock-table">
        <thead>
          <tr>
            <td>stock id</td>
            <td>date</td>
            <td>open price</td>
            <td>close price</td>
            <td>high price</td>
            <td>low price</td>
            <td>delta price</td>
            <td>transactions</td>
            <td>volume</td>
            <td>amount</td>
          </tr>
        </thead>
        <tbody>
          {data_2618.map((value,index) => {
            return (
              <tr key={value.stock_id}>
                <td>{value.stock_id}</td>
                <td>{value.date}</td>
                <td>{value.open_price}</td>
                <td>{value.close_price}</td>
                <td>{value.high_price}</td>
                <td>{value.low_price}</td>
                <td>{value.delta_price}</td>
                <td>{value.transactions}</td>
                <td>{value.volume}</td>
                <td>{value.amount}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      
    </div>
      
    </>
  );
}

export default App;
