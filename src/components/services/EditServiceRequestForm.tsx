
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { serviceRequestService, ServiceRequest } from "@/services/localStorageService";
import { useAuth } from "@/hooks/useAuth";

const EditServiceRequestForm = () => {
  const navigate = useNavigate();
  const { requestId } = useParams<{ requestId: string }>();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [originalRequest, setOriginalRequest] = useState<ServiceRequest | null>(null);

  useEffect(() => {
    if (requestId) {
      const request = serviceRequestService.getRequestById(requestId);
      if (request) {
        // Vérifier que l'utilisateur actuel est bien le propriétaire de la demande
        if (request.userId !== user?.id) {
          toast({
            title: "Accès refusé",
            description: "Vous ne pouvez modifier que vos propres demandes",
            variant: "destructive"
          });
          navigate("/dashboard");
          return;
        }
        
        // Vérifier que la demande peut être modifiée
        if (request.status !== 'open') {
          toast({
            title: "Modification impossible",
            description: "Cette demande ne peut plus être modifiée car elle a déjà été prise en charge",
            variant: "destructive"
          });
          navigate("/dashboard");
          return;
        }

        setOriginalRequest(request);
        setFormData({
          title: request.title,
          description: request.description,
          category: request.category,
          location: request.location,
          date: new Date(request.date).toISOString().split('T')[0], // Format pour input date
        });
      } else {
        toast({
          title: "Demande introuvable",
          description: "La demande que vous essayez de modifier n'existe pas",
          variant: "destructive"
        });
        navigate("/dashboard");
        return;
      }
    }
    setIsLoading(false);
  }, [requestId, user, navigate, toast]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!requestId) return;

    try {
      const updateData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        date: new Date(formData.date).toISOString(),
      };

      serviceRequestService.updateRequest(requestId, updateData);
      
      toast({
        title: "Demande modifiée",
        description: "Votre demande a été mise à jour avec succès",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Impossible de modifier la demande",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Modifier ma demande</CardTitle>
        <CardDescription>
          Modifiez les détails de votre demande d'aide. Cette demande ne pourra plus être modifiée une fois qu'un bénévole l'aura prise en charge.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Titre de la demande *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Ex: Aide pour faire les courses"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Catégorie *</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="courses">Courses</SelectItem>
                <SelectItem value="bricolage">Bricolage</SelectItem>
                <SelectItem value="compagnie">Compagnie</SelectItem>
                <SelectItem value="transport">Transport</SelectItem>
                <SelectItem value="jardinage">Jardinage</SelectItem>
                <SelectItem value="menage">Ménage</SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Décrivez votre demande en détail..."
              rows={4}
              required
            />
          </div>

          <div>
            <Label htmlFor="location">Lieu *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="Ex: 123 Rue de la Paix, Paris"
              required
            />
          </div>

          <div>
            <Label htmlFor="date">Date souhaitée *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="flex gap-4">
            <Button 
              type="submit" 
              className="bg-voisinage-blue hover:bg-voisinage-blue-dark flex-1"
            >
              Mettre à jour la demande
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/dashboard")}
              className="flex-1"
            >
              Annuler
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditServiceRequestForm;
