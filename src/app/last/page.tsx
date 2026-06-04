'use client';

import type { CSSProperties } from 'react';
import Image from 'next/image';

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

/** Stagger between cards — tuned to feel in step with the slow background video drift */
const SLIDE_STAGGER_S = 0.85;
const SLIDE_DURATION_S = 5;

const LAST_PAGE_IMAGES = Array.from({ length: 7 }, (_, index) => ({
    src: `/LastPage${index + 1}.jpg`,
    alt: `Behind the scenes ${index + 1}`,
}));

const galleryCardClassName =
    'group relative h-64 w-full overflow-hidden rounded-xl border-4 border-primary/50 opacity-0 will-change-transform animate-slide-in-bottom-slow [animation-fill-mode:forwards] transition-[border-color,box-shadow,transform] duration-300 hover:border-primary hover:shadow-[0_0_30px_10px_hsl(var(--primary)/0.3)] hover:scale-105 sm:h-72 md:h-80';

function GalleryImageCard({
    src,
    alt,
    animationDelay,
}: {
    src: string;
    alt: string;
    animationDelay: number;
}) {
    return (
        <div
            className={galleryCardClassName}
            style={{
                animationDelay: `${animationDelay}s`,
                animationDuration: `${SLIDE_DURATION_S}s`,
            }}
        >
            <Image
                src={src}
                alt={alt}
                width={400}
                height={400}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-black/10" />
        </div>
    );
}

export default function LastPage() {
    const gridImages = LAST_PAGE_IMAGES.slice(0, 6);
    const centerImage = LAST_PAGE_IMAGES[6];

    return (
        <div className="relative min-h-[100dvh] w-full max-w-[100vw]">
            <video
                src="/LastBackground.mp4"
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

            <main className="relative z-10 min-h-[100dvh] w-full overflow-y-auto px-4 py-10 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] sm:px-6 md:py-14">
                <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 md:gap-10">
                    <header className="text-center">
                        <h1
                            className="font-headline text-3xl font-bold text-primary opacity-0 will-change-transform animate-slide-in-bottom-slow [animation-fill-mode:forwards] sm:text-4xl md:text-5xl lg:text-6xl"
                            style={{
                                textShadow: '2px 2px 0 #000',
                                animationDelay: '0s',
                                animationDuration: `${SLIDE_DURATION_S}s`,
                            }}
                        >
                            Lpanda is working overtime!!
                        </h1>
                    </header>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
                        {gridImages.map((image, index) => (
                            <GalleryImageCard
                                key={image.src}
                                src={image.src}
                                alt={image.alt}
                                animationDelay={(index + 1) * SLIDE_STAGGER_S}
                            />
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <div className="w-full max-w-md sm:max-w-lg">
                            <GalleryImageCard
                                src={centerImage.src}
                                alt={centerImage.alt}
                                animationDelay={7 * SLIDE_STAGGER_S}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
