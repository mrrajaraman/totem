import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../ui/Button';
import { ArrowRight, Star, ShieldCheck, MapPin, Volume2, VolumeX, Play, Pause, Compass } from 'lucide-react';
import { AnimatedCounter } from '../motion/MotionWrapper';

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Scroll-linked scale & opacity transform (FAANG standard: crisp on load, smooth depth on scroll)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.08]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [1.0, 0.25]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[96vh] flex items-center justify-center overflow-hidden pt-16 pb-24"
    >
      {/* Cinematic Video Background - Bright, Vivid, and Clear */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ scale: videoScale, opacity: videoOpacity }}
      >
        <video
          ref={videoRef}
          src="/hero.mp4"
          poster="https://pub-e8615bd8f25545d68dfeb23cda95d612.r2.dev/photos/totem-arena-wide.jpg"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.08]"
        />

        {/* Video Fallback Image while loading */}
        {!videoLoaded && (
          <img
            src="https://pub-e8615bd8f25545d68dfeb23cda95d612.r2.dev/photos/totem-arena-wide.jpg"
            alt="Totem VR Arena Bangalore"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.05]"
          />
        )}

        {/* Directional Vignettes (Keeps video crisp and visible while ensuring 100% text readability) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent pointer-events-none" />
      </motion.div>

      {/* Video Interactive Controls (Bottom Right) */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2">
        <button
          onClick={toggleSound}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white hover:text-[#39FF14] hover:border-[#39FF14] flex items-center justify-center transition-all shadow-lg focus-visible:outline-none"
          title={isMuted ? 'Unmute Arena Audio' : 'Mute Arena Audio'}
          aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#39FF14]" />}
        </button>

        <button
          onClick={togglePlay}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white hover:text-[#39FF14] hover:border-[#39FF14] flex items-center justify-center transition-all shadow-lg focus-visible:outline-none"
          title={isPlaying ? 'Pause Arena Feed' : 'Play Arena Feed'}
          aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-[#39FF14]" />}
        </button>

        <span className="font-mono text-[10px] uppercase tracking-wider text-white bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 hidden sm:inline-block shadow-lg">
          Live Arena Video
        </span>
      </div>

      {/* Content Container with Scroll Motion */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        style={{ y: textY, opacity: textOpacity }}
      >
        <div className="max-w-3xl">
          {/* Telemetry Status Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/85 border border-white/20 backdrop-blur-md mb-6 sm:mb-8 shadow-xl"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#39FF14] shadow-[0_0_12px_#39FF14] animate-pulse" />
            <span className="font-mono text-[11px] tracking-widest text-[#39FF14] uppercase font-bold">
              SESSION OPEN · BENGALURU
            </span>
            <span className="text-white/30 font-mono">|</span>
            <span className="font-mono text-[11px] text-white/90 hidden sm:inline">
              12.9374° N · 77.6265° E · Koramangala
            </span>
          </motion.div>

          {/* Editorial Display Headline with Word-Level Motion and High-Contrast Drop Shadow */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[0.95] mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
          >
            WALK INSIDE <br />
            <span className="text-white">THE </span>
            <span className="text-[#39FF14] inline-block relative text-electric-glow">
              GAME.
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                className="absolute -bottom-1 left-0 h-1 bg-[#39FF14] rounded-full blur-sm"
              />
            </span>
          </motion.h1>

          {/* Supporting Statement - High Contrast, 100% Readable */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-xl md:text-2xl text-white font-medium leading-relaxed max-w-2xl mb-8 md:mb-10 text-pretty drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
          >
            Free-roam untethered VR gaming in Koramangala. You and up to 5 friends each get a headset and walk inside the same virtual world together. No wires, no motion sickness, no gaming experience needed.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-12"
          >
            <Button
              to="/booking"
              size="lg"
              variant="primary"
              className="w-full sm:w-auto font-mono uppercase tracking-wider text-xs sm:text-sm font-bold shadow-[0_0_36px_-4px_rgba(57,255,20,0.6)] justify-center h-12 sm:h-14 px-5 sm:px-8"
              icon={<ArrowRight className="w-4 h-4 ml-1" />}
            >
              See Today&rsquo;s Slots · From ₹799
            </Button>

            <Button
              to="/worlds"
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto font-mono uppercase tracking-wider text-xs sm:text-sm bg-black/70 backdrop-blur-md border-white/30 text-white hover:border-[#39FF14] hover:bg-black/90 shadow-lg justify-center h-12 sm:h-14 px-5 sm:px-8"
            >
              Explore 20 Worlds
            </Button>
          </motion.div>

          {/* Supporting Micro-Trust Indicators in High-Contrast Frosted Containers */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-6 flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono"
          >
            <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 shadow-md">
              <div className="flex text-[#39FF14]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#39FF14]" />
                ))}
              </div>
              <span className="text-white font-semibold">
                <AnimatedCounter value={5.0} decimals={1} /> Google Rating
              </span>
            </div>

            <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 shadow-md text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
              <span>
                <strong className="text-white font-semibold">100%</strong> Private Arena Slot
              </span>
            </div>

            <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 shadow-md text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
              <span>
                Ages <strong className="text-white font-semibold">8+</strong> &amp; Families
              </span>
            </div>

            <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 shadow-md text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
              <span>
                <strong className="text-white font-semibold">20</strong> Licensed Worlds
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
