export const emailValidationRules = [
    {
        message: "Needs to be a valid email",
        validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    }
]