import { SocialIcon } from 'react-social-icons'
export function BigButton() {
    return (
        <>
        <div className="flex justify-center gap-8 px-50 flex-wrap mb-9">
            <div className="w-full bg-[#10141c] rounded-xl bg-opacity-80 border-[#1d3036] text-white h-72 max-w-72 p-8 flex flex-col justify-between">
                <SocialIcon url='https://twitter.com'></SocialIcon>
                <h1 className="text-left text-2xl mt-[-10px]">Managed Detection and Response</h1>
                <h1 className="text-center text-sm">Responsive design lorem ipsum dolor sit amet</h1>
                <h1 className='hover:text-[#2596be] transition-colors duration-200 cursor-pointer text-right'>Learn More--</h1>
            </div>
            <div className="w-full bg-[#10141c] rounded-xl bg-opacity-80 border-[#1d3036] text-white h-72 max-w-72 p-8 flex flex-col justify-between">
                <SocialIcon url='https://twitter.com'></SocialIcon>
                <h1 className="text-left text-2xl mt-[-10px]">Virtual CISO</h1>
                <h1 className="text-center text-sm">Responsive design lorem ipsum dolor sit amet</h1>
                <h1 className='hover:text-[#2596be] transition-colors duration-200 cursor-pointer text-right'>Learn More--</h1>
            </div>
            <div className="w-full bg-[#10141c] rounded-xl bg-opacity-80 border-[#1d3036] text-white h-72 max-w-72 p-8 flex flex-col justify-between">
                <SocialIcon url='https://twitter.com'></SocialIcon>
                <h1 className="text-left text-2xl mt-[-10px]">Penetration Testing</h1>
                <h1 className="text-center text-sm">Responsive design lorem ipsum dolor sit amet</h1>
                <h1 className='hover:text-[#2596be] transition-colors duration-200 cursor-pointer text-right'>Learn More--</h1>
            </div>
            <div className="w-full bg-[#10141c] rounded-xl bg-opacity-80 border-[#1d3036] text-white h-72 max-w-72 p-8 flex flex-col justify-between">
                <SocialIcon url='https://twitter.com'></SocialIcon>
                <h1 className="text-left text-2xl mt-[-10px]">Cyber Security</h1>
                <h1 className="text-center text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit repudiandae, maiores libero alias ut hic aliquam assumenda velit,</h1>
                <h1 className='hover:text-[#2596be] transition-colors duration-200 cursor-pointer text-right'>Learn More--</h1>
            </div>
        </div>
        </>
    )
}