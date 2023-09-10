import { useNavigate } from "react-router-dom";
import { useContext,useEffect,useState } from "react";
import AuthContext from "../context/Auth";
import { Link } from "react-router-dom";
import Loader from "./Loader";
export default function Sidebar() {
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);
    async function fetchData() {
        const accessToken = JSON.parse(localStorage.getItem("zapmateAuthTokens")).access;
        const response = await fetch(`http://localhost:8000/zapapp/profile/?fields=username,profile_picture`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        setProfileData(data[0]);
        console.log(profileData);
        setLoading(false);
    }
    useEffect(() => {
        fetchData();
    }, []);
    const {logoutUser} = useContext(AuthContext);
    
    const navigate=useNavigate();
    function handleprofile(){

        navigate('/profile');
    }
    function handlesettings(){
        navigate('/settings');
    }
    if (loading) {
        return (<div
            id="sidebar"
            className="fixed top-0 left-0 z-40 max-md:top-auto max-md:bottom-0"
        >
            <div
                id="sidebar__inner"
                className="flex sside md:flex-col justify-between md:h-screen md:p-2 p-1 transition-all duration-500 bg-white shadow dark:bg-dark2 2xl:w-72 xl:w-60 max-xl:w-[73px] max-md:w-screen max-md:border-t max-md:dark:border-slate-700"
            >
                <Loader/>
                </div>
                </div>)
    }

    return (
        
            <div
                id="sidebar"
                className="fixed top-0 left-0 z-40 max-md:top-auto max-md:bottom-0"
            >
                <div
                    id="sidebar__inner"
                    className="flex sside md:flex-col justify-between md:h-screen md:p-2 p-1 transition-all duration-500 bg-white shadow dark:bg-dark2 2xl:w-72 xl:w-60 max-xl:w-[73px] max-md:w-screen max-md:border-t max-md:dark:border-slate-700"
                >
                    {/* logo */}
                    <div className="flex h-20 px-2 max-md:fixed max-md:top-0 max-md:w-full max-md:bg-white/80 max-md:left-0 max-md:px-4 max-md:h-14 max-md:shadow-sm max-md:dark:bg-slate-900/80 backdrop-blur-xl">
                        <a href="home.html" id="logo" className="flex items-center gap-3">
                            {/* logo icon */}
                            <img
                                id="logo__icon"
                                src="assets/images/logo-icon.png"
                                alt=""
                                className="md:w-8 hidden text-2xl max-xl:!block max-md:!hidden shrink-0 uk-animation-scale-up"
                            />
                            {/* text logo */}
                            <img
                                id="logo__text"
                                src="assets/images/logo.svg"
                                alt=""
                                className="w-full h-6 ml-1 max-xl:hidden max-md:block dark:!hidden"
                            />
                            <img
                                id="logo__text"
                                src="assets/images/logo-dark.svg"
                                alt=""
                                className="w-full h-6 ml-1 !hidden max-xl:!hidden max-md:block dark:max-md:!block dark:!block"
                            />
                        </a>
                    </div>
                    {/* nav */}
                    <nav className="flex-1 max-md:flex max-md:justify-around md:space-y-2">
                        {/* Home */}
                        <a href="home.html">
                            <svg
                                id="icon__outline"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                />
                            </svg>
                            <svg
                                id="icon__solid"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="hidden"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="max-xl:hidden"> Home </span>
                        </a>
                        {/* Search */}
                        <a href="#!">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                />
                            </svg>
                            <span className="max-xl:hidden"> Search </span>
                        </a>
                        <div
                            className="sm:w-[397px] w-full bg-white shadow-lg md:!left-[73px] hidden !left-0 dark:bg-dark2 dark:border1 max-md:bottom-[57px]"
                            uk-drop="pos: left-center;animate-out: true; animation: uk-animation-slide-left-medium; mode:click; offset: 9"
                        >
                            <div className="md:h-screen overflow-y-auto h-[calc(100vh-120px)]">
                                {/* header */}
                                <div className="px-5 py-4 space-y-5 border-b border-gray-100 dark:border-slate-700">
                                    <h3 className="md:text-xl text-lg font-medium mt-3 text-black dark:text-white">
                                        Search
                                    </h3>
                                    <div className="relative -mx-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="w-5 h-5 absolute left-3 bottom-1/2 translate-y-1/2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                            />
                                        </svg>
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="bg-transparen w-full !pl-10 !py-2 !rounded-lg"
                                        />
                                    </div>
                                </div>
                                {/* contents list */}
                                <div className="p-2 space-y-2 dark:text-white">
                                    <div className="flex items-center justify-between py-2.5 px-3 font-semibold">
                                        <h4>Recent</h4>
                                        <button type="button" className="text-blue-500 text-sm">
                                            Clear all
                                        </button>
                                    </div>
                                    <a
                                        href="profile.html"
                                        className="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-secondery"
                                    >
                                        <img
                                            src="assets/images/avatars/avatar-2.jpg"
                                            alt=""
                                            className="bg-gray-200 rounded-full w-10 h-10"
                                        />
                                        <div className="fldex-1 min-w-0">
                                            <h4 className="font-medium text-sm text-black dark:text-white">
                                                {" "}
                                                Johnson smith{" "}
                                            </h4>
                                            <div className="text-xs text-gray-500 font-normal mt-0.5 dark:text-white-80">
                                                {" "}
                                                Suggested For You{" "}
                                            </div>
                                        </div>
                                    </a>
                                    <a
                                        href="profile.html"
                                        className="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-secondery"
                                    >
                                        <img
                                            src="assets/images/avatars/avatar-5.jpg"
                                            alt=""
                                            className="bg-gray-200 rounded-full w-10 h-10"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-sm text-black dark:text-white">
                                                {" "}
                                                James Lewis{" "}
                                            </h4>
                                            <div className="text-xs text-gray-500 font-normal mt-0.5 dark:text-white-80">
                                                {" "}
                                                Followed By Johnson{" "}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"
                                        >
                                            {" "}
                                            Follow{" "}
                                        </button>
                                    </a>
                                    <a
                                        href="profile.html"
                                        className="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-secondery"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="border border-gray-200 p-2.5 rounded-full w-9 h-9 fill-black"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                                            />
                                        </svg>
                                        <div className="fldex-1 min-w-0">
                                            <h4 className="font-medium text-sm text-black dark:text-white">
                                                {" "}
                                                artificial intelligence
                                            </h4>
                                            <div className="text-xs text-gray-500 font-normal mt-0.5 dark:text-white-80">
                                                {" "}
                                                13,352K post{" "}
                                            </div>
                                        </div>
                                    </a>
                                    <a
                                        href="profile.html"
                                        className="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-secondery"
                                    >
                                        <img
                                            src="assets/images/avatars/avatar-3.jpg"
                                            alt=""
                                            className="bg-gray-200 rounded-full w-10 h-10"
                                        />
                                        <div className="fldex-1 min-w-0">
                                            <h4 className="font-medium text-sm text-black dark:text-white">
                                                {" "}
                                                Monroe Parker{" "}
                                            </h4>
                                            <div className="text-xs text-gray-500 font-normal mt-0.5 dark:text-white-80">
                                                {" "}
                                                Parker . following{" "}
                                            </div>
                                        </div>
                                    </a>
                                    <a
                                        href="profile.html"
                                        className="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-secondery"
                                    >
                                        <img
                                            src="assets/images/avatars/avatar-7.jpg"
                                            alt=""
                                            className="bg-gray-200 rounded-full w-10 h-10"
                                        />
                                        <div className="fldex-1 min-w-0">
                                            <h4 className="font-medium text-sm text-black dark:text-white">
                                                {" "}
                                                Johnson smith{" "}
                                            </h4>
                                            <div className="text-xs text-gray-500 font-normal mt-0.5 dark:text-white-80">
                                                {" "}
                                                Suggested For You{" "}
                                            </div>
                                        </div>
                                    </a>
                                    <a
                                        href="profile.html"
                                        className="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-secondery"
                                    >
                                        <img
                                            src="assets/images/avatars/avatar-4.jpg"
                                            alt=""
                                            className="bg-gray-200 rounded-full w-10 h-10"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-sm text-black dark:text-white">
                                                {" "}
                                                James Lewis{" "}
                                            </h4>
                                            <div className="text-xs text-gray-500 font-normal mt-0.5 dark:text-white-80">
                                                {" "}
                                                Followed By Johnson{" "}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"
                                        >
                                            {" "}
                                            Follow{" "}
                                        </button>
                                    </a>
                                    <a
                                        href="profile.html"
                                        className="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-secondery"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="border border-gray-200 p-2.5 rounded-full w-9 h-9 fill-black"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                                            />
                                        </svg>
                                        <div className="fldex-1 min-w-0">
                                            <h4 className="font-medium text-sm text-black dark:text-white">
                                                {" "}
                                                Ui Designers{" "}
                                            </h4>
                                            <div className="text-xs text-gray-500 font-normal mt-0.5 dark:text-white-80">
                                                {" "}
                                                9,362K post{" "}
                                            </div>
                                        </div>
                                    </a>
                                    <a
                                        href="profile.html"
                                        className="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-secondery"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="border border-gray-200 p-2.5 rounded-full w-9 h-9 fill-black"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                                            />
                                        </svg>
                                        <div className="fldex-1 min-w-0">
                                            <h4 className="font-medium text-sm text-black dark:text-white">
                                                {" "}
                                                Affiliate marketing
                                            </h4>
                                            <div className="text-xs text-gray-500 font-normal mt-0.5 dark:text-white-80">
                                                {" "}
                                                4,248K post{" "}
                                            </div>
                                        </div>
                                    </a>
                                    <a
                                        href="profile.html"
                                        className="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-secondery"
                                    >
                                        <img
                                            src="assets/images/avatars/avatar-2.jpg"
                                            alt=""
                                            className="bg-gray-200 rounded-full w-10 h-10"
                                        />
                                        <div className="fldex-1 min-w-0">
                                            <h4 className="font-medium text-sm text-black dark:text-white">
                                                {" "}
                                                Johnson smith{" "}
                                            </h4>
                                            <div className="text-xs text-gray-500 font-normal mt-0.5 dark:text-white-80">
                                                {" "}
                                                Suggested For You{" "}
                                            </div>
                                        </div>
                                    </a>
                                    <a
                                        href="profile.html"
                                        className="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-secondery"
                                    >
                                        <img
                                            src="assets/images/avatars/avatar-5.jpg"
                                            alt=""
                                            className="bg-gray-200 rounded-full w-10 h-10"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-sm text-black dark:text-white">
                                                {" "}
                                                James Lewis{" "}
                                            </h4>
                                            <div className="text-xs text-gray-500 font-normal mt-0.5 dark:text-white-80">
                                                {" "}
                                                Followed By Johnson{" "}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"
                                        >
                                            {" "}
                                            Follow{" "}
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* Explore */}
                        <a href="explore.html" className="max-md:!hidden">
                            <svg
                                id="icon__outline"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="bi bi-compass"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                                <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
                            </svg>
                            <svg
                                id="icon__solid"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="hidden"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M13.5 4.938a7 7 0 11-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 01.572-2.759 6.026 6.026 0 012.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0013.5 4.938zM14 12a4 4 0 01-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 001.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 011.315-4.192.447.447 0 01.431-.16A4.001 4.001 0 0114 12z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="max-xl:hidden"> Explore </span>
                        </a>
                        {/* Notification */}
                        <a
                            href="#!"
                            className="max-md:!fixed max-md:top-2 max-md:right-14 relative"
                        >
                            <svg
                                id="icon__outline"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                />
                            </svg>
                            <svg
                                id="icon__solid"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="hidden"
                            >
                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                            </svg>
                            <span className="max-xl:hidden"> Notifications </span>
                            <div className="w-2 h-2 bg-red-600 rounded-full absolute left-7 top-2.5" />
                        </a>
                        <div
                            className="sm:w-[397px] w-full bg-white shadow-lg md:!left-[73px] hidden !left-0 dark:bg-dark2 dark:border1 max-md:bottom-[57px]"
                            uk-drop="pos: left-center;animate-out: true; animation: uk-animation-slide-left-medium ; mode:click"
                        >
                            <div className="md:h-screen overflow-y-auto h-[calc(100vh-120px)]">
                                {/* header */}
                                <div className="flex items-center justify-between px-5 py-4 mt-3">
                                    <h3 className="md:text-xl text-lg font-medium mt-3 text-black dark:text-white">
                                        Notification
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                {/* contents list */}
                                <div className="px-2 -mt-2 text-sm font-normal">
                                    <div className="px-5 py-3 -mx-2">
                                        <h4 className="font-semibold">New</h4>
                                    </div>
                                    <a
                                        href="#"
                                        className="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-secondery"
                                    >
                                        <div className="relative w-12 h-12 shrink-0">
                                            {" "}
                                            <img
                                                src="assets/images/avatars/avatar-2.jpg"
                                                alt=""
                                                className="object-cover w-full h-full rounded-full"
                                            />
                                        </div>
                                        <div className="flex-1 ">
                                            <p>
                                                {" "}
                                                <b className="font-bold mr-1"> John Michael</b> who you
                                                might know, is on Instello.
                                            </p>
                                            <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">
                                                {" "}
                                                2 hours ago{" "}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="button text-white bg-primary"
                                        >
                                            fallow
                                        </button>
                                    </a>
                                    <a
                                        href="#"
                                        className="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery bg-teal-500/5"
                                    >
                                        <div className="relative w-12 h-12 shrink-0">
                                            {" "}
                                            <img
                                                src="assets/images/avatars/avatar-3.jpg"
                                                alt=""
                                                className="object-cover w-full h-full rounded-full"
                                            />
                                        </div>
                                        <div className="flex-1 ">
                                            <p>
                                                {" "}
                                                <b className="font-bold mr-1"> Alexa Gray</b> started
                                                following you. Welcome him to your profile. 👋{" "}
                                            </p>
                                            <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">
                                                {" "}
                                                4 hours ago{" "}
                                            </div>
                                            <div className="w-2.5 h-2.5 bg-teal-600 rounded-full absolute right-3 top-5" />
                                        </div>
                                    </a>
                                    <a
                                        href="#"
                                        className="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery"
                                    >
                                        <div className="relative w-12 h-12 shrink-0">
                                            {" "}
                                            <img
                                                src="assets/images/avatars/avatar-7.jpg"
                                                alt=""
                                                className="object-cover w-full h-full rounded-full"
                                            />
                                        </div>
                                        <div className="flex-1 ">
                                            <p>
                                                {" "}
                                                <b className="font-bold mr-1">Jesse Steeve</b> mentioned
                                                you in a story. Check it out and reply. 📣{" "}
                                            </p>
                                            <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">
                                                {" "}
                                                8 hours ago{" "}
                                            </div>
                                        </div>
                                    </a>
                                    <div className="border-t px-5 py-3 -mx-2 mt-4 dark:border-slate-700/40">
                                        <h4 className="font-semibold">This Week</h4>
                                    </div>
                                    <a
                                        href="#"
                                        className="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-secondery"
                                    >
                                        <div className="relative w-12 h-12 shrink-0">
                                            {" "}
                                            <img
                                                src="assets/images/avatars/avatar-4.jpg"
                                                alt=""
                                                className="object-cover w-full h-full rounded-full"
                                            />
                                        </div>
                                        <div className="flex-1 ">
                                            <p>
                                                {" "}
                                                <b className="font-bold mr-1"> Jesse Steeve</b> sarah
                                                tagged you <br /> in a photo of your birthday party. 📸{" "}
                                            </p>
                                            <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">
                                                {" "}
                                                8 hours ago{" "}
                                            </div>
                                        </div>
                                    </a>
                                    <a
                                        href="#"
                                        className="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery bg-teal-500/5"
                                    >
                                        <div className="relative w-12 h-12 shrink-0">
                                            {" "}
                                            <img
                                                src="assets/images/avatars/avatar-3.jpg"
                                                alt=""
                                                className="object-cover w-full h-full rounded-full"
                                            />
                                        </div>
                                        <div className="flex-1 ">
                                            <p>
                                                {" "}
                                                <b className="font-bold mr-1"> Sarah Gray</b> sent you a
                                                message. He wants to chat with you. 💖{" "}
                                            </p>
                                            <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">
                                                {" "}
                                                4 hours ago{" "}
                                            </div>
                                            <div className="w-2.5 h-2.5 bg-teal-600 rounded-full absolute right-3 top-5" />
                                        </div>
                                    </a>
                                    <a
                                        href="#"
                                        className="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-secondery"
                                    >
                                        <div className="relative w-12 h-12 shrink-0">
                                            {" "}
                                            <img
                                                src="assets/images/avatars/avatar-4.jpg"
                                                alt=""
                                                className="object-cover w-full h-full rounded-full"
                                            />
                                        </div>
                                        <div className="flex-1 ">
                                            <p>
                                                {" "}
                                                <b className="font-bold mr-1"> James Lewis</b> Start
                                                following you on instello{" "}
                                            </p>
                                            <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">
                                                {" "}
                                                8 hours ago{" "}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="button bg-primary-soft text-primary"
                                        >
                                            fallowing
                                        </button>
                                    </a>
                                    <a
                                        href="#"
                                        className="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery"
                                    >
                                        <div className="relative w-12 h-12 shrink-0">
                                            {" "}
                                            <img
                                                src="assets/images/avatars/avatar-6.jpg"
                                                alt=""
                                                className="object-cover w-full h-full rounded-full"
                                            />
                                        </div>
                                        <div className="flex-1 ">
                                            <p>
                                                {" "}
                                                <b className="font-bold mr-1"> Alexa stella</b>{" "}
                                                commented on your photo “Wow, stunning shot!” 💬{" "}
                                            </p>
                                            <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">
                                                {" "}
                                                8 hours ago{" "}
                                            </div>
                                        </div>
                                    </a>
                                    <a
                                        href="#"
                                        className="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery"
                                    >
                                        <div className="relative w-12 h-12 shrink-0">
                                            {" "}
                                            <img
                                                src="assets/images/avatars/avatar-2.jpg"
                                                alt=""
                                                className="object-cover w-full h-full rounded-full"
                                            />
                                        </div>
                                        <div className="flex-1 ">
                                            <p>
                                                {" "}
                                                <b className="font-bold mr-1"> John Michael</b>{" "}
                                                mentioned you in a story. Check it out and reply. 📣{" "}
                                            </p>
                                            <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">
                                                {" "}
                                                8 hours ago{" "}
                                            </div>
                                        </div>
                                    </a>
                                    <a
                                        href="#"
                                        className="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-secondery"
                                    >
                                        <div className="relative w-12 h-12 shrink-0">
                                            {" "}
                                            <img
                                                src="assets/images/avatars/avatar-5.jpg"
                                                alt=""
                                                className="object-cover w-full h-full rounded-full"
                                            />
                                        </div>
                                        <div className="flex-1 ">
                                            <p>
                                                {" "}
                                                <b className="font-bold mr-1"> Jesse Steeve</b> who you
                                                might know, is on Instello.{" "}
                                            </p>
                                            <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">
                                                {" "}
                                                8 hours ago{" "}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="button text-white bg-primary"
                                        >
                                            fallow
                                        </button>
                                    </a>
                                    <a
                                        href="#"
                                        className="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery"
                                    >
                                        <div className="relative w-12 h-12 shrink-0">
                                            {" "}
                                            <img
                                                src="assets/images/avatars/avatar-7.jpg"
                                                alt=""
                                                className="object-cover w-full h-full rounded-full"
                                            />
                                        </div>
                                        <div className="flex-1 ">
                                            <p>
                                                {" "}
                                                <b className="font-bold mr-1"> Martin Gray</b> liked
                                                your photo of the Eiffel Tower. 😍{" "}
                                            </p>
                                            <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">
                                                {" "}
                                                8 hours ago{" "}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* create a post */}
                        <a href="!#">
                            <button
                                uk-toggle="target: #create-post"
                                className="flex items-center gap-3 w-full"
                            >
                                <svg
                                    id="icon__outline"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <svg
                                    id="icon__solid"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="hidden"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="max-xl:hidden"> Create </span>
                            </button>
                        </a>
                        <a onClick={handleprofile} className="max-md:!hidden active">
                            <svg
                                id="icon__outline"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            <svg
                                id="icon__solid"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="hidden"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="max-xl:hidden"> Profile </span>
                        </a>
                    </nav>
                    {/* profile */}
                    <div>
                        <a id="profile-link" onClick={handleprofile} className="flex items-center gap-3 p-3 group">
                            <img
                                src={profileData.profile_picture}
                                alt=""
                                className="rounded-full md:w-7 md:h-7 w-5 h-5 shrink-0"
                            />
                            <span className="font-semibold text-sm max-xl:hidden capitalize">
                                {profileData.first_name} {profileData.last_name}
                            </span>
                            <ion-icon
                                name="chevron-forward-outline"
                                className="text-xl ml-auto duration-200 group-aria-expanded:-rotate-90 max-xl:hidden"
                            />
                        </a>
                        <div
                            className="bg-white sm:w-64 2xl:w-[calc(100%-16px)] w-full shadow-lg border rounded-xl overflow-hidden max-md:!top-auto max-md:bottom-16 border2 dark:bg-dark2 hidden"
                            uk-drop="animation:uk-animation-slide-bottom-medium ;animate-out: true"
                        >
                            <div className="w-full h-1.5 bg-gradient-to-r to-emerald-500 via-sky-500 from-indigo-500" />
                            <div className="p-4 text-xs font-medium">
                                
                                <a onClick={handleprofile}>
                                    <img
                                        src={profileData.profile_picture}
                                        className="w-8 h-8 rounded-full"
                                        alt=""
                                    />
                                    <div className="mt-2 space-y-0.5">
                                        <div className="text-base font-semibold capitalize">
                                            {profileData.first_name} {profileData.last_name}
                                        </div>
                                        <div className="text-gray-400 dark:text-white/80  font-semibold">
                                            @{profileData.username}
                                        </div>
                                    </div>
                                </a>
                                
                                <div className="mt-3 flex gap-3.5">
                                    <div>
                                        {" "}
                                        <a href="profile.html">
                                            {" "}
                                            <strong> 38k </strong>{" "}
                                            <span className="text-gray-400 dark:text-white/80 ml-1">
                                                Followers{" "}
                                            </span>{" "}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <hr className="opacity-60" />
                            <ul className="text-sm font-semibold p-2">
                                <li>
                                    {" "}
                                    <a
                                        onClick={handlesettings}
                                        className="flex gap-3 rounded-md p-2 hover:bg-secondery"
                                    >
                                        {" "}
                                        <ion-icon
                                            name="settings-outline"
                                            className="text-lg"
                                        />{" "}
                                        Acount Setting
                                    </a>
                                </li>
                                <li>
                                    {" "}
                                    <a
                                        onClick={logoutUser}
                                        className="flex gap-3 rounded-md p-2 hover:bg-rose-500 hover:text-white"

                                    >
                                        {" "}
                                        <ion-icon name="log-out-outline" className="text-lg" /> Log
                                        Out
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        
    );
    }
