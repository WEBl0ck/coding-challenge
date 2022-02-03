import React from "react";
import "./App.css";
import axios from "axios";
import { DataTable } from "./Components/index";
import { CarData } from "./types/DataTypes";
import JSONtoStringParse from "./JSONparser/JSONtoStringParse";

export default function App() {
  const [carData, setCarData] = React.useState<any | CarData[]>([]);

  // testing function from task №4
  const firstJSON = {
    name: "John",
    surname: "Smith",
    hobbies: "Reading",
    age: 25,
    role: "manager",
    group: "big data",
  };

  const secondJSON = {
    name: "John",
    surname: "Smith",
    hobbies: "Reading",
    age: 28,
    role: "admin",
    level: "medium",
    group: "science",
  };
  console.log(JSONtoStringParse(firstJSON, secondJSON));
  // testing finish

  function handleSetCarData(data: CarData[]) {
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
