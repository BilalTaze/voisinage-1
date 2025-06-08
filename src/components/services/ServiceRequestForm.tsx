
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { serviceRequestService } from "@/services/localStorageService";
import { useAuth } from "@/hooks/useAuth";

const ServiceRequestForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("courses");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast({
        variant: "destructive",
        title: "Veuillez sélectionner une date",
        description: "La date est requise pour la demande de service.",
      });
      return;
    }

    if (!user) {
      toast({
        variant: "destructive",
        title: "Connexion requise",
        description: "Vous devez être connecté pour créer une demande de service.",
      });
      navigate("/connexion");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create new service request in localStorage
      serviceRequestService.createRequest({
        title,
        description,
        category,
        location: address,
        date: date.toISOString(),
        userId: user.id,
      });
      
      toast({
        title: "Demande envoyée",
        description: "Votre demande de service a été publiée avec succès.",
      });
      
      navigate("/services");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de publier votre demande. Veuillez réessayer.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Titre de la demande</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Aide pour les courses hebdomadaires"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category">Catégorie</Label>
        <RadioGroup 
          value={category} 
          onValueChange={setCategory}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="courses" id="courses" />
            <Label htmlFor="courses">Courses et Transport</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bricolage" id="bricolage" />
            <Label htmlFor="bricolage">Bricolage et Jardinage</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compagnie" id="compagnie" />
            <Label htmlFor="compagnie">Compagnie et Accompagnement</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="administratif" id="administratif" />
            <Label htmlFor="administratif">Aide Administrative</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description détaillée</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Décrivez précisément le service dont vous avez besoin..."
          rows={4}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Adresse</Label>
        <Input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Votre adresse"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label>Date souhaitée</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP", { locale: fr }) : "Sélectionner une date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-voisinage-blue hover:bg-voisinage-blue-dark"
        disabled={isLoading}
      >
        {isLoading ? "Publication en cours..." : "Publier ma demande"}
      </Button>
    </form>
  );
};

export default ServiceRequestForm;
