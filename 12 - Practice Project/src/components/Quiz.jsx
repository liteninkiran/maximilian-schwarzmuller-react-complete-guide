import { useState } from 'react';

import QUESTIONS from '../questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';
import QuestionTimer from './QuestionTimer.jsx';
import { useCallback } from 'react';

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;
    const handleSelectAnswerFn = (selectedAnswer) => {
        setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);
    }
    const handleSelectAnswer = useCallback(handleSelectAnswerFn, []);
    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (activeQuestionIndex === QUESTIONS.length) {
        return (
            <div id='summary'>
                <img src={quizCompleteImg} alt='Trophy icon' />
                <h2>Quiz Completed!</h2>
            </div>
        );
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);

    return (
        <div id='quiz'>
            <div id='question'>
                <QuestionTimer key={activeQuestionIndex} timeout={3000} onTimeout={handleSkipAnswer} />
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
