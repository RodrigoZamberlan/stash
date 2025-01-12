import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../components/form/Form";
import InputUncontrolled from "../../components/input/InputUncontrolled";
import Button from "../../components/button/Button";
import { useAuth } from "../../hooks/useAuth";

const Login: React.FC = () => {
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const { authUserHandler, statusAuth } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (email.current && password.current) {
            const success = await authUserHandler(email.current.value, password.current.value);
            if (success) {
                /*
                    For now just add the email as a token,
                    in the future the token will be provided by the backend
                */
                localStorage.setItem("stash_user_token", email.current.value);
                navigate('/home');
            }
        }
    }

    return <div className="form-page">
        <Form title="Login" description="Provide your credentials to access" handleSubmit={handleSubmit} status={statusAuth}>
            <InputUncontrolled ref={email} id="email" label="E-mail" placeholder="Type your e-mail here" required/>
            <InputUncontrolled ref={password} id="password" type="password" label="Password" placeholder="Type your password here" required/>
            
            <p>Doesn't have an account? <Button styleType="link" type="button" handleClick={() => navigate('/register')}>Create one</Button></p>
        </Form>
    </div>
}

export default Login;