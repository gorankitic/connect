const Onboarding = () => {
    return (
        <main className="flex flex-col w-full h-screen items-center justify-center">
            <section className="flex flex-col flex-1 justify-center text-center" >
                <h1 className="text-4xl font-semibold mb-5">
                    # Welcome to Connexio
                    <span role="img" aria-label="wave"> 👋🏻</span>
                </h1>
                <p className="mt-2 text-gray-500">
                    Create your server using the + icon in the top-left corner, or join via an invite link.
                    <br />
                    Access your settings in the bottom-left corner.
                </p>
            </section>
            <footer className="py-5 text-sm text-gray-500 text-center">
                <p>
                    &copy; {new Date().getFullYear()} Goran Kitic
                </p>
                <p>
                    Built with <span role="img" aria-label="heart">❤️ </span>
                    using Node.js, Express, MongoDB, Mongoose, React, TypeScript, React Router, Tanstack Query, TailwindCSS.
                    <span role="img" aria-label="rocket"> 🚀</span>
                </p>
            </footer>
        </main>
    );
};

export default Onboarding;
