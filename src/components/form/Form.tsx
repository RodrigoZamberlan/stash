import styles  from './Form.module.css';
import Button from '../button/Button';

interface FormProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    submitTextButton?: string;
    loading?: boolean;
    errors?: {message: string} | null;
    isFormValid?: boolean;
    handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

const Form: React.FC<FormProps> = (
        {title,
        description,
        children, 
        submitTextButton = "Submit", 
        loading = false, 
        errors,
        isFormValid = true,
        handleSubmit}
    ) => {
    return <div className={styles.formContainer}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p>{description}</p>}
        <form onSubmit={handleSubmit}>
           {children}

            <div className={styles.buttonWrapper}>
                <Button disabled={!isFormValid || loading} styleType="primary" type="submit">{loading ? "Loading" : submitTextButton}</Button>
           </div>
           {errors ? <p>{errors.message}</p> : ""}
        </form>
    </div>
}

export default Form;