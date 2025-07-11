class TimerBlock extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const deadline = this.dataset.deadline;
    if (!deadline) return;

    const endDate = new Date(deadline.replace(/-/g, "/")).getTime();
    const daysEl = this.querySelector('[data-unit="days"]');
    const hoursEl = this.querySelector('[data-unit="hours"]');
    const minutesEl = this.querySelector('[data-unit="minutes"]');
    const secondsEl = this.querySelector('[data-unit="seconds"]');

    const update = () => {
      const now = new Date().getTime();
      const diff = endDate - now;

      if (diff <= 0) {
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      daysEl.textContent = String(days).padStart(2, "0");
      hoursEl.textContent = String(hours).padStart(2, "0");
      minutesEl.textContent = String(minutes).padStart(2, "0");
      secondsEl.textContent = String(seconds).padStart(2, "0");
    };

    update();
    const timer = setInterval(update, 1000);
  }
}

customElements.define("timer-block", TimerBlock);
