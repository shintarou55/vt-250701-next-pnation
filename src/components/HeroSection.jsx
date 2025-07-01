import React from "react";

export const HeroSection = ({ gradientFrom, gradientTo, title, subTitle }) => {
  return (
    <section
      className={`h-screen flex items-center justify-center bg-gradient-to-br text-white bg-blue-500`}
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl mb-6">{subTitle}</p>
      </div>
    </section>
  );
};
