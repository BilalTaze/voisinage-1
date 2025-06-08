
import { useEffect, useState, useCallback } from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { useAuth } from "../hooks/useAuth";
import { serviceRequestService, ServiceRequest } from "../services/localStorageService";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import ServiceRequestsSection from "../components/dashboard/ServiceRequestsSection";

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [activeRequests, setActiveRequests] = useState<ServiceRequest[]>([]);
  const [completedRequests, setCompletedRequests] = useState<ServiceRequest[]>([]);
  
  // Update page title
  useEffect(() => {
    document.title = "Tableau de bord | VoisinAge";
  }, []);
  
  // Fonction pour charger les demandes de service
  const loadRequests = useCallback(() => {
    if (user) {
      let userRequests: ServiceRequest[] = [];
      
      if (user.userType === 'senior') {
        // Pour les seniors, montrer leurs propres demandes
        userRequests = serviceRequestService.getUserRequests(user.id);
      } else if (user.userType === 'benevole') {
        // Pour les bénévoles, montrer les demandes auxquelles ils ont répondu et les demandes disponibles
        const assignedRequests = serviceRequestService.getVolunteerRequests(user.id);
        const allRequests = serviceRequestService.getAllRequests();
        const openRequests = allRequests.filter(req => req.status === 'open');
        
        userRequests = [...assignedRequests, ...openRequests];
      } else if (user.userType === 'famille') {
        // Pour les familles, montrer toutes les demandes (à améliorer pour ne montrer que les demandes des seniors associés)
        userRequests = serviceRequestService.getAllRequests();
      }
      
      setRequests(userRequests);
      
      // Séparer les demandes actives (open + assigned) des demandes terminées
      const active = userRequests.filter(req => req.status === 'open' || req.status === 'assigned');
      const completed = userRequests.filter(req => req.status === 'completed');
      
      setActiveRequests(active);
      setCompletedRequests(completed);
    }
  }, [user]);
  
  // Charger les demandes de service
  useEffect(() => {
    loadRequests();
  }, [loadRequests]);
  
  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/connexion" />;
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
          <DashboardHeader 
            userFirstName={user?.firstName}
            userLastName={user?.lastName}
            userType={user?.userType}
          />
          
          <DashboardStats 
            totalRequests={requests.length}
            activeRequests={activeRequests.length}
            completedRequests={completedRequests.length}
          />
          
          <ServiceRequestsSection 
            activeRequests={activeRequests}
            completedRequests={completedRequests}
            userType={user?.userType}
            userId={user?.id}
            onRequestUpdate={loadRequests}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
