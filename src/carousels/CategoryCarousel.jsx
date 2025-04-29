import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Link } from 'react-router-dom';

const CategoryCarousel = () => {
    const category=[
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Cloud Engineer",
        "Devops Engineer",
        "Data Analyst",
        "Business Analyst"
    ];
  return (

    <Carousel
    opts={{
      align: "start",
    }}
    className="w-full max-w-xl"
  >
    <CarouselContent>
      {category.map((item, index) => (
        <CarouselItem key={index} className="basis-3/3 md:basis-1/3 ">
          <div className="p-1">
            <Card>
              <CardContent className="flex  items-center justify-center p-2">
                <Link to={`/search?name=${item}`}>
                <span className="text-md font-semibold">{item}</span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <div className='hidden sm:block'>

    <CarouselPrevious />
    <CarouselNext />
    </div>
  </Carousel>
   
  )
}

export default CategoryCarousel