
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 bg-voisinage-blue">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Rejoignez notre communauté d'entraide
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Que vous soyez senior, Intervenant ou membre d'une famille, inscrivez-vous gratuitement et commencez à utiliser VoisinAge dès aujourd'hui.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/inscription">
              <Button size="lg" className="w-full sm:w-auto bg-white text-voisinage-blue hover:bg-gray-100">
                Je m'inscris
              </Button>
            </Link>
            <Link to="/comment-ca-marche">
              <Button size="lg" className="w-full sm:w-auto bg-white text-voisinage-blue hover:bg-gray-100">
                En savoir plus
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
