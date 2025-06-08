
import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import RegisterForm from "../components/auth/RegisterForm";
import { useEffect } from "react";

const Register = () => {
  // Update page title
  useEffect(() => {
    document.title = "Inscription | VoisinAge";
  }, []);

  return (
    <AuthLayout
      title="Créer un compte"
      description="Rejoignez la communauté VoisinAge"
      footer={
        <p>
          Déjà inscrit ?{" "}
          <Link to="/connexion" className="text-voisinage-blue hover:underline font-medium">
            Se connecter
          </Link>
        </p>
      }
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
