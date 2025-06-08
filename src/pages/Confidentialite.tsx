
import { useEffect } from "react";
import MainLayout from "../layout/MainLayout";

const Confidentialite = () => {
  useEffect(() => {
    document.title = "Politique de confidentialité | VoisinAge";
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-voisinage-blue">Politique de confidentialité</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-gray-700">
              VoisinAge s'engage à protéger la vie privée des utilisateurs de sa plateforme. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations personnelles.
            </p>
            <p className="text-gray-700 mt-4">
              En utilisant notre service, vous acceptez les pratiques décrites dans cette politique de confidentialité.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Collecte des informations</h2>
            <p className="text-gray-700">
              Nous collectons les informations suivantes lorsque vous vous inscrivez sur notre site :
            </p>
            <ul className="list-disc list-inside mt-2 ml-4 text-gray-700">
              <li>Nom et prénom</li>
              <li>Adresse e-mail</li>
              <li>Type d'utilisateur (senior, bénévole, famille)</li>
              <li>Localisation (pour les services de proximité)</li>
              <li>Numéro de téléphone (facultatif)</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Nous collectons également des informations sur votre utilisation du service, notamment les demandes de services que vous créez ou auxquelles vous répondez.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Utilisation des informations</h2>
            <p className="text-gray-700">
              Les informations que nous collectons sont utilisées pour :
            </p>
            <ul className="list-disc list-inside mt-2 ml-4 text-gray-700">
              <li>Fournir, maintenir et améliorer notre service</li>
              <li>Permettre la mise en relation entre les seniors et les bénévoles</li>
              <li>Vous informer des mises à jour de notre service</li>
              <li>Vous contacter en cas de besoin concernant votre compte ou vos demandes</li>
              <li>Assurer la sécurité de notre plateforme</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Conservation des données</h2>
            <p className="text-gray-700">
              Nous conservons vos informations personnelles tant que votre compte est actif ou aussi longtemps que nécessaire pour vous fournir nos services.
            </p>
            <p className="text-gray-700 mt-4">
              Vous pouvez demander la suppression de vos données en nous contactant via le formulaire de contact ou par email à privacy@voisinage.org.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Sécurité des données</h2>
            <p className="text-gray-700">
              Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre tout accès non autorisé, altération, divulgation ou destruction.
            </p>
            <p className="text-gray-700 mt-4">
              Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est totalement sécurisée, et nous ne pouvons garantir une sécurité absolue.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Modifications de cette politique</h2>
            <p className="text-gray-700">
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications entreront en vigueur immédiatement après leur publication sur cette page.
            </p>
            <p className="text-gray-700 mt-4">
              Nous vous encourageons à consulter régulièrement cette page pour rester informé des mises à jour.
            </p>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default Confidentialite;
