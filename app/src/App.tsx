import React, { useState } from 'react';
import { ThemeProvider } from "@material-tailwind/react";
import { Analytics } from '@vercel/analytics/react';

import LoadingScreen from './components/LoadingScreen';
import SidePanel from './components/SidePanel';
import AvatarContext from './hooks/AvatarContext';

const CanvasPage = React.lazy(() => import("./components/CanvasPage"))

const camera = {
  cameraPosition: [-36.36905688691017, 41.05431296457492, -31.76677745244399],
  orbitalTarget: [-39.78377129105793, 38.92269318309951, -19.93789269489745]
};

const avatarData = {
  speechText: "Hello, How can I help you?",
  position: {
    x: -40,
    y: 12.2,
    z: 0
  },
  rotate: {
    x: 0,
    y: 0,
    z: 0
  },
  scale: 18,
  room: {
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },
    scale: 25
  }
};


function App() {

  const [isAvatarReady, setIsAvatarReady] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [visemeData, setVisemeData] = useState<object[]>([]);
  const [audioUrl, setAudioUrl] = useState("");

  return (
    <AvatarContext.Provider value={{
      isAvatarReady, setIsAvatarReady,
      visemeData, setVisemeData,
      audioUrl, setAudioUrl,
      isFetching, setIsFetching
    }}>
      <ThemeProvider>
        <div className="flex flex-1 min-h-screen min-w-screen overflow-hidden">
          <Analytics />
          <React.Suspense fallback={<LoadingScreen />}>
            <CanvasPage className="flex flex-1 min-h-screen min-w-screen overflow-hidden" viewMode={false} camera={camera}
              avatar={avatarData}
            />
          </React.Suspense>
          {isAvatarReady && <SidePanel />}
        </div>
      </ThemeProvider>
    </AvatarContext.Provider>
  )
}

export default App
