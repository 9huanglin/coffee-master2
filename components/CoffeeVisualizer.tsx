
import React, { useEffect, useState } from 'react';
import { IngredientLayer } from '../types';

interface CoffeeVisualizerProps {
  ingredients: IngredientLayer[];
  isAnimating: boolean;
}

const CoffeeVisualizer: React.FC<CoffeeVisualizerProps> = ({ ingredients, isAnimating }) => {
  const [visibleLayers, setVisibleLayers] = useState<number>(0);

  useEffect(() => {
    if (isAnimating) {
      setVisibleLayers(0);
      const timers: ReturnType<typeof setTimeout>[] = [];
      let currentDelay = 0;

      ingredients.forEach((_, index) => {
        // Stagger the appearance of layers
        const timer = setTimeout(() => {
          setVisibleLayers(prev => prev + 1);
        }, currentDelay);
        timers.push(timer);
        currentDelay += 800; // 800ms per layer
      });

      return () => timers.forEach(clearTimeout);
    } else {
      setVisibleLayers(ingredients.length);
    }
  }, [ingredients, isAnimating]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Cup Body - using strict aspect ratio but flexible width/height */}
      <svg viewBox="0 0 100 120" className="w-auto h-full max-w-full drop-shadow-xl filter overflow-visible">
        <defs>
          <linearGradient id="glassShine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
          </linearGradient>
        </defs>
        
        {/* Cup Shape - Darker strokes for light theme */}
        <path
          d="M15,10 L15,95 Q15,110 50,110 Q85,110 85,95 L85,10"
          fill="rgba(255, 255, 255, 0.2)"
          stroke="rgba(28, 25, 23, 0.2)"
          strokeWidth="2"
        />
        
        {/* Handle - Darker stroke */}
        <path 
           d="M85,30 Q100,30 100,50 Q100,70 85,70"
           fill="none"
           stroke="rgba(28, 25, 23, 0.2)"
           strokeWidth="3"
        />

        {/* Ingredients */}
        <g mask="url(#cupMask)">
           <mask id="cupMask">
             <path d="M16,10 L16,95 Q16,109 50,109 Q84,109 84,95 L84,10" fill="white" />
           </mask>
           
           {ingredients.map((layer, index) => {
             // Calculate SVG height based on percentage
             const layerHeight = layer.heightPercent;
             // Calculate Y position
             let yPos = 110; // Bottom of cup roughly
             for (let i = 0; i < index; i++) {
               yPos -= ingredients[i].heightPercent;
             }
             yPos -= layerHeight;

             const isVisible = index < visibleLayers;
             
             return (
               <rect
                 key={index}
                 x="15"
                 y={yPos}
                 width="70"
                 height={layerHeight}
                 fill={layer.color}
                 className={`transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
               />
             );
           })}
        </g>
        
        {/* Glass Reflection Overlay */}
        <path
          d="M15,10 L15,95 Q15,110 50,110 Q85,110 85,95 L85,10"
          fill="url(#glassShine)"
          className="pointer-events-none"
        />
      </svg>
      
      {/* Steam Animation - Only show when animating and fully loaded */}
      {isAnimating && visibleLayers === ingredients.length && (
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-20">
          <div className="w-1.5 h-6 bg-stone-300/50 rounded-full blur-sm animate-[pulse_2s_infinite]"></div>
          <div className="w-1.5 h-8 bg-stone-300/50 rounded-full blur-sm animate-[pulse_2s_infinite_0.5s]"></div>
          <div className="w-1.5 h-5 bg-stone-300/50 rounded-full blur-sm animate-[pulse_2s_infinite_1s]"></div>
        </div>
      )}
    </div>
  );
};

export default CoffeeVisualizer;
