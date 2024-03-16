import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ChatData from './ChatData'

const Chat = () => {
    const [messages, setMessages] = useState([{ text: "Merhaba! Size nasıl yardımcı olabilirim?", user: false }]);
    const [userInput, setUserInput] = useState('');
    const navigate = useNavigate();

    const handleSayfa = () => {
        navigate('/sayfa2');
    };

    const calculateLevenshteinDistance = (a, b, wordSimilarityThreshold) => {
        const dp = Array(a.length + 1)
            .fill(null)
            .map(() => Array(b.length + 1).fill(null));

        for (let i = 0; i <= a.length; i++) {
            dp[i][0] = i;
        }

        for (let j = 0; j <= b.length; j++) {
            dp[0][j] = j;
        }

        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
                const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,
                    dp[i][j - 1] + 1,
                    dp[i - 1][j - 1] + cost
                );

                if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
                    dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + cost);
                }
            }
        }

        return dp[a.length][b.length] <= wordSimilarityThreshold;
    };
    const simplifyInput = (text) => {
        return text
            .toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
            .replace(/\b(ve|ile|ama|ancak|fakat|ne|nasıl|neden)\b/g, '')
            .trim();
    };
    const tokenizeSentences = (text) => {
        // Metni nokta, ünlem, soru işareti gibi işaretlere göre ayır
        const sentences = text.split(/[.!?]/);

        // Boşlukları temizle
        const cleanedSentences = sentences
            .filter(sentence => sentence.trim() !== '')
            .map(sentence => sentence.trim());

        return cleanedSentences;
    };
    const groupSimilarQuestions = (userQuestions) => {
        const groupedQuestions = {};

        userQuestions.forEach((question) => {
            let addedToGroup = false;

            // Gruplanmış sorular arasında dolaş
            for (const group in groupedQuestions) {
                const representativeQuestion = groupedQuestions[group][0];

                // Eğer soru, temsilci soru ile yeterince benzerse gruba ekle
                if (calculateLevenshteinDistance(question, representativeQuestion, question.length / 2)) {
                    groupedQuestions[group].push(question);
                    addedToGroup = true;
                    break;
                }
            }

            // Eğer hiçbir gruba eklenmediyse yeni bir grup oluştur
            if (!addedToGroup) {
                groupedQuestions[question] = [question];
            }
        });

        return groupedQuestions;
    };

    const getAnswerForGroup = (group) => {
        // Grubun temsilci sorusunu al
        const representativeQuestion = group[0];

        // Temsilci soruya cevap al
        const answer = getAnswerForUserInput(representativeQuestion);

        return answer;
    };


    const sendMessage = () => {
        if (userInput.trim() === "") {
            return;
        }

        const updatedMessages = [...messages, { text: userInput, user: true }];
        setUserInput('');

        const answer = getAnswerForUserInput(userInput);
        let newMessages = [...updatedMessages, { text: answer, user: false }];

        const predefinedResponse = ChatData.find((data) => data.question.toLowerCase() === userInput.toLowerCase());

        if (predefinedResponse) {
            newMessages = [...newMessages, { text: predefinedResponse.answer, user: false }];
        }

        setMessages(newMessages);
    };
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    const getAnswerForUserInput = (userInput) => {
        const formattedUserInput = simplifyInput(userInput);

        // Belirli kelimeleri içeren soruları filtrele
        const excludedWords = ["hmm", "güzel", "iyi", "Tamam", "anladım", "tmm"];
        const containsExcludedWords = excludedWords.some(word => formattedUserInput.includes(word));

        if (containsExcludedWords) {
            if (formattedUserInput.includes("güzel")) {
                return "Beğendiğinize sevindim!";
            } else (formattedUserInput.includes("iyi", "tmm", "anladım", "hmm"))
            return "...";

        }

        const matchingQuestion = ChatData.find((data) => {
            const formattedQuestion = simplifyInput(data.question);

            const isSimilar = calculateLevenshteinDistance(formattedUserInput, formattedQuestion, formattedUserInput.length / 2);

            return isSimilar;
        });

        return matchingQuestion ? matchingQuestion.answer : "Üzgünüm, bu soruya cevap bulamadım.";
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

export default Chat;
