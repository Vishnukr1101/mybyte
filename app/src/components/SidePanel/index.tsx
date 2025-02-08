import React from 'react'
import Summary from '../AboutMe/Summary';
import Experience from '../AboutMe/Experience';
import SkillSet from '../AboutMe/SkillSet';
import Projects from '../AboutMe/Projects';
import Education from '../AboutMe/Education';
import Certifications from '../AboutMe/Certifications';
import Footer from '../AboutMe/Footer';

type Props = {}

const SidePanel = (props: Props) => {
    return (
        <div className="absolute bottom-0 lg:top-0 right-0 h-[50vh] lg:h-[95vh] lg:max-w-[35%] m-4 p-5 overflow-auto bg-white rounded-lg shadow-xl">
            <Summary />
            <Experience />
            <SkillSet />
            <Projects />
            <Education />
            <Certifications />
            <Footer />
        </div>
    )
}



export default SidePanel;