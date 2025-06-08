
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import ServiceRequestCard from "../services/ServiceRequestCard";
import { Link } from "react-router-dom";
import { ServiceRequest } from "../../services/localStorageService";

interface ServiceRequestsSectionProps {
  activeRequests: ServiceRequest[];
  completedRequests: ServiceRequest[];
  userType?: string;
  userId?: string;
  onRequestUpdate: () => void;
}

const ServiceRequestsSection = ({ 
  activeRequests, 
  completedRequests, 
  userType, 
  userId,
  onRequestUpdate
}: ServiceRequestsSectionProps) => {
  const getDescriptionText = () => {
    if (userType === 'senior') {
      return "Gérez vos demandes d'aide et suivez leur progression";
    } else if (userType === 'intervenant') {
      return "Consultez les demandes d'aide disponibles et celles que vous avez acceptées";
    } else {
      return "Suivez les demandes d'aide de vos proches";
    }
  };

  const getEmptyStateText = () => {
    if (userType === 'senior') {
      return "Vous n'avez pas encore créé de demande d'aide";
    } else {
      return "Aucune demande d'aide active pour le moment";
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Vos demandes de service</CardTitle>
        <CardDescription>{getDescriptionText()}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active">
          <TabsList className="mb-6">
            <TabsTrigger value="active">Demandes actives</TabsTrigger>
            <TabsTrigger value="completed">Demandes terminées</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            {activeRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeRequests.map((request) => (
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
                    volunteerId={request.volunteerId}
                    userId={request.userId}
                    onRequestUpdate={onRequestUpdate}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">{getEmptyStateText()}</p>
                
                {userType === 'senior' && (
                  <Link to="/services/nouveau">
                    <Button className="bg-voisinage-blue hover:bg-voisinage-blue-dark">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Créer une demande
                    </Button>
                  </Link>
                )}
                
                {userType === 'intervenant' && (
                  <Link to="/services">
                    <Button className="bg-voisinage-blue hover:bg-voisinage-blue-dark">
                      Parcourir les demandes
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            {completedRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedRequests.map((request) => (
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
                    volunteerId={request.volunteerId}
                    userId={request.userId}
                    onRequestUpdate={onRequestUpdate}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Aucune demande terminée pour le moment</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ServiceRequestsSection;
