export interface RegisterFormData {
    email: string;
    password: string;
    password_confirmation: string;
}
export interface LoginFormData {
    email: string
    password: string
}
export interface ForgotPasswordFormData {
    email: string
}
export interface VerifyCodeFormData {
    email: string
    code: string
}
export interface ResetPasswordFormData {
    new_password: string
    new_password_confirmation: string
}
export type FormErrors<T> = Partial<Record<keyof T, string>>;

