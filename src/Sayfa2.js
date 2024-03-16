// Sayfa2.js
import React, { useState } from "react";
import { Row, Col, Image, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Sayfa2 = () => {
    const [selectedBus, setSelectedBus] = useState(null);

    const navigate = useNavigate()

    const handleShopInfoClick = () => {
        navigate('/shop')
    };
    const handleWeatherInfoClick = () => {
        navigate('/weatherInfo')
    }

    const handleAiClick = () => {
        navigate('/chat')
    }



    return (
        <div className="text-center mt-4 container">
            <h2 className="bg-dark text-light">Akıllı Muavin</h2>

            <div className="my-4">
                <Row className="mt-4 justify-content-center">
                    <Col>
                        {selectedBus && <h2>{selectedBus.busName}</h2>}
                        <Image
                            src="https://www.haber16.com/images/haberler/2019/11/yolcu-otobusunde-turk-kahveli-taciz.jpg"
                            style={{ height: "300px", width: "80%" }}
                            fluid
                        />
                        <Button
                            variant="info"
                            className="mt-2"
                            onClick={handleShopInfoClick}
                        >
                            Muavinden iste
                        </Button>
                    </Col>
                    <Col xs={12} md={4}>
                        <Image
                            src="https://www.gazeteipekyol.com/upload/87886-1693850169.jpg"
                            style={{ height: "300px", width: "80%" }}
                            fluid
                        />
                        <Button
                            variant="info"
                            className="mt-2"
                            onClick={handleWeatherInfoClick}
                        >
                            Hava Durumu Bilgisi Al
                        </Button>
                    </Col>
                    <Col xs={12} md={4}>
                        <Image
                            src="https://evrimagaci.org/public/content_media/5a756ae8320477d3bcf9c388dedeb882.jpg"
                            style={{ height: "300px", width: "80%" }}
                            fluid
                        />
                        <Button
                            variant="info"
                            className="mt-2"
                            onClick={handleAiClick}
                        >
                            Yapay Zeka ile Konuş
                        </Button>
                    </Col>


                </Row>
            </div>

        </div>
    );
};

export default Sayfa2;
