import { memo } from 'react';

import { SectionRefsProvider } from "./SectionRefsContext";
import NavigationMenu from './NavigationMenu';
import Panel from './Panel';

const SidePanel = () => {

    return (
        <>
            <SectionRefsProvider>
                <Panel />
                <NavigationMenu />
            </SectionRefsProvider>
        </>
    );
};

export default memo(SidePanel);
