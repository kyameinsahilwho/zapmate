import React from "react";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Loader from "./Loader";
import ProfileCapsuleView from "./ProfileCapsuleView";
export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [capsuleData, setCapsuleData] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  async function fetchData() {
    const accessToken = JSON.parse(
      localStorage.getItem("zapmateAuthTokens")
    ).access;
    const response = await fetch(`http://localhost:8000/zapapp/profile/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    setProfileData(data[0]);

    setLoading(false);
  }
  async function fetchCapsuleData() {
    const accessToken = JSON.parse(
      localStorage.getItem("zapmateAuthTokens")
    ).access;
    const response = await fetch(`http://localhost:8000/zapapp/timecapsule/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const capsuleData = await response.json();
    setCapsuleData(capsuleData);
  }
  useEffect(() => {
    fetchData();
    fetchCapsuleData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }
  const handlePostView = (postId) => {
    console.log(`Post ${postId} clicked`);

    setSelectedPost(postId);
  };
  const handleClosePostView = () => {
    setSelectedPost(null);
  };
  return (
    <>
      <main className="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
        <div className="main__inner">
          <div className="py-6 relative">
            <div className="flex md:gap-16 gap-4 max-md:flex-col">
              <div className="relative md:p-1 rounded-full h-full max-md:w-16 bg-gradient-to-tr from-blue-300 to-blue-600 shadow-md hover:scale-110 duration-500 uk-animation-scale-up">
                <div className="relative md:w-40 md:h-40 h-16 w-16 rounded-full overflow-hidden md:border-[6px] border-gray-100 shrink-0 dark:border-slate-900">
                  <img
                    src={profileData.profile_picture}
                    alt=""
                    className="w-full h-full absolute object-cover"
                  />
                </div>
              </div>
              <div className="max-w-2x flex-1">
                <h3 className="md:text-xl text-base font-semibold text-black dark:text-white capitalize">
                  {profileData.first_name} {profileData.last_name}
                </h3>
                <p className="sm:text-sm font-semibold text-blue-600 mt-1 font-sp text-xs tacking-wide">
                  @{profileData.username}
                </p>
                <p className="text-lg mt-2 md:font-normal font-light">
                  {profileData.bio}
                </p>
                <p
                  className="mt-2 space-x-2 text-gray-500 text-sm hidden"
                  style={{ marginTop: "11px" }}
                >
                  <a href="#" className="inline-block">
                    Travel
                  </a>{" "}
                  .{" "}
                  <a href="#" className="inline-block">
                    Business
                  </a>{" "}
                  .{" "}
                  <a href="#" className="inline-block">
                    Technolgy
                  </a>
                </p>
                <div className="flex md:items-end justify-between md:mt-8 mt-4 max-md:flex-col gap-4">
                  <div className="flex sm:gap-10 gap-6 sm:text-sm text-xs max-sm:absolute max-sm:top-10 max-sm:left-36">
                    <div>
                      <p className="font-medium">Capsules</p>
                      <h3 className="sm:text-xl sm:font-bold mt-1 text-black dark:text-white text-base font-normal">
                        {profileData.total_capsules}
                      </h3>
                    </div>
                    <div>
                      <p className="font-medium">Followers</p>
                      <h3 className="sm:text-xl sm:font-bold mt-1 text-black dark:text-white text-base font-normal">
                        8,542
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <button
                      type="submit"
                      className="button text-gray-600 bg-slate-200 hidden"
                    >
                      Follow
                    </button>
                    <button
                      type="button"
                      className="button bg-blue-100 text-blue-600 border border-blue-200"
                    >
                      Unfallow
                    </button>
                    <button
                      type="submit"
                      className="button bg-blue-600 text-white"
                    >
                      Message
                    </button>
                    <div>
                      <button
                        type="submit"
                        className="rounded-lg bg-slate-200/60 flex px-2 py-1.5 dark:bg-dark2"
                      >
                        {" "}
                        <ion-icon
                          className="text-xl"
                          name="ellipsis-horizontal"
                        />
                      </button>
                      <div
                        className="w-[240px]"
                        uk-dropdown="pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click;offset:10"
                      >
                        <nav>
                          <a href="#">
                            {" "}
                            <ion-icon
                              className="text-xl"
                              name="pricetags-outline"
                            />{" "}
                            Unfollow{" "}
                          </a>
                          <a href="#">
                            {" "}
                            <ion-icon
                              className="text-xl"
                              name="time-outline"
                            />{" "}
                            Mute story{" "}
                          </a>
                          <a href="#">
                            {" "}
                            <ion-icon
                              className="text-xl"
                              name="flag-outline"
                            />{" "}
                            Report{" "}
                          </a>
                          <a href="#">
                            {" "}
                            <ion-icon
                              className="text-xl"
                              name="share-outline"
                            />{" "}
                            Share profile{" "}
                          </a>
                          <hr />
                          <a
                            href="#"
                            className="text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50"
                          >
                            {" "}
                            <ion-icon
                              className="text-xl"
                              name="stop-circle-outline"
                            />{" "}
                            Block{" "}
                          </a>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            {/* post heading */}
            <div className="flex items-center justify-between py-3">
              <h1 className="text-xl font-bold text-black dark:text-white">
                Time Capsules
              </h1>
            </div>
            {/* Post list */}
            <div
              className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 mt-6"
              uk-scrollspy="target: > div; cls: uk-animation-scale-up; delay: 100"
            >
              {capsuleData.map((item) => (
                <a onClick={() => handlePostView(item.id)} key={item.id}>

                  <div className="lg:hover:scale-105 hover:shadow-lg hover:z-10 duration-500 delay-100">
                    <div className="relative overflow-hidden rounded-lg uk-transition-toggle">
                      <div className="relative w-full lg:h-60 h-full aspect-[3/3]">
                        <img
                          src={item.image}
                          alt=""
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm uk-transition-fade">
                        <div className="flex items-center justify-center gap-4 text-white w-full h-full">
                          <div className="flex items-center gap-2">
                            {" "}
                            <ion-icon
                              className="text-2xl"
                              name="heart-circle"
                            />{" "}
                            {item.likes}
                          </div>
                          <div className="flex items-center gap-2">
                            {" "}
                            <ion-icon
                              className="text-2xl"
                              name="chatbubble-ellipses"
                            />{" "}
                            {item.comments}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            {selectedPost && (
              <div>
                <ProfileCapsuleView
                  item={capsuleData.find((item) => item.id === selectedPost)}
                  handleClosePostView={handleClosePostView}
                  selectedPost={selectedPost}
                />
                <div
                  className="uk-modal-backdrop"
                  onClick={handleClosePostView}
                ></div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
