'use client';


import { ReactNode } from 'react';

import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

interface ProviderProps {
    children: ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
    return (
        <Theme accentColor={"green"} radius='full'>
         {children}{' '}
        </Theme>
    );
};

export default Provider;