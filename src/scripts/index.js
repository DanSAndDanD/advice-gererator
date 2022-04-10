class AdviceGenerator extends HTMLElement {
  constructor() {
    super();
    this.endpoint = 'https://api.adviceslip.com/advice';
    this.slipId = this.querySelector('[data-id]');
    this.slipContent = this.querySelector('[data-content]');
    this.getAdviceButton = this.querySelector('[data-get-advice]');
    this.spinner = this.querySelector('[data-spinner]');

    this.classes = {
      hidden: 'hidden',
    }

    this.updateAdvice();
    this.getAdviceButton.addEventListener('click', this.updateAdvice.bind(this))
  }

  async updateAdvice() {
    this.spinner.classList.remove(this.classes.hidden);
    this.slipContent.classList.add(this.classes.hidden);

    const res = await fetch(this.endpoint);
    const { slip } = await res.json();
    this.adviceId = slip.id;
    this.adviceContent = slip.advice;
    this.adviceBg =`#${Math.floor(Math.random()*16777215).toString(16)}`;

    setTimeout(() => {
      this.spinner.classList.add(this.classes.hidden);
      this.slipContent.classList.remove(this.classes.hidden);
    }, 1000)
  }

  updateSlipId(id) {
    this.slipId.textContent = id;
  }

  updateSlipContent(content) {
    this.slipContent.textContent = content;
  }

  updateBg(color) {
    this.style.backgroundColor = color;
  }

  // Other functions specific to web component.

  get adviceId() {
    return this.getAttribute('advice-id');
  }

  set adviceId(value) {
    this.setAttribute('advice-id', value);
  }

  get adviceContent() {
    return this.getAttribute('advice-content');
  }

  set adviceContent(value) {
    this.setAttribute('advice-content', value);
  }

  get adviceBg() {
    return this.getAttribute('advice-bg');
  }

  set adviceBg(value) {
    this.setAttribute('advice-bg', value);
  }

  static get observedAttributes() {
    return ['advice-id', 'advice-content', 'advice-bg'];
  }

  attributeChangedCallback(name, _, newValue) {
    if (newValue === '') return;
    switch (name) {
      case 'advice-id':
        this.updateSlipId(newValue);
        break;
      case 'advice-content':
        this.updateSlipContent(newValue);
        break;
      case 'advice-bg':
        // this.updateBg(newValue);
        break;
    }
  }
}

customElements.define('advice-generator', AdviceGenerator);
