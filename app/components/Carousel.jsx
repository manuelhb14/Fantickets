import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import Swipe from "react-easy-swipe";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Link from 'next/link';

import { DataContext } from '@/app/context/DataProvider';

export default function Carousel({ images }) {

  const { address, setAddress, isConnected, setIsConnected } = useContext(DataContext);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [timer, setTimer] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  const handleNextSlide = () => {
    let newSlide = currentSlide === images.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
    setTimer({}); // Reset
  };

  const handlePrevSlide = () => {
    let newSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
    setTimer({}); // Reset
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    setTimer({}); // Reset
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time
  }

  const startTimer = (endDate) => {
    const countdownDate = new Date(endDate).getTime()
    return setInterval(() => {
      const now = new Date().getTime()
      const distance = countdownDate - now
      const days = (formatTime(Math.floor(distance / (1000 * 60 * 60 * 24))))
      const hours = (formatTime(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))))
      const minutes = (formatTime(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))))
      const seconds = (formatTime(Math.floor((distance % (1000 * 60)) / 1000)))
      setTimer({ days, hours, minutes, seconds })
    }, 1000)
  }

  useEffect(() => {
    const interval = startTimer(images[currentSlide].date)
    return () => clearInterval(interval)
  }, [currentSlide])

  return (
    <div className="relative m-5">
      <AiOutlineLeft
        onClick={handlePrevSlide}
        className="absolute left-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-20"
      />
      <div className="w-full h-[50vh] flex overflow-hidden relative m-auto" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <Swipe
          onSwipeLeft={handleNextSlide}
          onSwipeRight={handlePrevSlide}
          className="relative z-10 w-full h-full"
        >
          {images.map((image, index) => {
            if (index === currentSlide) {
              return (
                <div id="item1" className="carousel-item w-full h-full" href={{
                  pathname: `/events/${image.id}`,
                  query: image
                }}>
                  <img src={image.image} alt="Shoes" className={"absolute w-full rounded-box z-10 h-full object-cover" + (isHovered ? ' soften' : ' darken')} />
                  <div className="m-auto z-50">
                    <div className="flex flex-col items-center">
                      <h1 className="text-6xl font-bold my-8">{image.title}</h1>
                      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                          <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": timer.days }}></span>
                          </span>
                          days
                        </div>
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                          <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": timer.hours }}></span>
                          </span>
                          hours
                        </div>
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                          <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": timer.minutes }}></span>
                          </span>
                          min
                        </div>
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                          <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": timer.seconds }}></span>
                          </span>
                          sec
                        </div>
                      </div>
                      {isHovered &&
                        <>
                          {isConnected ?
                            <Link className="btn btn-secondary btn-lg mt-8 absolute bottom-10" href={{
                              pathname: `/events/${image.id}`,
                              query: image
                            }}>Buy Ticket</Link>
                            :
                            <h1 className="text-2xl font-bold my-8 absolute bottom-10">Connect your wallet to buy tickets</h1>
                          }
                        </>
                      }
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </Swipe>
      </div>
      <AiOutlineRight
        onClick={handleNextSlide}
        className="absolute right-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-20"
      />

      <div className="relative flex justify-center p-2">
        {images.map((_, index) => {
          return (
            <div
              className={
                index === currentSlide
                  ? "h-4 w-4 bg-gray-300 rounded-full mx-2 mb-2 cursor-pointer"
                  : "h-4 w-4 bg-gray-700 rounded-full mx-2 mb-2 cursor-pointer"
              }
              key={index}
              onClick={() => {
                handleDotClick(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}