export const passwordValidationRules = [
    {
    message: "Must have at least 8 characters",
    validate: (value: string) => value.length >= 8 
    }, 
    {
        message: "Must contain a number",
        validate: (value: string) => /\d/.test(value) 
    },
    {
        message: "Must include uppercase and lowercase letters",
        validate: (value: string) => /[a-z]/.test(value) && /[A-Z]/.test(value)
    }
]