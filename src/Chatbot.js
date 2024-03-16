// ChatBot.js

import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import OpenAI from "openai";

const ChatBot = () => {
    const [messages, setMessages] = useState([{ text: "Merhaba! Size nasıl yardımcı olabilirim?", user: false }]);
    const [userInput, setUserInput] = useState('');
    const navigate = useNavigate();
    const openai = new OpenAI({ 'apiKey': process.env.OPENAI_API_KEY, 'organization': process.env.OPENAI_API_ORG_ID });
    const handleSayfa = () => {
        navigate('/sayfa2')
    }
    const sendMessage = async () => {
        if (userInput.trim() === "") {
            return; // Boş mesaj gönderme
        }

        // Kullanıcının mesajını ekleyin
        const updatedMessages = [...messages, { text: userInput, user: true }];
        setMessages(updatedMessages);
        setUserInput('');

        try {
            // OpenAI API'ye istek gönderin
            const response = await fetchOpenAIResponse(userInput);

            // OpenAI'den gelen cevabı ekleyin
            const newMessages = [...updatedMessages, { text: response, user: false }];
            setMessages(newMessages);
        } catch (error) {
            console.error('OpenAI API isteği sırasında bir hata oluştu:', error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    const fetchOpenAIResponse = async (userInput) => {


        try {
            const stream = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [{ role: "user", content: userInput }],
                stream: true,
            });

            let responseText = '';

            for await (const chunk of stream) {
                responseText += chunk.choices[0]?.delta?.content || '';
            }

            return responseText.trim();
        } catch (error) {
            console.error('OpenAI API isteği sırasında bir hata oluştu:', error);
            throw error;
        }
        // }
        // const apiKey = process.env.OPENAPI_KEY;

        // // OpenAI API isteği
        // const apiUrl = 'https://api.openai.com/v1/chat/completions';

        // try {
        //     const response = await fetch(apiUrl, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${apiKey}`,
        //         },
        //         body: JSON.stringify({
        //             prompt: userInput,
        //             max_tokens: 50,
        //         }),
        //     });

        //     if (!response.ok) {
        //         throw new Error(`OpenAI API isteği başarısız: ${response.status}`);
        //     }

        //     const data = await response.json();
        //     console.log('OpenAI Yanıtı:', data);

        //     if (!data.choices || data.choices.length === 0) {
        //         console.error('API yanıtında geçerli bir seçenek bulunamadı.');
        //         return '';
        //     }

        //     return data.choices[0].text.trim();
        // } catch (error) {
        //     console.error('OpenAI API isteği sırasında bir hata oluştu:', error);
        //     throw error;
        // }
    };

    return (
        <div className="container">
            <div><Button onClick={handleSayfa} variant="info">Sayfaya Dön</Button></div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="chat-container">
                        {messages.map((message, index) => (
                            <div key={index} className={message.user ? 'user-message' : 'bot-message'}>
                                {message.text}
                            </div>
                        ))}
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="form-control"
                            placeholder="Mesajınızı yazın..."
                        />
                        <button onClick={sendMessage} className="btn btn-info">
                            Gönder
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
