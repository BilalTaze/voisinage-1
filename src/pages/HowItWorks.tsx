
import { useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import HowItWorksComponent from "../components/HowItWorks";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  LucideHelpCircle, 
  Calendar, 
  MessageSquare, 
  UserRound, 
  ClipboardCheck 
} from "lucide-react";

const HowItWorksPage = () => {
  // Update page title
  useEffect(() => {
    document.title = "Comment ça marche | VoisinAge";
  }, []);
  
  const faqItems = [
    {
      question: "Comment puis-je m'inscrire sur VoisinAge ?",
      answer: "Pour vous inscrire, cliquez sur le bouton 'Inscription' en haut à droite de la page d'accueil. Vous pouvez vous inscrire en tant que senior, bénévole ou famille. Remplissez ensuite le formulaire d'inscription avec vos informations personnelles."
    },
    {
      question: "Quels types de services sont disponibles sur VoisinAge ?",
      answer: "VoisinAge propose plusieurs catégories de services : courses, bricolage, jardinage, accompagnement, aide informatique, et compagnie. Les seniors peuvent demander de l'aide pour ces différentes tâches du quotidien."
    },
    {
      question: "Comment choisir un bénévole pour ma demande ?",
      answer: "Lorsqu'un bénévole propose son aide pour votre demande, vous recevez une notification. Vous pouvez consulter son profil et ses évaluations avant d'accepter sa proposition. Une fois acceptée, vous pouvez communiquer directement avec le bénévole via notre messagerie."
    },
    {
      question: "Comment suivre les activités en tant que famille ?",
      answer: "En tant que membre de la famille d'un senior, vous pouvez suivre les demandes d'aide publiées et réalisées pour votre proche. Vous recevez des notifications pour chaque nouvelle demande et lorsqu'une prestation est terminée."
    },
    {
      question: "VoisinAge est-il gratuit ?",
      answer: "Oui, l'utilisation de VoisinAge est entièrement gratuite. Notre plateforme vise à faciliter l'entraide de proximité de manière bénévole. Aucun échange d'argent n'est nécessaire entre les utilisateurs."
    },
  ];

  return (
    <MainLayout>
      {/* Section principale Comment ça marche */}
      <HowItWorksComponent />
      
      {/* Section détaillée par type d'utilisateur */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-10 text-center">En détail pour chaque utilisateur</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-voisinage-blue text-white mb-4">
                  <UserRound className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Pour les seniors</h3>
                <ul className="space-y-2 list-disc pl-5 mb-4">
                  <li>Créez un profil personnalisé</li>
                  <li>Publiez vos demandes d'aide</li>
                  <li>Choisissez le bénévole qui vous convient</li>
                  <li>Communiquez directement avec les bénévoles</li>
                  <li>Évaluez les services reçus</li>
                </ul>
                <Link to="/inscription">
                  <Button variant="outline" className="w-full border-voisinage-blue text-voisinage-blue">
                    Je suis senior
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-voisinage-blue text-white mb-4">
                  <ClipboardCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Pour les bénévoles</h3>
                <ul className="space-y-2 list-disc pl-5 mb-4">
                  <li>Créez votre profil et indiquez vos disponibilités</li>
                  <li>Parcourez les demandes d'aide près de chez vous</li>
                  <li>Proposez votre aide aux seniors</li>
                  <li>Organisez la prestation via la messagerie</li>
                  <li>Recevez des évaluations pour vos services</li>
                </ul>
                <Link to="/inscription">
                  <Button variant="outline" className="w-full border-voisinage-blue text-voisinage-blue">
                    Je suis bénévole
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-voisinage-blue text-white mb-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Pour les familles</h3>
                <ul className="space-y-2 list-disc pl-5 mb-4">
                  <li>Créez un compte familial</li>
                  <li>Connectez-le au profil de votre proche</li>
                  <li>Suivez les demandes d'aide et les prestations</li>
                  <li>Recevez des notifications sur les activités</li>
                  <li>Communiquez avec les bénévoles si nécessaire</li>
                </ul>
                <Link to="/inscription">
                  <Button variant="outline" className="w-full border-voisinage-blue text-voisinage-blue">
                    Je suis famille
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-2 text-center">Questions fréquentes</h2>
          <p className="text-center text-gray-600 mb-10">Tout ce que vous devez savoir sur VoisinAge</p>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <LucideHelpCircle className="h-5 w-5 text-voisinage-blue mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">{item.question}</h3>
                      <p className="mt-2 text-gray-600">{item.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <p className="mb-4">Vous ne trouvez pas la réponse à votre question ?</p>
            <Link to="/contact">
              <Button className="bg-voisinage-blue hover:bg-voisinage-blue-dark">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contactez-nous
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HowItWorksPage;
