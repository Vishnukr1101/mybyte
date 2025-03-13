import React, { lazy } from 'react'

const Summary = lazy(() => import('../AboutMe/Summary'));
const Experience = lazy(() => import('../AboutMe/Experience'));
const SkillSet = lazy(() => import('../AboutMe/SkillSet'));
const Projects = lazy(() => import('../AboutMe/Projects'));
const Education = lazy(() => import('../AboutMe/Education'));
const Certifications = lazy(() => import('../AboutMe/Certifications'));
const Footer = lazy(() => import('../AboutMe/Footer'));

import LoadingScreen from '../../components/LoadingScreen';
import { useSectionRefs } from './SectionRefsContext';


const Panel = () => {
    const { hidden } = useSectionRefs();

    return (
        <div className="absolute flex-col bottom-0 lg:top-0 h-[44vh] lg:h-[95vh] lg:max-w-[35%] m-4 p-5 overflow-auto scroll-smooth bg-white rounded-lg shadow-xl transition-all ease-in-out delay-500" style={{
            right: hidden ? -5000 : 0
        }}>
            <React.Suspense fallback={<LoadingScreen />}>
                <Summary />
                <Experience />
                <SkillSet />
                <Projects />
                <Education />
                <Certifications />
                <Footer />
            </React.Suspense>
        </div>
    )
}

export default Panel