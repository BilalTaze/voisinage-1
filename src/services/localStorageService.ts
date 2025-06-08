
// Service pour la gestion des données en localStorage

// Types généraux pour les données
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string; // En production, il faudrait hacher les mots de passe
  userType: 'senior' | 'benevole' | 'famille';
  createdAt: string;
}

export interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  status: 'open' | 'assigned' | 'completed';
  userId: string; // ID de l'utilisateur qui a créé la demande
  volunteerId?: string; // ID du bénévole assigné (optionnel)
  createdAt: string;
}

// Clés pour localStorage
const KEYS = {
  USERS: 'voisinage_users',
  CURRENT_USER: 'voisinage_current_user',
  SERVICE_REQUESTS: 'voisinage_service_requests',
};

// Initialiser les données si elles n'existent pas
const initializeData = () => {
  if (!localStorage.getItem(KEYS.USERS)) {
    localStorage.setItem(KEYS.USERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.SERVICE_REQUESTS)) {
    localStorage.setItem(KEYS.SERVICE_REQUESTS, JSON.stringify([]));
  }
};

// Gestion des utilisateurs
export const userService = {
  // Récupérer tous les utilisateurs
  getAllUsers: (): User[] => {
    initializeData();
    return JSON.parse(localStorage.getItem(KEYS.USERS) || '[]');
  },
  
  // Récupérer un utilisateur par ID
  getUserById: (userId: string): User | null => {
    const users = userService.getAllUsers();
    return users.find(user => user.id === userId) || null;
  },
  
  // Créer un utilisateur
  createUser: (userData: Omit<User, 'id' | 'createdAt'>): User => {
    const users = userService.getAllUsers();
    
    // Vérifier si l'email existe déjà
    if (users.some(user => user.email === userData.email)) {
      throw new Error('Un utilisateur avec cet email existe déjà');
    }
    
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    
    // Ne pas stocker le mot de passe dans l'utilisateur courant
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword as User;
  },
  
  // Connecter un utilisateur
  login: (email: string, password: string): Omit<User, 'password'> => {
    const users = userService.getAllUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Email ou mot de passe incorrect');
    }
    
    // Stocker l'utilisateur connecté sans le mot de passe
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(userWithoutPassword));
    
    return userWithoutPassword;
  },
  
  // Déconnecter l'utilisateur
  logout: () => {
    localStorage.removeItem(KEYS.CURRENT_USER);
  },
  
  // Récupérer l'utilisateur connecté
  getCurrentUser: (): Omit<User, 'password'> | null => {
    const userStr = localStorage.getItem(KEYS.CURRENT_USER);
    return userStr ? JSON.parse(userStr) : null;
  },
  
  // Vérifier si un utilisateur est connecté
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(KEYS.CURRENT_USER);
  },
};

// Gestion des demandes de service
export const serviceRequestService = {
  // Récupérer toutes les demandes
  getAllRequests: (): ServiceRequest[] => {
    initializeData();
    return JSON.parse(localStorage.getItem(KEYS.SERVICE_REQUESTS) || '[]');
  },
  
  // Récupérer une demande par ID
  getRequestById: (requestId: string): ServiceRequest | null => {
    const requests = serviceRequestService.getAllRequests();
    return requests.find(req => req.id === requestId) || null;
  },
  
  // Créer une demande
  createRequest: (requestData: Omit<ServiceRequest, 'id' | 'status' | 'createdAt'>): ServiceRequest => {
    const requests = serviceRequestService.getAllRequests();
    
    const newRequest: ServiceRequest = {
      ...requestData,
      id: Date.now().toString(),
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    
    requests.push(newRequest);
    localStorage.setItem(KEYS.SERVICE_REQUESTS, JSON.stringify(requests));
    
    return newRequest;
  },
  
  // Mettre à jour une demande
  updateRequest: (requestId: string, updateData: Partial<Omit<ServiceRequest, 'id' | 'userId' | 'createdAt'>>): ServiceRequest => {
    const requests = serviceRequestService.getAllRequests();
    const index = requests.findIndex(req => req.id === requestId);
    
    if (index === -1) {
      throw new Error('Demande non trouvée');
    }
    
    // Vérifier que la demande peut être modifiée (statut 'open' uniquement)
    if (requests[index].status !== 'open') {
      throw new Error('Cette demande ne peut plus être modifiée car elle a déjà été prise en charge');
    }
    
    requests[index] = {
      ...requests[index],
      ...updateData,
    };
    
    localStorage.setItem(KEYS.SERVICE_REQUESTS, JSON.stringify(requests));
    
    return requests[index];
  },
  
  // Récupérer les demandes d'un utilisateur
  getUserRequests: (userId: string): ServiceRequest[] => {
    const requests = serviceRequestService.getAllRequests();
    return requests.filter(req => req.userId === userId);
  },
  
  // Récupérer les demandes assignées à un bénévole
  getVolunteerRequests: (volunteerId: string): ServiceRequest[] => {
    const requests = serviceRequestService.getAllRequests();
    return requests.filter(req => req.volunteerId === volunteerId);
  },
  
  // Assigner un bénévole à une demande
  assignVolunteer: (requestId: string, volunteerId: string): ServiceRequest => {
    const requests = serviceRequestService.getAllRequests();
    const index = requests.findIndex(req => req.id === requestId);
    
    if (index === -1) {
      throw new Error('Demande non trouvée');
    }
    
    if (requests[index].status !== 'open') {
      throw new Error('Cette demande a déjà été prise en charge');
    }
    
    requests[index] = {
      ...requests[index],
      volunteerId,
      status: 'assigned',
    };
    
    localStorage.setItem(KEYS.SERVICE_REQUESTS, JSON.stringify(requests));
    
    return requests[index];
  },
  
  // Marquer une demande comme terminée
  completeRequest: (requestId: string): ServiceRequest => {
    const requests = serviceRequestService.getAllRequests();
    const index = requests.findIndex(req => req.id === requestId);
    
    if (index === -1) {
      throw new Error('Demande non trouvée');
    }
    
    requests[index] = {
      ...requests[index],
      status: 'completed',
    };
    
    localStorage.setItem(KEYS.SERVICE_REQUESTS, JSON.stringify(requests));
    
    return requests[index];
  },
};
