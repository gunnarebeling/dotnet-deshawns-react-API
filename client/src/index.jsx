import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Home from "./Home";
import { AllDogs } from "./Dog Views/AllDogs";
import { DogDetails } from "./Dog Views/DogDetails";
import { AddDogForm } from "./Forms/AddDogForm";
import { AllWalkers } from "./Walker Views/AllWalkers";
import { DogChoice } from "./Walker Views/DogChoice";
import { AddWalkerCities } from "./Forms/addWalkerCities";
import { Cities } from "./Cities/Cities";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<AllDogs />} />
        <Route path="dogs/:dogId" element={<DogDetails/>}/>
        <Route path="adddog" element={<AddDogForm/>}/>
        <Route path="walkers">
          <Route index element={<AllWalkers/>}/>
          <Route path=":walkerId/dogchoice" element={<DogChoice/>}/>
          <Route path=":walkerId/cities" element={<AddWalkerCities/>}/>
        </Route>
        <Route path="cities" element={<Cities/>}/>
      </Route>
    </Routes>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
