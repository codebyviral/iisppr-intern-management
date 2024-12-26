const Loader = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="flex items-center space-x-4">
          <svg
            className="w-12 h-12 animate-spin text-blue-500"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="10"
              fill="none"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M50 10a40 40 0 0 1 0 80 40 40 0 0 1 0-80zm0-10C22.39 0 0 22.39 0 50s22.39 50 50 50 50-22.39 50-50S77.61 0 50 0z"
            ></path>
          </svg>
          <h1 className="text-lg font-semibold text-gray-700">
            Please wait...
          </h1>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Loading, this might take a moment.
        </p>
      </div>
    </>
  );
};

export default Loader;
