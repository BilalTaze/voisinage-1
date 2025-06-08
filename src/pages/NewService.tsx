
import { useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import ServiceRequestForm from "../components/services/ServiceRequestForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const NewService = () => {
  // Update page title
  useEffect(() => {
    document.title = "Nouvelle demande de service | VoisinAge";
  }, []);

  return (
    <MainLayout>
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Créer une demande de service</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Détails de votre demande</CardTitle>
                  <CardDescription>
                    Fournissez les informations nécessaires pour votre demande d'aide.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ServiceRequestForm />
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Conseils</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Soyez précis</h3>
                    <p className="text-gray-600 text-sm">
                      Décrivez clairement le service dont vous avez besoin et les détails importants.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Sécurité</h3>
                    <p className="text-gray-600 text-sm">
                      Ne partagez pas d'informations personnelles sensibles dans la description publique.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Disponibilité</h3>
                    <p className="text-gray-600 text-sm">
                      Indiquez plusieurs créneaux horaires si vous êtes flexible pour augmenter vos chances.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NewService;
