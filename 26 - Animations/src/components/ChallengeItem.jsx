import { useContext } from 'react';
import { motion } from 'framer-motion';

import { ChallengesContext } from '../store/challenges-context.jsx';

export default function ChallengeItem({
    challenge,
    onViewDetails,
    isExpanded,
}) {
    const { updateChallengeStatus } = useContext(ChallengesContext);
    const dateFormat = { day: '2-digit', month: 'short', year: 'numeric' }
    const formattedDate = new Date(challenge.deadline).toLocaleDateString('en-GB', dateFormat);
    const handleCancel = () => updateChallengeStatus(challenge.id, 'failed');
    const handleComplete = () => updateChallengeStatus(challenge.id, 'completed');
    const animate = { rotate: isExpanded ? 180 : 0 }
    const className = 'challenge-item-details-icon';
    const exit = { y: -30, opacity: 0 }

    return (
        <motion.li layout exit={exit}>
            <article className='challenge-item'>
                <header>
                    <img {...challenge.image} />
                    <div className='challenge-item-meta'>
                        <h2>{challenge.title}</h2>
                        <p>Complete until {formattedDate}</p>
                        <p className='challenge-item-actions'>
                            <button onClick={handleCancel} className='btn-negative'>
                                Mark as failed
                            </button>
                            <button onClick={handleComplete}>Mark as completed</button>
                        </p>
                    </div>
                </header>
                <div className='challenge-item-details'>
                    <p>
                        <button onClick={onViewDetails}>
                            View Details{' '}
                            <motion.span
                                animate={animate}
                                className={className}
                            >
                                &#9650;
                            </motion.span>
                        </button>
                    </p>

                    {isExpanded && (
                        <div>
                            <p className='challenge-item-description'>
                                {challenge.description}
                            </p>
                        </div>
                    )}
                </div>
            </article>
        </motion.li>
    );
}
