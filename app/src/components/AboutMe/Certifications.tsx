import { useSectionRefs } from "../SidePanel/SectionRefsContext";

const Certifications = () => {
    const { certificationRef } = useSectionRefs();

    return (
        <section className='flex flex-wrap flex-col mt-8' id="certifications" ref={certificationRef}>
            <h1 className='text-black text-xl lg:text-2xl font-bold mb-2'>Awards & Certifications</h1>
            <p className="text-md leading-5 text-justify my-4">
                🎗️Proficiency Award - 2016, From Department of Computer Science, Al-Azhar College of Arts & Science
            </p>
            <div className="flex flex-1 flex-row flex-wrap items-center justify-center">

                <p className="text-md leading-5 my-4 text-center hover:text-blue-500 hover:underline">
                    <a href="https://www.hackerrank.com/certificates/c27f28e07ea8" className='text-center' target='_blank'>
                        <img src="/assets/certificates/frontend-developer.png" className='w-60' alt="Frontend Developer" />
                        Frontend Developer (React) Certificate
                    </a>
                </p>
                <p className="text-md leading-5 text-center my-4 hover:text-blue-500 hover:underline">
                    <a href="https://www.hackerrank.com/certificates/76deb2d15dca" className='text-center' target='_blank'>
                        <img src="/assets/certificates/react.png" className='w-60' alt="React" />
                        React (Basic) Certificate
                    </a>
                </p>
                <p className="text-md leading-5 text-center my-4 hover:text-blue-500 hover:underline">
                    <a href="https://www.hackerrank.com/certificates/36ddcab956cb" className='text-center' target='_blank'>
                        <img src="/assets/certificates/node.png" className='w-60' alt="React" />
                        Node (Basic) Certificate
                    </a>
                </p>
            </div>
        </section>
    )
}

export default Certifications