import { PageProps } from "@/types/pages";
import { pageSample } from "@/utils";
import { createContext, FC } from "react";

export const PageContext = createContext<PageProps>(pageSample);

export const PageProvider: FC<{ page: PageProps }> = ({ children, page }) => {
  return <PageContext.Provider value={page}>{children}</PageContext.Provider>;
};
