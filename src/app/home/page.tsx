'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function HomePage() {
    const [copied, setCopied] = useState(false);
    const [showAudioDialog, setShowAudioDialog] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showContractAddress, setShowContractAddress] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const caRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.scrollTo({ top: 0, behavior: 'smooth' });
        scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        setShowAudioDialog(true);
    }, []);

    const [showBamboo, setShowBamboo] = useState(false);

    const handlePlayMusic = async () => {
        const audio = audioRef.current;
        if (audio) {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch (err) {
                console.error('Failed to play music:', err);
                toast({
                    title: 'Could not play music',
                    description: 'Please try again using the volume button.',
                    variant: 'destructive',
                    duration: 3000,
                });
            }
        }

        setShowAudioDialog(false);
        setShowBamboo(true);
    };

    const toggleMusic = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
            return;
        }

        try {
            await audio.play();
            setIsPlaying(true);
        } catch (err) {
            console.error('Failed to play music:', err);
            setIsPlaying(false);
        }
    };

    const handleShowContractAddress = () => {
        setShowContractAddress(true);
        setTimeout(() => {
            caRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 50);
    };

    const copyContractAddress = async () => {
        const contractAddress = 'Coming Soon';
        try {
            await navigator.clipboard.writeText(contractAddress);
            toast({
                title: "Contract Address coming soon",
                duration: 2000,
            });
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <div className="flex flex-col min-h-screen text-foreground relative" style={{
            minHeight: '100vh',
            minHeight: '100dvh',
        }}>
            <style jsx>{`
    @keyframes pandaBounce {
        0% {
            transform: translateY(-500px) rotate(-15deg);
            opacity: 0;
        }
        60% {
            transform: translateY(30px) rotate(5deg);
        }
        80% {
            transform: translateY(-10px) rotate(-2deg);
        }
        100% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
    }

    .animate-panda-bounce {
        animation: pandaBounce 1.6s ease-out forwards;
    }
`}</style>
            
            <video 
                src="/BackgroundVid.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                disablePictureInPicture={true}
                disableRemotePlayback={true}
                preload="auto"
                className="fixed top-0 left-0 w-screen h-screen object-cover z-0 pointer-events-none brightness-125"
                style={{
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none',
                    userSelect: 'none',
                    minHeight: '100vh',
                    minWidth: '100vw',
                    position: 'fixed',
                    transform: 'translate3d(0, 0, 0)',
                    backfaceVisibility: 'hidden',
                }}
                onContextMenu={(e) => e.preventDefault()}
            />
            
            <div
                ref={scrollContainerRef}
                className="relative z-10 flex flex-col min-h-screen overflow-y-auto md:overflow-y-visible"
                style={{
                minHeight: '100vh',
                minHeight: '100dvh',
            }}
            >
             <audio ref={audioRef} loop preload="auto" src="/panda_audio.mp3" />

            <AlertDialog open={showAudioDialog} onOpenChange={setShowAudioDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Welcome to LPANDA</AlertDialogTitle>
                        <AlertDialogDescription>
                            Would you like to enable background music for the full experience?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
    onClick={() => {
        setShowAudioDialog(false);
        setShowBamboo(true);
    }}
>
    Mute
</AlertDialogCancel>
                        <AlertDialogAction onClick={handlePlayMusic}>Play Music</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            
            <Button
                variant="ghost"
                size="icon"
                className="fixed bottom-4 right-4 z-50 bg-black/50 backdrop-blur-sm"
                onClick={toggleMusic}
            >
                {isPlaying ? <Volume2 /> : <VolumeX />}
            </Button>

            <header className="fixed top-0 left-0 right-0 z-40 bg-black/70 backdrop-blur-md border-b border-primary/20">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-center">
                    <nav className="flex gap-8">
                        <Link
                            href="/home"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToTop();
                            }}
                            className="text-white/80 hover:text-primary transition-colors font-semibold"
                        >
                            Home
                        </Link>
                        <Link href="#gallery" className="text-white/80 hover:text-primary transition-colors font-semibold">
                            Gallery
                        </Link>
                        <Link href="#whitepaper" className="text-white/80 hover:text-primary transition-colors font-semibold">
                            Whitepaper
                        </Link>
                        <Link href="/last" className="text-white/80 hover:text-primary transition-colors font-semibold">
                            Progress
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-2 md:px-4 pt-8 md:pt-12">
                <section id="home" className="grid md:grid-cols-2 items-center justify-center py-8 md:py-12 gap-12 text-center md:text-left relative min-h-[100vh]">
                    {showBamboo && (
    <div className="hidden md:block">
        <div className="absolute bottom-36 left-1/2 -translate-x-1/2 z-10">
    <div className="animate-panda-bounce">
        <div className="animate-bamboo-float will-change-transform">
            <Image
                src="/bamboo.png"
                alt="Head to the Bamboo Forest"
                width={350}
                height={200}
                className="cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => window.open('https://lpanda-mint.vercel.app/', '_blank')}
            />
        </div>
    </div>
</div>
    </div>
)}

                    {showBamboo && (
    <div className="block md:hidden absolute bottom-64 left-4 right-4 z-10">



        <div className="flex justify-center">
            <div className="animate-panda-bounce">
                <div className="animate-bamboo-float will-change-transform">
                    <Image
                        src="/bamboo.png"
                        alt="Head to the Bamboo Forest"
                        width={200}
                        height={120}
                        className="max-w-[200px] h-auto cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => window.open('https://lpanda-mint.vercel.app/', '_blank')}
                    />
                </div>
            </div>
        </div>
    </div>
)}

                    {/* Desktop: keep existing positioning (do not change) */}
                    <div className="hidden md:flex absolute right-3 top-36 z-10 flex w-52 flex-col items-stretch gap-6 sm:right-6 sm:w-60 sm:gap-8 md:right-10 md:top-32 md:w-72 lg:right-16 lg:w-80 xl:w-96">
                        <div className="group relative h-52 w-full overflow-hidden rounded-xl border-4 border-primary/50 transition-all duration-300 [perspective:1000px] hover:border-primary hover:shadow-[0_0_30px_10px_hsl(var(--primary)/0.3)] hover:scale-105 sm:h-60 md:h-72 lg:h-80 xl:h-96">
                            <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                {/* Front */}
                                <div className="absolute inset-0 [backface-visibility:hidden]">
                                    <Image
                                        src="/Lpanda.png"
                                        alt="LPANDA"
                                        width={384}
                                        height={384}
                                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-black/10" />
                                </div>

                                {/* Back */}
                                <div className="absolute inset-0 overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]">
                                    <div className="flex h-full w-full flex-col justify-between bg-black/55 p-4 backdrop-blur-sm sm:p-5">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center gap-2 rounded-full bg-purple-600/30 px-3 py-1 text-xs font-semibold text-white ring-1 ring-purple-400/40">
                                                <span className="h-2 w-2 rounded-full bg-white/70" />
                                                OG Phase Live
                                            </span>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="text-2xl font-extrabold leading-tight text-cyan-300 sm:text-3xl">
                                                Immortal
                                            </div>
                                            <div className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                                                Laughing Panda
                                            </div>
                                            <div className="text-sm text-white/85 sm:text-base">
                                                Limited Edition NFT Collection on Base
                                            </div>
                                            <div className="text-xs text-white/70 sm:text-sm">
                                                8 / 150 Minted <span className="mx-2">•</span> 150 Total Supply
                                            </div>
                                        </div>

                                        <p className="text-xs leading-relaxed text-white/80 sm:text-sm">
                                            Immortal Laughing Panda is a unique generative NFT collection created through layered digital traits.
                                            Each Panda is one-of-a-kind with distinct accessories and attributes stored on the blockchain.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/last"
                            className="w-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-3.5 text-center text-sm font-bold leading-tight tracking-wide text-white no-underline shadow-[0_4px_20px_rgba(6,182,212,0.35)] transition-all duration-300 hover:scale-105 hover:from-blue-400 hover:to-cyan-300 hover:shadow-[0_6px_28px_rgba(6,182,212,0.55)] active:scale-95 sm:px-6 sm:py-4 sm:text-base sm:tracking-wider"
                        >
                            Behind The Scenes
                        </Link>
                    </div>

                    {/* Mobile: place below bamboo and just above NFT gallery */}
                    {showBamboo && (
                      <div className="block md:hidden absolute left-1/2 -translate-x-1/2 bottom-[2.5rem] z-10 flex w-[15rem] flex-col items-stretch gap-4">
                        <div className="group relative h-[9.5rem] w-full overflow-hidden rounded-xl border-4 border-primary/50 transition-all duration-300 [perspective:1000px] hover:border-primary hover:shadow-[0_0_30px_10px_hsl(var(--primary)/0.3)] hover:scale-105">
                          <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                            {/* Front */}
                            <div className="absolute inset-0 [backface-visibility:hidden]">
                              <Image
                                src="/Lpanda.png"
                                alt="LPANDA"
                                width={384}
                                height={384}
                                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="pointer-events-none absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-black/10" />
                            </div>

                            {/* Back */}
                            <div className="absolute inset-0 overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]">
                              <div className="flex h-full w-full flex-col gap-2 bg-black/55 p-3 backdrop-blur-sm overflow-y-auto">
                                <div className="flex items-center gap-2">
                                  <span className="inline-flex items-center gap-2 rounded-full bg-purple-600/30 px-3 py-1 text-[0.6rem] font-semibold text-white ring-1 ring-purple-400/40">
                                    <span className="h-2 w-2 rounded-full bg-white/70" />
                                    OG Phase Live
                                  </span>
                                </div>

                                <div className="space-y-1">
                                  <div className="text-base sm:text-lg font-extrabold leading-tight text-cyan-300">
                                    Immortal
                                  </div>
                                  <div className="text-base sm:text-lg font-extrabold leading-tight text-white break-words">
  Laughing Panda
</div>
                                  <div className="text-[0.68rem] text-white/85">
                                    Limited Edition NFT Collection on Base
                                  </div>
                                  <div className="text-[0.58rem] text-white/70">
                                    8 / 150 Minted <span className="mx-1">•</span> 150 Total Supply
                                  </div>
                                </div>

                                <p className="hidden text-[0.58rem] leading-relaxed text-white/80">
                                  Immortal Laughing Panda is a unique generative NFT collection.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Link
                          href="/last"
                          className="w-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-3.5 text-center text-[0.8rem] font-bold leading-tight tracking-wide text-white no-underline shadow-[0_4px_20px_rgba(6,182,212,0.35)] transition-all duration-300 hover:scale-105 hover:from-blue-400 hover:to-cyan-300 hover:shadow-[0_6px_28px_rgba(6,182,212,0.55)] active:scale-95"
                        >
                          Behind The Scenes
                        </Link>
                      </div>
                    )}


                    <div className="flex flex-col items-center md:items-start gap-6 order-2 md:order-1">
                    </div>
                    <div className="flex justify-center items-center order-1 md:order-2">
                    </div>
                </section>

                {showContractAddress && (
                    <section ref={caRef} className="pt-1 max-w-3xl mx-auto animate-slide-in-left px-4">
                        <div className="flex justify-center">
                            <div
                                className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-2xl md:text-3xl font-bold py-6 px-8 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform text-center"
                                onClick={copyContractAddress}
                            >
                                Coming Soon
                            </div>
                        </div>
                    </section>
                )}
                
                <section id="gallery" className="py-12 md:py-24 max-w-6xl mx-auto">
                    <div className="text-center mb-8 md:mb-16">
                        <h2 className="font-bold text-3xl md:text-6xl text-primary mb-4 font-headline" style={{ textShadow: '2px 2px 0 #000' }}>NFT GALLERY</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                        <div className="group relative overflow-hidden rounded-xl border-4 border-primary/50 transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_10px_hsl(var(--primary)/0.3)] hover:scale-105 h-80 animate-oscillate">
                            <Image
                                src="/guru-wizard.png"
                                alt="Guru Wizard"
                                width={400}
                                height={400}
                                className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                        </div>
                        
                        <div className="group relative overflow-hidden rounded-xl border-4 border-primary/50 transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_10px_hsl(var(--primary)/0.3)] hover:scale-105 h-80 animate-oscillate">
                            <Image
                                src="/NFT2.jpg"
                                alt="NFT 2"
                                width={400}
                                height={400}
                                className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                        </div>
                    </div>
                    
                    <div className="flex justify-center gap-8 mt-8">
                        <div className="group relative overflow-hidden rounded-xl border-4 border-primary/50 transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_10px_hsl(var(--primary)/0.3)] hover:scale-105 h-80 animate-oscillate">
                            <Image
                                src="/NFT3.jpg"
                                alt="NFT 3"
                                width={400}
                                height={400}
                                className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                        </div>
                        
                        <div className="group relative overflow-hidden rounded-xl border-4 border-primary/50 transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_10px_hsl(var(--primary)/0.3)] hover:scale-105 h-80 animate-oscillate">
                            <Image
                                src="/NFT4.jpg"
                                alt="NFT 4"
                                width={400}
                                height={400}
                                className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                        </div>
                    </div>
                    
                    <div className="flex justify-center gap-8 mt-8">
                        <div className="group relative overflow-hidden rounded-xl border-4 border-primary/50 transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_10px_hsl(var(--primary)/0.3)] hover:scale-105 h-80 animate-oscillate">
                            <Image
                                src="/NFT5.jpg"
                                alt="NFT 5"
                                width={400}
                                height={400}
                                className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                        </div>
                    </div>
                </section>
                
                <section id="whitepaper" className="py-24 pt-40 max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-bold text-6xl text-primary mb-4 font-headline" style={{ textShadow: '2px 2px 0 #000' }}>WHITEPAPER ZONE</h2>
                        <p className="text-xl text-white/80">READ OUR COMPREHENSIVE WHITEPAPER</p>
                    </div>
                    
                    <div className="flex justify-center mb-12">
                        <div className="bg-black/60 backdrop-blur-sm border-4 border-cyan-400 rounded-xl overflow-hidden w-full max-w-md h-96 transition-all duration-300 animate-heat-wave hover:border-cyan-300 hover:scale-105">
                            <div className="relative w-full h-full">
                                <Image
                                    src="/lpanda-whitepaper.png"
                                    alt="LPanda Whitepaper Cover"
                                    fill
                                    className="object-cover w-full h-full opacity-60"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-8 flex-wrap">
                        <Button
                            asChild
                            size="lg"
                            className="group text-lg px-8 py-6 bg-gradient-to-r from-primary to-slate-400 text-primary-foreground font-bold transition-all duration-300 hover:from-primary/90 hover:to-slate-400/90 hover:animate-download-hover"
                        >
                            <a
                                href="/LPanda_Simplified_Whitepaper (1).docx"
                                download
                                className="inline-flex items-center no-underline text-inherit"
                            >
                                <svg
                                    className="w-5 h-5 mr-2 group-hover:animate-download-icon-bounce"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                DOWNLOAD
                            </a>
                        </Button>
                    </div>
                </section>

            </main>
            </div>
        </div>
    );
}
