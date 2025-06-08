
import { useEffect } from "react";
import MainLayout from "../layout/MainLayout";

const MentionsLegales = () => {
  useEffect(() => {
    document.title = "Mentions légales | VoisinAge";
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-voisinage-blue">Mentions légales</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Présentation du site</h2>
            <p className="text-gray-700">
              Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, dite L.C.E.N., nous portons à la connaissance des utilisateurs et visiteurs du site VoisinAge les informations suivantes :
            </p>
            <div className="mt-4">
              <p className="font-medium">Propriétaire :</p>
              <p>Association VoisinAge</p>
              <p>Siège social : 123 rue de l'Entraide, 75000 Paris</p>
              <p>SIRET : 123 456 789 00012</p>
              <p>Email : contact@voisinage.org</p>
              <p>Téléphone : 01 23 45 67 89</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Conditions générales d'utilisation</h2>
            <p className="text-gray-700">
              L'utilisation du site VoisinAge implique l'acceptation pleine et entière des conditions générales d'utilisation décrites ci-après. Ces conditions d'utilisation sont susceptibles d'être modifiées ou complétées à tout moment, sans préavis. Les utilisateurs du site sont donc invités à les consulter de manière régulière.
            </p>
            <p className="text-gray-700 mt-4">
              Ce site est normalement accessible à tout moment aux utilisateurs. Une interruption pour raison de maintenance technique peut être toutefois décidée par VoisinAge, qui s'efforcera alors de communiquer préalablement aux utilisateurs les dates et heures de l'intervention.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Limitations de responsabilité</h2>
            <p className="text-gray-700">
              VoisinAge ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l'utilisateur, lors de l'accès au site VoisinAge, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications techniques requises, soit de l'apparition d'un bug ou d'une incompatibilité.
            </p>
            <p className="text-gray-700 mt-4">
              Des espaces interactifs (possibilité de poser des questions dans l'espace contact) sont à la disposition des utilisateurs. VoisinAge se réserve le droit de supprimer, sans mise en demeure préalable, tout contenu déposé dans cet espace qui contreviendrait à la législation applicable en France, en particulier aux dispositions relatives à la protection des données.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Protection des données personnelles</h2>
            <p className="text-gray-700">
              En France, les données personnelles sont notamment protégées par la loi n° 78-87 du 6 janvier 1978, la loi n° 2004-801 du 6 août 2004, l'article L. 226-13 du Code pénal et la Directive Européenne du 24 octobre 1995.
            </p>
            <p className="text-gray-700 mt-4">
              VoisinAge ne collecte des informations personnelles qu'à des fins strictement nécessaires au bon fonctionnement du service. L'utilisateur fournit ces informations en toute connaissance de cause, notamment lorsqu'il procède par lui-même à leur saisie.
            </p>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default MentionsLegales;
