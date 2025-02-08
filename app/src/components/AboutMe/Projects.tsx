import React from 'react'

type Props = {}

const list = [
    {
        "title": "MSA - CD Wallet",
        "description": [
            "Led the development of wallet reload, bill payment, internet plans, and port-in transactions functionality.",
            "Integrated external APIs to handle various transactions and operations.",
            "Ensured the implementation of clean code practices, improving readability and maintainability.",
            "Actively contributed to improving overall code quality through best practices and optimization.",
            "Performed thorough code reviews & refactoring to ensure adherence to coding standards, quality, and performance benchmarks."
        ],
        "duration": "11/2024 – 01/2025",
        "tech": ["Node.js", "Express.js", "RESTful APIs", "Git", "AWS Code Commit"]
    },
    {
        "title": "Bellohire",
        "description": [
            "Led the development of a candidate recruitment platform featuring 3D customizable avatars for companies and candidates.",
            "Integrated an AI-powered assistant for generating job descriptions, parsing resumes, and offering real-time job recommendations.",
            "Enabled companies to analyze candidates with an overall score, including skill match, professional, and cultural fit assessments.",
            "Implemented a multi-stage candidate skill evaluation process, including screening, interviews, and technical assessments with an integrated coding environment.",
            "Utilized AWS S3 for secure document storage and AWS IAM for role-based access control to enhance data security and management.",
            "Built and deployed the platform on Azure, ensuring high availability and scalability."
        ],
        "duration": null,
        "tech": ["React.js", "Node.js", "TypeScript", "MongoDB", "Express.js", "Redux", "React Flow", "Redis", "Stripe", "Python", "OpenAI", "TailwindCSS", "AWS (IAM, S3)", "Azure"]
    },
    {
        "title": "Mindchat",
        "description": [
            "Developed an application to analyze EEG signals from Muse headsets, assessing mental health indicators like anxiety, depression, and stress.",
            "Integrated a 3D virtual assistant using Retrieval-Augmented Generation (RAG) for document-based responses, enhanced by Azure TTS for voice interaction.",
            "Created a user-friendly interface for tracking mental health over time and delivering personalized insights.",
            "Enabled consultations with mental health experts for tailored guidance based on EEG data.",
            "Built and distributed the application with real-time data access via Firebase."
        ],
        "duration": null,
        "tech": ["React Native", "TypeScript", "Firebase", "Python", "OpenAI", "Azure"]
    },
    {
        "title": "Healthcare Chat",
        "description": [
            "Created a healthcare chatbot platform for parents to manage child profiles and interact with an AI-powered assistant for health queries.",
            "Designed an intuitive user interface using Vite and TailwindCSS for easy navigation and access to health information.",
            "Added an appointment booking feature to schedule visits with healthcare providers based on availability.",
            "Integrated a symptom checker tool to help parents assess their child's health concerns before consulting professionals.",
            "Implemented secure backend APIs with Flask and MongoDB for efficient data storage and retrieval."
        ],
        "duration": null,
        "tech": ["React", "TypeScript", "Vite", "TailwindCSS", "Recoil", "Python Flask", "MongoDB"]
    },
    {
        "title": "Hidden Health",
        "description": [
            "Engineered a shopping website for healthy food products delivery, collaborating with an international client based in Dubai to meet specific market needs.",
            "Set up scalable storage with AWS S3 to handle and manage document uploads efficiently.",
            "Integrated the N-Genius payment gateway for secure transactions, ensuring a seamless user experience.",
            "Enabled real-time order status updates through WebSockets, providing customers with live updates throughout the delivery process.",
            "Designed a responsive and user-friendly front-end with React.",
            "Built a robust backend with Node.js and Express, using MongoDB for efficient data management."
        ],
        "duration": null,
        "tech": ["React.js", "Node.js", "TypeScript", "MongoDB", "Express.js", "TailwindCSS", "WebSockets", "N-Genius Payment Gateway", "AWS (S3)"]
    }
]


const Projects = (props: Props) => {
    return (
        <section className='flex flex-wrap flex-col mt-8' id="projects">
            <h1 className='text-black text-2xl font-bold mb-2'>Projects</h1>

            <ul>
                {list.map(item => (
                    <li key={item.title}>
                        <div className='flex flex-row flex-1 my-4 justify-between items-start'>
                            <div className="row flex flex-1 flex-col">
                                <h2 className='text-black text-md'>{item.title}</h2>
                                <span className='text-xs text-gray-800'>Tech stack : {item.tech.join(', ')}</span>
                            </div>
                            {item.duration && (<p className='text-xs text-gray-600'>{item.duration}</p>)}
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-xs text-justify text-gray-600">
                            {item.description.map(points => (
                                <li key={points}>{points}</li>
                            ))}
                        </ul>
                    </li>
                ))}

            </ul>
        </section>
    )
}

export default Projects
