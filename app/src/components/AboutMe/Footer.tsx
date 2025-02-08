
const Footer = () => {
    return (
        <footer className='flex flex-1 flex-col'>
            <div className="border-t border-gray-300 my-4"></div>
            <div className="text-md font-bold text-grey-800 self-center my-2">
                Social Links
            </div>
            <div className="flex flex-1 flex-row gap-4 items-center justify-center">
                <a href="https://github.com/Vishnukr1101" target='_blank'>
                    <img src='/assets/icons/github-dark.svg' className='w-12' alt="Github" />
                </a>
                <a href="https://www.linkedin.com/in/vishnu-k-r-a76588153/" target='_blank'>
                    <img src='/assets/icons/linkedin.svg' className='w-12' alt="LinkedIn" />
                </a>
            </div>
            <div className="max-w-7xl mx-auto mt-4 px-4 text-center">
                <p className="text-sm">
                    © 2025 Mybyte. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer