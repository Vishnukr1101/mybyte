import React, { createContext, SetStateAction, useContext, useRef, useState } from "react";

type SectionRefs = {
  summaryRef: React.RefObject<HTMLDivElement>;
  experienceRef: React.RefObject<HTMLDivElement>;
  educationRef: React.RefObject<HTMLDivElement>;
  skillRef: React.RefObject<HTMLDivElement>;
  projectRef: React.RefObject<HTMLDivElement>;
  certificationRef: React.RefObject<HTMLDivElement>;
  hidden: boolean;
  setHidden: React.Dispatch<SetStateAction<boolean>>
};

const SectionRefsContext = createContext<SectionRefs | null>(null);

export const SectionRefsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const summaryRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const skillRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const certificationRef = useRef<HTMLDivElement>(null);

  const [hidden, setHidden] = useState(false);

  return (
    <SectionRefsContext.Provider value={{ summaryRef, experienceRef, educationRef, skillRef, projectRef, certificationRef, hidden, setHidden }}>
      {children}
    </SectionRefsContext.Provider>
  );
};

export const useSectionRefs = () => {
  const context = useContext(SectionRefsContext);
  if (!context) throw new Error("useSectionRefs must be used within a SectionRefsProvider");
  return context;
};
