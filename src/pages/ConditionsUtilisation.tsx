
import { useEffect } from "react";
import MainLayout from "../layout/MainLayout";

const ConditionsUtilisation = () => {
  useEffect(() => {
    document.title = "Conditions d'utilisation | VoisinAge";
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-voisinage-blue">Conditions d'utilisation</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Acceptation des conditions</h2>
            <p className="text-gray-700">
              En accédant à ce site et en utilisant nos services, vous acceptez d'être lié par ces Conditions d'Utilisation, toutes les lois et règlements applicables, et vous acceptez que vous êtes responsable du respect des lois locales applicables.
            </p>
            <p className="text-gray-700 mt-4">
              Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser ou accéder à ce site. Les contenus présents sur ce site sont protégés par les lois applicables en matière de droits d'auteur et de marques.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Utilisation de la licence</h2>
            <p className="text-gray-700">
              La permission est accordée de télécharger temporairement une copie des documents (informations ou logiciels) sur le site de VoisinAge, uniquement pour une consultation transitoire personnelle et non commerciale.
            </p>
            <p className="text-gray-700 mt-4">
              Il s'agit de l'octroi d'une licence, non d'un transfert de titre, et sous cette licence, vous ne pouvez pas :
            </p>
            <ul className="list-disc list-inside mt-2 ml-4 text-gray-700">
              <li>Modifier ou copier les documents</li>
              <li>Utiliser les documents à des fins commerciales</li>
              <li>Tenter de décompiler ou de désosser tout logiciel contenu sur le site de VoisinAge</li>
              <li>Supprimer tout droit d'auteur ou autres notations de propriété des documents</li>
              <li>Transférer les documents à une autre personne ou "miroir" les documents sur un autre serveur</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Comportement des utilisateurs</h2>
            <p className="text-gray-700">
              En tant qu'utilisateur de la plateforme VoisinAge, vous vous engagez à :
            </p>
            <ul className="list-disc list-inside mt-2 ml-4 text-gray-700">
              <li>Fournir des informations exactes et complètes lors de la création de votre compte</li>
              <li>Maintenir la confidentialité de vos informations de connexion</li>
              <li>Respecter les autres utilisateurs et ne pas publier de contenu offensant, diffamatoire ou illégal</li>
              <li>Ne pas utiliser la plateforme pour des activités illégales ou frauduleuses</li>
              <li>Signaler tout comportement inapproprié d'autres utilisateurs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Services et responsabilité</h2>
            <p className="text-gray-700">
              La plateforme VoisinAge est un service de mise en relation entre seniors et bénévoles. VoisinAge n'est pas responsable de la qualité des services rendus entre utilisateurs.
            </p>
            <p className="text-gray-700 mt-4">
              Les utilisateurs sont entièrement responsables de leurs interactions avec les autres membres. VoisinAge se dégage de toute responsabilité en cas de litige entre utilisateurs.
            </p>
            <p className="text-gray-700 mt-4">
              VoisinAge se réserve le droit de suspendre ou supprimer un compte utilisateur en cas de non-respect des présentes conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Modifications des conditions</h2>
            <p className="text-gray-700">
              VoisinAge se réserve le droit de réviser ces conditions d'utilisation à tout moment sans préavis. En utilisant ce site, vous acceptez d'être lié par la version alors actuelle de ces conditions d'utilisation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Loi applicable</h2>
            <p className="text-gray-700">
              Tout litige en relation avec l'utilisation du site VoisinAge est soumis au droit français. Il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris.
            </p>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default ConditionsUtilisation;
