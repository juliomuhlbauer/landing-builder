import { CreatePageProps, PageProps } from "@/types/pages";
import { HeroProps, SectionProps } from "@/types/sections";
import { v4 } from "uuid";
import { randomEmoji } from "./random-emoji";
import slugfy from "slug";

export const sectionNames = {
  hero: "Hero",
};

export const heroSample = (): HeroProps => {
  return {
    type: "hero",
    id: v4(),
    hero: {
      title: "Another hero",
      subtitle: "Another hero subtitle",
      image: "/samples/plataform.png",
    },
  };
};

const generateRandom = (name: string) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const randomId =
    Math.floor(Math.random() * 100000) +
    alphabet[Math.floor(Math.random() * alphabet.length)];

  const slug = slugfy(name) + "-" + randomId;

  return { slug };
};

export const createPage = ({ user, product }: CreatePageProps): PageProps => {
  const { slug } = generateRandom(product.name);

  const id = v4();

  const sections: SectionProps[] = [
    {
      type: "hero",
      id: v4(),
      hero: {
        title: "Get started",
        subtitle: product.description,
        image: "/samples/plataform.png",
        button: {
          text: "Get started",
        },
      },
    },
  ];

  return {
    id,
    title: product.name,
    icon: randomEmoji(),
    slug,
    sections: sections,
    created_at: new Date(),
    updated_at: new Date(),
    published: false,
    user: user,
    product,
  };
};

export const pageSample = createPage({
  user: "",
  product: {
    name: "",
    link: "",
    description: "",
    category: "",
  },
});

interface Product {
  name: string;
  link: string;
  description: string;
}

const CreateSectionsByProduct = ({ name, link, description }: Product) => {
  // const
};
