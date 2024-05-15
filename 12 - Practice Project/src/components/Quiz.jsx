import { useState, useCallback } from 'react';

import QUESTIONS from '../questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';
import Question from './Question.jsx';

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnswerState] = useState('');
    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const handleSelectAnswerFn = selectedAnswer => {
        setAnswerState('answered');
        setUserAnswers(prev => [...prev, selectedAnswer]);
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

    return (
        <div id='quiz'>
            <Question
                key={activeQuestionIndex}
                questionText={QUESTIONS[activeQuestionIndex].text}
                answers={QUESTIONS[activeQuestionIndex].answers}
                selectedAnswer={userAnswers[userAnswers.length - 1]}
                answerState={answerState}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    );
}
