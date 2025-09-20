import './button.scss'
const Button = ({ children, variant = 'primary', onClick, prefixIcon, className }) => {
    return <div className={`custom-button`}>
        <button className={`${variant} ${className}`} onClick={onClick}>
            {prefixIcon && prefixIcon} {children}
        </button>
    </div>
}

export default Button;