import type { ForgotPasswordFormData, FormErrors, LoginFormData, RegisterFormData, ResetPasswordFormData, VerifyCodeFormData } from "../types/forms";


export const validateRegister = (values: RegisterFormData): FormErrors<RegisterFormData> => {
    const errors: FormErrors<RegisterFormData> = {};

    if(!values.email) {
        errors.email = "Email is required";
    }

    if (!values.password) {
        errors.password = "Password is required"
    } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
    }
    
    if (!values.password_confirmation) { 
        errors.password_confirmation = "Please Confirm your password";
    } else if(values.password !== values.password_confirmation) {
        errors.password_confirmation = "Passwords do not match"
    }
    return errors;
}
export const validateLogin = (values: LoginFormData): FormErrors<LoginFormData> => {
    const errors: FormErrors<LoginFormData> = {};

    if(!values.email) {
        errors.email = "Email is required";
    }
    if (!values.password) {
        errors.password = "Password is required"
    } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
    }
    return errors;
}
export const validateForgotPassword = (values: ForgotPasswordFormData): FormErrors<ForgotPasswordFormData> => {
    const errors: FormErrors<ForgotPasswordFormData> = {};

    if(!values.email) {
        errors.email = "Email is required";
    }
    return errors;
}
export const validateVerifyCode = (values: VerifyCodeFormData): FormErrors<VerifyCodeFormData> => {
    const errors: FormErrors<VerifyCodeFormData> = {};

    if(!values.email) {
        errors.email = "Email is required";
    }
    if(!values.code) {
        errors.code = "Code is required";
    } else if (values.code.length < 6) {
        errors.code = "Code must be at least 6 digits"
    }
    return errors;
}
export const validateResetPassword = (values: ResetPasswordFormData): FormErrors<ResetPasswordFormData> => {
    const errors: FormErrors<ResetPasswordFormData> = {};

    if (!values.new_password) {
        errors.new_password = "Password is required"
    } else if (values.new_password.length < 8) {
        errors.new_password = "Password must be at least 8 characters";
    }
    if(values.new_password_confirmation !== values.new_password) {
        errors.new_password_confirmation = "Password do not match";
    }
    return errors;
}