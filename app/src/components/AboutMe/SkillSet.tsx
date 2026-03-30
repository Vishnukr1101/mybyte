import { useSectionRefs } from "../SidePanel/useSectionRefs";

const skillLinks: Record<string, string> = {
    "React": "https://react.dev/",
    "TypeScript": "https://www.typescriptlang.org/",
    "Next.js": "https://nextjs.org/",
    "Vite": "https://vitejs.dev/",
    "Three.js": "https://threejs.org/",
    "JointJS": "https://www.jointjs.com/",
    "Redux": "https://redux.js.org/",
    "Recoil": "https://recoiljs.org/",
    "React Flow": "https://reactflow.dev/",
    "TailwindCSS": "https://tailwindcss.com/",
    "SASS": "https://sass-lang.com/",
    "CSS3": "https://developer.mozilla.org/en-US/docs/Web/CSS",
    "HTML5": "https://developer.mozilla.org/en-US/docs/Glossary/HTML5",
    "Node.js": "https://nodejs.org/",
    "Golang": "https://go.dev/",
    "Express.js": "https://expressjs.com/",
    "Python": "https://www.python.org/",
    "Flask API": "https://flask.palletsprojects.com/",
    "Firebase": "https://firebase.google.com/",
    "Socket.io": "https://socket.io/",
    "MongoDB": "https://www.mongodb.com/",
    "Redis": "https://redis.io/",
    "MySQL": "https://www.mysql.com/",
    "React Native": "https://reactnative.dev/",
    "OpenAI": "https://openai.com/",
    "Ollama": "https://ollama.com/",
    "Docker": "https://www.docker.com/",
    "Kubernetes": "https://kubernetes.io/",
    "Git": "https://git-scm.com/",
    "GitHub": "https://github.com/",
    "Google Cloud": "https://cloud.google.com/",
    "AWS": "https://aws.amazon.com/",
    "Azure": "https://azure.microsoft.com/"
};

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
                { "name": "JointJS", "icon": "https://cdn.prod.website-files.com/63061d4ee85b5a18644f221c/633045c1d726c7116dcbe582_JJS_logo.svg" },
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
                { "name": "Golang", "icon": "https://go.dev/images/go-logo-white.svg" },
                { "name": "Express.js", "icon": "/assets/icons/expressjs-dark.svg" },
                { "name": "Python", "icon": "/assets/icons/python.svg" },
                { "name": "Flask API", "icon": "https://flask.palletsprojects.com/en/stable/_images/flask-name.svg" },
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
                { "name": "OpenAI", "icon": "/assets/icons/openai.svg" },
                { "name": "Ollama", "icon": "https://ollama.com/public/ollama.png" }
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
    const { skillRef } = useSectionRefs();
    return (
        <section id="skills" ref={skillRef} className="section-fade-in">
            <h2 className="text-white text-xl lg:text-2xl font-bold my-8 gradient-text animate-fade-in">My Skills</h2>
            <div className="flex flex-col flex-1 gap-4">
                {skillStack.sections.map((item, index) => (
                    <div 
                        className="glass-panel p-5 rounded-2xl hover-lift stagger-item" 
                        key={item.name}
                        style={{ 
                            animation: `slideUp 0.6s ease-out forwards`,
                            animationDelay: `${index * 0.1}s`
                        }}
                    >
                        <h3 className="text-md lg:text-lg font-semibold text-white mb-4">{item.name}</h3>
                        <div className="flex flex-wrap gap-4 items-center">
                            {item.technologies.map((tech, techIndex) => (
                                <div 
                                    key={tech.name}
                                    className="group relative animate-fade-in"
                                    style={{ animationDelay: `${index * 0.1 + techIndex * 0.05}s` }}
                                >
                                    {skillLinks[tech.name] ? (
                                        <a href={skillLinks[tech.name]} target="_blank" rel="noreferrer" aria-label={`${tech.name} website`}>
                                            <img 
                                                src={tech.icon} 
                                                alt={tech.name} 
                                                className="w-10 h-10 object-contain transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-lg cursor-pointer" 
                                            />
                                        </a>
                                    ) : (
                                        <img 
                                            src={tech.icon} 
                                            alt={tech.name} 
                                            className="w-10 h-10 object-contain transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-lg cursor-pointer" 
                                        />
                                    )}
                                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-white/20 backdrop-blur-md text-xs text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        {tech.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default SkillSet