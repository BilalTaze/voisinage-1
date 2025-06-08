
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt sur VoisinAge",
    });
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-voisinage-blue">Voisin<span className="text-voisinage-orange">Age</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/services" className="text-gray-700 hover:text-voisinage-blue transition-colors">
              Services
            </Link>
            <Link to="/comment-ca-marche" className="text-gray-700 hover:text-voisinage-blue transition-colors">
              Comment ça marche
            </Link>
            <Link to="/a-propos" className="text-gray-700 hover:text-voisinage-blue transition-colors">
              À propos
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-voisinage-blue transition-colors">
              Contact
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" className="text-voisinage-blue border-voisinage-blue hover:bg-voisinage-blue/10">
                    <User className="mr-2 h-4 w-4" />
                    Mon compte
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Link to="/connexion">
                  <Button variant="outline" className="text-voisinage-blue border-voisinage-blue hover:bg-voisinage-blue/10">
                    Connexion
                  </Button>
                </Link>
                <Link to="/inscription">
                  <Button className="bg-voisinage-blue hover:bg-voisinage-blue-dark">
                    Inscription
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 pb-6 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link
                to="/services"
                className="text-gray-700 hover:text-voisinage-blue transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/comment-ca-marche"
                className="text-gray-700 hover:text-voisinage-blue transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Comment ça marche
              </Link>
              <Link
                to="/a-propos"
                className="text-gray-700 hover:text-voisinage-blue transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                À propos
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-voisinage-blue transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button variant="outline" className="w-full text-voisinage-blue border-voisinage-blue hover:bg-voisinage-blue/10">
                        <User className="mr-2 h-4 w-4" />
                        Mon compte
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      onClick={handleLogout}
                      className="text-gray-700 hover:text-red-600 justify-start"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Déconnexion
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/connexion"
                      className="w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button variant="outline" className="w-full text-voisinage-blue border-voisinage-blue hover:bg-voisinage-blue/10">
                        Connexion
                      </Button>
                    </Link>
                    <Link
                      to="/inscription"
                      className="w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button className="w-full bg-voisinage-blue hover:bg-voisinage-blue-dark">
                        Inscription
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
