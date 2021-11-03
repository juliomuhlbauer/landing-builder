import { immer } from "@/lib/immer";
import { supabase } from "@/lib/supabase";
import { CreatePageProps, PageProps } from "@/types/pages";
import {
  createPage,
  findItem,
  heroSample,
  pageSample,
  removeAtId,
} from "@/utils";
import create from "zustand";

interface UpdateProps {
  id: string;
  type:
    | "hero-title"
    | "hero-subtitle"
    | "hero-image"
    | "hero-button-text"
    | "hero-button-link";
  content: string;
}

interface UpdatePage {
  title: string;
  icon: string;
  slug: string;
  published: boolean;
}

export interface BuilderStore {
  page: PageProps;
  setPage: (page: PageProps) => void;
  createPage: ({
    title,
    icon,
    user,
    sections,
  }: CreatePageProps) => Promise<PageProps | null>;
  updatePage: ({ title, icon, slug, published }: UpdatePage) => void;
  addSection: () => void;
  removeSection: (id: string) => void;
  addButton: (id: string) => void;
  updateSection: ({ id, type, content }: UpdateProps) => void;
}

const addPage = async (page: PageProps) => {
  const { data, error } = await supabase
    .from<PageProps>("pages")
    .insert(page)
    .single();
  if (error) alert(error.message);
  return data;
};

export const useBuilderStore = create<BuilderStore>(
  immer((set) => ({
    page: pageSample,
    setPage: (page) => {
      set((state) => {
        state.page = page;
      });
    },
    createPage: ({ title, icon, user, sections }) => {
      const newPage = createPage({ title, icon, user, sections });

      set((state) => {
        state.page = newPage;
      });
      return addPage(newPage);
    },
    updatePage: ({ title, icon, slug, published }) => {
      set(({ page }) => {
        page.title = title;
        page.icon = icon;
        page.slug = slug;
        page.published = published;
      });
    },
    addSection: () => {
      set(({ page }) => {
        page.sections.push(heroSample());
      });
    },

    removeSection: (id) => {
      set(({ page }) => {
        removeAtId(page.sections, id);
      });
    },
    updateSection: ({ id, type, content }) => {
      set(({ page }) => {
        const section = findItem(page.sections, id);
        switch (type) {
          case "hero-title":
            section.hero.title = content;
            break;

          case "hero-subtitle":
            section.hero.subtitle = content;
            break;

          case "hero-image":
            section.hero.image = content;
            break;

          case "hero-button-text":
            section.hero.button = {
              url: section.hero.button?.url || "/",
              text: content,
            };
            break;

          case "hero-button-link":
            section.hero.button = {
              url: content,
              text: section.hero.button?.text || "",
            };
            break;
        }
      });
    },
    addButton: (id) => {
      set(({ page }) => {
        findItem(page.sections, id).hero.button = {
          text: "Get started",
          url: "/",
        };
      });
    },
  }))
);
