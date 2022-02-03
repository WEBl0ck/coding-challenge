import React from "react";
import "./App.css";
import axios from "axios";
import { DataTable } from "./Components/index";
import { CarData } from "./types/DataTypes";

export default function App() {
  const [carData, setCarData] = React.useState<any | CarData[]>([]);

  function handleSetCarData(data: any) {
    setCarData(data);
  }

  React.useEffect(() => {
    axios.get("/cars").then(({ data }) => {
      setCarData(data);
    });
  }, []);

  console.log(carData);
  return (
    <div className="App">
      <DataTable data={carData} setCarData={handleSetCarData} />
    </div>
  );
}
