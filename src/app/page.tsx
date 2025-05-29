"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const slides = [
  {
    title: "When Code Is Cheap: What Still Matters in Software",
    content: [
      "What happens when code is no longer the bottleneck?",
      "Kasima Tharnpipitchai"
    ],
    contentClasses: [
      "text-3xl md:text-4xl font-bold mt-8 text-[var(--text-primary)] drop-shadow-lg",
      "mt-6 text-xl text-[var(--text-secondary)] opacity-90 drop-shadow"
    ]
  },
  {
    title: "I Was Wrong.",
    content: [
        "Anecdote:",
        "Tell the GitHub story — the moment you realized Copilot wasn&apos;t just autocomplete.",
        "Establish the before and after: from code being expensive to code becoming cheap."
    ],
    contentClasses: [
        "text-xl text-[var(--text-primary)] font-semibold",
        "mt-4 text-[var(--text-secondary)]",
        "mt-4 text-[var(--text-secondary)]"
    ]
  },
  {
    title: "The Shift: AI and the Cheapening of Code",
    content: [
      "The cost of software production is falling due to AI.",
      "Code is becoming commoditized — like music, photography, video editing.",
      "Analogy: What happened to Blockbuster, record labels, ad agencies?"
    ],
    contentClasses: "list-disc pl-6 space-y-3"
  },
  {
    title: "What Still Matters: The Human Stack",
    content: (
      <ul className="list-disc pl-6 space-y-4">
        <li className="text-[var(--text-primary)]"><b className="text-[var(--primary)] dark:text-[var(--accent)]">Empathy:</b> Understanding real user needs, not just requirements.<br/><span className="text-[var(--text-secondary)] dark:text-[var(--text-light)] italic text-sm">&quot;You can ask an LLM to write 100 features. Only humans know which ones matter.&quot;</span></li>
        <li className="text-[var(--text-primary)]"><b className="text-[var(--primary)] dark:text-[var(--accent)]">Purpose &amp; Values:</b> What you build &mdash; and why &mdash; matters more than how fast you can build it.</li>
        <li className="text-[var(--text-primary)]"><b className="text-[var(--primary)] dark:text-[var(--accent)]">Taste:</b> The ability to recognize quality, simplicity, and what feels &lsquo;right.&rsquo; <br/><span className="text-[var(--text-secondary)] dark:text-[var(--text-light)] italic text-sm">&quot;AI can generate a design. It takes taste to reject the first draft.&quot;</span></li>
        <li className="text-[var(--text-primary)]"><b className="text-[var(--primary)] dark:text-[var(--accent)]">Creativity:</b> The next big idea won&apos;t be a prompt. It&apos;ll be a perspective shift.</li>
        <li className="text-[var(--text-primary)]"><b className="text-[var(--primary)] dark:text-[var(--accent)]">Judgment &amp; Problem Framing:</b> AI is great at solving well-defined problems. But it won&apos;t tell you which problem to solve.</li>
      </ul>
    ),
  },
  {
    title: "Implications for Builders & Teams",
    content: [
      "Teams don&apos;t need to be huge anymore.",
      "Competitive advantage shifts from capital and headcount → to clarity, values, vision.",
      "Code is cheap. Insight is rare."
    ],
    contentClasses: "list-disc pl-6 space-y-3",
    itemClasses: ["text-[var(--text-primary)]", "text-[var(--text-primary)]", "text-[var(--text-primary)] font-semibold text-[var(--accent)]"]
  },
  {
    title: "Closing: A Call to Build Wisely",
    content: [
      "Software is no longer limited by ability — only by intention.",
      "In a world where anyone can build anything, what you choose to build says everything.",
      "“What will you build, now that the only limit is your humanity?”"
    ],
    contentClasses: ["text-[var(--text-primary)] text-lg", "mt-4 text-[var(--text-primary)] text-lg", "mt-8 font-bold text-3xl text-[var(--primary)] dark:text-[var(--accent)] drop-shadow-md"]
  },
];

export default function Slides() {
  const [index, setIndex] = useState(0);

  const goTo = useCallback((i: number) => {
    setIndex(i);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && index < slides.length - 1) {
        goTo(index + 1);
      } else if (e.key === "ArrowLeft" && index > 0) {
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
    const itemClasses = currentSlide.itemClasses || [];

    if (typeof content === 'string') {
      return (
        <p className={typeof contentClasses === 'string' ? contentClasses : ""}>
          {content}
        </p>
      );
    } else if (Array.isArray(content)) {
      const texts = content;
      const isList = typeof contentClasses === 'string' && contentClasses.includes('list-disc');
      
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
              className="text-4xl md:text-5xl font-bold mb-8 text-[var(--text-primary)] drop-shadow-md"
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
