import { useState, useEffect } from 'react';

const names = ["Jørn Begersen", "Jørn Legensen", "Jørn Bogensen", "Jørn Skogesen", "Jørn Logensen", "Jørn Kogesen", "Jørn Dobesen", "Jørn Pogensen"];

export function Ansatt() {
    const [images, setImages] = useState(Array(names.length).fill(''));

    useEffect(() => {
        names.forEach((_, index) => {
            setTimeout(() => {
                setImages(prevImages => {
                    const newImages = [...prevImages];
                    newImages[index] = "https://thispersondoesnotexist.com/";
                    return newImages;
                });
            }, index * 1000);
        });
    }, []);

    return (
        <>
            <div className="flex justify-center gap-8 flex-wrap mb-9 mt-[5rem]">
                {names.map((name, index) => (
                    <div key={name} className="w-full bg-[#10141c] rounded-xl bg-opacity-80 border-[#1d3036] text-white h-72 max-w-72 p-8 flex flex-col justify-between">
                        <h1 className="text-left text-2xl mt-[-10px]">{name}</h1>
                        {images[index] && <img className="max-w-[10rem]" src={images[index]} />}
                    </div>
                ))}
            </div>
        </>
    );
}