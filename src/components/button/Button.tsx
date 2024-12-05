import styles from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    handleClick?: React.MouseEventHandler<HTMLButtonElement>
    styleType?: 'primary' |'secondary' | 'link' | 'disabled';
    type?: 'submit' | 'button';
}

const Button: React.FC<ButtonProps> = ({children, handleClick, styleType = 'primary', type = 'button'}) => {
    return <button className={styles[styleType]} onClick={handleClick} type={type}>{children}</button>
}

export default Button;