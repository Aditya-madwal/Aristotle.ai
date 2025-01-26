import React from "react";
import feature1 from "../../LandingPageComponents/undraw_instant_support_re_s7unhey.svg"
import feature2 from "../../LandingPageComponents/undraw_teaching_re_g7e3 (1)h.svg"
import feature3 from "../../LandingPageComponents/undraw_respond_re_iph2.svg"
import feature4 from "../../LandingPageComponents/undraw_online_test_re_kyfx.svg"


const FeaturesSection = () => {
  return (
    <div>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <h2 className="max-w-lg mb-6 font-sans text-3xl text-center font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span className="relative text-center w-full text-7xl text-text-dark">
              Our <span className="text-text-blue-light">Features</span>
            </span>
          </h2>
        </div>

        {/* Section 1 */}
        <section className="flex flex-col gap-10 md:flex-row items-center justify-between p-8 md:p-16">
          <div className="md:w-1/2 flex justify-center">
            <img
              // src="undraw_instant_support_re_s7unhey.svg"
              src={feature1}
              alt="Industry insights illustration"
              className="max-w-full h-auto"
            />
          </div>
          <div className="md:w-1/2 space-y-4">
            <h1 className="text-4xl font-bold text-gray-700 leading-tight text-left md:text-5xl">
              Empowering Knowledge Seekers and Sharers
            </h1>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                    <svg
                      className="h-8 w-8 text-dark"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                </span>
                <p className="mb-4 font-semibold text-dark">
                  Join a diverse community of learners, educators, and industry
                  experts.
                </p>
              </li>
              <li className="flex items-center">
                <span className="mr-2">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                    <svg
                      className="h-8 w-8 text-dark"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </span>
                <p className="mb-4 font-semibold text-dark">
                  Connect globally, transcending borders for meaningful
                  interactions.
                </p>
              </li>
              <li className="flex items-center">
                <span className="mr-2">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                    <svg
                      className="h-8 w-8 text-dark"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18" />{" "}
                      <line x1="13" y1="8" x2="15" y2="8" />{" "}
                      <line x1="13" y1="12" x2="15" y2="12" />
                    </svg>
                  </div>
                </span>
                <p className="mb-4 font-semibold text-dark">
                  Embrace growth and learning together, regardless of age or
                  background.
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2 */}

        <section className="flex flex-col-reverse md:flex-row items-center justify-between p-8 md:p-16">
          <div className="md:w-1/2 space-y-4">
            <h1 className="text-4xl font-bold text-gray-700 leading-tight text-left md:text-5xl">
              Cultivating Collaborative Knowledge Exchange
            </h1>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                    <svg
                      className="h-8 w-8 text-dark"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <rect x="4" y="4" width="16" height="6" rx="2" />{" "}
                      <rect x="4" y="14" width="16" height="6" rx="2" />
                    </svg>
                  </div>
                </span>
                <p className="mb-4 font-semibold text-dark">
                  Access and share comprehensive notes with EasyEd's
                  user-friendly platform.
                </p>
              </li>
              <li className="flex items-center">
                <span className="mr-2">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                    <svg
                      className="h-8 w-8 text-dark"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />{" "}
                      <circle cx="9" cy="7" r="4" />{" "}
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />{" "}
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                </span>
                <p className="mb-4 font-semibold text-dark">
                  Participate in a community, supporting each other's learning
                  journey
                </p>
              </li>
              <li className="flex items-center">
                <span className="mr-2">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                    <svg
                      className="h-8 w-8 text-dark"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <polyline points="3 17 9 11 13 15 21 7" />{" "}
                      <polyline points="14 7 21 7 21 14" />
                    </svg>
                  </div>
                </span>
                <p className="mb-4 font-semibold text-dark">
                  Foster mutual support, growth, and academic excellence.
                </p>
              </li>
            </ul>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img
              // src="/undraw_teaching_re_g7e3 (1)h.svg"
              src={feature2}
              alt="Industry insights illustration"
              className="max-w-full h-auto"
            />
          </div>
        </section>

        {/* Section 3 */}
        <section className="flex flex-col gap-10 md:flex-row items-center justify-between p-8 md:p-16">
          <div className="md:w-1/2 flex justify-center">
            <img
              // src="/undraw_respond_re_iph2.svg"
              src={feature3}
              alt="Industry insights illustration"
              className="max-w-full h-auto"
            />
          </div>
          <div className="md:w-1/2 space-y-4">
            <h1 className="text-4xl font-bold text-gray-700 leading-tight text-left md:text-5xl">
              Stimulating Learning through Interactive Discussions
            </h1>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                    <svg
                      className="h-8 w-8 text-dark"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <circle cx="12" cy="12" r="9" />{" "}
                      <line x1="3.6" y1="9" x2="20.4" y2="9" />{" "}
                      <line x1="3.6" y1="15" x2="20.4" y2="15" />{" "}
                      <path d="M11.5 3a17 17 0 0 0 0 18" />{" "}
                      <path d="M12.5 3a17 17 0 0 1 0 18" />
                    </svg>
                  </div>
                </span>
                <p className="mb-4 font-semibold text-dark">
                  Engage in dynamic discussions with peers and experts on
                  current educational topics.
                </p>
              </li>
              <li className="flex items-center">
                <span className="mr-2">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                    <svg
                      className="h-8 w-8 text-dark"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <circle cx="12" cy="5" r="2" />{" "}
                      <circle cx="5" cy="19" r="2" />{" "}
                      <circle cx="19" cy="19" r="2" />{" "}
                      <circle cx="12" cy="14" r="3" />{" "}
                      <line x1="12" y1="7" x2="12" y2="11" />{" "}
                      <path d="M6.7 17.8l2.8 -2" />{" "}
                      <path d="M17.3 17.8l-2.8 -2" />
                    </svg>
                  </div>
                </span>
                <p className="mb-4 font-semibold text-dark">
                  Express and exchange viewpoints, challenging ideas and
                  fostering intellectual growth.
                </p>
              </li>
              <li className="flex items-center">
                <span className="mr-2">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                    <svg
                      className="h-8 w-8 text-dark"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3" />{" "}
                      <path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3" />{" "}
                      <circle cx="15" cy="9" r="1" />
                    </svg>
                  </div>
                </span>
                <p className="mb-4 font-semibold text-dark">
                  Explore new concepts and insights through constructive
                  debates, expanding your knowledge.
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* Section4 */}
        <section className="flex flex-col-reverse md:flex-row items-center justify-between p-8 md:p-16">
          <div className="md:w-1/2 space-y-4">
            <h1 className="text-4xl font-bold text-gray-700 leading-tight text-left md:text-5xl">
              Cutting-edge Industry Insights: Empowering Success
            </h1>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                    <svg
                      className="h-8 w-8 text-dark"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <circle cx="12" cy="12" r="9" />{" "}
                      <line x1="3.6" y1="9" x2="20.4" y2="9" />{" "}
                      <line x1="3.6" y1="15" x2="20.4" y2="15" />{" "}
                      <path d="M11.5 3a17 17 0 0 0 0 18" />{" "}
                      <path d="M12.5 3a17 17 0 0 1 0 18" />
                    </svg>
                  </div>
                </span>
                <p className="mb-4 font-semibold text-dark">
                  Network with experienced professionals and thought leaders.
                </p>
              </li>
              <li className="flex items-center">
                <span className="mr-2">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                    <svg
                      className="h-8 w-8 text-dark"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <circle cx="12" cy="12" r="10" />{" "}
                      <circle cx="12" cy="12" r="6" />{" "}
                      <circle cx="12" cy="12" r="2" />{" "}
                    </svg>
                  </div>
                </span>
                <p className="mb-4 font-semibold text-dark">
                  Gain valuable insights that influence your career decisions.
                </p>
              </li>
              <li className="flex items-center">
                <span className="mr-2">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                    <svg
                      className="h-8 w-8 text-dark"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                </span>
                <p className="mb-4 font-semibold text-dark">
                  Stay updated and informed about new advancements in the
                  industry.
                </p>
              </li>
            </ul>
            <a
              href="#"
              className="inline-block mt-4 px-6 py-2 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition duration-300"
            >
              Get it on Google Play
            </a>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img
              // src="undraw_online_test_re_kyfx.svg"
              src={feature4}
              alt="Industry insights illustration"
              className="max-w-full h-auto"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default FeaturesSection;
