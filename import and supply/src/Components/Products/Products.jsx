import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import SliderComp from "./Slider";
import axios from "axios";
import SEO from "../SEO";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
function Products() {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [hoveredCategory, setHoveredCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${API_BASE_URL}/api/product`);
      const grouped = {};

      res.data.forEach((product) => {
        const category = product.category;
        const exploreImage = product.explore_images || [];
        if (!grouped[category]) grouped[category] = [];
        grouped[category].push({ ...product, exploreImage });
      });

      setProductsByCategory(grouped);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <div>
        <SEO
          title="Products - HAF Import & Supply Trade"
          description="Browse our wide range of products: water purification systems, agricultural inputs, laboratory equipment, and industrial machinery."
          keywords="HAF products, lab equipment Ethiopia, agriculture inputs Ethiopia, industrial machines Ethiopia"
          url="https://hafist.com/products"
          image="/og-image.jpg"
          canonical="https://hafist.com/products"
        />
        
      </div>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Our Premium Collection</HeroTitle>
          <HeroSubtitle>
            Designed for modern living with sustainability in mind
          </HeroSubtitle>
          <Watermark>ECO-FRIENDLY</Watermark>
        </HeroContent>
        {/* <WaveBackground /> */}
      </HeroSection>

      <ContentWrapper>
        {Object.entries(productsByCategory).map(
          ([category, products], index) => (
            <CategoryWrapper
              key={category}
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(null)}
              $hovered={hoveredCategory === index}
            >
              <CategoryHeader>
                <CategoryTitle>
                  <CategoryIcon $hovered={hoveredCategory === index}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 13L9 17L19 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </CategoryIcon>
                  {category}
                </CategoryTitle>
                <ProductCount>
                  <span>{products.length}</span> premium items available
                </ProductCount>
              </CategoryHeader>
              <SliderComp products={products} />
            </CategoryWrapper>
          )
        )}
      </ContentWrapper>
    </Container>
  );
}

// Animations
const floatIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const waveAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

// Styled Components
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-family);
  transition: background 0.3s ease, color 0.3s ease;
`;

const HeroSection = styled.section`
  height: 50vh;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: var(--gradient-hero);
`;

const WaveBackground = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%23ffffff' opacity='.25'/%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' fill='%23ffffff' opacity='.5'/%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%23ffffff'/%3E%3C/svg%3E");
  background-size: 1200px 100px;
  animation: ${waveAnimation} 20s linear infinite;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 0 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: clamp(1rem, 3vw, 2.5rem);
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: white;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto;
  font-weight: 300;
  line-height: 1.6;
`;

const Watermark = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: clamp(2rem, 7vw, 8rem);
  font-weight: 900;
  color: rgba(255, 255, 255, 0.05);
  z-index: 1;
  pointer-events: none;
  user-select: none;
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 20px;
`;

const CategoryWrapper = styled.div`
  margin-bottom: 60px;
  animation: ${floatIn} 0.6s ease-out forwards;
  animation-delay: ${(props) => props.$index * 0.1}s;
  opacity: 0;
  position: relative;
  background: var(--card-bg);
  border-radius: var(--radius-xl);
  padding: 24px;
  border: 1px solid var(--border-color);
  box-shadow: var(--card-shadow);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-4px);
  }

  &::before {
    content: "";
    position: absolute;
    top: 24px;
    left: 0;
    width: 4px;
    height: calc(100% - 48px);
    background: var(--gradient-primary);
    border-radius: 2px;
    transition: all 0.3s ease;
    transform: ${(props) => (props.$hovered ? "scaleY(1.1)" : "scaleY(0.9)")};
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-left: 20px;
`;

const CategoryTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 12px;
  transition: color 0.3s ease;
`;

const CategoryIcon = styled.span`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${(props) => (props.$hovered ? "var(--color-primary)" : "var(--bg-tertiary)")};
  color: ${(props) => (props.$hovered ? "white" : "var(--color-secondary)")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ProductCount = styled.span`
  font-size: 1rem;
  color: var(--text-secondary);
  transition: color 0.3s ease;

  span {
    font-weight: 700;
    color: var(--color-primary);
  }
`;

export default Products;
