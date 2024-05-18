import classes from './Notification.module.css';

const Notification = (props) => {

    const specialClasses =
        props.status === 'error'   ? classes.error   :
        props.status === 'success' ? classes.success : '';

    const cssClasses = `${classes.notification} ${specialClasses}`;

    return (
        <section className={cssClasses}>
            <h2>{props.title}</h2>
            <p>{props.message}</p>
        </section>
    );
};

export default Notification;
