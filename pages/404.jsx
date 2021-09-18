import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { NotFoundImage } from '../assets/AssetExport';

const NotFound = () => {

    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.replace('/').then(results => {console.log(results)});
        }, 5000);
    })

    return (
        <>
            <div className="bg-white dark:bg-gray-900 overflow-hidden">
                <div className="bg-white dark:bg-gray-900 grid grid-cols-6 gap-2 grid-rows-1 mb-5">
                    <div className="bg-white w-full dark:bg-gray-900 col-span-6 flex justify-center items-center mx-auto mt-4 px-4">
                        <Image src={NotFoundImage}
                            width={1100}
                            height={400}
                            alt="404 graphics"
                        />
                    </div>
                    <div
                        className="bg-white dark:bg-gray-900 col-span-6 flex flex-col justify-center items-center my-4">
                        <h1 className="text-blue-600 dark:text-blue-400 text-lg md:text-5xl lg:text-8xl py-2 font-normal italic">OOOPS!!!!</h1>
                        <div
                            className="bg-white dark:bg-gray-900 flex flex-col justify-between items-center"
                        >
                            <h3 className="text-gray-700 dark:text-gray-200 font-normal text-base md:text-lg lg:text-xl ">
                                The page you are looking for cannot be found.
                            </h3>
                            <div className="flex flex-row justify-center items-center my-4">
                                <p className="mx-4 text-gray-800 dark:text-gray-200">
                                    Dont worry there is a lot to see on our home page
                                </p>
                                <Link href="/">
                                    <a className="border border-solid border-gray-300 text-gray-800 rounded-lg px-4 hover:bg-gray-700 hover:text-gray-200 hover:border-opacity-0 dark:text-gray-200 dark:hover:text-gray-800 dark:hover:bg-gray-200">
                                        Home
                                    </a>
                                </Link>
                            </div>
                            <p className="text-gray-700 dark:text-gray-400 text-center text-lg mt-4">
                                This page will automatically redirect you to the home page in 5 seconds
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NotFound;