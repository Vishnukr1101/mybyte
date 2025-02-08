
const skillStack = {
    "sections": [
        {
            "name": "Frontend",
            "technologies": [
                { "name": "React", "icon": "/assets/icons/reactjs.svg" },
                { "name": "TypeScript", "icon": "/assets/icons/typescript.svg" },
                { "name": "Next.js", "icon": "/assets/icons/nextjs.svg" },
                { "name": "Vite", "icon": "/assets/icons/vitejs.svg" },
                { "name": "Three.js", "icon": "/assets/icons/threejs.svg" },
                { "name": "Redux", "icon": "/assets/icons/redux.svg" },
                { "name": "Recoil", "icon": "https://recoiljs.org/img/logo.svg" },
                { "name": "React Flow", "icon": "/assets/icons/react-flow.svg" },
                { "name": "TailwindCSS", "icon": "/assets/icons/tailwindcss.svg" },
                { "name": "SASS", "icon": "/assets/icons/sass.svg" },
                { "name": "CSS3", "icon": "/assets/icons/css3.svg" },
                { "name": "HTML5", "icon": "/assets/icons/html5.svg" }
            ]
        },
        {
            "name": "Backend",
            "technologies": [
                { "name": "Node.js", "icon": "/assets/icons/nodejs.svg" },
                { "name": "Express.js", "icon": "/assets/icons/expressjs-dark.svg" },
                { "name": "Python", "icon": "/assets/icons/python.svg" },
                { "name": "Flask API", "icon": "/assets/icons/flask-dark.svg" },
                { "name": "Firebase", "icon": "/assets/icons/firebase.svg" },
                { "name": "Socket.io", "icon": "https://socket.io/images/logo.svg" }
            ]
        },
        {
            "name": "Databases",
            "technologies": [
                { "name": "MongoDB", "icon": "/assets/icons/mongodb.svg" },
                { "name": "Redis", "icon": "/assets/icons/redis.svg" },
                { "name": "MySQL", "icon": "/assets/icons/mysql.svg" },
                { "name": "Firebase", "icon": "/assets/icons/firebase.svg" }
            ]
        },
        {
            "name": "Native Apps",
            "technologies": [
                { "name": "React Native", "icon": "/assets/icons/reactjs.svg" },
                { "name": "Firebase", "icon": "/assets/icons/firebase.svg" }
            ]
        },
        {
            "name": "AI Integration",
            "technologies": [
                { "name": "OpenAI", "icon": "/assets/icons/openai.svg" }
            ]
        },
        {
            "name": "DevOps & Tools",
            "technologies": [
                { "name": "Docker", "icon": "/assets/icons/docker.svg" },
                { "name": "Kubernetes", "icon": "/assets/icons/kubernetes.svg" },
                { "name": "Git", "icon": "/assets/icons/git.svg" },
                { "name": "GitHub", "icon": "/assets/icons/github-dark.svg" }
            ]
        },
        {
            "name": "Cloud",
            "technologies": [
                { "name": "Google Cloud", "icon": "/assets/icons/google-cloud.svg" },
                { "name": "AWS", "icon": "/assets/icons/aws.svg" },
                { "name": "Azure", "icon": "/assets/icons/azure.svg" }
            ]
        }
    ]
}


const SkillSet = () => {
    return (
        <section id="skills">
            <h2 className="text-black text-xl lg:text-2xl font-bold my-8">My Skills</h2>
            <div className="flex flex-row flex-1 flex-wrap gap-2">
                {skillStack.sections.map(item => (
                    <div className="bg-white p-6 rounded-lg shadow-lg min-w-full" key={item.name}>
                        <h3 className="text-md lg:text-xl font-semibold text-gray-700 mb-4">{item.name}</h3>
                        <div className="space-y-4 flex flex-wrap flex-row gap-6 items-center">
                            {item.technologies.map(tech => (
                                <img src={tech.icon} alt={tech.name} className="w-12" key={tech.name} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default SkillSet