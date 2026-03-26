import { useState, useEffect } from "react";

export function useVisibleCount(counts: {
    mobile: number;
    desktop: number;
}) {
    const [visibleCount, setVisibleCount] = useState(counts.mobile);

    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            if (w < 640) setVisibleCount(counts.mobile);
            else setVisibleCount(counts.desktop);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return visibleCount;
}