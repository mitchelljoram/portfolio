import { useState, useEffect } from "react";

export function Hello() {
    const [rotate, setRotate] = useState<boolean>(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setRotate((rotate) => !rotate);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div display="flex" flexDirection="row" gap="10">
                <h1 fontSize="9rem" mb="-12" ml="-0.4rem">HELLO,</h1>
                <div transform={rotate ? "rotate(10deg)" : "rotate(0deg)"} transformOrigin="bottom right"  transition="all 1s linear">
                    <h1 fontSize="9rem" mb="-12" ml="-0.4rem">👋</h1>
                </div>
            </div>
            <h1 fontSize="4.5rem">I'M MITCHELL JORAM</h1>
        </div>
    );
}