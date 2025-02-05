import React from 'react'

type Props = {}

const SkillSet = (props: Props) => {
    return (
        <section id="skills">
            <div className="bg-gray-50 p-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">My Skills</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2">

                        {/*  Frontend */}
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">Frontend</h3>
                            <div className="space-y-4">
                                <img src="path/to/react-logo.svg" alt="React" className="w-12 mx-auto" />
                                <img src="path/to/redux-logo.svg" alt="Redux" className="w-12 mx-auto" />
                                <img src="path/to/recoil-logo.svg" alt="Recoil" className="w-12 mx-auto" />
                                <img src="path/to/vite-logo.svg" alt="Vite" className="w-12 mx-auto" />
                                <img src="path/to/nextjs-logo.svg" alt="Next.js" className="w-12 mx-auto" />
                                <img src="path/to/tailwindcss-logo.svg" alt="TailwindCSS" className="w-12 mx-auto" />
                                <img src="path/to/scss-logo.svg" alt="SCSS" className="w-12 mx-auto" />
                                <img src="path/to/typescript-logo.svg" alt="TypeScript" className="w-12 mx-auto" />
                            </div>
                        </div>


                        {/*  Backend */}
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">Backend</h3>
                            <div className="space-y-4">
                                <img src="path/to/nodejs-logo.svg" alt="Node.js" className="w-12 mx-auto" />
                                <img src="path/to/express-logo.svg" alt="Express.js" className="w-12 mx-auto" />
                                <img src="path/to/websocket-logo.svg" alt="WebSocket" className="w-12 mx-auto" />
                                <img src="path/to/python-logo.svg" alt="Python" className="w-12 mx-auto" />
                                <img src="path/to/flask-logo.svg" alt="Flask API" className="w-12 mx-auto" />
                            </div>
                        </div>

                        {/*  Mobile Development */}
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">Mobile Development</h3>
                            <div className="space-y-4">
                                <img src="path/to/react-native-logo.svg" alt="React Native" className="w-12 mx-auto" />
                                <img src="path/to/firebase-logo.svg" alt="Firebase" className="w-12 mx-auto" />
                                <img src="path/to/stripe-logo.svg" alt="Stripe SDK" className="w-12 mx-auto" />
                            </div>
                        </div>

                        {/*  AI Integration */}
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">AI Integration</h3>
                            <div className="space-y-4">
                                <img src="path/to/openai-logo.svg" alt="OpenAI" className="w-12 mx-auto" />
                                <img src="path/to/chatbot-logo.svg" alt="Chatbots" className="w-12 mx-auto" />
                                <img src="path/to/rag-logo.svg" alt="RAG" className="w-12 mx-auto" />
                                <img src="path/to/azure-logo.svg" alt="Azure" className="w-12 mx-auto" />
                                <img src="path/to/google-cloud-logo.svg" alt="Google Cloud" className="w-12 mx-auto" />
                                <img src="path/to/tts-logo.svg" alt="TTS" className="w-12 mx-auto" />
                            </div>
                        </div>

                        {/*  Databases */}
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">Databases</h3>
                            <div className="space-y-4">
                                <img src="path/to/mongodb-logo.svg" alt="MongoDB" className="w-12 mx-auto" />
                                <img src="path/to/nosql-logo.svg" alt="NoSQL" className="w-12 mx-auto" />
                                <img src="path/to/sql-logo.svg" alt="SQL" className="w-12 mx-auto" />
                            </div>
                        </div>

                        {/*  DevOps & Tools */}
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">DevOps & Tools</h3>
                            <div className="space-y-4">
                                <img src="path/to/docker-logo.svg" alt="Docker" className="w-12 mx-auto" />
                                <img src="path/to/cicd-logo.svg" alt="CI/CD" className="w-12 mx-auto" />
                                <img src="path/to/azure-cr-logo.svg" alt="Azure Container Registry" className="w-12 mx-auto" />
                            </div>
                        </div>

                        {/*  Cloud */}
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">Cloud</h3>
                            <div className="space-y-4">
                                <img src="path/to/gcp-logo.svg" alt="GCP" className="w-12 mx-auto" />
                                <img src="path/to/aws-logo.svg" alt="AWS" className="w-12 mx-auto" />
                                <img src="path/to/azure-logo.svg" alt="Azure" className="w-12 mx-auto" />
                            </div>
                        </div>

                        {/*  Version Control */}
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">Version Control</h3>
                            <div className="space-y-4">
                                <img src="path/to/git-logo.svg" alt="Git" className="w-12 mx-auto" />
                                <img src="path/to/git-logo.svg" alt="GitHub" className="w-12 mx-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default SkillSet