import React from 'react'

type Props = {}

const SkillSet = (props: Props) => {
    return (
        <section id="skills">
            <div className="bg-gray-50 p-8">
                <div className="mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">My Skills</h2>

                    <div className="flex flex-row flex-1 flex-wrap gap-2">

                        {/*  Frontend */}
                        <div className="bg-white p-6 rounded-lg shadow-lg min-w-60">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">Frontend</h3>
                            <div className="space-y-4 flex flex-wrap flex-row gap-6 items-center">
                                <img src="/assets/icons/reactjs.svg" alt="React" className="w-12" />
                                <img src="/assets/icons/typescript.svg" alt="TypeScript" className="w-12" />
                                <img src="/assets/icons/nextjs.svg" alt="Next.js" className="w-12" />
                                <img src="/assets/icons/vitejs.svg" alt="Vite" className="w-12" />
                                <img src="/assets/icons/threejs.svg" alt="TypeScript" className="w-12" />
                                <img src="/assets/icons/redux.svg" alt="Redux" className="w-12" />
                                <img src="https://recoiljs.org/img/logo.svg" alt="Recoil" className="w-12" />
                                <img src="/assets/icons/react-flow.svg" alt="React Flow" className="w-12" />
                                <img src="/assets/icons/tailwindcss.svg" alt="TailwindCSS" className="w-12" />
                                <img src="/assets/icons/sass.svg" alt="SASS" className="w-12" />
                                <img src="/assets/icons/css3.svg" alt="TypeScript" className="w-12" />
                                <img src="/assets/icons/html5.svg" alt="TypeScript" className="w-12" />
                            </div>
                        </div>


                        {/*  Backend */}
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">Backend</h3>
                            <div className="space-y-4">
                                <img src="/assets/icons/nodejs.svg" alt="Node.js" className="w-12" />
                                <img src="/assets/icons/expressjs-dark.svg" alt="Express.js" className="w-12" />
                                <img src="/assets/icons/python.svg" alt="Python" className="w-12" />
                                <img src="/assets/icons/flask-dark.svg" alt="Flask API" className="w-12" />
                                <img src="/assets/icons/firebase.svg" alt="Flask API" className="w-12" />
                                <img src="https://socket.io/images/logo.svg" alt="Socket.io" className="w-12" />
                            </div>
                        </div>

                        {/*  Databases */}
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">Databases</h3>
                            <div className="space-y-4">
                                <img src="/assets/icons/mongodb.svg" alt="MongoDB" className="w-12" />
                                <img src="/assets/icons/redis.svg" alt="Redis" className="w-12" />
                                <img src="/assets/icons/mysql.svg" alt="MySQL" className="w-12" />
                                <img src="/assets/icons/firebase.svg" alt="Firebase" className="w-12" />
                            </div>
                        </div>

                        {/*  Mobile Development */}
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">Native Apps</h3>
                            <div className="space-y-4">
                                <img src="/assets/icons/reactjs.svg" alt="React Native" className="w-12" />
                                <img src="/assets/icons/firebase.svg" alt="Firebase" className="w-12" />
                            </div>
                        </div>




                        {/*  AI Integration */}
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">AI Integration</h3>
                            <div className="space-y-4">
                                <img src="/assets/icons/openai.svg" alt="OpenAI" className="w-12" />
                            </div>
                        </div>


                        {/*  DevOps & Version Control Tools */}
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">DevOps & Tools</h3>
                            <div className="space-y-4">
                                <img src="/assets/icons/docker.svg" alt="Docker" className="w-12" />
                                <img src="/assets/icons/kubernetes.svg" alt="Kubernetes" className="w-12" />
                                <img src="/assets/icons/git.svg" alt="Git" className="w-12" />
                                <img src="/assets/icons/github-dark.svg" alt="GitHub" className="w-12" />
                            </div>
                        </div>

                        {/*  Cloud */}
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">Cloud</h3>
                            <div className="space-y-4">
                                <img src="/assets/icons/google-cloud.svg" alt="Google Cloud" className="w-12" />
                                <img src="/assets/icons/aws.svg" alt="AWS" className="w-12" />
                                <img src="/assets/icons/azure.svg" alt="Azure" className="w-12" />
                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </section>
    )
}

export default SkillSet