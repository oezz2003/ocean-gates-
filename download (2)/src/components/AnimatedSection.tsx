"use client";

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type AnimationDirection = 'up' | 'left' | 'right';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  direction?: AnimationDirection;
  id?: string;
  dir?: string;
}

export default function AnimatedSection({ 
  children, 
  className, 
  as: Tag = 'section',
  direction = 'up', 
  id,
  dir
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const animationClass = {
    up: 'animate-fade-in-up',
    left: 'animate-fade-in-left',
    right: 'animate-fade-in-right',
  }[direction];

  return (
    <Tag
      ref={sectionRef}
      id={id}
      dir={dir}
      className={cn(
        'section-animate',
        animationClass,
        isVisible ? 'is-visible' : '',
        className
      )}
    >
      {children}
    </Tag>
  );
}
