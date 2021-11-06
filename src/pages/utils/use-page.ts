import { useContext } from "react";
import { PageContext } from "./page-context";

export const usePage = () => {
  const page = useContext(PageContext);
  return page;
};
