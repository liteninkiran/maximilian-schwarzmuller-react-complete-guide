export default function Input({ isTextArea = false, label, ...props }) {
    return (
        <p>
            <label>{label}</label>
            {
                isTextArea ? (<textarea {...props} />) : (<input {...props} />)
            }
            
        </p>
    );
}
