
import { useState, useEffect, useCallback } from "react";
import MainLayout from "../layout/MainLayout";
import ServiceRequestCard from "../components/services/ServiceRequestCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, Plus } from "lucide-react";
import { serviceRequestService, ServiceRequest } from "../services/localStorageService";
import { useAuth } from "../hooks/useAuth";

const Services = () => {
  const { user } = useAuth();
  const userType = user?.userType || "volunteer";
  
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<ServiceRequest[]>([]);

  // Fonction pour charger les demandes
  const fetchRequests = useCallback(() => {
    const requests = serviceRequestService.getAllRequests();
    setServiceRequests(requests);
  }, []);

  // Fetch all service requests from localStorage
  useEffect(() => {
    fetchRequests();
    
    // Poll for changes every 5 seconds
    const interval = setInterval(fetchRequests, 5000);
    return () => clearInterval(interval);
  }, [fetchRequests]);

  // Filter service requests based on search term
  useEffect(() => {
    const filtered = serviceRequests.filter(request =>
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRequests(filtered);
  }, [searchTerm, serviceRequests]);

  // Update page title
  useEffect(() => {
    document.title = "Services | VoisinAge";
  }, []);

  return (
    <MainLayout>
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Services</h1>
              <p className="text-gray-600 mt-2">
                Trouvez ou proposez de l'aide dans votre quartier
              </p>
            </div>
            <Link to="/services/nouveau">
              <Button className="bg-voisinage-blue hover:bg-voisinage-blue-dark">
                <Plus className="mr-2 h-4 w-4" /> Nouvelle demande
              </Button>
            </Link>
          </div>
          
          <div className="max-w-md mx-auto md:mx-0 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Rechercher des services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Aucun service ne correspond à votre recherche.</p>
              <Link to="/services/nouveau">
                <Button variant="outline" className="border-voisinage-blue text-voisinage-blue">
                  Créer une nouvelle demande
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRequests.map((request) => (
                <ServiceRequestCard
                  key={request.id}
                  id={request.id}
                  title={request.title}
                  description={request.description}
                  category={request.category}
                  location={request.location}
                  date={new Date(request.date).toLocaleDateString('fr-FR')}
                  status={request.status}
                  userType={userType as 'senior' | 'intervenant' | 'family'}
                  onRequestUpdate={fetchRequests}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Services;
