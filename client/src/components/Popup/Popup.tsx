import { HTMLAttributes, ReactNode } from 'react';
import styles from './Popup.module.css';


interface PopupProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    close: () => void;
    title: string;
}

export default function Popup({ children, title, close, ...props }: PopupProps) {

    return (
        <div className={styles.popup_bg} onMouseDown={close}>
            <div className={styles.popup} onMouseDown={(e) => e.stopPropagation()} {...props}>
                <div className={styles.header}>
                    <h3>{title}</h3>
                </div>
                {children}
            </div>
        </div>
    );
}