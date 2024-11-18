'use client';
import React from 'react';
import SuperTokensWebJs from 'supertokens-web-js'
import { frontendConfig } from '@/config/frontend';

if (typeof window !== 'undefined') {
    console.log(frontendConfig())
    SuperTokensWebJs.init(frontendConfig());
}

export const SuperTokensInit: React.FC<React.PropsWithChildren<{}>> = ({
    children,
}) => {
    return <>{children}</>;
};