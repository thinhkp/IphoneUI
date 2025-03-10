import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);
import React, { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "~/constant";
import { pauseImg, playImg, replayImg } from "~/utils";

const VideoCarousel = () => {
  const VideoRef = useRef<HTMLVideoElement[]>([]);
  const VideoRefSpan = useRef<any[]>([]);
  const VideoRefDiv = useRef<any[]>([]);

  const AniRef = useRef<GSAPTween>(null);

  const [Video, setVideo] = useState({
    videoId: 0,
    isPlaying: false,
    isLastVideo: false,
  });
  let { isLastVideo, isPlaying, videoId } = Video;

  const [LoadedData, setLoadedData] = useState<any[]>([]);
  const handleLoadedMetaData = (i: any, e: any) => {
    setLoadedData((pre) => [...pre, e]);
  };
  const HandleVideoProgress = (type: string) => {
    switch (type) {
      case "video-end":
        if (videoId < 3) {
          setVideo((pre) => ({
            ...pre,
            videoId: pre.videoId + 1,
          }));
        } else {
          setVideo((pre) => ({
            ...pre,
            isLastVideo: true,
            isPlaying: false,
          }));
        }
        break;
      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: false }));
        break;
      case "play":

        setVideo((pre) => ({ ...pre, isPlaying: true }));
        break;
      case "restart":
        setVideo((pre) => ({
          ...pre,
          isPlaying: true,
          videoId: 0,
          isLastVideo: false,
        }));
      default:
        break;
    }
  };
  // khi scroll xuống video ele thì bắt đầu chạy
  useGSAP(() => {
    
    
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "play none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({ ...pre, isPlaying: true }));
      },
    });
  }, []);

  //gsap scroll slider
  useGSAP(() => {
    gsap.to(".slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut", // show visualizer https://gsap.com/docs/v3/Eases
    });
  }, [videoId]);

  // effect play video
  useEffect(() => {
    
    if (LoadedData.length > 3) {
      if(isPlaying){
        VideoRef.current[videoId].play()
        console.log('play');
      }else{
         VideoRef.current[videoId].pause();
         console.log('pause');
      }
    } 
  }, [LoadedData, videoId, isPlaying]);

  //effect progess bar
  useEffect(() => {
    const div = VideoRefDiv.current;
    const span = VideoRefSpan.current;
    let currentProgress: number = 0;
    if (isPlaying) {
      if(AniRef.current?.paused() && AniRef.current != null ){
        AniRef.current?.play()
      }
      else{
        AniRef.current = gsap.to(span[videoId], {
          onStart: () => {
            gsap.to(div[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw" // mobile
                  : window.innerWidth < 1200
                  ? "10vw" // tablet
                  : "4vw", // laptop
            });
          },
          onUpdate: () => {
            currentProgress =
              VideoRef.current[videoId].currentTime /
              VideoRef.current[videoId].duration;
            let a = gsap.to(span[videoId], {
              backgroundColor: "white",
              width: `${currentProgress * 100}%`,
              onComplete : ()=>{
                a.kill()
              }
            });
          },
          onComplete: () => {
            gsap.to(div[videoId], {
              width: 12,
            });
            gsap.to(span[videoId], {
              backgroundColor: "transparent",
              width: 0,
            });
            AniRef.current?.kill()
            AniRef.current = null;
            HandleVideoProgress("video-end");
          },
          duration: VideoRef.current[videoId].duration,
        });  
      }
    } else {
      AniRef.current != null ? AniRef.current.pause() : null;
    }
  }, [isPlaying, videoId]);

  return (
    <>
      <div className="flex items-center w-full">
        {hightlightsSlides.map((item, i) => {
          return (
            <div key={item.id} className="sm:pr-20 pr-10 slider">
              <div className="video-carousel_container">
                <div className="w-full h-full rounded-3xl bg-black flex items-center overflow-hidden">
                  <video
                    id="video"
                    muted
                    playsInline
                    preload="auto"
                    ref={(el) => {
                      VideoRef.current[i] = el as HTMLVideoElement
                    }}
                    onLoadedData={(e) => {
                      handleLoadedMetaData(i, e);
                      e.currentTarget.pause()
                    }}
                    autoPlay
                    
                  >
                    <source src={item.video} type="video/mp4"/>
                  </video>
                </div>
                <div className="absolute top-12 left-[5%]">
                  {item.textLists.map((text) => (
                    <p key={text} className="md:text-xl md:mb-3 font-bold text-gray">
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="relative flex justify-center items-stretch mt-10">
        <div className="py-5 px-7 flex-center bg-gray-300 rounded-3xl backdrop-blur mr-5">
          {hightlightsSlides.map((_, i) => {
            return (
              <div
                ref={(el) => {
                  VideoRefDiv.current[i] = el;
                }}
                key={i}
                className="mx-2 w-3 h-3 rounded-full cursor-pointer bg-gray-200 relative overflow-hidden"
              >
                <span
                  ref={(el) => {
                    VideoRefSpan.current[i] = el;
                  }}
                  className="h-full rounded-full absolute "
                ></span>
              </div>
            );
          })}
        </div>
        <div
          className="flex-center py-5 px-5 bg-gray-300 rounded-full cursor-pointer"
          onClick={() => {
            isPlaying
              ? HandleVideoProgress("pause",)
              : isLastVideo
              ? HandleVideoProgress("restart",)
              : HandleVideoProgress("play",);
          }}
        >
          <Image
            src={isPlaying ? pauseImg : isLastVideo ? replayImg : playImg}
            width={20}
            height={20}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default VideoCarousel;
