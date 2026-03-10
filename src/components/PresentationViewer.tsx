'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Locale } from '@/data/translations';
import {
  TitleSlide,
  BrandIntroSlide,
  ProductSlide,
  RoyalBaySlide,
  EventsSlide,
  PartnershipsSlide,
  B2BProgramSlide,
  ContactSlide,
} from '@/components/slides';

interface Props {
  locale: Locale;
  selectedSlides: number[];
  partnerLogo?: string;
  partnerName?: string;
  salesPerson: string;
}

const SLIDE_COMPONENTS: Record<number, string> = {
  1: 'title',
  2: 'brand_intro',
  3: 'enervit_products',
  4: 'royalbay',
  5: 'events',
  6: 'partnerships',
  7: 'b2b_program',
  8: 'contact',
};

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
    switch (SLIDE_COMPONENTS[slideId]) {
      case 'title':
        return <TitleSlide locale={locale} partnerLogo={partnerLogo} partnerName={partnerName} />;
      case 'brand_intro':
        return <BrandIntroSlide locale={locale} />;
      case 'enervit_products':
        return <ProductSlide locale={locale} />;
      case 'royalbay':
        return <RoyalBaySlide locale={locale} />;
      case 'events':
        return <EventsSlide locale={locale} />;
      case 'partnerships':
        return <PartnershipsSlide locale={locale} />;
      case 'b2b_program':
        return <B2BProgramSlide locale={locale} />;
      case 'contact':
        return <ContactSlide locale={locale} salesPerson={salesPerson} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* Controls */}
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

      {/* Progress dots */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`progress-dot cursor-pointer ${i === currentSlide ? 'active' : ''}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="fixed bottom-4 right-4 z-50 text-white/30 text-xs bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
        {currentSlide + 1} / {slides.length}
      </div>

      {/* Slides */}
      <div ref={containerRef} className="slide-container">
        {slides.map((slideId) => (
          <div key={slideId}>
            {renderSlide(slideId)}
          </div>
        ))}
      </div>
    </div>
  );
}
