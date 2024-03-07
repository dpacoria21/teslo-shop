'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import './slideshow.css';

interface Props {
    images: String[],
    title: string,
    className?: string,
}

export const ProductMobileSlideshow = ({images, title, className = ''}: Props) => {


    return (
        <div className={className}>
            <Swiper
                style={{
                    width: '100vw',
                    height: '100vh'
                }}
                pagination
                navigation={true}
                autoplay={{
                    delay: 2500
                }}
                modules={[FreeMode, Navigation, Thumbs, Autoplay, Pagination]}
                className="mySwiper2"
            >
                {
                    images.map((image, i) => (
                        <SwiperSlide key={i.toString()+image.toString()}>
                            <Image
                                width={600}
                                height={500}
                                src={`/products/${image}`}
                                alt={title}
                                className='object-fill'
                            />
                        </SwiperSlide>
                    ))
                }
                
            </Swiper>
        </div>
    );
};
