
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  footer?: ReactNode;
}

const AuthLayout = ({ children, title, description, footer }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-voisinage-blue py-4">
        <div className="container mx-auto px-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">Voisin<span className="text-voisinage-orange">Age</span></span>
          </Link>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
          <div className="text-center">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="mt-2 text-gray-600">{description}</p>
          </div>
          
          <div className="mt-8">
            {children}
          </div>
          
          {footer && (
            <div className="mt-6 text-center text-sm">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
