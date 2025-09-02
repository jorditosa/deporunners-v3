export interface ListItem {
  id: number;
  attributes: ListAttributes;
}

interface ListAttributes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: string;
  date: string;
  avatar: string;
  cursa_id: string;
  hash_id: string;
}

export interface ListAddingForm {
  data: {
    name?: string;
    avatar?: string;
    date: string;
    cursa_id: string;
    hash_id: string;
  };
}