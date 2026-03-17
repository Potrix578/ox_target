import { fetchNui } from "./fetchNui.js";

const optionsWrapper = document.getElementById("options-wrapper");

function onClick() {
  // when nuifocus is disabled after a click, the hover event is never released
  this.style.pointerEvents = "none";

  fetchNui("select", [this.targetType, this.targetId, this.zoneId]);
  // is there a better way to handle this? probably
  setTimeout(() => (this.style.pointerEvents = "auto"), 100);
}

export function createOptions(type, data, id, zoneId) {
  if (data.hide) return;

  const option = document.createElement("div");

  // Cleaned up icon generation with proper quoting
  const uiStyle = data.iconColor ? `style="color: ${data.iconColor} !important;"` : "";
  const iconElement = `<i class="fa-fw ${data.icon} option-icon" ${uiStyle}></i>`;

  option.innerHTML = `${iconElement}<p class="option-label">${data.label}</p>`;
  option.className = "option-container";
  option.targetType = type;
  option.targetId = id;
  option.zoneId = zoneId;

  option.addEventListener("click", onClick);

  // Staggered animation delay for premium feel
  // We use a small delay based on child count to make them "grow" out
  const delay = optionsWrapper.children.length * 0.05;
  option.style.animationDelay = `${delay}s`;

  optionsWrapper.appendChild(option);
}
