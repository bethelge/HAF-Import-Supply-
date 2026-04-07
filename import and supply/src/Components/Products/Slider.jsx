import React from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Wrapper = styled.div`
  margin: 40px 0;
  position: relative;
  padding: 20px 0;

  .slick-slide > div {
    padding: 0 5px;
  }

  .slick-dots {
    bottom: -40px;

    li {
      margin: 0 4px;

      button {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #e0e0e0;
        border: none;
        transition: all 0.3s ease;

        &:before {
          display: none;
        }

        &:hover {
          background: #38b2ac;
          transform: scale(1.2);
        }
      }

      &.slick-active button {
        background: #38b2ac;
        transform: scale(1.3);
      }
    }
  }

  .slick-prev,
  .slick-next {
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 50%;
    z-index: 10;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;

    &:hover {
      background: #f5f5f5;
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }

    &::before {
      color: #38b2ac;
      font-size: 18px;
      font-weight: bold;
      opacity: 0.9;
    }
  }

  .slick-prev {
    left: 5px;
  }

  .slick-next {
    right: 5px;
  }

  @media (max-width: 768px) {
    .slick-prev {
      left: -30px;
    }

    .slick-next {
      right: -30px;
    }

    .slick-dots {
      bottom: -35px;
    }
  }
`;
const SliderContainer = styled.div`
  position: relative;
`;

function SliderComp({ products }) {
  const settings = {
    dots: true,
    infinite: products.length > 3,
    slidesToShow: Math.min(products.length, 3),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(products.length, 2),
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        }
      }
    ]
  };

  const safeParseExplore = (val) => {
    if (Array.isArray(val)) return val;
    if (!val) return [];
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : [val];
    } catch {
      return [val];
    }
  };

  return (
    <Wrapper className="category-section">
      <SliderContainer>
        <Slider {...settings}>
          {products.map((product, index) => {
            const safeExplore = safeParseExplore(product.explore_images);

            return (
              <div key={index}>
                <ProductCard
                  {...product}
                  exploreImage={safeExplore}
                  showExplore={safeExplore.length > 0}
                  animationDelay={index * 120}
                />
              </div>
            );
          })}
        </Slider>
      </SliderContainer>
    </Wrapper>
  );
}

export default SliderComp;