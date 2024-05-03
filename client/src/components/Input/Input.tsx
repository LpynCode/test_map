import styles from './Input.module.css';
import cn from 'classnames';
import { DetailedHTMLProps, ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';


interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    labelName?: string;
    error?: FieldError;
}

export const Input = forwardRef((
    { error, labelName, className, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>
) => {

    return (
        <div className={styles.inputWrapper}>
            {labelName && <label htmlFor={props.id} className={styles.label}>{labelName}</label>}
            <input
                className={
                    cn(
                        className,
                        styles.input,
                        { [styles.isError]: error }
                    )
                }
                ref={ref}
                {...props}
            />
            {error && <span role='alert' className={styles.error}>{error.message}</span>}
        </div>
    );
});