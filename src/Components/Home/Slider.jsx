import { useRef } from 'react';
import { Carousel, Button } from 'antd';
import { ArrowRightOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import foodImage from '../../assets/sri_varahi_food_image.webp';
import houseImage from '../../assets/Sri_Varahi_house.webp';
import serviceImage from '../../assets/Sri_varahi_service_image.webp';
import './Slider.css';

const SLIDES = [
    {
        image: houseImage,
        kicker: 'Sri Varahi Datta Guru Ashram',
        title: 'Serving Humanity\nWith Devotion',
        desc: 'Bringing food, health, education, and spiritual care to communities in need — with dedication and compassion.',
        ctaText: 'Donate Now',
        ctaLink: '/donate',
    },
    {
        image: foodImage,
        kicker: 'Community Outreach',
        title: 'Empowering Lives\nThrough Service',
        desc: 'From humanitarian relief to CSR partnerships, we work hand in hand with communities to create lasting change.',
        ctaText: 'About',
        ctaLink: '/about',
    },
    {
        image: serviceImage,
        kicker: 'Join The Movement',
        title: 'Together We\nCan Do More',
        desc: 'Volunteer, collaborate, or contribute — every hand that joins us brings hope closer to those who need it most.',
        ctaText: 'Get Involved',
        ctaLink: '/contact',
    },
];

const Slider = () => {
    const carouselRef = useRef(null);

    return (
        <section className="hero-slider">
            <Carousel
                ref={carouselRef}
                // autoplay
                autoplaySpeed={4000}
                dots={{ className: 'hero-dots' }}
                speed={200}
            >
                {SLIDES?.map((slide) => (
                    <div key={slide?.title} className="slide">
                        <div className="slide-inner wrap">
                            <div className="slide-text">
                                <span className="slide-kicker">
                                    <span className="kicker-line"></span> {slide.kicker}
                                </span>
                                <h1 className="slide-title">
                                    {slide?.title.split('\n').map((line, i) => (
                                        <span key={i} className="slide-title-line">{line}</span>
                                    ))}
                                </h1>
                                <p className="slide-desc">{slide.desc}</p>
                                <Button
                                    type="primary"
                                    size="large"
                                    className="slide-cta"
                                    href={slide.ctaLink}
                                >
                                    {slide.ctaText} <ArrowRightOutlined />
                                </Button>
                            </div>
                            <div className="slide-image-wrap">
                                <img
                                    src={slide.image}
                                    alt={slide.kicker}
                                    className="slide-img"
                                    loading="eager"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>

            <div className="hero-controls">
                <button
                    className="hero-arrow hero-arrow-left"
                    onClick={() => carouselRef.current?.prev()}
                    aria-label="Previous slide"
                >
                    <LeftOutlined />
                </button>
                <button
                    className="hero-arrow hero-arrow-right"
                    onClick={() => carouselRef.current?.next()}
                    aria-label="Next slide"
                >
                    <RightOutlined />
                </button>
            </div>
        </section>
    );
};

export default Slider;