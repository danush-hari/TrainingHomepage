class SwiperComponent extends HTMLElement {
  constructor() {
    super();
    this.swiper = null;
  }

  connectedCallback() {
    this.initSwiper();
  }

  initSwiper() {
    const optionsJSON = this.dataset.options;
    let options;

    try {
      options = JSON.parse(optionsJSON);
    } catch (e) {
      console.error("Invalid Swiper options:", e);
      options = {};
    }

    if (options.pagination === true) {
      options.pagination = {
        el: this.querySelector(".swiper-pagination"),
        clickable: true,
      };
    }

    if (options.navigation === true) {
      options.navigation = {
        nextEl: this.querySelector(".swiper-button-next"),
        prevEl: this.querySelector(".swiper-button-prev"),
      };
    }

    if (options.scrollbar === true) {
      options.scrollbar = {
        el: this.querySelector(".swiper-scrollbar"),
        draggable: true,
      };
    }

    const swiperEl = this.querySelector(".swiper");
    if (swiperEl) {
      this.swiper = new Swiper(swiperEl, options);
    } else {
      console.warn("<swiper-component> requires a .swiper child element.");
    }
  }
}

customElements.define("swiper-component", SwiperComponent);
