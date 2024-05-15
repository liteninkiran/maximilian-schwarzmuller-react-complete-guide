import { useState } from 'react';

import QUESTIONS from '../questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';
import QuestionTimer from './QuestionTimer.jsx';
import { useCallback } from 'react';

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnswerState] = useState('');
    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const handleSelectAnswerFn = (selectedAnswer) => {
        setAnswerState('answered');
        setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);
        setTimeout(() => {
            selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]
                ? setAnswerState('correct')
                : setAnswerState('incorrect');
                setTimeout(() => {
                    setAnswerState('');
                }, 2000);
        }, 1000);
    }
    const handleSelectAnswer = useCallback(handleSelectAnswerFn, [activeQuestionIndex]);
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
                <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer} />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id='answers'>
                    {
                        shuffledAnswers.map((answer) => {
                            const isSelected = userAnswers[userAnswers.length - 1] === answer;
                            const isAnswered1 = answerState === 'answered';
                            const isAnswered2 = answerState === 'correct' || answerState === 'wrong';
                            let cssClass = '';
                            cssClass = isAnswered1 && isSelected ? 'selected' : '';
                            cssClass = isAnswered2 && isSelected ? answerState : '';
                            return (
                                <li key={answer} className='answer'>
                                    <button onClick={() => handleSelectAnswer(answer)} className={cssClass}>
                                        {answer}
                                    </button>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    );
}
