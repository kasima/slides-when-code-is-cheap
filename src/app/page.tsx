"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// --- New Typewriter Component ---
interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  onFinished?: () => void;
  startSignal?: boolean;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 50, className = "", onFinished, startSignal = true }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isActuallyFinished, setIsActuallyFinished] = useState(false);

  const charIndex = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const lastUpdateTime = useRef(0);

  useEffect(() => {
    charIndex.current = 0;
    setDisplayedText("");
    setIsActuallyFinished(false);
    lastUpdateTime.current = 0;

    if (!startSignal || !text) {
        if (text === "") {
            setIsActuallyFinished(true);
            if (onFinished) onFinished();
        }
        return;
    }

    const typeAnimation = (timestamp: number) => {
      if (charIndex.current >= text.length) {
        if (!isActuallyFinished) {
          setDisplayedText(text);
          setIsActuallyFinished(true);
          if (onFinished) onFinished();
        }
        return;
      }

      if (!lastUpdateTime.current) {
        lastUpdateTime.current = timestamp;
        animationFrameId.current = requestAnimationFrame(typeAnimation);
        return;
      }
      const deltaTime = timestamp - lastUpdateTime.current;
      const charsToAdvance = (deltaTime / 1000) * speed;
      const newCharIndexExact = charIndex.current + charsToAdvance;
      const newCharsToShowCount = Math.floor(newCharIndexExact);

      if (newCharsToShowCount > displayedText.length && newCharsToShowCount <= text.length) {
        setDisplayedText(text.substring(0, newCharsToShowCount));
      }
      
      charIndex.current = newCharIndexExact;
      lastUpdateTime.current = timestamp;

      if (newCharIndexExact < text.length) {
        animationFrameId.current = requestAnimationFrame(typeAnimation);
      } else {
        if (!isActuallyFinished) {
            setDisplayedText(text);
            setIsActuallyFinished(true);
            if (onFinished) onFinished();
        }
      }
    };

    animationFrameId.current = requestAnimationFrame(typeAnimation);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [text, speed, onFinished, startSignal]);

  return (
    <span
      key={text + startSignal}
      className={`${className} js-typewriter-output ${isActuallyFinished ? 'no-typing-border' : ''}`}
    >
      {displayedText}
    </span>
  );
};
// --- End Typewriter Component ---

type Slide = {
  title: string;
  content: string[] | React.ReactNode;
  contentClasses?: string[];
  itemClasses?: string[];
};

const slides: Slide[] = [
  {
    title: "When an LoC is Cheap",
    content: [
      "What still matters in software?",
      "Kasima Tharnpipitchai",
      "Head of AI Strategy, SCB 10X",
      "Cursor/SCB 10X Meetup – 2025-05-29"
    ],
    contentClasses: [
      "text-2xl md:text-3xl font-bold mt-8 text-[var(--text-primary)] drop-shadow-lg",
      "mt-6 text-lg text-[var(--text-secondary)] opacity-90 drop-shadow",
      "mt-2 text-sm text-[var(--text-secondary)] opacity-80",
      "mt-1 text-sm text-[var(--text-secondary)] opacity-70"
    ]
  },
  {
    title: "I Was Wrong.",
    content: (
      <div className="flex gap-8 items-center">
        <div className="w-[300px] relative h-[397px] rounded-lg overflow-hidden glass-effect">
          <Image 
            src="/images/ktgh2.jpg" 
            alt="Don't be this guy in 2015" 
            fill
            className="object-contain"
          />
        </div>
        <div className="flex-1 text-xl text-[var(--text-primary)] font-semibold">
          Don&apos;t be this guy in 2015
        </div>
      </div>
    ),
  },
  {
    title: "Code Gets Cheap",
    content: (
      <div className="flex gap-8 items-center">
        <div className="w-[200px] relative h-[356px] rounded-lg overflow-hidden glass-effect">
          <Image 
            src="/images/radio.jpg" 
            alt="Radio analogy" 
            fill
            className="object-contain"
          />
        </div>
        <div className="flex-1">
          <ul className="list-disc pl-6 space-y-3">
            <li className="text-[var(--text-primary)]">The cost of a line of code is approaching $0.</li>
            <li className="text-[var(--text-primary)]">Code required capital. Big Tech are caches of expensive, shared code.</li>
            <li className="text-[var(--text-primary)]">Analogy: What happened to radio?</li>
          </ul>
        </div>
      </div>
    ),
  }, 
  {
    title: "Opportunities For You",
    content: (
      <div className="flex gap-8 items-center">
        <div className="flex-1">
          <ul className="list-disc pl-6 space-y-3">
            <li className="text-[var(--text-primary)]">Teams don&apos;t need to be huge anymore.</li>
            <li className="text-[var(--text-primary)]">There&apos;s about to be a lot of disruption. New abstractions, new ways of working, new everything.</li>
            <li className="text-[var(--text-primary)]">Competitive advantage shifts from capital to clarity, values, vision.</li>
            <li className="text-[var(--text-primary)] font-semibold text-[var(--accent)]">Code is cheap. Insight is rare.</li>
          </ul>
        </div>
        <div className="w-[345px] relative h-[252px] rounded-lg overflow-hidden glass-effect">
          <Image 
            src="/images/collapse.gif" 
            alt="Collapse of complexity" 
            fill
            className="object-contain"
          />
        </div>
      </div>
    ),
  },
  {
    title: "What Still Matters",
    content: (
      <ul className="list-disc pl-6 space-y-4">
        <li className="text-[var(--text-primary)]"><b className="text-[var(--primary)] dark:text-[var(--accent)]">Critical Thinking:</b> AI output is happily nonsensical a lot of the time.</li>
        <li className="text-[var(--text-primary)]"><b className="text-[var(--primary)] dark:text-[var(--accent)]">Empathy:</b> Understanding real user needs, not just requirements.</li>
        <li className="text-[var(--text-primary)]"><b className="text-[var(--primary)] dark:text-[var(--accent)]">Creativity:</b> How to solve problems will require more than prompts.</li>
        <li className="text-[var(--text-primary)]"><b className="text-[var(--primary)] dark:text-[var(--accent)]">Taste:</b> The ability to recognize quality, simplicity, and what feels &lsquo;right.&rsquo;</li>
        <li className="text-[var(--text-primary)]"><b className="text-[var(--primary)] dark:text-[var(--accent)]">Purpose &amp; Values:</b> What you build &mdash; and why &mdash; matters more than ever.</li>
      </ul>
    ),
  },
  {
    title: "Keep Shipping 🚢",
    content: (
      <div className="flex gap-8 items-center">
        <div className="w-[300px] relative h-[532px] rounded-lg overflow-hidden glass-effect">
          <Image 
            src="/images/shipping.jpg" 
            alt="Keep shipping" 
            fill
            className="object-contain"
          />
        </div>
        <div className="flex-1">
          <div className="space-y-4">
            <p className="text-[var(--text-primary)] text-lg">Software is no longer limited by ability — only by intention.</p>
            <p className="text-[var(--text-primary)] text-lg">In a world where anyone can build anything, what you choose to build says everything.</p>
          </div>
        </div>
      </div>
    ),
  },
];

export default function Slides() {
  const [index, setIndex] = useState(0);

  const goTo = useCallback((i: number) => {
    setIndex(i);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "ArrowRight" || e.key === "PageDown") && index < slides.length - 1) {
        goTo(index + 1);
      } else if ((e.key === "ArrowLeft" || e.key === "PageUp") && index > 0) {
        goTo(index - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, goTo]);

  const currentSlide = slides[index];

  const renderSlideContent = () => {
    const content = currentSlide.content;
    const contentClasses = currentSlide.contentClasses;
    const itemClasses = (currentSlide.itemClasses || []) as string[];

    if (typeof content === 'string') {
      return (
        <p className={typeof contentClasses === 'string' ? contentClasses : ""}>
          {content}
        </p>
      );
    } else if (Array.isArray(content)) {
      const texts = content;
      const classesArray =
        typeof contentClasses === 'string'
          ? [contentClasses]
          : Array.isArray(contentClasses)
            ? contentClasses
            : [];
      const isList = classesArray.includes('list-disc');
      
      const WrapperElement = isList ? 'ul' : motion.div;
      const ItemElement = isList ? 'li' : 'p';

      return (
        <WrapperElement className={isList && typeof contentClasses === 'string' ? contentClasses : undefined}>
          {texts.map((text, idx) => {
            const lineKey = `${index}-${idx}`;
            const lineClassName = isList ? (itemClasses[idx] || "text-[var(--text-primary)]") : (Array.isArray(contentClasses) ? contentClasses[idx] : "");

            return (
              <ItemElement key={lineKey} className={lineClassName}>
                {text}
              </ItemElement>
            );
          })}
        </WrapperElement>
      );
    } else {
      return content;
    }
  };

  return (
    <div className="min-h-screen w-full gradient-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Decorative elements */}
      <div className="decorative-circle circle-1"></div>
      <div className="decorative-circle circle-2"></div>
      <div className="decorative-circle circle-3"></div>
      
      {/* Animated Hypercube - Scene is now keyed */}
      <div className="hypercube-scene" key={`hypercube-scene-${index}`}> 
        <div className="hypercube-container">
          {/* Outer Cube */}
          <div className="cube outer-cube">
            <div className="cube-face front"></div>
            <div className="cube-face back"></div>
            <div className="cube-face left"></div>
            <div className="cube-face right"></div>
            <div className="cube-face top"></div>
            <div className="cube-face bottom"></div>
          </div>
          {/* Inner Cube */}
          <div className="cube inner-cube">
            <div className="cube-face front"></div>
            <div className="cube-face back"></div>
            <div className="cube-face left"></div>
            <div className="cube-face right"></div>
            <div className="cube-face top"></div>
            <div className="cube-face bottom"></div>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-700 dark:bg-gray-800">
        <div 
          className="progress-bar h-full"
          style={{ width: `${((index + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Slide number */}
      <div className="fixed top-4 left-4 text-sm text-[var(--text-primary)] select-none glass-effect px-3 py-1.5 rounded-full shadow-lg">
        {index + 1} / {slides.length}
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-screen w-full p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ 
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="w-full max-w-4xl glass-effect rounded-2xl p-8 md:p-12 shadow-2xl"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-8 syntax-highlight-title"
            >
              <Typewriter
                text={currentSlide.title}
                speed={20}
                className="inline"
                startSignal={true}
              />
            </motion.h1>
            <div className="slide-content-prose min-h-[150px]">
              {renderSlideContent()}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex gap-4 mt-10">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(0,122,255,0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="button-hover px-6 py-3 rounded-full glass-effect text-[var(--text-primary)] disabled:opacity-40 font-semibold"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
          >
            ← Prev
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(0,122,255,0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="button-hover px-6 py-3 rounded-full glass-effect text-[var(--text-primary)] disabled:opacity-40 font-semibold"
            onClick={() => goTo(index + 1)}
            disabled={index === slides.length - 1}
          >
            Next →
          </motion.button>
        </div>

        {/* Slide indicators */}
        <div className="flex gap-2 mt-8">
          {slides.map((_, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.2 }}
              className={`slide-indicator ${i === index ? 'active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
