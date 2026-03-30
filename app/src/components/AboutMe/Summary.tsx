import { useSectionRefs } from "../SidePanel/useSectionRefs";

const Summary = () => {
    const { summaryRef } = useSectionRefs();

    return (
        <section 
            className='flex flex-wrap flex-col section-fade-in' 
            id="summary" 
            ref={summaryRef}
        >
            <h1 className='text-white text-xl lg:text-2xl font-bold mb-4 gradient-text animate-fade-in'>
                About Me
            </h1>
            <p className="text-gray-200 text-sm leading-6 text-justify animate-slide-up">
                Full Stack Developer with 6+ years of experience in designing and implementing user-focused web
                applications using the MERN stack. Skilled in optimizing both front-end and back-end systems for performance
                and scalability. A proactive problem-solver with a passion for continuous learning and effective collaboration
                in diverse team environments.
            </p>
        </section>
    )
}

export default Summary