export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  soci_id: number;
  avatar: string; // URL
}

export interface UserList {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    username: string;
    date: string;
    avatar: string;
    entreno_id: string;
    hash_id: string;
  };
}
