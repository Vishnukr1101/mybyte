import React, { useRef, useState } from "react";
import { SectionRefsContext } from "./SectionRefsContext.types";

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

