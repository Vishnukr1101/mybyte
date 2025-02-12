import { useSectionRefs } from "../SidePanel/SectionRefsContext";

const list = [
    {
        "title": "Master of Computer Applications (MCA), Santhigiri College",
        "duration": "2016- 2018",
        "place": "Vazhithala, Kerala",
        "url": "https://www.santhigiricollege.ac.in/",
        "university": {
            "name": "MG University",
            "url": "https://www.mgu.ac.in/"
        }
    },
    {
        "title": "BSc in Computer Science, Al-Azhar College of Arts & Science",
        "duration": "2013 - 2016",
        "place": "Thodupuzha, Kerala",
        "url": "https://alazharthodupuzha.org/",
        "university": {
            "name": "MG University",
            "url": "https://www.mgu.ac.in/"
        }
    },
]


const Education = () => {
    const { educationRef } = useSectionRefs();
    
    return (
        <section className='flex flex-wrap flex-col mt-8' id="education" ref={educationRef}>
            <h1 className='text-black text-xl lg:text-2xl font-bold mb-2'>Education</h1>

            <ul>
                {list.map(item => (
                    <li key={item.title}>
                        <div className='flex flex-row flex-1 my-4 justify-between items-start'>
                            <div className="row flex flex-1 flex-col">
                                <a href={item.url} target='_blank'>
                                    <h2 className='text-black text-md hover:text-blue-500 hover:underline'>{item.title}</h2>
                                    <span className='text-xs text-gray-800'>{item.place}</span>
                                </a>
                                <a href={item.university.url} target="_blank">
                                    <span className='text-sm text-gray-800 hover:text-blue-500 hover:underline mt-4'>{item.university.name}</span>
                                </a>
                            </div>
                            {item.duration && (<p className='text-xs text-gray-600'>{item.duration}</p>)}
                        </div>

                    </li>
                ))}

            </ul>
        </section>
    )
}

export default Education
