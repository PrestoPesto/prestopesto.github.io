class SettingsWindow extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      
    `;
  }
}

customElements.define("settings-window", SettingsWindow);
const settingsBlock = document.createElement("settings-window");
document.body.prepend(settingsBlock);

