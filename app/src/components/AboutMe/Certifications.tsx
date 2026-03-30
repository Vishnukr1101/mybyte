import { useSectionRefs } from "../SidePanel/useSectionRefs";

const Certifications = () => {
    const { certificationRef } = useSectionRefs();

    return (
        <section className='flex flex-wrap flex-col mt-8 section-fade-in' id="certifications" ref={certificationRef}>
            <h1 className='text-white text-xl lg:text-2xl font-bold mb-4 gradient-text animate-fade-in'>Awards & Certifications</h1>
            <p className="text-md leading-6 text-justify my-4 text-gray-300 animate-slide-up">
                🎗️ Proficiency Award - 2016, From Department of Computer Science, Al-Azhar College of Arts & Science
            </p>
            <div className="flex flex-1 flex-row flex-wrap items-center justify-center gap-4">

                <a href="https://www.hackerrank.com/certificates/c27f28e07ea8" target='_blank' rel="noreferrer" className='group focus:outline-none'>
                    <div className='glass-panel p-3 rounded-lg hover-lift transition-all duration-300 text-center'>
                        <img src="/assets/certificates/frontend-developer.png" className='w-44 rounded-lg transition-transform duration-300 group-hover:scale-105' alt="Frontend Developer" />
                        <p className="text-sm text-teal-300 hover:text-teal-200 underline mt-2 transition-colors">Frontend Developer (React)</p>
                    </div>
                </a>
                <a href="https://www.hackerrank.com/certificates/76deb2d15dca" target='_blank' rel="noreferrer" className='group focus:outline-none'>
                    <div className='glass-panel p-3 rounded-lg hover-lift transition-all duration-300 text-center'>
                        <img src="/assets/certificates/react.png" className='w-44 rounded-lg transition-transform duration-300 group-hover:scale-105' alt="React" />
                        <p className="text-sm text-teal-300 hover:text-teal-200 underline mt-2 transition-colors">React (Basic)</p>
                    </div>
                </a>
                <a href="https://www.hackerrank.com/certificates/36ddcab956cb" target='_blank' rel="noreferrer" className='group focus:outline-none'>
                    <div className='glass-panel p-3 rounded-lg hover-lift transition-all duration-300 text-center'>
                        <img src="/assets/certificates/node.png" className='w-44 rounded-lg transition-transform duration-300 group-hover:scale-105' alt="Node.js" />
                        <p className="text-sm text-teal-300 hover:text-teal-200 underline mt-2 transition-colors">Node (Basic)</p>
                    </div>
                </a>
            </div>
        </section>
    )
}

export default Certifications