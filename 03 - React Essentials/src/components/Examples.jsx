// React
import { useState } from 'react';

// Components
import TabButton from './TabButton';
import Section from './Section';
import Tabs from './Tabs';

// Data
import { EXAMPLES } from './../data';

export default function Examples() {
    const [selectedTopic, setSelectedTopic] = useState();
    const handleSelect = (selectedButton) => setSelectedTopic(selectedButton);
    const tabContent = selectedTopic ? (
        <div id='tab-content'>
            <h3>{EXAMPLES[selectedTopic].title}</h3>
            <p>{EXAMPLES[selectedTopic].description}</p>
            <pre>
                <code>
                    {EXAMPLES[selectedTopic].code}
                </code>
            </pre>
        </div>
    ) : (
        <p>Please select a topic</p>
    );
    const buttons = (
        <>
            <TabButton isSelected={selectedTopic === 'components'} onClick={() => handleSelect('components')}>Components</TabButton>
            <TabButton isSelected={selectedTopic === 'jsx'} onClick={() => handleSelect('jsx')}>JSX</TabButton>
            <TabButton isSelected={selectedTopic === 'props'} onClick={() => handleSelect('props')}>Props</TabButton>
            <TabButton isSelected={selectedTopic === 'state'} onClick={() => handleSelect('state')}>State</TabButton>
        </>
    );

    return (
        <Section title='Examples' id='examples'>
            <Tabs buttons={buttons}>
                {tabContent}
            </Tabs>
        </Section>
    );
}
