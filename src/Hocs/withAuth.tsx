import { useRouter } from "next/router";
import React from "react";
import { MeQuery, useMeQuery, User } from "../generated/graphql";

type AuthContext = {
    user: Pick<MeQuery, "me"> | null;
    isLoading: boolean;
};
const AuthContext = React.createContext<AuthContext>({
    user: null,
    isLoading: false,
});

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = React.useState<any>(null);
    const [isLoading, setLoading] = React.useState(true);
    const { data, loading } = useMeQuery();
    React.useEffect(() => {
        setLoading(loading);
        if (!loading && data?.me) {
            setUser(data.me);
        }
    }, [loading, data]);
    return (
        <AuthContext.Provider value={{ user, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export function useIsAuthenticated() {
    const context = useAuth();
    return context.user;
}
type withAuthRedirectTypes = {
    WrappedComponent: React.FC;
    expectedAuth?: boolean;
    location: string;
};
export function withAuthRedirect({
    WrappedComponent,
    expectedAuth,
    location,
}: withAuthRedirectTypes) {
    const WithAuthRedirectWrapper = (props: any) => {
        const router = useRouter();
        const { user, isLoading } = useAuth();
        if (isLoading) {
            return <></>;
        }
        if (typeof window !== "undefined" && expectedAuth !== Boolean(user)) {
            router.push(location);
            return <></>;
        }
        return <WrappedComponent {...props} />;
    };
    return WithAuthRedirectWrapper;
}
export function withAuth(WrappedComponent: React.FC, location = "/login") {
    return withAuthRedirect({
        WrappedComponent,
        location,
        expectedAuth: true,
    });
}
export function withoutAuth(WrappedComponent: React.FC, location = "/") {
    return withAuthRedirect({
        WrappedComponent,
        location,
        expectedAuth: false,
    });
}
