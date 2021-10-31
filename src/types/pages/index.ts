import { SectionProps } from "../sections";

export interface PageProps {
  title: string;
  icon: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
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
