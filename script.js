const LEMON_CHECKOUT_URL = "PASTE_LEMON_SQUEEZY_CHECKOUT_URL_HERE";

const checkoutButtons = document.querySelectorAll(".js-checkout");
const pricingSection = document.querySelector("#pricing");
const year = document.querySelector("#year");
const previewVideos = document.querySelectorAll(".product-video-frame video");
const isTikTokWebView = /tiktok|musical_ly|bytedance|bytedancewebview|aweme/i.test(navigator.userAgent);

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

function protectMediaElement(media) {
  media.setAttribute("draggable", "false");
  media.addEventListener("contextmenu", (event) => event.preventDefault());
  media.addEventListener("dragstart", (event) => event.preventDefault());
}

function replacePreviewVideosForTikTok() {
  if (!isTikTokWebView) {
    return;
  }

  previewVideos.forEach((video) => {
    const fallbackSrc = video.dataset.tiktokFallback;
    if (!fallbackSrc) {
      return;
    }

    const fallbackImage = document.createElement("img");
    fallbackImage.src = fallbackSrc;
    fallbackImage.alt = video.getAttribute("aria-label") || "Flip-through preview of the guide";
    fallbackImage.width = video.videoWidth || 420;
    fallbackImage.height = video.videoHeight || 860;
    fallbackImage.loading = "lazy";
    fallbackImage.decoding = "async";
    protectMediaElement(fallbackImage);
    video.replaceWith(fallbackImage);
  });
}

document.querySelectorAll("img, video").forEach(protectMediaElement);
replacePreviewVideosForTikTok();

function playPreviewVideos() {
  if (isTikTokWebView) {
    return;
  }

  previewVideos.forEach((video) => {
    if (!video.isConnected) {
      return;
    }

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
