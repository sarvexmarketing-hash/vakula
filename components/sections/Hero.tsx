"use client";

import Image from "next/image";
import { Play, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { MaskedLines } from "@/components/ui/MaskedLines";
import { useLenis } from "@/components/providers/LenisProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { showcaseLooks } from "@/data/products";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const [revealed, setRevealed] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [filmModalOpen, setFilmModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (revealed && !filmModalOpen) lenis.start();
    else lenis.stop();
  }, [lenis, revealed, filmModalOpen]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [revealed]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia(el);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 1,
            onUpdate: (self) =>
              document.documentElement.toggleAttribute("data-hero-framed", self.progress > 0.78),
          },
        })
        .to("[data-hero-copy]", { yPercent: -30, opacity: 0, duration: 0.18 }, 0.04)
        .fromTo("[data-chapter]", { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.3)
        .from("[data-chapter-line]", { yPercent: 110, stagger: 0.03, duration: 0.1, ease: "power2.out" }, 0.3)
        .from("[data-chapter-note]", { opacity: 0, y: 30, duration: 0.08 }, 0.36)
        .to("[data-chapter]", { opacity: 0, y: -40, duration: 0.1 }, 0.6)
        .to("[data-hero-frame]", { clipPath: "inset(9% 5% 9% 5% round 28px)", duration: 0.2 }, 0.8)
        .to("[data-hero-scrub]", { scale: 1.06, duration: 0.2 }, 0.8)
        .to(el, { backgroundColor: showcaseLooks[0].accent, duration: 0.2 }, 0.8);

      gsap
        .timeline({
          scrollTrigger: {
            trigger: document.getElementById("showcase"),
            start: "top bottom",
            end: "top top",
            scrub: 1,
          },
        })
        .to("[data-hero-frame]", { yPercent: 12, scale: 0.8, ease: "none" }, 0)
        .to("[data-hero-frame]", { opacity: 0, ease: "power1.inOut" }, 0);

      return () => document.documentElement.removeAttribute("data-hero-framed");
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el || !revealed || reduced) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-copy] [data-line]", {
        yPercent: 110,
        duration: 1.3,
        ease: "power4.out",
        stagger: 0.12,
        delay: 0.35,
      });
      gsap.from("[data-intro]", {
        opacity: 0,
        y: 60,
        skewY: 4,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.08,
        delay: 0.65,
      });
      gsap.from("[data-hero-zoom]", { scale: 1.15, duration: 2.4, ease: "power3.out" });
    }, el);

    return () => ctx.revert();
  }, [revealed, reduced]);

  return (
    <>
      {/* Intro Reveal Screen */}
      <div
        aria-hidden
        className={`fixed inset-0 z-[60] flex flex-col items-center justify-center bg-ivory transition-opacity duration-1000 ${
          revealed ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <p className="font-serif text-2xl sm:text-3xl tracking-[0.2em] text-espresso">KANCHEEPURAM VAKULA SILKS</p>
        <div className="mt-6 h-px w-56 overflow-hidden bg-espresso/10">
          <div className="h-full origin-left bg-gold animate-pulse" />
        </div>
        <p className="eyebrow mt-4 text-[10px] text-espresso/50">Atelier · Handwoven Heritage</p>
      </div>

      <section id="top" ref={root} className="relative h-screen overflow-hidden bg-ivory" aria-label="Spring Summer 26 film">
        <div
          data-hero-frame
          className="absolute inset-0 overflow-hidden bg-espresso"
          style={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
        >
          <div data-hero-zoom className="absolute inset-0">
            <div data-hero-scrub className="absolute inset-0">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                poster="/images/hero-poster.jpg"
                className="absolute inset-0 h-full w-full object-cover object-[68%_center] md:object-center"
              >
                <source src="/videos/hero-background.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Gradients: on mobile, top is bright & open so video shines through; bottom has text gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/30 to-transparent md:bg-gradient-to-r md:from-espresso/80 md:via-espresso/40 md:to-transparent" />
          <div className="hidden md:block absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-espresso/70 to-transparent" />

          {/* Audio toggle button on the hero video */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute top-24 right-4 z-20 flex items-center gap-2 rounded-full border border-ivory/30 bg-espresso/60 px-3.5 py-2 text-xs text-ivory backdrop-blur-md transition-all hover:bg-espresso/80 hover:scale-105 md:top-auto md:bottom-8 md:right-8 md:px-4 md:py-2.5"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX className="h-4 w-4 text-gold" /> : <Volume2 className="h-4 w-4 text-gold" />}
            <span className="hidden sm:inline font-sans text-[11px] uppercase tracking-widest text-ivory/90">
              {isMuted ? "Sound Off" : "Sound On"}
            </span>
          </button>

          {/* Intermediate chapter reveal on scroll */}
          <div data-chapter className="pointer-events-none absolute inset-0 opacity-0">
            <div className="absolute inset-0 bg-gradient-to-r from-espresso/70 via-espresso/20 to-transparent" />
            <div className="relative mx-auto flex h-full max-w-[1440px] items-center px-6 md:px-10">
              <div className="max-w-lg text-ivory">
                <p data-chapter-note className="eyebrow text-gold">
                  The Saree Edit
                </p>
                <h2 className="mt-4 font-serif text-[clamp(2.75rem,6.5vw,6rem)] leading-[1]">
                  <span className="block overflow-hidden pb-[0.08em]">
                    <span data-chapter-line className="block">
                      Six yards of
                    </span>
                  </span>
                  <span className="block overflow-hidden pb-[0.08em]">
                    <span data-chapter-line className="block italic text-gold">
                      handwoven silk.
                    </span>
                  </span>
                </h2>
                <p data-chapter-note className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/80">
                  Banarasi, Kanjivaram and Chanderi &mdash; woven by hand for the days you will remember forever.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero copy */}
        <div
          data-hero-copy
          className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end pb-14 pt-24 text-ivory md:justify-center md:pb-8 px-6 md:px-10"
        >
          <p data-intro className="eyebrow mb-2 text-gold md:mb-6 [@media(max-height:640px)]:mb-2">
            Spring · Summer &rsquo;26
          </p>
          <MaskedLines
            as="h1"
            lines={["Dressed in", "Poetry."]}
            className="font-serif text-[clamp(2.35rem,7.5vw,9.5rem)] leading-[0.95] tracking-tight"
          />
          <p
            data-intro
            className="mt-3 max-w-md text-[13px] leading-relaxed text-ivory/85 md:mt-8 md:text-[15px] [@media(max-height:640px)]:mt-2"
          >
            Banarasi, Kanjivaram and Chanderi sarees woven from pure mulberry silks and gilded zari &mdash; hand-finished
            in our atelier for the moments you will cherish forever.
          </p>
          <div data-intro className="mt-5 flex flex-wrap items-center gap-3 md:mt-10 md:gap-4 [@media(max-height:640px)]:mt-4">
            <a
              href="#new-in"
              className="rounded-full bg-gold px-6 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-espresso transition-transform duration-300 hover:-translate-y-0.5 md:px-8 md:py-4 md:text-[13px]"
            >
              Shop the Collection
            </a>
            <button
              onClick={() => {
                setFilmModalOpen(true);
                setIsMuted(false);
              }}
              className="group flex items-center gap-2.5 rounded-full border border-ivory/50 px-5 py-3 text-xs uppercase tracking-[0.2em] backdrop-blur-sm transition-colors hover:bg-ivory/10 md:px-7 md:py-[15px] md:text-[13px]"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              Watch the Film
            </button>
          </div>
        </div>
      </section>

      {/* Film Lightbox Modal */}
      {filmModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-espresso/90 backdrop-blur-xl p-4 md:p-10"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setFilmModalOpen(false)}
            className="absolute top-6 right-6 z-10 grid h-12 w-12 place-items-center rounded-full bg-ivory/10 text-ivory transition-transform hover:scale-110 hover:bg-ivory/20"
            aria-label="Close film"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-3xl shadow-2xl bg-black">
            <video
              autoPlay
              controls
              playsInline
              className="h-full w-full object-cover"
              src="/videos/hero-background.mp4"
            />
          </div>
        </div>
      )}
    </>
  );
}
