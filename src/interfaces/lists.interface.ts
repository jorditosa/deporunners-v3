export interface Training {
  id: number;
  attributes: TrainingAttributes;
}

interface TrainingAttributes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  username: string;
  date: string;
  avatar: string;
  entreno_id: string;
  hash_id: string;
}