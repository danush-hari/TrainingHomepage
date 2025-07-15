if (!customElements.get("range-discount-bar")) {
  customElements.define(
    "range-discount-bar",
    class RangeDiscountBar extends HTMLElement {
      connectedCallback() {
        this.updateProgress();
      }

      updateProgress() {
        const threshold1 = parseFloat(this.getAttribute("data-threshold-1"));
        const threshold2 = parseFloat(this.getAttribute("data-threshold-2"));
        const text1 = this.getAttribute("data-text-1");
        const text2 = this.getAttribute("data-text-2");
        const unlockText1 = this.getAttribute("data-unlock-text-1");
        const unlockText2 = this.getAttribute("data-unlock-text-2");

        this.slider = this.querySelector(".range-slider");
        this.message = this.querySelector(".progress-message");

        fetch("/cart.js")
          .then((res) => res.json())
          .then((cart) => {
            const subtotal = cart.total_price / 100;
            let progress = (subtotal / threshold2) * 100;
            progress = Math.min(progress, 100);
            this.slider.value = progress;

            this.slider.style.background = `linear-gradient(to right, #EABF5F 0%, #EABF5F ${progress}%, #ffffff ${progress}%)`;

            const messages = [];

            if (subtotal === 0) {
              messages.push(`<div class="pending">${text1}</div>`);
              messages.push(`<div class="pending">${text2}</div>`);
            } else {
              if (subtotal >= threshold1) {
                messages.push(`<div class="unlocked"> ${unlockText1}</div>`);
              } else {
                const remaining1 = (threshold1 - subtotal).toFixed(2);
                messages.push(
                  `<div class="pending">${text1.replace(
                    /\$\d+(\.\d{2})?/,
                    `$${remaining1}`
                  )}</div>`
                );
              }

              if (subtotal >= threshold2) {
                messages.push(`<div class="unlocked"> ${unlockText2}</div>`);
              } else {
                const remaining2 = (threshold2 - subtotal).toFixed(2);
                messages.push(
                  `<div class="pending">${text2.replace(
                    /\$\d+(\.\d{2})?/,
                    `$${remaining2}`
                  )}</div>`
                );
              }
            }

            this.message.innerHTML = messages.join("");
          });
      }
    }
  );
}
