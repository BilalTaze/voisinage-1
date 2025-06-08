
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
  userFirstName?: string;
  userLastName?: string;
  userType?: string;
}

const DashboardHeader = ({ userFirstName, userLastName, userType }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-gray-600">Bienvenue, {userFirstName} {userLastName}</p>
      </div>
      
      {userType === 'senior' && (
        <Link to="/services/nouveau">
          <Button className="mt-4 md:mt-0 bg-voisinage-blue hover:bg-voisinage-blue-dark">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouvelle demande
          </Button>
        </Link>
      )}
    </div>
  );
};

export default DashboardHeader;
