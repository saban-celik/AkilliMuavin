import React, { useState } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import busData from './data';
import { useNavigate } from 'react-router-dom';

function Shop() {
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    const navigate = useNavigate();

    const handleSayfa = () => {
        navigate('/sayfa2');
    };
    const handleOrderClick = (menuItem) => {
        setCartItems((prevItems) => [...prevItems, menuItem]);
    };

    const handleSelectChange = (itemName) => {
        setSelectedItems((prevSelected) => ({
            ...prevSelected,
            [itemName]: !prevSelected[itemName],
        }));
    };

    const handleRequest = () => {
        const selectedItemsArray = Object.keys(selectedItems).filter(
            (itemName) => selectedItems[itemName]
        );

        if (selectedItemsArray.length > 0) {
            alert('Muavininiz isteğinizi almıştır. Hemen getirecektir.');
            // Seçilen öğeleri kullanmak için burada işlemler yapabilirsiniz.
        } else {
            alert('Lütfen bir şey seçin.');
        }
    };

    return (
        <div>
            <div className="my-4">
                <div>
                    <Button onClick={handleSayfa} variant="info">
                        Sayfaya Dön
                    </Button>
                </div>
                <Row className="justify-content-center mt">
                    {Object.keys(busData.menu).map((category) => (
                        <Col key={category} xs={12} md={4}>
                            <div className="order-section">
                                <h3>{category}</h3>
                                {busData.menu[category].map((menuItem) => (
                                    <Card key={menuItem.name} className="mb-3">
                                        <Card.Img variant="top" src={menuItem.image} style={{ height: '200px', objectFit: 'cover' }} />
                                        <Card.Body>
                                            <Card.Title>{menuItem.name}</Card.Title>
                                            <Card.Text>Fiyat: {menuItem.price} TL</Card.Text>
                                            <Form.Check
                                                type="checkbox"
                                                label="Seç"
                                                checked={selectedItems[menuItem.name] || false}
                                                onChange={() => handleSelectChange(menuItem.name)}
                                            />
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        </Col>
                    ))}
                </Row>
                <div className="mt-3 text-center">
                    <Button variant="primary" onClick={handleRequest}>
                        Muavinden İste
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Shop;
