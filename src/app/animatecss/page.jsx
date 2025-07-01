import { HeroSection } from "@/components/HeroSection";
import React from "react";

export default function AnimateCss() {
  return (
    <>
      <HeroSection
        title="AnimateCSS"
        subTitle="AnimateCSSによるアニメーション"
      />
      <section>
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="animate__animated animate__bounce text-8xl font-bold">
            AnimateCss
          </h1>
        </div>
      </section>
    </>
  );
}
