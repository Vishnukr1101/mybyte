
const Footer = () => {
    return (
        <footer className='flex flex-1 flex-col mt-8 section-fade-in'>
            <div className="border-t border-white/10 my-4"></div>
            <div className="text-md font-bold text-white self-center my-4 gradient-text animate-fade-in">
                Social Links
            </div>
            <div className="flex flex-1 flex-row gap-6 items-center justify-center mb-6">
                <a 
                    href="https://github.com/Vishnukr1101" 
                    target='_blank'
                    rel="noreferrer"
                    className='group transition-transform duration-300 hover:scale-110 hover:-rotate-6'
                >
                    <img src='/assets/icons/github-dark.svg' className='w-10 filter invert brightness-150' alt="Github" />
                </a>
                <a 
                    href="https://www.linkedin.com/in/vishnu-k-r-a76588153/" 
                    target='_blank'
                    rel="noreferrer"
                    className='group transition-transform duration-300 hover:scale-110 hover:rotate-6'
                >
                    <img src='/assets/icons/linkedin.svg' className='w-10' alt="LinkedIn" />
                </a>
            </div>
            <div className="max-w-7xl mx-auto mt-4 px-4 text-center">
                <p className="text-xs text-gray-400">
                    © 2025 Mybyte. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer