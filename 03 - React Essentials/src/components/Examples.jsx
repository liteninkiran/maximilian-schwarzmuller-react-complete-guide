// React
import { useState } from 'react';

// Components
import TabButton from './TabButton';
import Section from './Section';

// Data
import { EXAMPLES } from './../data';

export default function Examples() {
    const [selectedTopic, setSelectedTopic] = useState();
    function handleSelect(selectedButton) {
        setSelectedTopic(selectedButton);
    }
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

    return (
        <Section title='Examples' id='examples'>
            <menu>
                <TabButton isSelected={selectedTopic === 'components'} onClick={() => handleSelect('components')}>Components</TabButton>
                <TabButton isSelected={selectedTopic === 'jsx'} onClick={() => handleSelect('jsx')}>JSX</TabButton>
                <TabButton isSelected={selectedTopic === 'props'} onClick={() => handleSelect('props')}>Props</TabButton>
                <TabButton isSelected={selectedTopic === 'state'} onClick={() => handleSelect('state')}>State</TabButton>
            </menu>
            {tabContent}
        </Section>
    );
}
