import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import AuthLayout from "../../components/Auth/AuthLayout";
import ErrorAlert from "../../components/Auth/ErrorAlert";
import FormInput from "../../components/Auth/FormInput";
import LoadingButton from "../../components/Auth/LoadingButton";

export default function Register() {
  const { register, isLoading, error } = useAuthStore();
  const navigate = useNavigate();
   const [clientError, setClientError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirmation: ""
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.passwordConfirmation) {
      setClientError("Password do not match");
      return;
    }

    try {
      await register(form.email, form.password, form.passwordConfirmation);
      navigate("/home");
    } catch (err) {
    }
  };

  return (
    <AuthLayout title="Register Page" subtitle="Register an account into JobPilot">
    
        <ErrorAlert error={error || clientError}/>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm(prev => ({...prev, [e.target.name]: e.target.value}))}
            placeholder="Enter your email"
            required
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm(prev => ({...prev, [e.target.name]: e.target.value}))}
            placeholder="Enter your Password"
            required
          />
          <FormInput
            label="Password Confirmation"
            name="passwordConfirmation"
            type="password"
            value={form.passwordConfirmation}
            onChange={(e) => setForm(prev => ({...prev, [e.target.name]: e.target.value}))}
            placeholder="Enter Password Confirmation"
            required
          />

          <LoadingButton isLoading={isLoading} loadingText="Registering..." >
            Register
          </LoadingButton>
        </form>

        <div className="text-center">
          <Link to="/forgot-password" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
            Forgot your password?
          </Link>
        </div>

        <div className="text-center border-t border-gray-700 pt-6">
          <p className="text-gray-400">
            Have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
              Sign in
            </Link>
          </p>
        </div>
    </AuthLayout>
  );
}