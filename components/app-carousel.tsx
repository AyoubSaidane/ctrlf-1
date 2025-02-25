"use client"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Document } from "@/api/types/api"
import { PDFPagePreview } from "@/components/pdf-page-preview"

interface AppCarouselProps {
  documents: Document[]
}

export function AppCarousel({ documents }: AppCarouselProps) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Document Previews</h2>
      <Carousel 
        opts={{ 
          align: "start",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="overflow-x-auto cursor-grab pb-4">
          {documents.map((doc, index) => (
            <CarouselItem 
              key={index} 
              className="md:basis-1/2 lg:basis-1/3"
            >
              <div className={cn(
                "border rounded-lg overflow-hidden",
                index === 0 ? "ml-0 mr-4" : "mx-2"
              )}>
                <PDFPagePreview 
                  url={doc.url} 
                  page={doc.page} 
                  width={300}
                />
                <div className="p-4">
                  <h3 className="font-semibold">{doc.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Page {doc.page}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
