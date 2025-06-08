
import TestimonialCard from "./TestimonialCard";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Grâce à VoisinAge, j'ai trouvé une aide précieuse pour mes courses hebdomadaires. C'est rassurant de pouvoir compter sur quelqu'un de confiance.",
      name: "Marie Dupont",
      role: "Senior, 78 ans",
    },
    {
      quote: "Je peux maintenant suivre à distance l'aide apportée à ma mère. Un vrai soulagement pour toute notre famille.",
      name: "Thomas Martin",
      role: "Famille",
    },
    {
      quote: "Devenir bénévole sur VoisinAge m'a permis de créer des liens précieux avec des seniors de mon quartier tout en me rendant utile.",
      name: "Julie Leroux",
      role: "Bénévole, 32 ans",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Témoignages</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez comment VoisinAge transforme le quotidien des utilisateurs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
