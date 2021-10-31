export type SectionProps = HeroProps;

export interface HeroProps {
  type: "hero";
  id: string;
  hero: {
    title: string;
    subtitle: string;
    image: string;
    button?: {
      text: string;
      url: string;
      isInternal?: boolean;
    };
  };
}
