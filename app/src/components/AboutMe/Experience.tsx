import { useSectionRefs } from "../SidePanel/useSectionRefs";

const Experience = () => {
    const { experienceRef } = useSectionRefs();

    return (
        <section className='flex flex-wrap flex-col mt-8 section-fade-in' id="experience" ref={experienceRef}>
            <h1 className='text-white text-xl lg:text-2xl font-bold mb-4 gradient-text animate-fade-in'>Experience</h1>
            <ul className="space-y-6">
                <li className="hover-lift py-4 px-4 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300">
                    <div className='flex flex-row flex-1 my-2 justify-between items-start'>
                        <div className="row flex flex-1 flex-col">
                            <h2 className='text-white text-md lg:text-lg font-semibold'>Senior Software Engineer</h2>
                            <a href="https://www.simelabs.com/" className="text-teal-300 hover:text-teal-200 hover:underline text-sm transition-colors" target="_blank" rel="noreferrer">Simelabs</a>
                        </div>
                        <p className='text-xs text-gray-400'>11/2024 - Present</p>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-xs text-justify text-gray-300">
                        <li>Led the backend development of wallet payment transaction features for the
                            MSA-CD Wallet mobile application.</li>
                        <li>Integrated external APIs to manage various backend operations and ensure
                            seamless transaction processing.</li>
                        <li>Prioritized clean code practices, optimizing backend architecture for improved
                            performance, readability, and maintainability.</li>
                        <li>Contributed to code quality enhancements through best practices, refactoring,
                            and performance optimization.</li>
                        <li>Conducted detailed code reviews to ensure adherence to coding standards and
                            maintain scalable, high-quality backend solutions.</li>
                        <li>Proficient in backend technologies such as Node.js, Express.js, Git,
                            and AWS CodeCommit</li>
                    </ul>
                </li>
                <li className="hover-lift py-4 px-4 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300">
                    <div className='flex flex-row flex-1 my-2 justify-between items-start'>
                        <div className="row flex flex-1 flex-col">
                            <h2 className='text-white text-md lg:text-lg font-semibold'>Senior Software Developer</h2>
                            <a href="https://www.linkedin.com/company/recodeai" className="text-teal-300 hover:text-teal-200 hover:underline text-sm transition-colors" target="_blank" rel="noreferrer">RecodeAI Solutions</a>
                        </div>
                        <p className='text-xs text-gray-400'>08/2018 - 11/2024</p>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-xs text-justify text-gray-300">
                        <li>Lead full-stack development on multiple high-visibility projects leveraging the
                            MERN stack to deliver robust and efficient applications for clients, including
                            international clients and teams.</li>
                        <li>Architected and implemented AI-powered assistants using OpenAI technologies,
                            integrated with user profiles for personalized and dynamic responses in various
                            applications.</li>
                        <li>Designed backend APIs using Node.js and Python with a focus on scalability and
                            performance, ensuring seamless data handling.</li>
                        <li>Spearheaded the development and cloud deployment of applications on Azure,
                            optimizing performance and ensuring secure, scalable solutions.</li>
                        <li>Conducted detailed code reviews to ensure adherence to coding standards and
                            maintain scalable, high-quality backend solutions.</li>
                        <li>Collaborated with cross-functional teams, providing technical leadership and
                            mentoring junior developers.</li>
                    </ul>
                </li>
            </ul>
        </section>
    )
}

export default Experience
