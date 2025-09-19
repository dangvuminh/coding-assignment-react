import './button.scss'
const Button = ({ children, variant = 'primary', onClick }) => {
    let buttonClassName;
    // switch(variant) {
    //     case 'outlined': {

    //     }
    // }
    return <div className="custom-button">
        <button className={`${variant}`} onClick={onClick}>
        {children}
    </button>
    </div>
}

export default Button;