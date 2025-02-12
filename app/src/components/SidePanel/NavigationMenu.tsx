import React from 'react'
import { useSectionRefs } from './SectionRefsContext';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";


const NavigationMenu = () => {
    const { summaryRef, experienceRef, educationRef, projectRef, certificationRef, skillRef } = useSectionRefs();

    const [open, setOpen] = React.useState(false);

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);


    const handleScroll = (sectionRef: React.RefObject<HTMLDivElement>) => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const buttonClassName = "px-4 py-2 m-2 text-center text-black shadow-md hover:shadow-lg rounded-md min-w-20 bg-white ease-in hover:bg-white hover:text-teal-700"

    return (
        <>
            <div className="absolute bottom-0 hidden xl:flex left-0 right-0">
                <div className="flex flex-row flex-1 items-center">
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
                            className='text-white rounded-full w-9 h-9 p-1 m-1 my-4 outline-none border-none bg-white shadow-sm hover:shadow-md'
                            onClick={openDrawer}
                            id="menu-button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path
                                    id="SVGRepo_iconCarrier"
                                    stroke="#000"
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
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                >
                    <MenuItem onClick={() => handleScroll(summaryRef)}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    >
                        Summary
                    </MenuItem>
                    <MenuItem onClick={() => handleScroll(experienceRef)}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    >
                        Experience
                    </MenuItem>
                    <MenuItem onClick={() => handleScroll(projectRef)}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    >
                        Projects
                    </MenuItem>
                    <MenuItem onClick={() => handleScroll(skillRef)}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    >
                        Skills
                    </MenuItem>
                    <MenuItem onClick={() => handleScroll(educationRef)}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    >
                        Education
                    </MenuItem>
                    <MenuItem onClick={() => handleScroll(certificationRef)}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    >
                        Certifications
                    </MenuItem>
                </MenuList>

            </Menu>
        </>
    )
}

export default NavigationMenu
