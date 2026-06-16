const LEMON_CHECKOUT_URL = "PASTE_LEMON_SQUEEZY_CHECKOUT_URL_HERE";

const checkoutButtons = document.querySelectorAll(".js-checkout");
const pricingSection = document.querySelector("#pricing");
const year = document.querySelector("#year");
const protectedMedia = document.querySelectorAll("img, video");

function hasLiveCheckoutUrl(url) {
  return /^https:\/\/.+/i.test(url) && !url.includes("PASTE_LEMON");
}

function openCheckout() {
  if (hasLiveCheckoutUrl(LEMON_CHECKOUT_URL)) {
    window.location.href = LEMON_CHECKOUT_URL;
    return;
  }

  pricingSection?.scrollIntoView({ behavior: "smooth", block: "start" });
}

checkoutButtons.forEach((button) => {
  button.addEventListener("click", openCheckout);
});

protectedMedia.forEach((media) => {
  media.setAttribute("draggable", "false");
  media.addEventListener("contextmenu", (event) => event.preventDefault());
  media.addEventListener("dragstart", (event) => event.preventDefault());
});

if (year) {
  year.textContent = new Date().getFullYear().toString();
}
