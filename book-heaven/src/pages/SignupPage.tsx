
import SignupForm from "../components/SignupForm";

const SignupPage = () => {
  return (
    <main className="min-h-screen bg-[#F8F6F1] flex items-center justify-center p-4">
      <div className="w-full max-w-[450px]">
        <SignupForm />
      </div>
    </main>
  );
};

export default SignupPage;