export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24 text-black">
      <div className="flex-row text-center">
        <h1 className="text-lg mb-2 uppercase text-black font-semibold">
          Find home service professionals in the
        </h1>
        <h1 className="text-7xl font-extrabold">
          <span className="bg-clip-text text-transparent bg-[url('/rfv.jpeg')] bg-contain">
            Roaring Fork Valley
          </span>
        </h1>
        <div className="flex mt-5 space-x-5">
          <div>✅ Recommended By Your Neighbors</div>
          <div>✅ Vetted, Licensed And Insured</div>
          <div>✅ Have Availability And Will Show Up</div>
        </div>

        <form className="max-w-lg mx-auto mt-10">
          <div className="flex">
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only ">
              Your Email
            </label>
            <button
              id="dropdown-button"
              data-dropdown-toggle="dropdown"
              className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
              type="button"
            >
              All categories{" "}
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="dropdown"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdown-button"
              >
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                  >
                    Mockups
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                  >
                    Templates
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                  >
                    Design
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-10"
                  >
                    Logos
                  </button>
                </li>
              </ul>
            </div>
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for a service"
                required
              />
              <button
                type="submit"
                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="flex-row mt-10">
        <h3 className="text-xl text-center mb-5">
          No more scouring the web for great tradesmen. We
          aggregate all review data and vet them for you.
        </h3>
        <div className="grid grid-rows-2 grid-flow-col gap-8 place-content-center">
          <div className="flex items-center h-32 w-48 rounded-md p-10 bg-indigo-600/15 ring-1 ring-teal-400/45">
            <img src="/google.png" width="300px" />
          </div>
          <div className="flex items-center h-32 w-48 rounded-md p-5 bg-green-400/15 ring-1 ring-teal-400/45">
            <img src="/nextdoor.png" width="300px" />
          </div>
          <div className="flex items-center h-32 w-48 rounded-md p-5 bg-purple-400/15 ring-1 ring-teal-400/45">
            <img src="/thumbtack.png" width="300px" />
          </div>
          <div className="flex items-center h-32 w-48 rounded-md p-4 bg-blue-500/15 ring-1 ring-teal-400/45">
            <img src="/facebook.svg" width="300px" />
          </div>
          <div className="flex items-center h-32 w-48 rounded-md p-8 bg-cyan-400/15 ring-1 ring-teal-400/45">
            <img src="/yelp.png" width="300px" />
          </div>
          <div className="flex items-center h-32 w-48 rounded-md p-12 bg-red-600/15 ring-1 ring-teal-400/45">
            <img src="/angi.png" width="300px" />
          </div>
        </div>
      </div>
    </main>
  );
}
