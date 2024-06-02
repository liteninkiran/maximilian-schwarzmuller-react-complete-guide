import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import NewChallenge from './NewChallenge.jsx';

export default function Header() {
    const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();
    const handleStartAddNewChallenge = () => setIsCreatingNewChallenge(true);
    const handleDone = () => setIsCreatingNewChallenge(false);
    const whileHover = { scale: 1.1 }
    const transition = { type: 'spring', stiffness: 500 }

    return (
        <>
            <AnimatePresence>
                {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
            </AnimatePresence>

            <header id='main-header'>
                <h1>Your Challenges</h1>
                <motion.button
                    whileHover={whileHover}
                    transition={transition}
                    onClick={handleStartAddNewChallenge}
                    className='button'
                >
                    Add Challenge
                </motion.button>
            </header>
        </>
    );
}
