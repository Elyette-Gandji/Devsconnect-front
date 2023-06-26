export interface FlashI {
  type: 'success' | 'error' | undefined;
  children: React.ReactNode;
  duration?: number;
}

export interface BurgerI {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MemberI {
  id: number;
  name: string;
  firstname: string;
  email: string;
  password: string;
  pseudo: string;
  description: string;
  availability: boolean;
  projects: ProjectI[];
  tags: TagI[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MembersI {
  members: MemberI[];
}

export interface ProjectI {
  id: number;
  title: string;
  description: string;
  availability: boolean;
  user: MemberI[];
  user_id: number;
  user_pseudo: string;
  tags: TagI[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectsI {
  projects: ProjectI[];
}

export interface TagI {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

//* Utiliser dans Signin par exemple pour l'affichage des technos
export interface TagSelectedI {
  id: number | string;
  name: string;
  value: string;
  label: string;
  path: string;
}
