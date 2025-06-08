
import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, User, Clock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { serviceRequestService, userService, ServiceRequest } from "../services/localStorageService";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const ServiceDetails = () => {
  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [requesterInfo, setRequesterInfo] = useState<{ firstName: string; lastName: string; email: string } | null>(null);
  const [volunteerInfo, setVolunteerInfo] = useState<{ firstName: string; lastName: string; email: string } | null>(null);

  // Update page title
  useEffect(() => {
    document.title = "Détails de la demande | VoisinAge";
  }, []);

  // Charger les détails de la demande
  useEffect(() => {
    if (requestId) {
      const serviceRequest = serviceRequestService.getRequestById(requestId);
      if (serviceRequest) {
        setRequest(serviceRequest);
        
        // Récupérer les informations du demandeur
        const requester = userService.getUserById(serviceRequest.userId);
        if (requester) {
          setRequesterInfo({
            firstName: requester.firstName,
            lastName: requester.lastName,
            email: requester.email
          });
        }
        
        // Récupérer les informations du bénévole si assigné
        if (serviceRequest.volunteerId) {
          const volunteer = userService.getUserById(serviceRequest.volunteerId);
          if (volunteer) {
            setVolunteerInfo({
              firstName: volunteer.firstName,
              lastName: volunteer.lastName,
              email: volunteer.email
            });
          }
        }
      }
    }
  }, [requestId]);

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

  if (!request) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Demande non trouvée</h1>
          <Button onClick={() => navigate("/dashboard")} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au tableau de bord
          </Button>
        </div>
      </MainLayout>
    );
  }

  const getStatusBadge = () => {
    switch (request.status) {
      case "open":
        return <Badge className="bg-green-500">Disponible</Badge>;
      case "assigned":
        return <Badge className="bg-blue-500">Assigné</Badge>;
      case "completed":
        return <Badge className="bg-gray-500">Terminé</Badge>;
      default:
        return null;
    }
  };

  const getCategoryBadge = () => {
    switch (request.category) {
      case "courses":
        return <Badge variant="outline" className="text-voisinage-blue border-voisinage-blue">Courses</Badge>;
      case "bricolage":
        return <Badge variant="outline" className="text-amber-600 border-amber-600">Bricolage</Badge>;
      case "compagnie":
        return <Badge variant="outline" className="text-purple-600 border-purple-600">Compagnie</Badge>;
      default:
        return <Badge variant="outline">{request.category}</Badge>;
    }
  };

  const handleCompleteRequest = () => {
    if (user?.id === request.volunteerId) {
      try {
        serviceRequestService.completeRequest(request.id);
        toast({
          title: "Demande terminée",
          description: "La demande a été marquée comme terminée.",
        });
        navigate("/dashboard");
      } catch (error) {
        toast({
          title: "Erreur",
          description: error instanceof Error ? error.message : "Impossible de terminer cette demande.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <Button onClick={() => navigate("/dashboard")} variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au tableau de bord
            </Button>
            <h1 className="text-3xl font-bold">Détails de la demande</h1>
          </div>

          <div className="grid gap-6">
            {/* Informations principales */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{request.title}</CardTitle>
                    <CardDescription className="mt-2 text-lg">{request.description}</CardDescription>
                  </div>
                  <div>{getStatusBadge()}</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    {getCategoryBadge()}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{request.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{new Date(request.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>Créée le {new Date(request.createdAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informations du demandeur */}
            {requesterInfo && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Demandeur
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>Nom :</strong> {requesterInfo.firstName} {requesterInfo.lastName}</p>
                    <p><strong>Email :</strong> {requesterInfo.email}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Informations du bénévole */}
            {volunteerInfo && request.status !== 'open' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Bénévole assigné
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>Nom :</strong> {volunteerInfo.firstName} {volunteerInfo.lastName}</p>
                    <p><strong>Email :</strong> {volunteerInfo.email}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            {user?.userType === 'benevole' && request.status === 'assigned' && user.id === request.volunteerId && (
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="bg-green-500 hover:bg-green-600"
                    onClick={handleCompleteRequest}
                  >
                    Marquer comme terminé
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ServiceDetails;
