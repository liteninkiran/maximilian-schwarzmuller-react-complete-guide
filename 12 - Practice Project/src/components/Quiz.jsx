import { useState, useCallback } from 'react';

import QUESTIONS from '../questions.js';
import Question from './Question.jsx';
import Summary from './Summary.jsx';

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;
    const handleSelectAnswerFn = selectedAnswer => {
        setUserAnswers(prev => [...prev, selectedAnswer]);
    }
    const handleSelectAnswer = useCallback(handleSelectAnswerFn, []);
    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    return activeQuestionIndex === QUESTIONS.length ? (
        <Summary userAnswers={userAnswers} />
    ) : (
        <div id='quiz'>
            <Question
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    )
}
