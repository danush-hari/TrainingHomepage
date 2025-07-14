if (!customElements.get("product-media-modal")) {
  customElements.define(
    "product-media-modal",
    class ProductMediaModal extends HTMLElement {
      constructor() {
        super();

        this.initModalEvents();
        this.initSwipers();
      }

      initModalEvents() {
        const mediaSlides = document.querySelectorAll(
          "media-gallery .swiper-slide .light-box-zoom-trigger"
        );
        if (!mediaSlides.length) return;

        mediaSlides.forEach((slide) => {
          slide.addEventListener("click", () => {
            const modal = document.querySelector(
              slide.getAttribute("data-modal")
            );
            if (modal) modal.showModal(slide);
          });
        });

        const closeBtn = this.querySelector('[id^="ModalClose-"]');
        if (closeBtn) {
          closeBtn.addEventListener("click", this.hideModal.bind(this));
        }

        this.addEventListener("pointerup", (event) => {
          if (event.pointerType === "mouse") this.hideModal();
        });
      }

      initSwipers() {
        const mainSwiperEl = document.querySelector(
          "media-gallery .swiper:not(.thumbnail-swiper)"
        );
        const thumbSwiperEl = document.querySelector(
          "media-gallery .thumbnail-swiper"
        );

        if (!mainSwiperEl || !thumbSwiperEl) return;

        const mainSwiper = new Swiper(mainSwiperEl, {
          slidesPerView: 1,
          spaceBetween: 10,
          navigation: {
            nextEl: document.querySelector("media-gallery .swiper-button-next"),
            prevEl: document.querySelector("media-gallery .swiper-button-prev"),
          },
          pagination: {
            el: document.querySelector("media-gallery .swiper-pagination"),
            clickable: true,
          },
        });

        const thumbSwiper = new Swiper(thumbSwiperEl, {
          slidesPerView: 5.3,
          spaceBetween: 5,
          watchSlidesProgress: true,
          on: {
            init: () => {

              thumbSwiperEl.classList.remove("is-loading");
              thumbSwiperEl.classList.add("is-loaded");
              const activeIndex = mainSwiper.activeIndex || 0;
              const thumbs = thumbSwiperEl.querySelectorAll(".swiper-slide");
              thumbs.forEach((thumb, index) => {
                thumb.classList.toggle(
                  "swiper-slide-thumb-active",
                  index === activeIndex
                );
              });
            },
          },
        });


        thumbSwiperEl
          .querySelectorAll(".swiper-slide")
          .forEach((thumb, index) => {
            thumb.addEventListener("click", () => {
              mainSwiper.slideTo(index);
            });
          });

        mainSwiper.on("slideChange", () => {
          const activeIndex = mainSwiper.activeIndex;
          thumbSwiperEl
            .querySelectorAll(".swiper-slide")
            .forEach((slide, i) => {
              slide.classList.toggle(
                "swiper-slide-thumb-active",
                i === activeIndex
              );
            });
        });
      }

      showModal(opener) {
        this.openedBy = opener;
        document.body.classList.add("overflow-hidden");
        this.setAttribute("open", "");
        this.showActiveMedia();
      }

      hideModal() {
        document.body.classList.remove("overflow-hidden");
        this.removeAttribute("open");
      }

      showActiveMedia() {
        this.querySelectorAll(
          `[data-media-id]:not([data-media-id="${this.openedBy.getAttribute(
            "data-media-id"
          )}"])`
        ).forEach((element) => {
          element.classList.remove("active");
        });

        const activeMedia = this.querySelector(
          `[data-media-id="${this.openedBy.getAttribute("data-media-id")}"]`
        );
        if (activeMedia) {
          activeMedia.classList.add("active");
          activeMedia.scrollIntoView();
        }
      }
    }
  );
}