
import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";
import { useEffect } from "react";

const Login = () => {
  // Update page title
  useEffect(() => {
    document.title = "Connexion | VoisinAge";
  }, []);

  return (
    <AuthLayout
      title="Connexion"
      description="Accédez à votre compte VoisinAge"
      footer={
        <p>
          Nouveau sur VoisinAge ?{" "}
          <Link to="/inscription" className="text-voisinage-blue hover:underline font-medium">
            Créer un compte
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
