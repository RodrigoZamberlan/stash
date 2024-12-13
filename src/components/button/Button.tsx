import styles from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    handleClick?: React.MouseEventHandler<HTMLButtonElement>
    styleType?: 'primary' |'secondary' | 'link' | 'disabled';
    type?: 'submit' | 'button';
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({children, handleClick, styleType = 'primary', type = 'button', disabled = false}) => {
    return <button className={styles[styleType]} onClick={handleClick} type={type} disabled={disabled}>{children}</button>
}

export default Button;