import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const { user, logout, isLoading } = useAuthStore();
  
  const handleLogout = async () => {
    await logout();
    window.location.href = "/home";
  };

  return {
    user,
    handleLogout,
    isLoggingOut: isLoading
  };
};