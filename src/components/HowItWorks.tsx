
import { Check, Info, Calendar, MessageSquare, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HowItWorks = () => {
  const steps = [
    {
      title: "Créez votre profil",
      description: "Inscrivez-vous en tant que senior, Intervenant ou famille et complétez votre profil.",
      icon: <UserRound className="h-6 w-6" />,
    },
    {
      title: "Publiez ou parcourez des demandes",
      description: "Les seniors publient des demandes d'aide et les bénévoles peuvent les consulter.",
      icon: <Info className="h-6 w-6" />,
    },
    {
      title: "Communiquez ensemble",
      description: "Échangez via la messagerie pour organiser la prestation du service.",
      icon: <MessageSquare className="h-6 w-6" />,
    },
    {
      title: "Suivez les prestations",
      description: "Visualisez l'historique et le calendrier des services rendus.",
      icon: <Calendar className="h-6 w-6" />,
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Comment ça marche</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            VoisinAge simplifie l'entraide de proximité en quelques étapes simples
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-voisinage-blue text-white mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-8 h-4 transform -translate-x-4">
                  <svg className="w-full h-full text-voisinage-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/inscription">
            <Button size="lg" className="bg-voisinage-blue hover:bg-voisinage-blue-dark">
              Je m'inscris maintenant
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
