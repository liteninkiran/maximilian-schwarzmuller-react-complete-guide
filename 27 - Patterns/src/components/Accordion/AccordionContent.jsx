import { useAccordionContext } from './Accordion.jsx';

export default function AccordionContent({ id, className = '', children }) {
    const { openItemId } = useAccordionContext();
    const isOpen = openItemId === id;
    const divClassName = className + (isOpen ? ' open' : ' close');

    return (
        <div className={divClassName}>
            {children}
        </div>
    );
}
