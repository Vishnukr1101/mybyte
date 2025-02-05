import React from 'react';
import { ThemeProvider } from "@material-tailwind/react";
import LoadingScreen from './components/LoadingScreen';
import SidePanel from './components/SidePanel';

const CanvasPage = React.lazy(() => import("./components/CanvasPage"))

function App() {

  return (
    <ThemeProvider>
      <div className="flex flex-1 min-h-screen min-w-screen overflow-hidden">
        <React.Suspense fallback={<LoadingScreen />}>
          <CanvasPage className="flex flex-1 min-h-screen min-w-screen overflow-hidden" viewMode={false} camera={{
            cameraPosition: [5.002666692561189,3.303148383086136,-0.49805992094516843],
            orbitalTarget: [4.802197359669965,3.268883557802778,-0.46309305884569685]
          }}
            avatar={{
              speechText: "Hello, How can I help you?",
              position: {
                x: 1.07,
                y: 0,
                z: 0
              },
              rotate: {
                x: 0,
                y: -1.3,
                z: 0
              },
              scale: 2,
              room: {
                position: {
                  x: 0,
                  y: 0.40,
                  z: 0,
                },
                rotate: {
                  x: 0,
                  y: 0,
                  z: 0
                },
                scale: 2
              }
            }}
          />
        </React.Suspense>
        <SidePanel />
      </div>
    </ThemeProvider>
  )
}

export default App
