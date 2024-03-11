'use client';

import Image from 'next/image';
import { useState } from 'react';

import {Swiper as SwiperObject} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';

interface Props {
    images: String[],
    title: string,
    className?: string,
}

export const ProductSlideshow = ({images, title, className = ''}: Props) => {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

    return (
        <div className={className}>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                } as {}}
                spaceBetween={10}
                navigation={true}
                autoplay={{
                    delay: 2500
                }}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                className="mySwiper2"
            >
                {
                    images.map((image, i) => (
                        <SwiperSlide key={i.toString()+image.toString()}>
                            <Image
                                width={1024}
                                height={800}
                                src={`/products/${image}`}
                                alt={title}
                                className='object-fill'
                            />
                        </SwiperSlide>
                    ))
                }
                
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {
                    images.map((image, i) => (
                        <SwiperSlide key={i.toString()+image.toString()}>
                            <Image
                                width={300}
                                height={300}
                                src={`/products/${image}`}
                                alt={title}
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};
