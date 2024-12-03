interface FormProps {
    title: string;
    children: React.ReactNode;
    submitTextButton?: string;
    handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

const Form: React.FC<FormProps> = ({title, children, submitTextButton = "Submit", handleSubmit}) => {
    return <div className="form-container">
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
           {children}

           <button className="primary">{submitTextButton}</button>
        </form>
    </div>
}

export default Form;