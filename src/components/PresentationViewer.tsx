'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Locale } from '@/data/translations';
import {
  TitleSlide,
  BrandIntroSlide,
  AmbassadorsSlide,
  ProductLinesSlide,
  PortfolioSlide,
  WhyEnervitSlide,
  PricingSlide,
  PlanogramSlide,
  SupportSlide,
  ConditionsSlide,
  SummarySlide,
  ThankYouSlide,
} from '@/components/slides';

interface Props {
  locale: Locale;
  selectedSlides: number[];
  partnerLogo?: string;
  partnerName?: string;
  salesPerson: string;
}

export default function PresentationViewer({ locale, selectedSlides, partnerLogo, partnerName, salesPerson }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const slides = selectedSlides.sort((a, b) => a - b);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault();
      setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setCurrentSlide(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Escape') {
      setIsFullscreen(false);
    } else if (e.key === 'f' || e.key === 'F') {
      toggleFullscreen();
    }
  }, [slides.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (containerRef.current) {
      const slideElements = containerRef.current.querySelectorAll('.slide');
      slideElements[currentSlide]?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentSlide]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const renderSlide = (slideId: number) => {
    const shared = { locale, partnerLogo, partnerName };
    switch (slideId) {
      case 1: return <TitleSlide {...shared} />;
      case 2: return <BrandIntroSlide locale={locale} />;
      case 3: return <AmbassadorsSlide locale={locale} />;
      case 4: return <ProductLinesSlide locale={locale} />;
      case 5: return <PortfolioSlide locale={locale} />;
      case 6: return <WhyEnervitSlide {...shared} />;
      case 7: return <PricingSlide locale={locale} />;
      case 8: return <PlanogramSlide locale={locale} />;
      case 9: return <SupportSlide locale={locale} />;
      case 10: return <ConditionsSlide locale={locale} />;
      case 11: return <SummarySlide {...shared} salesPerson={salesPerson} />;
      case 12: return <ThankYouSlide {...shared} salesPerson={salesPerson} />;
      default: return null;
    }
  };

  return (
    <div className="relative">
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={toggleFullscreen}
          className="w-10 h-10 bg-black/60 backdrop-blur-sm rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-black/80 transition cursor-pointer"
          title="Fullscreen (F)"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            {isFullscreen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            )}
          </svg>
        </button>
      </div>

      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrentSlide(i)}
            className={`progress-dot cursor-pointer ${i === currentSlide ? 'active' : ''}`} />
        ))}
      </div>

      <div className="fixed bottom-4 right-4 z-50 text-white/30 text-xs bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
        {currentSlide + 1} / {slides.length}
      </div>

      <div ref={containerRef} className="slide-container">
        {slides.map((slideId) => (
          <div key={slideId}>{renderSlide(slideId)}</div>
        ))}
      </div>
    </div>
  );
}
