import { emailValidationRules } from "../../validations/emailValidationRules";
import withValidation from "../hoc/withValidation";
import InputControlled from "./InputControlled";

export const InputEmailWithValidation = withValidation(InputControlled, emailValidationRules);