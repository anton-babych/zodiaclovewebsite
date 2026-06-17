const LEMON_CHECKOUT_URL = "PASTE_LEMON_SQUEEZY_CHECKOUT_URL_HERE";

const checkoutButtons = document.querySelectorAll(".js-checkout");
const pricingSection = document.querySelector("#pricing");
const year = document.querySelector("#year");
const protectedMedia = document.querySelectorAll("img, video");
const previewVideos = document.querySelectorAll(".product-video-frame video");

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

function playPreviewVideos() {
  previewVideos.forEach((video) => {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {});
    }
  });
}

playPreviewVideos();
window.addEventListener("load", playPreviewVideos, { once: true });
window.addEventListener("pageshow", playPreviewVideos);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    playPreviewVideos();
  }
});

["touchstart", "pointerdown", "scroll"].forEach((eventName) => {
  window.addEventListener(eventName, playPreviewVideos, { once: true, passive: true });
});

if ("IntersectionObserver" in window) {
  const videoObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      playPreviewVideos();
    }
  }, { threshold: 0.2 });

  previewVideos.forEach((video) => videoObserver.observe(video));
}

if (year) {
  year.textContent = new Date().getFullYear().toString();
}
