import { useEffect, useState } from "react";

export default function ProfileCapsuleView(props) {
  console.log(props.item)
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getComments();
  }, []);
  
  async function getComments() {
    const accessToken = JSON.parse(localStorage.getItem("zapmateAuthTokens")).access;
    const response = await fetch(`http://localhost:8000/zapapp/comment/?timecapsule_id=${props.item.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    setComments(data);
  }
  if (!props.selectedPost) {
    return null;
  }
  return (
    <>
      <div className="lg:p-20 max-lg:!items-start w-full h-full z-[100] top-[50%] left-[50%] fixed flex justify-center items-center translate-x-[-50%] translate-y-[-50%] backdrop-blur-sm"></div>

      <div className="lg:p-20 max-lg:!items-start w-full h-full z-[9999] top-[50%] left-[50%] fixed flex justify-center items-center translate-x-[-50%] translate-y-[-50%]">
        <div className="uk-modal-dialog tt relative  max-w-[900px] mx-auto overflow-hidden shadow-xl rounded-lg lg:flex items-center ax-w-[86rem] w-full lg:h-[80vh]">
          {/* image previewer */}
          <div className="lg:h-full lg:w-[calc(100vw-100px)] w-full h-96 flex justify-center items-center relative">
            <div className="relative z-10 w-full h-full">
              <img
                src={props.item.image}
                alt=""
                className="object-cover absolute h-full w-full "
              />
            </div>
            {/* close button */}
            <button
              type="button"
              onClick={props.handleClosePostView}
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
                    {props.item.username}
                  </h4>
                  <div className="text-gray-500 text-xs dark:text-white/80">
                    {props.item.available_date}
                  </div>
                </div>
                {/* dropdown */}
                <div className="-m-1">
                  <button type="button" className="button__ico w-8 h-8">
                    {" "}
                    <ion-icon
                      className="text-xl"
                      name="ellipsis-horizontal"
                    />{" "}
                  </button>
                  <div
                    className="w-[253px]"
                    data-uk-dropdown="pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true"
                  ></div>
                </div>
              </div>
              <p className="font-normal text-sm leading-6 mt-4">
                {props.item.content}
              </p>
              <div className="shadow relative -mx-5 px-5 py-3 mt-3">
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      className="button__ico text-red-400 bg-red-100 dark:bg-slate-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-[70%] w-[70%]"
                      >
                        <path d="M20.84 4.22a5.5 5.5 0 0 0-7.78 0L12 5.16l-1.06-.94a5.5 5.5 0 0 0-7.78 7.78L12 21l8.84-8.84a5.5 5.5 0 0 0 0-7.94z" />
                      </svg>
                    </button>
                    <a href="#">{props.item.total_likes}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="button__ico bg-slate-100 dark:bg-slate-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={props.className}
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M7 8H17" />
                        <path d="M7 12H17" />
                        <path d="M7 16H17" />
                      </svg>
                    </button>
                    <span>{props.item.total_comments}</span>
                  </div>
                  <button type="button" className="button__ico ml-auto">
                    {" "}
                    <ion-icon className="text-xl" name="share-outline" />{" "}
                  </button>
                  <button type="button" className="button__ico">
                    {" "}
                    <ion-icon
                      className="text-xl"
                      name="bookmark-outline"
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
                src="assets/images/avatars/avatar-2.jpg"
                alt=""
                className="w-6 h-6 rounded-full"
              />
              <div className="flex-1 relative overflow-hidden ">
                <textarea
                  placeholder="Add Comment...."
                  rows={1}
                  className="w-full resize-  px-4 py-2 focus:!border-transparent focus:!ring-transparent resize-y"
                  defaultValue={""}
                />
                <div className="flex items-center gap-2 absolute bottom-0.5 right-0 m-3">
                  <ion-icon
                    className="text-xl flex text-blue-700"
                    name="image"
                  />
                  <ion-icon
                    className="text-xl flex text-yellow-500"
                    name="happy"
                  />
                </div>
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
