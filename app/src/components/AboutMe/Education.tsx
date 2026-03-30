import { useSectionRefs } from "../SidePanel/useSectionRefs";

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
        <section className='flex flex-wrap flex-col mt-8 section-fade-in' id="education" ref={educationRef}>
            <h1 className='text-white text-xl lg:text-2xl font-bold mb-4 gradient-text animate-fade-in'>Education</h1>

            <ul className="space-y-3">
                {list.map((item, index) => (
                    <li 
                        key={item.title}
                        className="hover-lift"
                        style={{ 
                            animation: `slideUp 0.6s ease-out forwards`,
                            animationDelay: `${index * 0.1}s`
                        }}
                    >
                        <div className='glass-panel p-4 rounded-xl transition-all duration-300'>
                            <div className='flex flex-row flex-1 my-2 justify-between items-start'>
                                <div className="row flex flex-1 flex-col">
                                    <a href={item.url} target='_blank' rel="noreferrer">
                                        <h2 className='text-white text-md font-semibold hover:text-teal-300 transition-colors'>{item.title}</h2>
                                        <span className='text-xs text-gray-400 mt-1'>{item.place}</span>
                                    </a>
                                    <a href={item.university.url} target="_blank" rel="noreferrer">
                                        <span className='text-sm text-teal-300 hover:text-teal-200 transition-colors mt-2 inline-block'>{item.university.name}</span>
                                    </a>
                                </div>
                                {item.duration && (<p className='text-xs text-gray-400'>{item.duration}</p>)}
                            </div>
                        </div>
                    </li>
                ))}

            </ul>
        </section>
    )
}

export default Education
