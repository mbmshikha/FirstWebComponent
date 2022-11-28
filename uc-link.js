class UCLink extends HTMLAnchorElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.addEventListener("click", function (event) {
      if (!confirm("Are you sure you want to go")) {
        event.preventDefault();
      }
    });
  }
}
customElements.define("uc-link", UCLink, { extends: "a" });
