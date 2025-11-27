import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import AuthLayout from "../../components/Auth/AuthLayout";
import ErrorAlert from "../../components/Auth/ErrorAlert";
import FormInput from "../../components/Auth/FormInput";
import LoadingButton from "../../components/Auth/LoadingButton";

export default function ForgotPassword() {
  const { forgotPassword, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await forgotPassword(email);
      navigate("/verify-code");
    } catch (err) {}
  };

  return (
    <AuthLayout title="Password Recovery" subtitle="Recover your JobPilot Account">
      <ErrorAlert error={error} />
        
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        
        <LoadingButton isLoading={isLoading} loadingText="Recovering...">
          Submit
        </LoadingButton>
      </form>

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