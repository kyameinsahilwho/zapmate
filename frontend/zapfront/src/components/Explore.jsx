import { useState, useEffect } from "react";

export default function Explore() {
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          // Call your search function here
          exploreSearch();
        }, 1000);
    
        return () => clearTimeout(delayDebounceFn);
      }, [searchTerm]);
        const exploreSearch = async () => {
            const accessToken = JSON.parse(
            localStorage.getItem("zapmateAuthTokens")
            ).access;
            const data = await fetch(`http://localhost:8000/zapapp/explore/?search=${searchTerm}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            });
            const posts = await data.json();
            setPosts(posts);
        };
      const handleSearch = (event) => {
        setSearchTerm(event.target.value);
      };
  useEffect(() => {
    fetchPosts();
  }, []);
  const [posts, setPosts] = useState();
  const fetchPosts = async () => {
    const accessToken = JSON.parse(
      localStorage.getItem("zapmateAuthTokens")
    ).access;
    const data = await fetch("http://localhost:8000/zapapp/explore/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const posts = await data.json();
    setPosts(posts);
  };
  return (
    <main className="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
      {/* explore */}
      <div className="main__inner">
        {/* search box */}
        <div
          className="z-10 p-5 max-lg:!top-10 lg:rounded-bl-2xl lg:rounded-br-2xl shadow-md bg-slate-100/60 backdrop-blur-3xl dark:bg-slate-800/60"
          uk-sticky="cls-inactive: invisible h-0; start: 1; animation: uk-animation-slide-top"
        >
          <div className="relative">
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
              className="!bg-white/20 w-full !pl-10 !py-2 border !border-gray-300 dark:!border-slate-500"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div
          className="gallery -mt-16"
          uk-scrollspy="target: > div; cls: uk-animation-scale-up; delay: 100"
        >
          {posts && posts.map((post) => (
            <div className="gallery__card" key={post.id}>
              <a href="#preview_modal" uk-toggle>
                <div className="card__image">
                  <img src={post.image} alt="" />
                </div>
              </a>
            </div>
          ))}
          <div className="w-full h-60 bg-slate-200/60 rounded-lg dark:bg-dark2 animate-pulse" />
          <div className="w-full h-60 bg-slate-200/60 rounded-lg dark:bg-dark2 animate-pulse" />
          <div className="w-full h-60 bg-slate-200/60 rounded-lg dark:bg-dark2 animate-pulse" />
        </div>
      </div>
    </main>
  );
}
