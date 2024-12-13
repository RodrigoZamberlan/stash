import { useState, useEffect } from "react";

interface validationStatusProps {
    fieldNamesToCheckValidation: string[]
}

export function useValidationStatus({fieldNamesToCheckValidation} : validationStatusProps) {
    const [allValidationStatus, setAllValidationStatus] = useState<{[id: string]: boolean}>(
        fieldNamesToCheckValidation.reduce((acc, field) => {
            acc[field] = false;
            return acc;
          }, {} as { [id: string]: boolean })
    );
    const [isFormValid, setIsFormValid] = useState(false);

    const updateValidationStatus = (id: string, isValid: boolean) => {
        setAllValidationStatus((prevStatus) => ({
            ...prevStatus,
            [id] : isValid,
        }));
    }

    useEffect(() => {
        const validStatus = Object.values(allValidationStatus).every(status => status === true);
        setIsFormValid(validStatus);
    }, [allValidationStatus]);

    return { isFormValid, updateValidationStatus };
}
