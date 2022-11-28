class QuestToolTip extends HTMLElement {
  constructor() {
    super();
    this.toolTipContainer;
    this.toolTipText;
    this.toolTipVisible = false;
    this.dummyText = "this is dummy";
    this.attachShadow({ mode: "open" });
    // let template = document.querySelector("#tooltip-template");
    //this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.innerHTML = `
    <style>
    div
    {
        background-color:black;
        color:white;
        position:absolute;
    }
    ::slotted(.highlight) {
      color:blue;
   }
   .icon
   {
    border-radius:50%;
    background-color:black;
    color:white;
    padding:0.5rem 0.5rem;
   }

   :host(.important)
   {
     border-radius:50%;
   }
   :host-context(p)
   {
    font-weight:bold;
   }
    </style>
    <slot>
    Default Slot element
    </slot>
    <span class="icon">?</span>`;
  }
  connectedCallback() {
    if (this.getAttribute("uctext"))
      this.toolTipText = this.getAttribute("uctext");
    else this.toolTipText = this.dummyText;

    // var toottipIcon = document.createElement("span");
    var toottipIcon = this.shadowRoot.querySelector("span");
    // toottipIcon.textContent = "(*)";
    toottipIcon.style.position = "relative";
    //this.shadowRoot.appendChild(toottipIcon);
    toottipIcon.addEventListener("mouseenter", this._showToolTip.bind(this));
    toottipIcon.addEventListener("mouseleave", this._removeToolTip.bind(this));
    this._render();
  }

  static get observedAttributes() {
    return ["uctext"];
  }

  attributeChangedCallback(att, oldVal, newVal) {
    console.log(att, oldVal, newVal);
    if (oldVal === newVal) return;
    if (att === "uctext") {
      this.toolTipText = this.getAttribute("uctext");
    }
  }
  disconnectedCallback() {
    console.log("disconnected");
  }
  _showToolTip() {
    this.toolTipVisible = true;
    this._render();
  }
  _removeToolTip() {
    console.log("remove tool tip");
    this.toolTipVisible = false;
    this._render();
  }
  _render() {
    let toolTipContainer = this.shadowRoot.querySelector("div");

    if (this.toolTipVisible) {
      toolTipContainer = document.createElement("div");
      toolTipContainer.textContent = this.toolTipText;
      // this.toolTipContainer.style.backgroundColor = "black";
      // this.toolTipContainer.style.color = "white";
      //this.toolTipContainer.style.position = "absolute";
      this.shadowRoot.appendChild(toolTipContainer);
    } else {
      console.log("toot");
      if (toolTipContainer) {
        console.log("remove child");
        this.shadowRoot.removeChild(toolTipContainer);
      }
    }
  }
}

customElements.define("quest-tooltip", QuestToolTip);
