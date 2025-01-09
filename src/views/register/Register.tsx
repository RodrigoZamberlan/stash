import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../components/form/Form";
import InputControlled from "../../components/input/InputControlled";
import Button from "../../components/button/Button";
import { useCreateUser } from "../../hooks/useCreateUser";
import InputPasswordWithValidation from "../../components/input/InputPasswordWithValidation";
import { InputEmailWithValidation } from "../../components/input/InputEmailWithValidation";
import { useValidationStatus } from "../../hooks/useValidationStatus";

const formDataDefault = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
    isActive: true
}

const Register: React.FC = () => {
    const [formData, setFormData] = useState(formDataDefault);
    const { createUserHandler, statusCreatingUser } = useCreateUser();
    const fieldNamesToCheckValidation = ["email", "password"];
    const { isFormValid, updateValidationStatus } = useValidationStatus({fieldNamesToCheckValidation});

    const handleValidationStatusChange = (id: string, isValid: boolean) => {
        updateValidationStatus(id, isValid);
    }

    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData(prev => ({...prev, [name]: value}));
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await createUserHandler(formData);
        if (statusCreatingUser === "success") {
            navigate('/login');
        }
    }

    return <div className="form-page">
        <Form title="Register" handleSubmit={handleSubmit} isFormValid={isFormValid}>
            <InputControlled id="firstname" label="First Name" value={formData.firstname} placeholder="Type your first name here" handleChange={handleChange} required/>
            <InputControlled id="lastname" label="Last Name" value={formData.lastname} placeholder="Type your last name here" handleChange={handleChange} required/>
            <InputEmailWithValidation id="email" label="E-mail" value={formData.email} placeholder="Type your e-mail here" type="email" handleChange={handleChange} onValidationChange={handleValidationStatusChange}/>
            <InputPasswordWithValidation id="password" label="Password" value={formData.password} placeholder="Type your password here" type="password" handleChange={handleChange} onValidationChange={handleValidationStatusChange}/>
            
            <p>Already have an account? <Button styleType="link" type="button" handleClick={() => navigate('/login')}>Sign In</Button></p>
        </Form>
    </div>
}

export default Register;