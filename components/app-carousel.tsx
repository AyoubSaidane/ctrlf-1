"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

export function AppCarousel() {
  return (
    <div className="w-full">
      <Carousel 
        opts={{ 
          align: "start",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="overflow-x-auto cursor-grab pb-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold">Document {index + 1}</h3>
                <p className="text-sm text-muted-foreground">
                  Related content preview...
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
