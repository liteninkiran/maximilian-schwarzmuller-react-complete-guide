export function Input({ label, invalid, ...props }) {
    const labelColour = (invalid ? 'text-red-400' : 'text-stone-300');
    const inputColour = (invalid ? 'text-red-500 bg-red-100 border-red-300' : 'text-gray-700 bg-stone-300');
    const labelClasses = 'block mb-2 text-xs font-bold tracking-wide uppercase ' + labelColour;
    const inputClasses = 'w-full px-3 py-2 leading-tight border rounded shadow ' + inputColour;

    return (
        <p>
            <label className={labelClasses}>{label}</label>
            <input className={inputClasses} {...props} />
        </p>
    );
}
