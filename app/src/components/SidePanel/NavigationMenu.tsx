import React from 'react'
import { useSectionRefs } from './useSectionRefs';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const NavigationMenu = () => {
    const { summaryRef, experienceRef, educationRef, projectRef, certificationRef, skillRef, hidden, setHidden } = useSectionRefs();

    const [, setOpen] = React.useState(false);

    const openDrawer = () => setOpen(true);


    const handleScroll = (sectionRef: React.RefObject<HTMLDivElement>) => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };


    const handleHideClick = () => {
        setHidden(!hidden);
    }

    const buttonClassName = "px-4 py-2 m-2 text-center clay-button transition-all duration-300 transform hover:scale-105 active:scale-95"

    return (
        <>
            <div className="absolute bottom-0 hidden xl:flex left-0 right-0 gap-2 px-4 pb-4">
                <div className="flex flex-row flex-1 items-center justify-start flex-wrap">
                    <button className={buttonClassName} onClick={() => handleScroll(summaryRef)}>
                        Summary
                    </button>
                    <button className={buttonClassName} onClick={() => handleScroll(experienceRef)}>
                        Experience
                    </button>
                    <button className={buttonClassName} onClick={() => handleScroll(projectRef)}>
                        Projects
                    </button>
                    <button className={buttonClassName} onClick={() => handleScroll(skillRef)}>
                        Skills
                    </button>
                    <button className={buttonClassName} onClick={() => handleScroll(educationRef)}>
                        Education
                    </button>
                    <button className={buttonClassName} onClick={() => handleScroll(certificationRef)}>
                        Certifications
                    </button>
                </div>
            </div>

            <Menu>
                <div className='absolute top-0 xl:hidden left-0 right-0'>
                    <MenuHandler>
                        <button
                            className='text-gray-700 rounded-full w-10 h-10 p-1 m-2 outline-none border-none transition-all duration-300 hover:scale-110 active:scale-95 clay-button'
                            onClick={openDrawer}
                            id="menu-button"
                            aria-label='menu button'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path
                                    id="SVGRepo_iconCarrier"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 12h16M4 8h16M4 16h8"
                                ></path>
                            </svg>
                        </button>
                    </MenuHandler>
                </div>

                <MenuList
                    placeholder={undefined}
                    onPointerEnterCapture={() => { }}
                    onPointerLeaveCapture={() => { }}
                    onResize={() => {}}
                    onResizeCapture={() => {}}
                >
                    <MenuItem onClick={() => handleScroll(summaryRef)}
                        placeholder={undefined}
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                        onResize={() => {}}
                        onResizeCapture={() => {}}
                    >
                        Summary
                    </MenuItem>
                    <MenuItem onClick={() => handleScroll(experienceRef)}
                        placeholder={undefined}
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                        onResize={() => {}}
                        onResizeCapture={() => {}}
                    >
                        Experience
                    </MenuItem>
                    <MenuItem onClick={() => handleScroll(projectRef)}
                        placeholder={undefined}
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                        onResize={() => {}}
                        onResizeCapture={() => {}}
                    >
                        Projects
                    </MenuItem>
                    <MenuItem onClick={() => handleScroll(skillRef)}
                        placeholder={undefined}
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                        onResize={() => {}}
                        onResizeCapture={() => {}}
                    >
                        Skills
                    </MenuItem>
                    <MenuItem onClick={() => handleScroll(educationRef)}
                        placeholder={undefined}
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                        onResize={() => {}}
                        onResizeCapture={() => {}}
                    >
                        Education
                    </MenuItem>
                    <MenuItem onClick={() => handleScroll(certificationRef)}
                        placeholder={undefined}
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                        onResize={() => {}}
                        onResizeCapture={() => {}}
                    >
                        Certifications
                    </MenuItem>
                </MenuList>

            </Menu>

            <div className="absolute top-0 m-2 my-4 left-10 xl:left-0 right-0">
                <button 
                    aria-label='Hide panel' 
                    className="p-2 text-gray-700 clay-button rounded-full text-center transition-all duration-300 hover:scale-110 active:scale-95" 
                    onClick={handleHideClick}
                >
                    {hidden ? <EyeIcon className="w-5 h-5" /> : <EyeSlashIcon className="w-5 h-5" />}
                </button>
            </div>
        </>
    )

}

export default NavigationMenu
