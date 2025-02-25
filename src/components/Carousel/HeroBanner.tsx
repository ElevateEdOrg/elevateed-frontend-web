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
            <div className="flex flex-col-reverse sm:flex-row aspect-auto h-[40vh] items-center rounded-4xl shadow-lg justify-center overflow-hidden">
              <div className="flex grow bg-brand-secondary  w-full sm:w-1/2 lg:w-auto sm:h-full px-4 sm:px-10 xl:px-20 py-2 sm:py-10 flex-col">
                <h2 className="text-white sm:text-2xl lg:text-3xl xl:text-5xl font-extrabold tracking-wider md:w-2/3">
                  Learn something new everyday.
                </h2>
                <p className="text-white text-xs lg:text-base xl:text-3xl sm:mt-4 xl:mt-10">
                  Become professionals and ready to join the world.
                </p>
                <Link
                  className="sm:mt-10 xl:mt-14 mt-3 text-brand-primary shadow-md rounded-xl bg-white border border-brand-primary font-bold text-sm w-fit px-2 py-1 lg:px-4 lg:py-2"
                  to="#"
                >
                  Explore Course
                </Link>
              </div>
              <div className="sm:aspect-video bg-brand-secondary w-full sm:w-1/2 md:w-auto h-1/2 sm:h-full  xl:w-auto xl:h-full">
                <img
                  className="w-full h-full object-cover"
                  src={`./src/assets/courseBanners/banner${index + 1}.png`}
                  alt=""
                />
              </div>
              {/* <div className="bg-brand-secondary debug flex grow w-full"></div> */}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0 cursor-pointer border-none bg-black-30 " />
      <CarouselNext className="right-0 cursor-pointer border-none bg-black-30 " />
    </Carousel>
  );
}
