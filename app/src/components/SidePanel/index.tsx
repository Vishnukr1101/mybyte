import { lazy, Suspense, memo } from 'react';

const Summary = lazy(() => import('../AboutMe/Summary'));
const Experience = lazy(() => import('../AboutMe/Experience'));
const SkillSet = lazy(() => import('../AboutMe/SkillSet'));
const Projects = lazy(() => import('../AboutMe/Projects'));
const Education = lazy(() => import('../AboutMe/Education'));
const Certifications = lazy(() => import('../AboutMe/Certifications'));
const Footer = lazy(() => import('../AboutMe/Footer'));

import LoadingScreen from '../../components/LoadingScreen';

const SidePanel = () => {
    return (
        <div className="absolute bottom-0 lg:top-0 right-0 h-[50vh] lg:h-[95vh] lg:max-w-[35%] m-4 p-5 overflow-auto scroll-smooth bg-white rounded-lg shadow-xl">
            <Suspense fallback={<LoadingScreen />}>
                <Summary />
                <Experience />
                <SkillSet />
                <Projects />
                <Education />
                <Certifications />
                <Footer />
            </Suspense>
        </div>
    );
};

export default memo(SidePanel);
