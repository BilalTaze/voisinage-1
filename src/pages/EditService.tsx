
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import EditServiceRequestForm from "../components/services/EditServiceRequestForm";
import { useAuth } from "../hooks/useAuth";

const EditService = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Update page title
  useEffect(() => {
    document.title = "Modifier ma demande | VoisinAge";
  }, []);

  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/connexion" />;
  }

  // Seuls les seniors peuvent modifier leurs demandes
  if (!isLoading && user && user.userType !== 'senior') {
    return <Navigate to="/dashboard" />;
  }

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 flex items-center justify-center">
          <p>Chargement...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <EditServiceRequestForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default EditService;
