import React, { createContext } from "react";

interface AvatarContextType {
  isAvatarReady: boolean;
  setIsAvatarReady: React.Dispatch<React.SetStateAction<boolean>>;
  visemeData: object[];
  setVisemeData: React.Dispatch<React.SetStateAction<object[]>>;
  audioUrl: string;
  setAudioUrl: React.Dispatch<React.SetStateAction<string>>;
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

const AvatarContext = createContext<AvatarContextType>({
  isAvatarReady: false, // Default value
  setIsAvatarReady: () => {},
  visemeData: [],
  setVisemeData: () => {},
  audioUrl: "",
  setAudioUrl: () => {},
  isFetching: false,
  setIsFetching:  () => {}
});

export default AvatarContext;
