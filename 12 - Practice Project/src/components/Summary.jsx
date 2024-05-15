import quizCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from '../questions.js';

export default function Summary({ userAnswers }) {
    const skippedAnswers = userAnswers.filter((answer, index) => answer === null);
    const correctAnswers = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]);
    const skipped = Math.round(skippedAnswers.length / userAnswers.length * 100);
    const correct = Math.round(correctAnswers.length / userAnswers.length * 100);
    return (
        <div id='summary'>
            <img src={quizCompleteImg} alt='Trophy icon' />
            <h2>Quiz Completed!</h2>
            <div id='summary-stats'>
                <p>
                    <span className='number'>{skipped}%</span>
                    <span className='text'>skipped</span>
                </p>

                <p>
                    <span className='number'>{correct}%</span>
                    <span className='text'>answered correctly</span>
                </p>

                <p>
                    <span className='number'>{100 - correct - skipped}%</span>
                    <span className='text'>answered incorrectly</span>
                </p>
            </div>
            <ol>
                {
                    userAnswers.map((answer, index) => {
                        const cssAnswer = answer === QUESTIONS[index].answers[0] ? 'correct' : 'incorrect';
                        const cssExtra = answer === null ? 'skipped' : cssAnswer;
                        const cssClass = 'user-answer ' + cssExtra;
                        return (
                            <li key={index}>
                                <h3>{index + 1}</h3>
                                <p className='question'>{QUESTIONS[index].text}</p>
                                <p className={cssClass}>{answer ?? 'Skipped'}</p>
                            </li>
                        );
                    })
                }
            </ol>
        </div>
    );
}
