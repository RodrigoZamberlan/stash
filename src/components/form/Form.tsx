import styles  from './Form.module.css';
import Button from '../button/Button';

interface FormProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    submitTextButton?: string;
    isFormValid?: boolean;
    status?: string;
    handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

const Form: React.FC<FormProps> = (
    {title,
    description,
    children, 
    submitTextButton = "Submit", 
    isFormValid = true,
    status = "",
    handleSubmit}
) => {
    return <div className={styles.formContainer}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p>{description}</p>}
        <form onSubmit={handleSubmit}>
           {children}

            <div className={styles.buttonWrapper}>
                <Button disabled={!isFormValid} styleType="primary" type="submit">{status === "loading" ? status : submitTextButton}</Button>
           </div>

            {status && status !== "success" && status !== "loading" ? <p className={styles.errorMessage}>{status}</p> : ""}           
        </form>
    </div>
}

export default Form;