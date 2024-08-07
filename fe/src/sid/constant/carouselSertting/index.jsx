import React from 'react';

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <i
        {...props}
        className={
            "fa-solid fa-chevron-left prev-slick-arrow" +
            (currentSlide === 0 ? " slick-disabled" : "")
        }
        aria-hidden="true"
        aria-disabled={currentSlide === 0 ? true : false}
        type="button"
        style={{ position: "absolute", top: "35%", left: "-3%", transform: "translate(0,-25%)", zIndex: "100", fontSize: "2rem", color: "#00917C" }}
    ></i>
);

const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <i
        {...props}
        className={
            "fa-solid fa-chevron-right next-slick-arrow" +
            (currentSlide === slideCount - 1 ? " slick-disabled" : "")
        }
        aria-hidden="true"
        aria-disabled={currentSlide === slideCount - 1 ? true : false}
        type="button"
        style={{ position: "absolute", top: "35%", right: "-3%", transform: "translate(0,-25%)", color: "#00917C", fontSize: "2rem" }}
    ></i>
);

const getSettings = (slidesToShow) => ({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: false,
    nextArrow: <SlickArrowRight />,
    prevArrow: <SlickArrowLeft />,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
            },
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
            },
        },
    ],
});

export default getSettings;
