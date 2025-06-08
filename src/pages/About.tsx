
import { useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarClock, Heart, Shield } from "lucide-react";

const About = () => {
  // Update page title
  useEffect(() => {
    document.title = "À propos | VoisinAge";
  }, []);

  return (
    <MainLayout>
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">À propos de VoisinAge</h1>
          
          <div className="prose max-w-none mb-10">
            <p className="text-lg mb-6">
              VoisinAge est née d'une conviction simple : la solidarité intergénérationnelle 
              est essentielle pour construire une société plus inclusive et bienveillante.
            </p>
            
            <p className="mb-6">
              Notre plateforme met en relation les seniors qui ont besoin d'aide pour leur 
              quotidien avec des bénévoles désireux de donner de leur temps. Nous facilitons 
              également l'implication des familles qui souhaitent veiller sur leurs proches 
              âgés, même à distance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-voisinage-blue text-white mb-4">
                  <Heart className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold mb-3">Notre mission</h2>
                <p>
                  Créer du lien social et faciliter l'entraide de proximité pour permettre 
                  aux seniors de continuer à vivre chez eux dans les meilleures conditions.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-voisinage-blue text-white mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold mb-3">Nos valeurs</h2>
                <p>
                  Solidarité, bienveillance et respect sont au cœur de notre approche.
                  Nous croyons en la richesse des échanges intergénérationnels et en la 
                  force du lien social.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-voisinage-blue text-white mb-4">
                  <CalendarClock className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold mb-3">Notre histoire</h2>
                <p>
                  Lancée en 2023, VoisinAge est le fruit d'une collaboration entre des 
                  professionnels du numérique et des acteurs du secteur médico-social, 
                  soucieux d'améliorer la qualité de vie des seniors.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">L'équipe</h2>
            <p className="mb-6">
              Notre équipe est composée de développeurs, designers et experts du médico-social 
              partageant tous la même vision : mettre la technologie au service de l'humain.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Placeholder pour l'équipe - à remplacer par de vraies données */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="h-32 w-32 rounded-full bg-gray-200 mb-4"></div>
                  <h3 className="font-semibold text-lg">Prénom Nom</h3>
                  <p className="text-gray-600">Rôle</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
