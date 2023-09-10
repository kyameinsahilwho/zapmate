import { useState, useEffect } from "react";
import Loader from "./Loader";
import jwtDecode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [profile_picture, setProfilePicture] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  async function fetchData() {
    const accessToken = JSON.parse(
      localStorage.getItem("zapmateAuthTokens")
    ).access;
    const responseFetchData = await fetch(
      `http://localhost:8000/zapapp/profile/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await responseFetchData.json();
    setProfileData(data[0]);
    setUsername(data[0].username);
    setFirstName(data[0].first_name);
    setLastName(data[0].last_name);
    setBio(data[0].bio);
    setProfilePicture(data[0].profile_picture);
    setEmail(data[0].email);
    setLoading(false);
  }
  async function handleProfileSubmit(e) {
    e.preventDefault();
    const accessToken = JSON.parse(
      localStorage.getItem("zapmateAuthTokens")
    ).access;
    const responseUpdate = await fetch(
      `http://localhost:8000/zapapp/profile-update/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          username: username,
          first_name: first_name,
          last_name: last_name,
          bio: bio,
          email: email,
        }),
      }
    );
    console.log(responseUpdate);
    if (responseUpdate.status === 200) {
      toast.success('Profile updated successfully');  
      fetchData();
    }
  }
  async function handlePasswordSubmit(e) {
    e.preventDefault();
    
    const accessToken = JSON.parse(
      localStorage.getItem("zapmateAuthTokens")
    ).access;
    const responseUpdate = await fetch(
      `http://localhost:8000/zapapp/users/${jwtDecode(accessToken).user_id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
        }),
      }
    );
    console.log(responseUpdate);
    if (responseUpdate.status === 200) {
      toast.success('Password updated successfully');  
    }
    if (responseUpdate.status === 400) {
      toast.error('Old password is incorrect');
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <main className="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
      <ToastContainer />
      <div className="max-w-2xl mx-auto">
        {/* heading title */}
        <div className="page__heading py-6 mt-6">
          <a href="#">
            <ion-icon name="chevron-back-outline" /> Back
          </a>
          <h1> Settings </h1>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm dark:border-slate-700 dark:bg-dark2">
          <div className="flex md:gap-8 gap-4 items-center md:p-10 p-6">
            <div className="relative md:w-20 md:h-20 w-12 h-12 shrink-0">
              <label htmlFor="file" className="cursor-pointer">
                <img
                  id="img"
                  src={profileData.profile_picture}
                  className="object-cover w-full h-full rounded-full"
                  alt=""
                />
                <input type="file" id="file" className="hidden" />
              </label>
              <label
                htmlFor="file"
                className="md:p-1 p-0.5 rounded-full bg-slate-600 md:border-4 border-white absolute -bottom-2 -right-2 cursor-pointer dark:border-slate-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="md:w-4 md:h-4 w-3 h-3 fill-white"
                >
                  <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                  <path
                    fillRule="evenodd"
                    d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <input id="file" type="file" className="hidden" />
              </label>
            </div>
            <div className="flex-1">
              <h3 className="md:text-xl text-base font-semibold text-black dark:text-white capitalize">
                {profileData.first_name} {profileData.last_name}
              </h3>
              <p className="text-sm text-blue-600 mt-1  font-semibold">
                @{profileData.username}
              </p>
            </div>
          </div>
          <hr className="border-t border-gray-100 dark:border-slate-700" />
          {/* nav tabs */}
          <div
            className="relative -mb-px px-2"
            tabIndex={-1}
            uk-slider="finite: true"
          >
            <nav className="overflow-hidden rounded-xl uk-slider-container pt-2">
              <ul
                className="uk-slider-items w-[calc(100%+10px)] capitalize font-semibold text-gray-500 text-sm dark:text-white"
                uk-switcher="connect: #setting_tab ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"
              >
                <li className="w-auto pr-2.5">
                  <a
                    href="#"
                    className={`inline-block p-4 pt-2 border-b-2 border-transparent ${
                      activeTab === 0
                        ? "text-blue-500 border-blue-500 border-b-2"
                        : ""
                    }`}
                    onClick={() => handleTabClick(0)}
                    aria-expanded={activeTab === 0 ? "true" : "false"}
                  >
                    General
                  </a>
                </li>
                <li className="w-auto pr-2.5">
                  <a
                    href="#"
                    className={`inline-block p-4 pt-2 border-b-2 border-transparent ${
                      activeTab === 1 ? "text-blue-500 border-blue-500" : ""
                    }`}
                    onClick={() => handleTabClick(1)}
                    aria-expanded={activeTab === 1 ? "true" : "false"}
                  >
                    Alerts
                  </a>
                </li>
                <li className="w-auto pr-2.5">
                  <a
                    href="#"
                    className={`inline-block p-4 pt-2 border-b-2 border-transparent ${
                      activeTab === 2 ? "text-blue-500 border-blue-500" : ""
                    }`}
                    onClick={() => handleTabClick(2)}
                    aria-expanded={activeTab === 2 ? "true" : "false"}
                  >
                    Password
                  </a>
                </li>
              </ul>
            </nav>
            <a
              className="absolute -translate-y-1/2 top-1/2 left-0 flex items-center w-20 h-full p-2.5 justify-start rounded-xl bg-gradient-to-r from-white via-white dark:from-slate-800 dark:via-slate-800"
              href="#"
              uk-slider-item="previous"
            >
              <ion-icon name="chevron-back" className="text-2xl ml-1" />
            </a>
            <a
              className="absolute right-0 -translate-y-1/2 top-1/2 flex items-center w-20 h-full p-2.5 justify-end rounded-xl bg-gradient-to-l from-white via-white dark:from-slate-800 dark:via-slate-800"
              href="#"
              uk-slider-item="next"
            >
              <ion-icon name="chevron-forward" className="text-2xl mr-1" />
            </a>
          </div>
        </div>
        {/* tab content */}
        <div className="mt-6 mb-20 text-sm font-medium text-gray-600 dark:text-white/80">
          <div
            id="setting_tab"
            className="uk-switcher bg-white border rounded-xl shadow-sm md:py-12 md:px-20 p-6 overflow-hidden dark:border-slate-700 dark:bg-dark2"
          >
            {/* tab user basic info */}
            <div>
              <form method="POST" onSubmit={handleProfileSubmit}>
                <div>
                  <div className="space-y-6">
                    <div className="md:flex items-center gap-10">
                      <label className="md:w-32 text-right"> Username </label>
                      <div className="flex-1 max-md:mt-4">
                        <input
                          type="text"
                          placeholder={profileData.username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="lg:w-1/2 w-full"
                        />
                      </div>
                    </div>
                    <div className="md:flex items-center gap-10">
                      <label className="md:w-32 text-right"> Name </label>
                      <div className="flex-1 max-md:mt-4 flex gap-4">
                        <input
                          type="text"
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder={profileData.first_name}
                          className="lg:w-1/2 w-full"
                        />
                        <input
                          type="text"
                          placeholder={profileData.last_name}
                          onChange={(e) => setLastName(e.target.value)}
                          className="lg:w-1/2 w-full"
                        />
                      </div>
                    </div>
                    <div className="md:flex items-center gap-10">
                      <label className="md:w-32 text-right"> Email </label>
                      <div className="flex-1 max-md:mt-4">
                        <input
                          type="text"
                          placeholder={profileData.email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="md:flex items-start gap-10">
                      <label className="md:w-32 text-right"> Bio </label>
                      <div className="flex-1 max-md:mt-4">
                        <textarea
                          className="w-full"
                          rows={5}
                          placeholder={profileData.bio}
                          onChange={(e) => setBio(e.target.value)}
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="md:flex items-center gap-10">
                      <label className="md:w-32 text-right"> Gender </label>
                      <div className="flex-1 max-md:mt-4">
                        <select className="!border-0 !rounded-md lg:w-1/2 w-full">
                          <option value={1}>Male</option>
                          <option value={2}>Female</option>
                          <option value={3}>Other</option>
                          <option value={4}>Rather not say</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-16">
                    <button
                      type="submit"
                      className="button lg:px-10 bg-primary text-white max-md:flex-1 "
                    >
                      Save <span className="ripple-overlay" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {/* tab alerts */}
            <div>
              <div>
                <div className="font-normal text-gray-400 text-sm">
                  <div>
                    <h4 className="text-lg font-semibold text-black dark:text-white">
                      {" "}
                      Alerts preferences{" "}
                    </h4>
                    <p className=" mt-3">
                      We may still send you important notifications about your
                      account and content outside of you preferred notivications
                      settings
                    </p>
                  </div>
                  <div
                    className="mt-8 md:space-y-8 space-y-4"
                    uk-scrollspy="target: > div; cls: uk-animation-slide-bottom-medium; delay: 100 ;repeat: true"
                  >
                    <div className="w-full">
                      <label className="switch flex justify-between items-center cursor-pointer gap-4">
                        <div className="bg-sky-100 text-sky-500 rounded-full p-2 md:flex hidden shrink-0">
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
                              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                            />
                          </svg>
                        </div>
                        <div className="flex-1 md:pr-8">
                          <h4 className="text-base font-medium mb-1.5 text-black dark:text-white">
                            {" "}
                            Email notifications
                          </h4>
                          <p className>
                            {" "}
                            You can receive notifications about important
                            updates and content directly to your email inbox.{" "}
                          </p>
                        </div>
                        <input type="checkbox" defaultChecked />
                        <span className="switch-button !relative" />
                      </label>
                    </div>
                    <div className="w-full">
                      <label className="switch flex justify-between items-center cursor-pointer gap-4">
                        <div className="bg-purple-100 text-purple-500 rounded-full p-2 md:flex hidden shrink-0">
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
                              d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
                            />
                          </svg>
                        </div>
                        <div className="flex-1 md:pr-8">
                          <h4 className="text-base font-medium mb-1.5 text-black dark:text-white">
                            {" "}
                            web notifications
                          </h4>
                          <p className>
                            {" "}
                            You can receive notifications through your
                            notifications center{" "}
                          </p>
                        </div>
                        <input type="checkbox" />
                        <span className="switch-button !relative" />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 mt-16">
                  <button
                    type="submit"
                    className="button lg:px-10 bg-primary text-white max-md:flex-1"
                  >
                    {" "}
                    Save
                  </button>
                </div>
              </div>
            </div>
            {/* tab password*/}
            <div>
              <div>
                <form method="POST" onSubmit={handlePasswordSubmit}>
                  <div className="space-y-6">
                    <div className="md:flex items-center gap-16 justify-between max-md:space-y-3">
                      <label className="md:w-40 text-right">
                        {" "}
                        Current Password{" "}
                      </label>
                      <div className="flex-1 max-md:mt-4">
                        <input
                          type="password"
                          placeholder="******"
                          className="w-full"
                          onChange={(e) => setOldPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="md:flex items-center gap-16 justify-between max-md:space-y-3">
                      <label className="md:w-40 text-right">
                        {" "}
                        New password{" "}
                      </label>
                      <div className="flex-1 max-md:mt-4">
                        <input
                          type="password"
                          placeholder="******"
                          className="w-full"
                          onChange={(e) => setNewPassword(e.target.value)}
                          onBlur={(e) => {
                            if (newPassword !== repeatPassword) {
                              setPasswordError(true);
                            }
                            else{
                              setPasswordError(false);
                            }
                          }}
                          required
                        />
                      </div>
                    </div>
                    <div className="md:flex items-center gap-16 justify-between max-md:space-y-3">
                      <label className="md:w-40 text-right">
                        {" "}
                        Repeat password{" "}
                      </label>
                      <div className={`flex-1 max-md:mt-4 ${passwordError ?  "border-red-500" : ""  }`}>
                        <input
                          type="password"
                          placeholder="******"
                          className="w-full"
                          onChange={(e) => setRepeatPassword(e.target.value)}
                          onBlur={(e) => {
                            if (newPassword !== repeatPassword) {
                              setPasswordError(true);
                            }
                            else{
                              setPasswordError(false);
                            }
                          }}
                          required
                        />
                      </div>
                    </div>
                    <hr className="border-gray-100 dark:border-gray-700" />
                    <div className="md:flex items-center gap-16 justify-between">
                      <label className="md:w-40 text-right">
                        {" "}
                        Two-factor authentication{" "}
                      </label>
                      <div className="flex-1 max-md:mt-4">
                        <select className="w-full !border-0 !rounded-md">
                          <option value={1}>Enable</option>
                          <option value={2}>Disable</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-16">
                    <button
                      type="submit"
                      className="button lg:px-10 bg-primary text-white max-md:flex-1"
                      disabled={passwordError}
                    >
                      {" "}
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
