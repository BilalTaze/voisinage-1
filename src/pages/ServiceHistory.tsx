
import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, User, Clock, ArrowLeft, CheckCircle, Circle, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { serviceRequestService, userService, ServiceRequest } from "../services/localStorageService";
import { useAuth } from "../hooks/useAuth";

const ServiceHistory = () => {
  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [requesterInfo, setRequesterInfo] = useState<{ firstName: string; lastName: string; email: string } | null>(null);
  const [volunteerInfo, setVolunteerInfo] = useState<{ firstName: string; lastName: string; email: string } | null>(null);

  // Update page title
  useEffect(() => {
    document.title = "Historique de la demande | VoisinAge";
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

  // Générer l'historique basé sur le statut de la demande
  const getTimelineSteps = () => {
    const steps = [
      {
        title: "Demande créée",
        description: `Par ${requesterInfo?.firstName} ${requesterInfo?.lastName}`,
        date: new Date(request.createdAt),
        completed: true,
        icon: Circle
      }
    ];

    if (request.status === 'assigned' || request.status === 'completed') {
      steps.push({
        title: "Demande prise en charge",
        description: volunteerInfo ? `Par ${volunteerInfo.firstName} ${volunteerInfo.lastName}` : "Par un bénévole",
        date: new Date(request.createdAt), // Note: nous n'avons pas de date précise d'assignation
        completed: true,
        icon: UserCheck
      });
    }

    if (request.status === 'completed') {
      steps.push({
        title: "Demande terminée",
        description: "Service accompli avec succès",
        date: new Date(request.createdAt), // Note: nous n'avons pas de date précise de completion
        completed: true,
        icon: CheckCircle
      });
    }

    return steps;
  };

  const timelineSteps = getTimelineSteps();

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <Button onClick={() => navigate("/dashboard")} variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au tableau de bord
            </Button>
            <h1 className="text-3xl font-bold">Historique de la demande</h1>
          </div>

          <div className="grid gap-6">
            {/* Résumé de la demande */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{request.title}</CardTitle>
                <CardDescription>{request.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    {getCategoryBadge()}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{request.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{new Date(request.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline de l'historique */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Chronologie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {timelineSteps.map((step, index) => {
                    const IconComponent = step.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between">
                            <h3 className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                              {step.title}
                            </h3>
                            <span className="text-sm text-gray-500">
                              {step.date.toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Participants */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Participants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Demandeur */}
                  {requesterInfo && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Demandeur</h4>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="font-medium">{requesterInfo.firstName} {requesterInfo.lastName}</p>
                        <p className="text-sm text-gray-600">{requesterInfo.email}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Bénévole */}
                  {volunteerInfo && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Bénévole</h4>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="font-medium">{volunteerInfo.firstName} {volunteerInfo.lastName}</p>
                        <p className="text-sm text-gray-600">{volunteerInfo.email}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ServiceHistory;
