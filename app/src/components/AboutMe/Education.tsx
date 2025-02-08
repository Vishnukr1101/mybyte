
const list = [
    {
        "title": "Master of Computer Applications (MCA), Santhigiri College",
        "duration": "2016- 2018",
        "place": "Vazhithala, Kerala"
    },
    {
        "title": "BSc in Computer Science, Al-Azhar College of Arts & Science",
        "duration": "2013 - 2016",
        "place": "Thodupuzha, Kerala"
    },
]


const Education = () => {
    return (
        <section className='flex flex-wrap flex-col mt-8' id="education">
            <h1 className='text-black text-xl lg:text-2xl font-bold mb-2'>Education</h1>

            <ul>
                {list.map(item => (
                    <li key={item.title}>
                        <div className='flex flex-row flex-1 my-4 justify-between items-start'>
                            <div className="row flex flex-1 flex-col">
                                <h2 className='text-black text-md'>{item.title}</h2>
                                <span className='text-xs text-gray-800'>{item.place}</span>
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
