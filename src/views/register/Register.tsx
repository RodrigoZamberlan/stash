import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../components/form/Form";
import InputControlled from "../../components/input/InputControlled";
import Button from "../../components/button/Button";
import { useCreateUser } from "../../hooks/useCreateUser";

const formDataDefault = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
}

const Register: React.FC = () => {
    const [formData, setFormData] = useState(formDataDefault);
    const { createUserHandler, loading, errors } = useCreateUser();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData(prev => ({...prev, [name]: value}));
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await createUserHandler(formData);
        setFormData(formDataDefault);
    }

    const navigate = useNavigate();

    return <div className="register-page">
        <Form title="Register" loading={loading} errors={errors} handleSubmit={handleSubmit}>
            <InputControlled id="firstname" label="First Name" value={formData.firstname} placeholder="Type your first name here" handleChange={handleChange}/>
            <InputControlled id="lastname" label="Last Name" value={formData.lastname} placeholder="Type your last name here" handleChange={handleChange}/>
            <InputControlled id="email" label="E-mail" value={formData.email} placeholder="Type your e-mail here" handleChange={handleChange}/>
            <InputControlled id="password" label="Password" value={formData.password} placeholder="Type your password here" type="password" handleChange={handleChange}/>

            <p>Already have an account? <Button styleType="link" type="button" handleClick={() => navigate('/login')}>Sign In</Button></p>
        </Form>
    </div>
}

export default Register;