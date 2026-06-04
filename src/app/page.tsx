'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const backgroundVideoStyle: CSSProperties = {
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
    width: '100%',
    height: '100%',
    minHeight: '100dvh',
    objectFit: 'cover',
    objectPosition: 'center',
    transform: 'translate3d(0, 0, 0)',
    backfaceVisibility: 'hidden',
};

export default function LandingPage() {
    return (
        <div
            className="fixed inset-0 z-[1] flex min-h-[100dvh] w-full max-w-[100vw] flex-col overflow-hidden overscroll-none"
            style={{ minHeight: '100dvh' }}
        >
            <video
                src="/FirstPageBackground.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                disablePictureInPicture
                disableRemotePlayback
                preload="auto"
                aria-hidden
                className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover object-[center_30%] sm:object-center"
                style={backgroundVideoStyle}
                onContextMenu={(e) => e.preventDefault()}
            />

            <div
                className="relative z-10 flex min-h-[100dvh] w-full flex-1 flex-col items-center justify-end px-4 pb-[max(1rem,16vh)] pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 md:pb-[max(1.5rem,18vh)]"
            >
                <Button
                    asChild
                    size="lg"
                    className="h-auto min-h-[3rem] w-full max-w-[min(100%,20rem)] touch-manipulation whitespace-normal rounded-xl px-5 py-4 text-center text-base leading-snug shadow-[0_0_30px_10px_hsl(var(--primary)/0.25)] transition-all duration-300 bg-gradient-to-r from-primary to-slate-400 font-bold font-headline text-primary-foreground hover:from-primary/90 hover:to-slate-400/90 hover:scale-105 sm:max-w-md sm:px-10 sm:py-7 sm:text-lg md:w-auto md:max-w-none"
                >
                    <Link
                        href="/home"
                        className="flex w-full items-center justify-center px-1 py-0.5 text-center no-underline text-inherit"
                    >
                        Enter the LPANDA FOREST
                    </Link>
                </Button>
            </div>
        </div>
    );
}
