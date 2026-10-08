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
                   RESPONSIVE VISIBLE ITEMS
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



                /* =========================================
                   MAXIMUM POSITION
                ========================================= */

                function getMaximumIndex() {

                    return Math.max(
                        0,
                        slides.length -
                        getVisibleSlides()
                    );

                }



                /* =========================================
                   NUMBER FORMAT
                ========================================= */

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



                /* =========================================
                   COUNTER
                ========================================= */

                function updateCounter() {

                    currentLabel.textContent =
                        formatNumber(
                            currentIndex +
                            1
                        );


                    totalLabel.textContent =
                        formatNumber(
                            slides.length
                        );

                }



                /* =========================================
                   POSITION CAROUSEL
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
                        firstSlide
                            .getBoundingClientRect()
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


                        /*
                        Fuerza al navegador a aplicar
                        temporalmente el cambio.
                        */

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
                   NEXT
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



                /* =========================================
                   PREVIOUS
                ========================================= */

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


                    /*
                    Si no existen suficientes imágenes
                    para mover el carrusel, no iniciamos
                    el temporizador.
                    */

                    if (
                        getMaximumIndex() ===
                        0
                    ) {

                        return;

                    }


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
                            event
                                .changedTouches[0]
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
                            event
                                .changedTouches[0]
                                .screenX;


                        const distance =
                            touchStartX -
                            touchEndX;


                        if (
                            Math.abs(
                                distance
                            ) >
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
                   WINDOW RESIZE
                ========================================= */

                window.addEventListener(
                    "resize",
                    () => {

                        updateCarousel(
                            false
                        );


                        restartAutoplay();

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

           Funciona tanto para:
           - carruseles
           - category 04
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


        let activeItems =
            [];


        let activeImageIndex =
            0;


        let lastFocusedItem =
            null;



        /* =============================================
           VIEWER NUMBER FORMAT
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
           UPDATE VIEWER
        ============================================= */

        function updateViewer() {

            const item =
                activeItems[
                    activeImageIndex
                ];


            if (
                !item
            ) {

                return;

            }


            const imagePath =
                item.dataset.image;


            viewerImage.src =
                imagePath;


            viewerCurrent.textContent =
                formatViewerNumber(
                    activeImageIndex +
                    1
                );


            viewerTotal.textContent =
                formatViewerNumber(
                    activeItems.length
                );

        }



        /* =============================================
           OPEN VIEWER
        ============================================= */

        function openViewer(
            clickedItem
        ) {

            const gallery =
                clickedItem.closest(
                    "[data-gallery-group]"
                );


            if (
                !gallery
            ) {

                return;

            }


            activeItems =
                Array.from(
                    gallery.querySelectorAll(
                        "[data-viewer-item]"
                    )
                );


            activeImageIndex =
                activeItems.indexOf(
                    clickedItem
                );


            lastFocusedItem =
                clickedItem;


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
           CLOSE VIEWER
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


            if (
                lastFocusedItem
            ) {

                lastFocusedItem.focus();

            }

        }



        /* =============================================
           NEXT VIEWER IMAGE
        ============================================= */

        function nextViewerImage() {

            if (
                !activeItems.length
            ) {

                return;

            }


            activeImageIndex =
                (
                    activeImageIndex +
                    1
                ) %
                activeItems.length;


            updateViewer();

        }



        /* =============================================
           PREVIOUS VIEWER IMAGE
        ============================================= */

        function previousViewerImage() {

            if (
                !activeItems.length
            ) {

                return;

            }


            activeImageIndex =
                (
                    activeImageIndex -
                    1 +
                    activeItems.length
                ) %
                activeItems.length;


            updateViewer();

        }



        /* =============================================
           OPEN FROM ANY PORTFOLIO ITEM
        ============================================= */

        document.querySelectorAll(
            "[data-viewer-item]"
        ).forEach(
            (item) => {

                item.addEventListener(
                    "click",
                    () => {

                        openViewer(
                            item
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
                    event
                        .changedTouches[0]
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
                    event
                        .changedTouches[0]
                        .screenX;


                const distance =
                    viewerTouchStartX -
                    viewerTouchEndX;


                if (
                    Math.abs(
                        distance
                    ) <
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
