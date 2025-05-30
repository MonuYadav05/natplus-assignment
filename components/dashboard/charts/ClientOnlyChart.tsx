"use client";

import { useEffect, useState } from "react";

export default function ClientOnlyChart({ children }: { children: React.ReactNode }) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return <>{children}</>;
} 