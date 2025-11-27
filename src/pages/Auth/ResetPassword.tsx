import { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import AuthLayout from "../../components/Auth/AuthLayout";
import ErrorAlert from "../../components/Auth/ErrorAlert";
import FormInput from "../../components/Auth/FormInput";
import LoadingButton from "../../components/Auth/LoadingButton";

export default function ResetPassword() {
  const { resetPassword, isLoading, error, recoveryEmail } = useAuthStore();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    new_password: "",
    new_password_confirmation: ""
  });
    useEffect(() => {
    if (!recoveryEmail) {
        navigate("/login");
    }
    }, [recoveryEmail, navigate]);
  const [clientError, setClientError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setClientError("");

    if (form.new_password !== form.new_password_confirmation) {
      setClientError("Password do not match");
      return;
    }

    try {
      await resetPassword(form.new_password, form.new_password_confirmation);
      navigate("/home");
    } catch (err) {
    }
  };

  return (
    <AuthLayout title="Reset your password" subtitle="Password Recovery"> 
      <ErrorAlert error={error || clientError}/> 
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <FormInput
              label="New Password"
              name="new_password"
              type="password"
              value={form.new_password}
              onChange={e => setForm(prev => ({...prev, [e.target.name]: e.target.value}))}
              required
              placeholder="Enter your password"
            />
          </div>
          <div>
            <FormInput
              label="Password Confirmation"
              name="new_password_confirmation"
              type="password"
              value={form.new_password_confirmation}
              onChange={e => setForm(prev => ({...prev, [e.target.name]: e.target.value}))}
              required
              placeholder="Enter your password Confirmation"
            />
          </div>

          <LoadingButton isLoading={isLoading} loadingText="Submitting...">
              Submit
          </LoadingButton>
        </form>
      </AuthLayout>
  );
}