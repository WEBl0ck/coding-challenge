import axios from "axios";
import { PieChart } from "react-minimal-pie-chart";
import randomColor from "randomcolor";
import React, { useState } from "react";

import "./DataTable.scss";

import { CarData } from "../../types/DataTypes";

interface Props {
  data: CarData[] | [];
  setCarData: (data: CarData[]) => void;
}

export default function DataTable({ data, setCarData }: Props) {
  const [carBrand, setCarBrand] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [mostPopularModel, setMostPopularModel] = useState("");
  const [averagePrice, setAveragePrice] = useState("");

  function handleCreateItem() {
    const newData = {
      id: Math.floor(Math.random() * 10000),
      car_brand: carBrand,
      country_of_origin: countryOfOrigin,
      most_popupular_model: mostPopularModel,
      average_price_of_cars: averagePrice,
      value: parseInt(averagePrice) || 100,
      color: randomColor(),
    };

    if (
      carBrand.length > 0 &&
      countryOfOrigin.length > 0 &&
      mostPopularModel.length > 0
    ) {
      axios.post("/cars", newData).then(({ data }) => {
        setCarData(data);
      });
    } else {
      alert("Please fill in the all fields");
    }
  }

  function handleDeleteItem(id: number) {
    axios.delete(`/cars/${id}`).then(() => {
      const updatedData = data.filter((item: CarData) => item.id !== id);
      setCarData(updatedData);
    });
  }

  return (
    <React.Fragment>
      <form className="create_form">
        <label className="create_label">Car brand:</label>
        <input
          className="create_input"
          type="text"
          value={carBrand}
          onChange={(e) => setCarBrand(e.target.value)}
        />
        <label className="create_label">Country of Origin:</label>
        <input
          className="create_input"
          type="text"
          value={countryOfOrigin}
          onChange={(e) => setCountryOfOrigin(e.target.value)}
        />
        <label className="create_label">Most popular model of a car:</label>
        <input
          className="create_input"
          type="text"
          value={mostPopularModel}
          onChange={(e) => setMostPopularModel(e.target.value)}
        />
        <label className="create_label">Average price of cars of brand:</label>
        <input
          className="create_input"
          type="text"
          value={averagePrice}
          onChange={(e) => setAveragePrice(e.target.value)}
        />
        <button className="create_button" onClick={handleCreateItem}>
          CREATE
        </button>
      </form>

      <table className={"table"}>
        <thead>
          <tr>
            <th className="table_field_name" data-type="numeric">
              Id
            </th>
            <th className="table_field_name" data-type="text-short">
              Card Brand
            </th>
            <th className="table_field_name" data-type="text-short">
              Country of origin
            </th>
            <th className="table_field_name" data-type="text-short">
              Most popular model
            </th>
            <th className="table_field_name" data-type="text-short">
              Average price of cars
            </th>
            <th className="table_field_name" data-type="text-short">
              Remove
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, i) => (
            <tr className="table_item" key={`${i}_${e.id}`}>
              <td className="table_property">{e.id}</td>
              <td className="table_property">{e.car_brand}</td>
              <td className="table_property">{e.country_of_origin}</td>
              <td className="table_property">{e.most_popupular_model}</td>
              <td className="table_property">{e.average_price_of_cars}</td>
              <td>
                <button
                  className="table_delete_button"
                  onClick={() => handleDeleteItem(e.id)}
                >
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="graphics_container">
        <div className="pie_chart">
          <PieChart
            label={({ dataEntry }) => dataEntry.car_brand}
            data={data}
            labelStyle={{ fontSize: 5 }}
          />
        </div>
        <div className="bar_chart">
          {data
            .sort((a, b) => a.value - b.value)
            .map((e, i) => (
              <div
                className="bar_chart_item"
                key={`${i}_${e.id}`}
                style={{
                  height: `${e.value}%`,
                  maxHeight: 500,
                  backgroundColor: e.color,
                }}
              >
                {e.car_brand}
              </div>
            ))}
        </div>
      </div>
    </React.Fragment>
  );
}
