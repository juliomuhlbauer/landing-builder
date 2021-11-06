import { SectionProps } from "../sections";

interface ProductProps {
  name: string;
  link: string;
  category: string;
  description: string;
  // image: string;
}
export interface PageProps {
  title: string;
  icon: string;
  id: string;
  created_at: Date;
  updated_at: Date;
  slug: string;
  published: boolean;
  sections: SectionProps[];
  user: string;
  product: ProductProps;
}

export interface CreatePageProps {
  user: PageProps["user"];
  product: PageProps["product"];
}
