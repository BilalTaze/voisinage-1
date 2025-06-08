
import { Card, CardContent } from "@/components/ui/card";
import { UserRound, Clock, CheckCircle } from "lucide-react";

interface DashboardStatsProps {
  totalRequests: number;
  activeRequests: number;
  completedRequests: number;
}

const DashboardStats = ({ totalRequests, activeRequests, completedRequests }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">Total des demandes</p>
              <h3 className="text-3xl font-bold">{totalRequests}</h3>
            </div>
            <div className="p-3 rounded-full bg-voisinage-blue text-white">
              <UserRound className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">Demandes actives</p>
              <h3 className="text-3xl font-bold">{activeRequests}</h3>
            </div>
            <div className="p-3 rounded-full bg-amber-500 text-white">
              <Clock className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">Demandes terminées</p>
              <h3 className="text-3xl font-bold">{completedRequests}</h3>
            </div>
            <div className="p-3 rounded-full bg-green-500 text-white">
              <CheckCircle className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
