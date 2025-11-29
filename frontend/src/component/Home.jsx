import React from "react";

const Home = () => {
  return (
    <section className="bg-cover bg-center h-[90vh] flex items-center justify-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1572120360610-d971b9d7767c')" }}>
      
      <div className="bg-black bg-opacity-60 p-10 rounded-xl max-w-2xl text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Find Your Dream Home Today
        </h1>
        <p className="text-lg mb-6">
          Explore the best properties in your city with trusted agents.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold">
            Explore Properties
          </button>
          <button className="bg-white text-black hover:bg-gray-300 px-6 py-3 rounded-lg font-semibold">
            Contact Agent
          </button>
        </div>
      </div>

    </section>
  );
};

export default Home;
