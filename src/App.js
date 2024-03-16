// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import Sayfa2 from "./Sayfa2";
import busData from "./data";
import { FaArrowRight } from 'react-icons/fa';
import WeatherInfo from "./WeatherInfo";
import "./App.css";
import Chatbot from "./Chatbot";
import Shop from "./Shop";
import Chat from "./Chat";
import ChatBot from "./Chatbot";

const App = () => {
  const [selectedBus, setSelectedBus] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  const handleBusClick = (busNumber) => {
    setSelectedBus(busData.buses.find((bus) => bus.busNumber === busNumber));
    navigate("/sayfa2");
  };

  const addToCart = (menuItem) => {
    setCartItems([...cartItems, menuItem]);
  };

  return (
    <Container>
      <Row>
        <Col>

          <h1>Hoşgeldiniz</h1>
          <h3>Koltuk Numarası Seçiniz:</h3>
          {busData.buses.map((bus) => (
            <Button
              key={bus.busNumber}
              variant="info"
              className="mr-2 mb-2"
              onClick={() => handleBusClick(bus.busNumber)}
            >
              {bus.busNumber}
            </Button>
          ))}
        </Col>
        <Col>
          {selectedBus && (
            <>
              <h2>{selectedBus.busName}</h2>

            </>
          )}
        </Col>
      </Row>

      <Routes>
        <Route path="/sayfa2" element={<Sayfa2 selectedBus={selectedBus} addToCart={addToCart} />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/weatherInfo" element={<WeatherInfo />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chatbot" element={<ChatBot />} />
      </Routes>
    </Container>
  );
};

export default App;
