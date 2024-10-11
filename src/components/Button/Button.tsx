import './Button.css';

type ButtonProps = {
    children?: string | JSX.Element | JSX.Element[];
    isCircular?: boolean;
    onClick?: () => void;
}

const Button = ({
    children,
    onClick,
    isCircular = false
}: ButtonProps) => {
    const getClasses = () => {
        const classes = ['button'];
        if (isCircular) classes.push('button--circular');
        return classes.join(' ');
    }

    return <button onClick={onClick} className={getClasses()}>{children}</button>
}

export default Button;