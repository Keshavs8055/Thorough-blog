import AuthProvider from "../provider/AuthProvider";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <div className="flex flex-col">
        <div className="w-[90%] md:max-w-xl rounded mx-auto  p-8 mt-9">
          {children}
        </div>
      </div>
    </AuthProvider>
  );
};

export default AuthLayout;
