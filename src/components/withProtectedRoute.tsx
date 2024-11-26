import React, { useEffect, useState } from "react";
import { doesSessionExist } from "supertokens-web-js/recipe/session";
import { useRouter } from "next/navigation";

const withProtectedRoute = (WrappedComponent: React.ComponentType) => {
    const ProtectedRoute = (props: any) => {
        const router = useRouter();
        const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

        useEffect(() => {
            const checkSession = async () => {
                const sessionExists = await doesSessionExist();
                if (!sessionExists) {
                    router.push("/sign-in");
                } else {
                    setIsAuthenticated(true);
                }
            };

            checkSession();
        }, [router]);

        if (isAuthenticated === null) {
            return null;
        }

        return isAuthenticated ? <WrappedComponent {...props} /> : null;
    };

    return ProtectedRoute;
};

export default withProtectedRoute;
