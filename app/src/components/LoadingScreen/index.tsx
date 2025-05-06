import { Spinner } from "@material-tailwind/react";
import "./style.css";

const LoadingScreen = () => {
    return (
        <div className="flex flex-1 flex-col items-center justify-center min-h-screen min-w-screen dark:bg-slate-800">
            <Spinner
                className="h-12 w-12 text-blue-500"
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
            />
            <h1 className="text-lg font-bold mt-4 font-doto">Please wait<span className="blink">_</span></h1>
        </div>
    )
}

export default LoadingScreen;
