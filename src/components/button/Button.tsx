import styles from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    handleClick?: React.MouseEventHandler<HTMLButtonElement>
    styleType?: 'primary' |'secondary' | 'link' | 'disabled';
    type?: 'submit' | 'button';
    disabled?: boolean;
    customStyle?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
    children,
    handleClick,
    styleType = 'primary',
    type = 'button',
    disabled = false,
    customStyle,
}) => {
    return <button className={styles[styleType]} onClick={handleClick} type={type} disabled={disabled} style={customStyle}>{children}</button>
}

export default Button;