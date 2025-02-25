import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router";

export function HeroBanner() {
  return (
    <Carousel className="w-full select-none ">
      <CarouselContent className="">
        {Array.from({ length: 4 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="">
              <div className="flex aspect-auto h-[40vh] items-center rounded-4xl shadow-lg justify-center overflow-hidden">
                {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                <div className="flex grow bg-brand-secondary h-full px-20 py-10 flex-col">
                  <h2 className="text-white text-5xl font-extrabold tracking-wider w-2/3">
                    Learn something new everyday.
                  </h2>
                  <p className="text-white text-3xl mt-10">
                    Become professionals and ready to join the world.
                  </p>
                  <Link
                    className="mt-14 text-brand-primary shadow-md rounded-xl bg-white border border-brand-primary font-bold w-fit px-4 py-2"
                    to="#"
                  >
                    Explore Course
                  </Link>
                </div>
                <div className="aspect-video bg-brand-secondary h-full">
                  <img
                    className="w-full h-full"
                    src={`./src/assets/courseBanners/banner${index + 1}.png`}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0 cursor-pointer border-none bg-black-30 h-full rounded-none rounded-l-full" />
      <CarouselNext className="right-0 cursor-pointer border-none bg-black-30 h-full rounded-none rounded-r-full" />
    </Carousel>
  );
}
