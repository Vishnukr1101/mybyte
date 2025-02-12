import React, { createContext, useContext, useRef } from "react";

type SectionRefs = {
  summaryRef: React.RefObject<HTMLDivElement>;
  experienceRef: React.RefObject<HTMLDivElement>;
  educationRef: React.RefObject<HTMLDivElement>;
  skillRef: React.RefObject<HTMLDivElement>;
  projectRef: React.RefObject<HTMLDivElement>;
  certificationRef: React.RefObject<HTMLDivElement>;
};

const SectionRefsContext = createContext<SectionRefs | null>(null);

export const SectionRefsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const summaryRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const skillRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const certificationRef = useRef<HTMLDivElement>(null);

  return (
    <SectionRefsContext.Provider value={{ summaryRef, experienceRef, educationRef, skillRef, projectRef, certificationRef }}>
      {children}
    </SectionRefsContext.Provider>
  );
};

export const useSectionRefs = () => {
  const context = useContext(SectionRefsContext);
  if (!context) throw new Error("useSectionRefs must be used within a SectionRefsProvider");
  return context;
};
