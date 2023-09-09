export default function SuccesfulAlert(props) {
  return (
    <div
      uk-alert
      className="uk-alert"
      style={{
        position: "fixed",
        bottom: 10,
        left: "50%",
        transform: "translate(-50%, 0)",
        zIndex: 9999,
      }}
    >
      <div className="p-2 border bg-green-50 border-green-500/30 rounded-xl dark:bg-slate-700">
        <div className="inline- flex items-center justify-between gap-6">
          {/* icon */}
          <div className="p-1 text-white bg-green-500 shadow rounded-xl shadow-green-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {/* text */}
          <div className="text-base font-semibold text-green-700">
            {props.message}
          </div>
          {/* icon close */}
          <button
            type="button"
            className="flex p-1 text-gray-600 rounded-lg hover:bg-black/5 ml-auto uk-alert-close"
          >
            <ion-icon name="close" className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
