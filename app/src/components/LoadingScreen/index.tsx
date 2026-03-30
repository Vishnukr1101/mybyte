import { Spinner } from "@material-tailwind/react";
import "./style.css";

const LoadingScreen = () => {
    return (
        <div className="flex flex-1 flex-col items-center justify-center min-h-screen min-w-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 animated-gradient">
            <div className="glass-panel p-8 rounded-2xl backdrop-blur-xl flex flex-col items-center gap-6 animate-float">
                <Spinner
                    className="h-12 w-12 text-teal-400"
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    onResize={() => {}}
                    onResizeCapture={() => {}}
                />
                <h1 className="text-lg font-bold font-doto text-white animate-pulse">
                    Please wait<span className="blink">_</span>
                </h1>
                <div className="flex gap-1">
                    <div className="dot1 w-2 h-2 rounded-full bg-teal-400"></div>
                    <div className="dot2 w-2 h-2 rounded-full bg-teal-400"></div>
                    <div className="dot3 w-2 h-2 rounded-full bg-teal-400"></div>
                </div>
            </div>
        </div>
    )
}

export default LoadingScreen;
