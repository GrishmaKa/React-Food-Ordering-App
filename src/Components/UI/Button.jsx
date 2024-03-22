export default function Button({ children, textOnly, className, ...props }) {

    let cssClass = textOnly ? 'text-button' : 'button';
    cssClass += ' ' + className;  //add any additional classes if needed.
    return (
        <button className={cssClass} {...props}>{children}</button>
    )
}