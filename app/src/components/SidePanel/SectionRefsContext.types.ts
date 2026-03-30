import React, { createContext, RefObject } from "react";

export interface SectionRefsContextType {
  summaryRef: RefObject<HTMLDivElement>;
  experienceRef: RefObject<HTMLDivElement>;
  educationRef: RefObject<HTMLDivElement>;
  skillRef: RefObject<HTMLDivElement>;
  projectRef: RefObject<HTMLDivElement>;
  certificationRef: RefObject<HTMLDivElement>;
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SectionRefsContext = createContext<SectionRefsContextType | undefined>(undefined);