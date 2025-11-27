import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import AuthLayout from "../../components/Auth/AuthLayout";
import ErrorAlert from "../../components/Auth/ErrorAlert";
import FormInput from "../../components/Auth/FormInput";
import LoadingButton from "../../components/Auth/LoadingButton";

export default function VerifyCode() {
  const { verifyCode, isLoading, recoveryEmail } = useAuthStore();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    email: "",
    code: "",
  });

    useEffect(() => {
    if (!recoveryEmail) {
      navigate("/forgot-password");
      return;
    }
    setForm(prev => ({ ...prev, email: recoveryEmail }));
  }, [recoveryEmail, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    try {
      await verifyCode(form.email, form.code);
      navigate("/reset-password");
} catch (err) {
    }
  };

  return (
    <AuthLayout title="Code Verification" subtitle="Recover your JobPilot Account">

      <ErrorAlert/>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={e => setForm(prev => ({...prev, [e.target.name]: e.target.value}))}
              readOnly
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <FormInput
              label="Verification Code"
              name="code"
              type="text"
              value={form.code}
              onChange={e => setForm(prev => ({...prev, [e.target.name]: e.target.value}))}
              required
              placeholder="Enter your code"
            />
          </div>
          <LoadingButton isLoading={isLoading} loadingText="Verifying...">
            Verify
          </LoadingButton>
        </form>
      </AuthLayout>
  );
}