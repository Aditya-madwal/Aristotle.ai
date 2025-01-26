import heroImg from "../../LandingPageComponents/heroSection.png"

const HeroSection = () => {
  return (
    <section className="bg-emerald-600 lg:rounded-bl-[300px]">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between">
          {/* Image Section */}
          <div className="mb-8 w-full lg:mb-0 lg:w-1/2">
            <img
              src={heroImg}
              alt="Hero Image"
              width={400}
              height={400}
              className="mx-auto rounded-lg object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="w-full text-center lg:w-1/2 lg:text-left">
            <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              <span className="text-text-gold">Online learning</span> has become
              significantly more convenient
            </h1>
            <p className="mb-8 text-xl text-white opacity-80">
              EduGenius is an interesting platform to learn.
            </p>
            <button className="rounded-full bg-white px-6 py-3 font-semibold text-custom-blue shadow-md transition duration-300 ease-in-out hover:bg-opacity-90">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
