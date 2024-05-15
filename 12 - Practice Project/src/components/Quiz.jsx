import { useState } from 'react';

import QUESTIONS from '../questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';

export default function Quiz() {
    // State
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;

    const handleSelectAnswer = (selectedAnswer) => {
        setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);
    }

    // Check if quiz is completed
    if (activeQuestionIndex === QUESTIONS.length) {
        return (
            <div id='summary'>
                <img src={quizCompleteImg} alt='Trophy icon' />
                <h2>Quiz Completed!</h2>
            </div>
        );
    }

    // Shuffle the answers
    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);

    // Return questions
    return (
        <div id='quiz'>
            <div id='question'>
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id='answers'>
                    {
                        shuffledAnswers.map((answer) => (
                            <li key={answer} className='answer'>
                                <button onClick={() => handleSelectAnswer(answer)}>
                                    {answer}
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}
