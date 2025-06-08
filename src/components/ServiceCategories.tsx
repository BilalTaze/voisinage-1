
import ServiceCategoryCard from "./ServiceCategoryCard";
import { Calendar, MessageSquare, Search } from "lucide-react";

const ServiceCategories = () => {
  const categories = [
    {
      title: "Courses et Transport",
      description: "Aide pour les courses, transport chez le médecin ou à la pharmacie.",
      icon: <Search className="h-6 w-6" />,
      linkTo: "/services/courses-transport",
    },
    {
      title: "Bricolage et Jardinage",
      description: "Petites réparations, entretien du jardin, aide pour les tâches techniques.",
      icon: <Search className="h-6 w-6" />,
      linkTo: "/services/bricolage-jardinage",
    },
    {
      title: "Compagnie et Accompagnement",
      description: "Visites de convivialité, promenades, jeux de société, lecture.",
      icon: <MessageSquare className="h-6 w-6" />,
      linkTo: "/services/compagnie-accompagnement",
    },
    {
      title: "Aide Administrative",
      description: "Assistance pour les démarches administratives, courriers, etc.",
      icon: <Calendar className="h-6 w-6" />,
      linkTo: "/services/aide-administrative",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nos Catégories de Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            VoisinAge facilite différents types d'entraide pour améliorer la qualité de vie des seniors.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <ServiceCategoryCard
              key={index}
              title={category.title}
              description={category.description}
              icon={category.icon}
              linkTo={category.linkTo}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
