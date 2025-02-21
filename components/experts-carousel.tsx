"use client"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"

const experts = [
  {
    name: "Dr. Jane Smith",
    title: "AI Research Scientist",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=1"
  },
  {
    name: "Prof. John Doe",
    title: "Computer Science Professor",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=2"
  },
  {
    name: "Dr. Sarah Johnson",
    title: "Machine Learning Expert",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=3"
  },
  {
    name: "Dr. Michael Chen",
    title: "Data Science Director",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=4"
  },
  {
    name: "Prof. Emily Brown",
    title: "NLP Researcher",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=5"
  }
]

export function ExpertsCarousel() {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-3">Experts</h2>
      <Carousel 
        opts={{ 
          align: "start",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="overflow-x-auto cursor-grab pb-3">
          {experts.map((expert, index) => (
            <CarouselItem 
              key={index} 
              className="md:basis-1/4 lg:basis-1/5"
            >
              <div className={cn(
                "text-center",
                index === 0 ? "ml-0 mr-3" : "mx-1.5"
              )}>
                <div className="w-[75%] mx-auto aspect-square relative mb-1.5">
                  <Image
                    src={expert.image}
                    alt={expert.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-sm">{expert.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {expert.title}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
