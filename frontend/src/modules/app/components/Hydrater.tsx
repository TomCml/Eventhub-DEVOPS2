import React from "react";
import { useHydrateUser } from "../../user/hooks/use-hydrate-user.hook";

export const Hydrater: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    useHydrateUser();

    return <>{children}</>;
};
