
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Entraide de proximité entre
              <span className="text-voisinage-blue"> seniors</span> et
              <span className="text-voisinage-orange"> intervenants</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              La plateforme qui facilite l'entraide entre seniors, volontaires et familles dans votre quartier.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/inscription">
                <Button size="lg" className="w-full sm:w-auto bg-voisinage-blue hover:bg-voisinage-blue-dark">
                  Je m'inscris
                </Button>
              </Link>
              <Link to="/comment-ca-marche">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-voisinage-blue text-voisinage-blue hover:bg-voisinage-blue-light/10">
                  Comment ça marche ?
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-2/5">
            <div className="relative">
              <div className="absolute inset-0 bg-voisinage-blue rounded-full opacity-10 blur-xl transform -translate-x-4 translate-y-4"></div>
              <img 
                src="/images/voisinage.png"
                alt="Entraide entre seniors et bénévoles" 
                className="relative z-10 rounded-2xl shadow-lg object-cover w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
