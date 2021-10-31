import { immer } from "@/lib/immer";
import { supabase } from "@/lib/supabase";
import { PageProps } from "@/types/pages";
import { findItem, removeAtId } from "@/utils";
import create from "zustand";

interface PageStore {
  pages: PageProps[];
  setPages: (pages: PageProps[]) => void;
  deletePage: (id: string) => void;
  renamePage: (id: string, title: string) => void;
}

const deletePage = async (id: string) => {
  await supabase.from("Pages").delete().match({ id });
};

export const useDashboardStore = create<PageStore>(
  immer((set) => ({
    pages: [],
    setPages: (pages) => {
      set((state) => {
        state.pages = pages;
      });
    },

    deletePage: (id) => {
      set(({ pages }) => {
        removeAtId(pages, id);
      });
      deletePage(id);
    },
    renamePage: (id, text) => {
      set(({ pages }) => {
        findItem(pages, id).title = text;
      });
    },
  }))
);
