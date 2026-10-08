/* =========================================================
   BY FOSTER · DESIGN PORTFOLIO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =================================================
           CAROUSELS
        ================================================= */

        const carousels =
            document.querySelectorAll(
                "[data-carousel]"
            );


        const AUTOPLAY_DELAY =
            3000;


        carousels.forEach(
            (carousel) => {

                const viewport =
                    carousel.querySelector(
                        ".carousel-viewport"
                    );


                const track =
                    carousel.querySelector(
                        ".carousel-track"
                    );


                const slides =
                    Array.from(
                        carousel.querySelectorAll(
                            ".portfolio-slide"
                        )
                    );


                const previousButton =
                    carousel.querySelector(
                        ".carousel-prev"
                    );


                const nextButton =
                    carousel.querySelector(
                        ".carousel-next"
                    );


                const currentLabel =
                    carousel.querySelector(
                        ".carousel-current"
                    );


                const totalLabel =
                    carousel.querySelector(
                        ".carousel-total"
                    );


                let currentIndex =
                    0;


                let autoplayTimer =
                    null;


                let touchStartX =
                    0;


                let touchEndX =
                    0;



                /* =========================================
                   HELPERS
                ========================================= */

                function getVisibleSlides() {

                    if (
                        window.innerWidth <=
                        600
                    ) {
                        return 1;
                    }


                    if (
                        window.innerWidth <=
                        950
                    ) {
                        return 2;
                    }


                    return 3;

                }


                function getMaximumIndex() {

                    return Math.max(
                        0,
                        slides.length -
                        getVisibleSlides()
                    );

                }


                function formatNumber(
                    number
                ) {

                    return String(
                        number
                    ).padStart(
                        2,
                        "0"
                    );

                }


                function updateCounter() {

                    currentLabel.textContent =
                        formatNumber(
                            currentIndex + 1
                        );


                    totalLabel.textContent =
                        formatNumber(
                            slides.length
                        );

                }



                /* =========================================
                   POSITION
                ========================================= */

                function updateCarousel(
                    animate = true
                ) {

                    const maxIndex =
                        getMaximumIndex();


                    if (
                        currentIndex >
                        maxIndex
                    ) {
                        currentIndex =
                            maxIndex;
                    }


                    const firstSlide =
                        slides[0];


                    if (
                        !firstSlide
                    ) {
                        return;
                    }


                    const trackStyles =
                        window.getComputedStyle(
                            track
                        );


                    const gap =
                        parseFloat(
                            trackStyles.columnGap ||
                            trackStyles.gap ||
                            0
                        );


                    const slideWidth =
                        firstSlide.getBoundingClientRect()
                            .width;


                    const offset =
                        currentIndex *
                        (
                            slideWidth +
                            gap
                        );


                    if (
                        !animate
                    ) {

                        track.style.transition =
                            "none";


                        track.style.transform =
                            `translate3d(-${offset}px, 0, 0)`;


                        track.offsetHeight;


                        track.style.transition =
                            "";

                    } else {

                        track.style.transform =
                            `translate3d(-${offset}px, 0, 0)`;

                    }


                    updateCounter();

                }



                /* =========================================
                   NEXT / PREVIOUS
                ========================================= */

                function nextSlide() {

                    const maxIndex =
                        getMaximumIndex();


                    if (
                        currentIndex >=
                        maxIndex
                    ) {

                        currentIndex =
                            0;

                    } else {

                        currentIndex +=
                            1;

                    }


                    updateCarousel();

                }


                function previousSlide() {

                    const maxIndex =
                        getMaximumIndex();


                    if (
                        currentIndex <=
                        0
                    ) {

                        currentIndex =
                            maxIndex;

                    } else {

                        currentIndex -=
                            1;

                    }


                    updateCarousel();

                }



                /* =========================================
                   AUTOPLAY
                ========================================= */

                function stopAutoplay() {

                    if (
                        autoplayTimer
                    ) {

                        clearInterval(
                            autoplayTimer
                        );


                        autoplayTimer =
                            null;

                    }

                }


                function startAutoplay() {

                    stopAutoplay();


                    autoplayTimer =
                        setInterval(
                            nextSlide,
                            AUTOPLAY_DELAY
                        );

                }


                function restartAutoplay() {

                    stopAutoplay();

                    startAutoplay();

                }



                /* =========================================
                   BUTTONS
                ========================================= */

                previousButton.addEventListener(
                    "click",
                    () => {

                        previousSlide();

                        restartAutoplay();

                    }
                );


                nextButton.addEventListener(
                    "click",
                    () => {

                        nextSlide();

                        restartAutoplay();

                    }
                );



                /* =========================================
                   PAUSE ON HOVER
                ========================================= */

                carousel.addEventListener(
                    "mouseenter",
                    stopAutoplay
                );


                carousel.addEventListener(
                    "mouseleave",
                    startAutoplay
                );



                /* =========================================
                   TOUCH / SWIPE
                ========================================= */

                viewport.addEventListener(
                    "touchstart",
                    (event) => {

                        touchStartX =
                            event.changedTouches[0]
                                .screenX;


                        stopAutoplay();

                    },
                    {
                        passive:
                            true
                    }
                );


                viewport.addEventListener(
                    "touchend",
                    (event) => {

                        touchEndX =
                            event.changedTouches[0]
                                .screenX;


                        const distance =
                            touchStartX -
                            touchEndX;


                        if (
                            Math.abs(distance) >
                            45
                        ) {

                            if (
                                distance >
                                0
                            ) {

                                nextSlide();

                            } else {

                                previousSlide();

                            }

                        }


                        startAutoplay();

                    },
                    {
                        passive:
                            true
                    }
                );



                /* =========================================
                   RESIZE
                ========================================= */

                window.addEventListener(
                    "resize",
                    () => {

                        updateCarousel(
                            false
                        );

                    }
                );



                /* =========================================
                   INITIALIZE
                ========================================= */

                updateCounter();

                updateCarousel(
                    false
                );

                startAutoplay();

            }
        );



        /* =================================================
           FULLSCREEN VIEWER
        ================================================= */

        const viewer =
            document.querySelector(
                "#image-viewer"
            );


        const viewerImage =
            viewer.querySelector(
                ".viewer-image"
            );


        const viewerClose =
            viewer.querySelector(
                ".viewer-close"
            );


        const viewerPrevious =
            viewer.querySelector(
                ".viewer-prev"
            );


        const viewerNext =
            viewer.querySelector(
                ".viewer-next"
            );


        const viewerCurrent =
            viewer.querySelector(
                ".viewer-current"
            );


        const viewerTotal =
            viewer.querySelector(
                ".viewer-total"
            );


        let activeSlides =
            [];


        let activeImageIndex =
            0;



        /* =============================================
           FORMAT COUNTER
        ============================================= */

        function formatViewerNumber(
            number
        ) {

            return String(
                number
            ).padStart(
                2,
                "0"
            );

        }



        /* =============================================
           UPDATE IMAGE
        ============================================= */

        function updateViewer() {

            const slide =
                activeSlides[
                    activeImageIndex
                ];


            if (
                !slide
            ) {
                return;
            }


            const imagePath =
                slide.dataset.image;


            viewerImage.src =
                imagePath;


            viewerCurrent.textContent =
                formatViewerNumber(
                    activeImageIndex +
                    1
                );


            viewerTotal.textContent =
                formatViewerNumber(
                    activeSlides.length
                );

        }



        /* =============================================
           OPEN
        ============================================= */

        function openViewer(
            clickedSlide
        ) {

            const carousel =
                clickedSlide.closest(
                    "[data-carousel]"
                );


            activeSlides =
                Array.from(
                    carousel.querySelectorAll(
                        ".portfolio-slide"
                    )
                );


            activeImageIndex =
                activeSlides.indexOf(
                    clickedSlide
                );


            updateViewer();


            viewer.classList.add(
                "is-open"
            );


            viewer.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.classList.add(
                "viewer-open"
            );


            viewerClose.focus();

        }



        /* =============================================
           CLOSE
        ============================================= */

        function closeViewer() {

            viewer.classList.remove(
                "is-open"
            );


            viewer.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.classList.remove(
                "viewer-open"
            );


            viewerImage.src =
                "";

        }



        /* =============================================
           NEXT / PREVIOUS
        ============================================= */

        function nextViewerImage() {

            activeImageIndex =
                (
                    activeImageIndex +
                    1
                ) %
                activeSlides.length;


            updateViewer();

        }


        function previousViewerImage() {

            activeImageIndex =
                (
                    activeImageIndex -
                    1 +
                    activeSlides.length
                ) %
                activeSlides.length;


            updateViewer();

        }



        /* =============================================
           OPEN FROM SLIDE
        ============================================= */

        document.querySelectorAll(
            ".portfolio-slide"
        ).forEach(
            (slide) => {

                slide.addEventListener(
                    "click",
                    () => {

                        openViewer(
                            slide
                        );

                    }
                );

            }
        );



        /* =============================================
           VIEWER BUTTONS
        ============================================= */

        viewerClose.addEventListener(
            "click",
            closeViewer
        );


        viewerNext.addEventListener(
            "click",
            nextViewerImage
        );


        viewerPrevious.addEventListener(
            "click",
            previousViewerImage
        );



        /* =============================================
           CLICK OUTSIDE IMAGE
        ============================================= */

        viewer.addEventListener(
            "click",
            (event) => {

                if (
                    event.target ===
                    viewer
                ) {

                    closeViewer();

                }

            }
        );



        /* =============================================
           KEYBOARD
        ============================================= */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    !viewer.classList.contains(
                        "is-open"
                    )
                ) {
                    return;
                }


                if (
                    event.key ===
                    "Escape"
                ) {

                    closeViewer();

                }


                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    nextViewerImage();

                }


                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    previousViewerImage();

                }

            }
        );



        /* =============================================
           VIEWER SWIPE
        ============================================= */

        let viewerTouchStartX =
            0;


        let viewerTouchEndX =
            0;


        viewer.addEventListener(
            "touchstart",
            (event) => {

                viewerTouchStartX =
                    event.changedTouches[0]
                        .screenX;

            },
            {
                passive:
                    true
            }
        );


        viewer.addEventListener(
            "touchend",
            (event) => {

                viewerTouchEndX =
                    event.changedTouches[0]
                        .screenX;


                const distance =
                    viewerTouchStartX -
                    viewerTouchEndX;


                if (
                    Math.abs(distance) <
                    45
                ) {
                    return;
                }


                if (
                    distance >
                    0
                ) {

                    nextViewerImage();

                } else {

                    previousViewerImage();

                }

            },
            {
                passive:
                    true
            }
        );

    }
);
