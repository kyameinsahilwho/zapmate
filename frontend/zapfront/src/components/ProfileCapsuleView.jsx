import { useEffect, useState, memo, useContext } from "react";
import { ProfileContext } from "../context/Profile";
const ProfileCapsuleView = memo(
  ({ item, handleClosePostView, selectedPost }) => {
    const { profileData } = useContext(ProfileContext);
    const [comments, setComments] = useState([]);
    useEffect(() => {
      getComments();
    }, []);

    async function getComments() {
      const accessToken = JSON.parse(
        localStorage.getItem("zapmateAuthTokens")
      ).access;
      const response = await fetch(
        `http://localhost:8000/zapapp/comment/?timecapsule_id=${
          item ? item.id : ""
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      setComments(data);
    }
    if (!selectedPost) {
      return null;
    }
    return (
      <>
        <div className="lg:p-20 max-lg:!items-start w-full h-full z-[100] top-[50%] left-[50%] fixed flex justify-center items-center translate-x-[-50%] translate-y-[-50%] backdrop-blur-sm"></div>

        <div className="lg:p-20 max-lg:!items-start w-full h-full z-[9999] top-[50%] left-[50%] fixed flex justify-center items-center translate-x-[-50%] translate-y-[-50%]">
          <div className="tt relative  max-w-[900px] mx-auto overflow-hidden shadow-xl rounded-lg lg:flex items-center ax-w-[86rem] w-full lg:h-[80vh]">
            {/* image previewer */}
            <div className="lg:h-full lg:w-[calc(100vw-100px)] w-full h-96 flex justify-center items-center relative">
              <div className="relative z-10 w-full h-full">
                <img
                  src={item ? item.image : "assets/images/post/img-1.jpg"}
                  alt=""
                  className="object-cover absolute h-full w-full "
                />
              </div>
              {/* close button */}
              <button
                type="button"
                onClick={handleClosePostView}
                className="bg-white rounded-full p-2 absolute right-0 top-0 m-3 uk-animation-slide-right-medium z-10 dark:bg-slate-600 uk-modal-close"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/* right sidebar */}
            <div className="lg:w-[400px] w-full bg-white h-full relative  overflow-y-auto shadow-xl dark:bg-dark2 flex flex-col justify-between">
              <div className="p-5 pb-0">
                {/* story heading */}
                <div className="flex gap-3 text-sm font-medium">
                  <img
                    src="assets/images/avatars/avatar-5.jpg"
                    alt=""
                    className="w-9 h-9 rounded-full"
                  />
                  <div className="flex-1">
                    <h4 className="text-black font-medium dark:text-white">
                      {item ? item.username : "John Doe"}
                    </h4>
                    <div className="text-gray-500 text-xs dark:text-white/80">
                      {item ? item.available_date : "2 hours ago"}
                    </div>
                  </div>
                  {/* dropdown */}
                 
                </div>
                <p className=" font-[helvetica] text-sm leading-6 mt-4">
                  {item ? item.content : ""}
                </p>
                <div className="shadow relative -mx-5 px-5 py-3 mt-3">
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        className="button__ico text-red-500 bg-red-100 dark:bg-slate-700"
                      >
                        <ion-icon
                          class="text-lg md hydrated"
                          name="heart"
                          role="img"
                        ></ion-icon>
                      </button>
                      <a href="#">{item ? item.total_likes : 0}</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className="button__ico bg-slate-100 dark:bg-slate-700"
                      >
                        <ion-icon
                          class="text-2xl md hydrated"
                          name="chatbubble-ellipses"
                        />
                      </button>
                      <span>{item ? item.total_comments : 0}</span>
                    </div>
                    <button type="button" className="button__ico ml-auto">
                      {" "}
                      <ion-icon class="text-xl md hydrated" name="share-outline" />{" "}
                    </button>
                    <button type="button" className="button__ico">
                      {" "}
                      <ion-icon
                        class="text-xl md hydrated"
                        name={item ? item.is_private ? "lock-closed-outline" : "globe-outline" : "globe-outline"}
                      />{" "}
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-5 h-full max-h-[180px] lg:max-h-full overflow-y-auto flex-1">
                {/* comment list */}
                <div className="relative text-sm font-medium space-y-5">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex items-start gap-3 relative"
                    >
                      <img
                        src={comment.pfp}
                        alt=""
                        className="w-6 h-6 mt-1 rounded-full"
                      />
                      <div className="flex-1">
                        <a
                          href="#"
                          className="text-black font-medium inline-block dark:text-white"
                        >
                          {comment.username}
                        </a>
                        <p className="mt-0.5">{comment.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-3 text-sm font-medium flex items-center gap-2">
                <img
                  src={profileData.profile_picture}
                  alt=""
                  className="w-6 h-6 rounded-full"
                />
                <div className="flex-1 relative overflow-y-auto ">
                <textarea
                name
                id
                rows={1}
                placeholder="What is going on.."
                className="w-[95%] ml-2 mt-1 resize-none"
                style={{ overflowY: "hidden" }}
                defaultValue={""}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              />
                </div>
                <button
                  type="submit"
                  className="hidden text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"
                >
                  {" "}
                  Replay
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);
export default ProfileCapsuleView;
