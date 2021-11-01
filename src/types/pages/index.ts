import { SectionProps } from "../sections";

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
  product: {
    name: string;
    link: string;
    description: string;
    pricing: string;
  };
}
