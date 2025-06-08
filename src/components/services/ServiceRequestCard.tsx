import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { serviceRequestService, userService } from "@/services/localStorageService";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

interface ServiceRequestProps {
  id?: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  status: "open" | "assigned" | "completed";
  userType: "senior" | "intervenant" | "family";
  volunteerId?: string;
  userId?: string;
  onRequestUpdate?: () => void;
}

const ServiceRequestCard = ({ 
  id,
  title, 
  description, 
  category, 
  location, 
  date,
  status,
  userType,
  volunteerId,
  userId,
  onRequestUpdate
}: ServiceRequestProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [volunteerInfo, setVolunteerInfo] = useState<{ firstName: string; lastName: string; email: string } | null>(null);

  // Récupérer les informations du Intervenant si la demande est assignée
  useEffect(() => {
    if (volunteerId && (userType === 'family' || userType === 'senior') && status === 'assigned') {
      const volunteer = userService.getUserById(volunteerId);
      if (volunteer) {
        setVolunteerInfo({
          firstName: volunteer.firstName,
          lastName: volunteer.lastName,
          email: volunteer.email
        });
      }
    }
  }, [volunteerId, userType, status]);

  const getStatusBadge = () => {
    switch (status) {
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
    switch (category) {
      case "courses":
        return <Badge variant="outline" className="text-voisinage-blue border-voisinage-blue">Courses</Badge>;
      case "bricolage":
        return <Badge variant="outline" className="text-amber-600 border-amber-600">Bricolage</Badge>;
      case "compagnie":
        return <Badge variant="outline" className="text-purple-600 border-purple-600">Compagnie</Badge>;
      default:
        return <Badge variant="outline">{category}</Badge>;
    }
  };

  const handleVolunteerAction = () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour proposer votre aide",
        variant: "destructive"
      });
      navigate("/connexion");
      return;
    }

    if (id && user.id) {
      try {
        serviceRequestService.assignVolunteer(id, user.id);
        toast({
          title: "Demande prise en charge",
          description: "Vous avez pris en charge cette demande avec succès!",
        });
        // Appeler la fonction de mise à jour si elle existe
        if (onRequestUpdate) {
          onRequestUpdate();
        } else {
          // Fallback: recharger la page
          window.location.reload();
        }
      } catch (error) {
        toast({
          title: "Erreur",
          description: error instanceof Error ? error.message : "Impossible de prendre en charge cette demande. Veuillez réessayer.",
          variant: "destructive"
        });
      }
    }
  };

  const handleCompleteRequest = () => {
    if (id && user?.id === volunteerId) {
      try {
        serviceRequestService.completeRequest(id);
        toast({
          title: "Demande terminée",
          description: "La demande a été marquée comme terminée.",
        });
        if (onRequestUpdate) {
          onRequestUpdate();
        } else {
          window.location.reload();
        }
      } catch (error) {
        toast({
          title: "Erreur",
          description: error instanceof Error ? error.message : "Impossible de terminer cette demande.",
          variant: "destructive"
        });
      }
    }
  };

  const handleSeniorAction = () => {
    if (id) {
      navigate(`/services/modifier/${id}`);
    }
  };

  const handleViewDetails = () => {
    if (id) {
      navigate(`/services/details/${id}`);
    }
  };

  const handleViewHistory = () => {
    if (id) {
      navigate(`/services/historique/${id}`);
    }
  };

  const getActionButton = () => {
    // Pour les bénévoles : bouton "Prendre la demande" si statut open
    if (userType === "intervenant" && status === "open") {
      return (
        <Button 
          className="w-full bg-voisinage-blue hover:bg-voisinage-blue-dark"
          onClick={handleVolunteerAction}
        >
          Prendre la demande
        </Button>
      );
    } 
    // Pour les bénévoles : bouton "Marquer comme terminé" si assigné à eux
    else if (userType === "intervenant" && status === "assigned" && volunteerId === user?.id) {
      return (
        <Button 
          className="w-full bg-green-500 hover:bg-green-600"
          onClick={handleCompleteRequest}
        >
          Marquer comme terminé
        </Button>
      );
    }
    // Pour les seniors : bouton "Modifier ma demande" si statut open et que c'est leur demande
    else if (userType === "senior" && status === "open" && userId === user?.id) {
      return (
        <Button 
          variant="outline" 
          className="w-full border-voisinage-blue text-voisinage-blue"
          onClick={handleSeniorAction}
        >
          Modifier ma demande
        </Button>
      );
    } 
    // Pour tous : bouton "Voir les détails" si statut assigned
    else if (status === "assigned") {
      return (
        <Button 
          className="w-full bg-voisinage-blue hover:bg-voisinage-blue-dark"
          onClick={handleViewDetails}
        >
          Voir les détails
        </Button>
      );
    } 
    // Pour tous : bouton "Voir l'historique" si statut completed
    else if (status === "completed") {
      return (
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleViewHistory}
        >
          Voir l'historique
        </Button>
      );
    }
    
    return null;
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </div>
          <div>{getStatusBadge()}</div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-3">
          <div className="flex items-center">
            {getCategoryBadge()}
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">{date}</span>
          </div>
          
          {/* Affichage des informations du Intervenant pour les familles et seniors */}
          {volunteerInfo && (userType === 'family' || userType === 'senior') && status === 'assigned' && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center text-blue-700 mb-2">
                <User className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Intervenant assigné</span>
              </div>
              <div className="text-sm text-blue-600">
                <p><strong>{volunteerInfo.firstName} {volunteerInfo.lastName}</strong></p>
                <p>{volunteerInfo.email}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {getActionButton()}
      </CardFooter>
    </Card>
  );
};

export default ServiceRequestCard;
