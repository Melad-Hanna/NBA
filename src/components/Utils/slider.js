import React from 'react';
import Slider from 'react-slick';

const settings = {
    arrows: false,
    dots: false,
    infinte: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1
}

const SliderWidget = (props) =>{
    let slides = props.slides;
    return(
        <>
            {(
                slides ?
                <Slider {...settings}>
                    {
                        slides.map(slide =>(
                            <div key={slide.id}>
                                <div
                                    className="item_slider"
                                    style={{
                                        background: `url(/images/covers/${slide.cover})`
                                    }}
                                >
                                    <div className="caption">
                                        <h4>{slide.topic}</h4>
                                        <p>{slide.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </Slider>
                :
                null
            )}
        </>
    )
}

export default SliderWidget;