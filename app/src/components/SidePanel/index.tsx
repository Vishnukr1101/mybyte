import React from 'react'
import Summary from '../AboutMe/Summary';
import Experience from '../AboutMe/Experience';
import SkillSet from '../AboutMe/SkillSet';

type Props = {}

const SidePanel = (props: Props) => {
    return (
        <div className='absolute top-0 right-0 h-auto m-4 p-5 lg:max-w-[35%] overflow-auto bg-white rounded-lg shadow-xl' style={{ minHeight: "calc(100vh - 40px)", maxHeight: "calc(100vh - 40px)" }}>
            <Summary />
            <Experience />
            <SkillSet />
        </div>
    )
}



export default SidePanel;