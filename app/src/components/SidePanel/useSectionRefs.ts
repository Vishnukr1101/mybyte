import { useContext } from "react";
import { SectionRefsContext } from "./SectionRefsContext.types";

export const useSectionRefs = () => {
  const context = useContext(SectionRefsContext);
  if (!context) {
    throw new Error("useSectionRefs must be used within a SectionRefsProvider");
  }
  return context;
};
