import { useState } from "react";

interface validationRule {
    message: string,
    validate: (value: string) => boolean
}

function withValidation<T extends {value: string, id: string, handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void}>(
        WrappedComponent: React.ComponentType<T>, 
        validationRules: validationRule[]
    ) {
    return function WithValidation(props: T & { onValidationChange?: (id: string, isValid: boolean) => void }) {
        const [validationStatus, setValidationStatus] = useState(
            validationRules.map(() => false) //iniciate with all validation status false
        );

        const handleValidation = (value: string) => {
            const newStatus = validationRules.map((rule) => rule.validate(value));
            setValidationStatus(newStatus);

            if (props.onValidationChange) {
                const isValid = newStatus.every(status => status);
                props.onValidationChange(props.id, isValid);
            }
        }

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            handleValidation(value);

            if (props.handleChange) {
                props.handleChange(event); //If it has an original handleChange pass it as well
            }
        }

        return (
            <>
                <WrappedComponent {...(props as T)} handleChange={handleChange}/>
                <ul>
                    {validationRules && validationRules.map((rule, index) => (
                        <li key={index} className={validationStatus[index] ? "pass-text-color" : "fail-text-color"}>{rule.message}</li>
                    ))}
                </ul>
            </>);
    };
}

export default withValidation;

