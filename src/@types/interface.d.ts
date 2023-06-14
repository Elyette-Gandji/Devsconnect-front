export interface FlashI {
  type: 'success' | 'error';
  children: React.ReactNode;
  duration?: number;
}

export interface BurgerI {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MemberI {
  id: number;
  name: string;
  firstname: string;
  email: string;
  password: string;
  description: string;
  availability: boolean;
  createdAt: Date;
  updatedAt: Date;
  projects: ProjectI[];
  technos: TechnoI[];
}

export interface MembersI {
  members: MemberI[];
}

export interface ProjectI {
  id: number;
  title: string;
  description: string;
  availability: boolean;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectsI {
  projects: ProjectI[];
}

export interface TechnoI {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

//* Utiliser dans Signin par exemple pour l'affichage des technos
export interface TechnoMapI {
  id: number | string;
  label: string;
  value: string;
  path: string;
}
