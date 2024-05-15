import { useRef } from 'react';

export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {
    const shuffledAnswers = useRef();
    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }
    return (
        <ul id='answers'>
            {
                shuffledAnswers.current.map(answer => {
                    const isSelected = selectedAnswer === answer;
                    const isAnswered1 = answerState === 'answered';
                    const isAnswered2 = answerState === 'correct' || answerState === 'incorrect';
                    let cssClass = '';
                    cssClass = isAnswered1 && isSelected ? 'selected' : '';
                    cssClass = isAnswered2 && isSelected ? answerState : cssClass;
                    return (
                        <li key={answer} className='answer'>
                            <button onClick={() => onSelect(answer)} className={cssClass}>
                                {answer}
                            </button>
                        </li>
                    );
                })
            }
        </ul>
    );
}
