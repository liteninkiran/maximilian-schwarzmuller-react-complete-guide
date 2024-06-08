import { useAccordionContext } from './Accordion.jsx';
import { useAccordionItemContext } from './AccordionItem.jsx';

export default function AccordionContent({ className = '', children }) {
    const { openItemId } = useAccordionContext();
    const id = useAccordionItemContext();
    const isOpen = openItemId === id;
    const divClassName = className + (isOpen ? ' open' : ' close');

    return (
        <div className={divClassName}>
            {children}
        </div>
    );
}
