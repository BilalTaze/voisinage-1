
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ServiceCategoryCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  linkTo: string;
}

const ServiceCategoryCard = ({ title, description, icon, linkTo }: ServiceCategoryCardProps) => {
  return (
    <div className="voisinage-card flex flex-col items-center text-center transition-transform hover:scale-105">
      <div className="p-4 rounded-full bg-voisinage-blue/10 text-voisinage-blue mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link 
        to={linkTo}
        className="mt-auto text-voisinage-blue font-medium hover:underline"
      >
        En savoir plus
      </Link>
    </div>
  );
};

export default ServiceCategoryCard;
