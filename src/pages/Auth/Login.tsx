import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import AuthLayout from "../../components/Auth/AuthLayout";
import ErrorAlert from "../../components/Auth/ErrorAlert";
import FormInput from "../../components/Auth/FormInput";
import LoadingButton from "../../components/Auth/LoadingButton";

export default function Login() {
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(form.email, form.password);
      navigate("/home");
    } catch (err) {
    }
  };

  return (
    <AuthLayout title="Login" subtitle="Login into JobPilot">
        
      <ErrorAlert error={error}/>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <FormInput
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm(prev => ({...prev, [e.target.name]: e.target.value}))}
              required
              placeholder="Enter your email"
            />
          </div>

          <div>
            <FormInput
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm(prev => ({...prev, [e.target.name]: e.target.value}))}
              required
              placeholder="Enter your password"
            />
          </div>

          <LoadingButton isLoading={isLoading} loadingText="Signing in...">
            Sign In
          </LoadingButton>
        </form>

        <div className="text-center">
          <Link to="/forgot-password" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
            Forgot your password?
          </Link>
        </div>

        <div className="text-center border-t border-gray-700 pt-6">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">
              Sign up
            </Link>
          </p>
        </div>
    </AuthLayout>
  );
}