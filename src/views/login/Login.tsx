import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../components/form/Form";
import InputUncontrolled from "../../components/input/InputUncontrolled";
import Button from "../../components/button/Button";

const Login: React.FC = () => {
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(email.current?.value, password.current?.value);
    }

    return <div className="login-page">
        <Form title="Login" description="Provide your credentials to access" handleSubmit={handleSubmit}>
            <InputUncontrolled ref={email} id="email" label="E-mail" placeholder="Type your e-mail here"/>
            <InputUncontrolled ref={password} id="password" type="password" label="Password" placeholder="Type your password here"/>
            
            <p>Doesn't have an account? <Button styleType="link" type="button" handleClick={() => navigate('/register')}>Create one</Button></p>
        </Form>
    </div>
}

export default Login;