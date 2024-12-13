import withValidation from "../hoc/withValidation";
import InputControlled, { InputProps } from "./InputControlled";
import { passwordValidationRules } from "../../validations/passwordValidationRules";

const InputPasswordWithValidation = withValidation<InputProps>(InputControlled, passwordValidationRules);

export default InputPasswordWithValidation;

