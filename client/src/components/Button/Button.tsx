import { DetailedHTMLProps, ButtonHTMLAttributes, ReactNode } from "react";
import styles from './Button.module.css';
import cn from 'classnames';

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children?: ReactNode;
}

export const Button = ({ children, className, ...props }: ButtonProps) => {
    return (
        <button className={cn(styles.button, className)} {...props}>
            {children}
        </button>
    )
}