import styles  from './Form.module.css';
import Button from '../button/Button';

interface FormProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    submitTextButton?: string;
    handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

const Form: React.FC<FormProps> = ({title, description, children, submitTextButton = "Submit", handleSubmit}) => {
    return <div className={styles.formContainer}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p>{description}</p>}
        <form onSubmit={handleSubmit}>
           {children}

            <div className={styles.buttonWrapper}>
                <Button styleType="primary" type="submit">{submitTextButton}</Button>
           </div>
        </form>
    </div>
}

export default Form;