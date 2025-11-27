export interface User {
  id: string;
  email: string;
}

export interface UserPasswordRecoveryResponse {
    id: string;
    username: string|null;
    email: string;
    email_verified_at: Date|null;
    is_active: string|boolean;
    verification_code: string;
    verification_code_expire_at: Date;
    created_at: Date;
    access_token: string;
}
export interface RegisterResponse {
  status: string;
  message: string;
  data: {
    email: string;
    id: string;
    access_token: string;
  };
}
export interface LoginResponse {
  status: string;
  message: string;
  data: {
    user: User
    access_token: string;
  };
}
export interface ForgotPasswordResponse {
  status: string;
  message: string;
  data: UserPasswordRecoveryResponse
}
export interface VerifyCodeResponse {
  status: string;
  message: string;
  data: UserPasswordRecoveryResponse
}
export interface ResetPasswordResponse {
  status: string;
  message: string;
  data: {
    id: string;
    username: string|null;
    email: string;
    email_verified_at: Date|null;
    is_active: string|boolean;
    verification_code: string;
    verification_code_expire_at: Date;
    created_at: Date;
  }
}