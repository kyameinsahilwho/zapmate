import React from "react";
import { useEffect,useState } from "react";
import jwtDecode from "jwt-decode";
export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  async function fetchData() {
    const accessToken = JSON.parse(localStorage.getItem("zapmateAuthTokens")).access;
    const response = await fetch(`http://localhost:8000/zapapp/profile/`, {
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
  
  if (loading) {
    return <div className="text-black text-5xl text-center">loading...</div>;
  }
  return (
    <main className="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
      <div className="main__inner">
        <div className="py-6 relative">
          <div className="flex md:gap-16 gap-4 max-md:flex-col">
            <div className="relative md:p-1 rounded-full h-full max-md:w-16 bg-gradient-to-tr from-pink-400 to-pink-600 shadow-md hover:scale-110 duration-500 uk-animation-scale-up">
              <div className="relative md:w-40 md:h-40 h-16 w-16 rounded-full overflow-hidden md:border-[6px] border-gray-100 shrink-0 dark:border-slate-900">
                <img
                  src="assets/images/avatars/avatar-6.jpg"
                  alt=""
                  className="w-full h-full absolute object-cover"
                />
              </div>
              <button
                type="button"
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white shadow p-1.5 rounded-full sm:flex hidden"
              >
                {" "}
                <ion-icon name="camera" className="text-2xl" />
              </button>
            </div>
            <div className="max-w-2x flex-1">
              <h3 className="md:text-xl text-base font-semibold text-black dark:text-white capitalize">
                {profileData.first_name} {profileData.last_name}
              </h3>
              <p className="sm:text-sm text-blue-600 mt-1 font-normal text-xs">
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
                    <p>Capsules</p>
                    <h3 className="sm:text-xl sm:font-bold mt-1 text-black dark:text-white text-base font-normal">
                      162
                    </h3>
                  </div>
                  <div>
                    <p>Followers</p>
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
                    className="button bg-pink-100 text-pink-600 border border-pink-200"
                  >
                    Unfallow
                  </button>
                  <button
                    type="submit"
                    className="button bg-pink-600 text-white"
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
      </div>
    </main>
  );
}
