// src/pages/LoginPage.tsx
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <main className="min-h-screen bg-[#F8F6F1] flex items-center justify-center p-4">
      <div className="w-full max-w-[450px]">
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;