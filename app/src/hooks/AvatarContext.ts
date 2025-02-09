import React, { createContext } from "react";

interface AvatarContextType {
  isAvatarReady: boolean;
  setIsAvatarReady: React.Dispatch<React.SetStateAction<boolean>>;
}

const AvatarContext = createContext<AvatarContextType>({
  isAvatarReady: false, // Default value
  setIsAvatarReady: () => {},
});

export default AvatarContext;
