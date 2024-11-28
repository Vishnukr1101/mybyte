import { Spinner } from "@material-tailwind/react";

const LoadingScreen = () => {
    return (
        <div className="flex flex-1 flex-col items-center justify-center min-h-screen min-w-screen">
            <Spinner
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            />
            <h1 className="text-lg font-bold mt-4 font-doto">Please wait_</h1>
        </div>
    )
}

export default LoadingScreen;
