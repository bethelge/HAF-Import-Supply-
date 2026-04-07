import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function ProductCard({
  id,
  title,
  description,
  image,
  showExplore,
  exploreImage,
  animationDelay = 0,
}) {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Memoize parsed images to avoid repeated parsing
  const { normalizedImages, normalizedExploreImages } = useMemo(() => {
    const parseImages = (val) => {
      if (Array.isArray(val)) return val.filter(Boolean).map(img => img.replace(/\\/g, "/"));
      if (!val) return [];
      try {
        const parsed = JSON.parse(val);
        return Array.isArray(parsed) 
          ? parsed.filter(Boolean).map(img => img.replace(/\\/g, "/"))
          : [val.replace(/\\/g, "/")];
      } catch {
        return val ? [val.replace(/\\/g, "/")] : [];
      }
    };

    return {
      normalizedImages: parseImages(image),
      normalizedExploreImages: parseImages(exploreImage)
    };
  }, [image, exploreImage]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  // Image carousel effect
  useEffect(() => {
    if (normalizedImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % normalizedImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [normalizedImages]);

 const handleExploreClick = () => {
  
  navigate(`/image/${id}`, {
    state: { imageUrls: normalizedExploreImages },
  });
};

  return (
    <Card
      ref={cardRef}
      className={`card-3d ${isVisible ? "visible" : ""}`}
      style={{ "--card-index": animationDelay / 120 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ImageContainer>
        {normalizedImages.length === 0 ? (
          <NoImagePlaceholder>
            <NoImageIcon>📷</NoImageIcon>
            <NoImageText>No image available</NoImageText>
          </NoImagePlaceholder>
        ) : (
          normalizedImages.map((img, index) => (
            <img
              key={index}
              src={`${API_BASE_URL}${img}`}
              alt={title}
              loading="lazy"
              className={`main-img ${index === currentIndex ? "active" : ""}`}
            />
          ))
        )}
        <ImageOverlay className={isHovered ? "hovered" : ""}>
          <OverlayContent>
            <OverlayTitle>{title}</OverlayTitle>
            <OverlayDescription>{description}</OverlayDescription>
          </OverlayContent>
        </ImageOverlay>
      </ImageContainer>

      <CardContent>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardBadge>Featured</CardBadge>
        </CardHeader>
        <CardDescription>{description}</CardDescription>
        {showExplore && normalizedExploreImages.length > 0 && (
          <ExploreButton onClick={handleExploreClick}>
            <ButtonText>Explore</ButtonText>
            <ButtonIcon>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </ButtonIcon>
          </ExploreButton>
        )}
      </CardContent>
      
      {isHovered && (
        <>
          <HolographicBeam $position="left" />
          <HolographicBeam $position="right" />
        </>
      )}
    </Card>
  );
}

// Animations
const enterAnimation = keyframes`
  0% {
    transform: translateY(50px) scale(0.9);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;

const beamScan = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

// Styled Components
const Card = styled.div`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  opacity: 0;
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: 
    transform 0.35s ease,
    box-shadow 0.35s ease,
    opacity 0.8s ease;

  &.visible {
    animation: ${enterAnimation} 0.8s ease forwards;
    animation-delay: calc(var(--card-index, 0) * 0.2s);
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(56, 178, 172, 0.2);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;

  .main-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: 0;
    transition: opacity 0.5s ease;
    z-index: 0;
  }

  .main-img.active {
    opacity: 1;
    z-index: 1;
  }
`;

const NoImagePlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: rgba(0, 0, 0, 0.4);
`;

const NoImageIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 10px;
`;

const NoImageText = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  padding: 20px;
  z-index: 2;

  &.hovered {
    opacity: 1;
  }
`;

const OverlayContent = styled.div`
  color: white;
  transform: translateY(10px);
  transition: transform 0.3s ease;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

  ${ImageOverlay}.hovered & {
    transform: translateY(0);
  }
`;

const OverlayTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 8px 0;
`;

const OverlayDescription = styled.p`
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.9;
  line-height: 1.5;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  position: relative;
  z-index: 2;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h4`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #333;
  line-height: 1.3;
  flex: 1;
`;

const CardBadge = styled.span`
  background: linear-gradient(135deg, #38b2ac, #4299e1);
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size:16px;
  font-weight: 600;
  margin-left: 12px;
`;

const CardDescription = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
  min-height: 60px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ExploreButton = styled.button`
  width: 100%;
  padding: 12px 20px;
  background: linear-gradient(135deg, #38b2ac, #4299e1);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ButtonText = styled.span`
  font-weight: 600;
`;

const ButtonIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const HolographicBeam = styled.div`
  position: absolute;
  ${props => props.$position === 'left' ? 'left: 0;' : 'right: 0;'}
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(56, 178, 172, 0.8) 50%,
    transparent 100%
  );
  animation: ${beamScan} 1.5s linear infinite;
  animation-delay: ${props => props.$position === 'left' ? '0s' : '0.75s'};
  z-index: 1;
  pointer-events: none;
`;

export default ProductCard;