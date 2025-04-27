'use client'

import { useRouter } from "next/navigation";

const Navigation = () => {
    const router = useRouter();

    const handleClickHome = () => {
        router.push("/");
    }

    const handleClickProject = () => {
        router.push("/projects");
    }

    const handleClickServices = () => {
        router.push("/");
    }

    const handleClickAboutUs = () => {
        router.push("/");
    }
    return (
        <div className="hidden lg:flex flex-row items-center justify-between text-white mr-32">
            <div className="text-xl px-6  cursor-pointer hover:text-amber-300" onClick={handleClickHome}>
                Home
            </div>

            <div className="text-xl px-6 cursor-pointer hover:text-amber-300" onClick={handleClickProject}> 
                Project
            </div>

            <div className="text-xl px-6 cursor-pointer hover:text-amber-300" onClick={handleClickServices}>
                Services
            </div>

            <div className="text-xl px-6 cursor-pointer hover:text-amber-300"   onClick={handleClickAboutUs}>
                About us
            </div>
        </div>
    );
};

export default Navigation;