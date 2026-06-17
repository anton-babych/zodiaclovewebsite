const LEMON_CHECKOUT_URL = "PASTE_LEMON_SQUEEZY_CHECKOUT_URL_HERE";

const checkoutButtons = document.querySelectorAll(".js-checkout");
const pricingSection = document.querySelector("#pricing");
const year = document.querySelector("#year");
const previewVideos = document.querySelectorAll(".product-video-frame video");
const forceTikTokPreview = new URLSearchParams(window.location.search).has("tiktok-preview");
const isTikTokWebView = forceTikTokPreview || /tiktok|musical_ly|bytedance|bytedancewebview|aweme/i.test(navigator.userAgent);

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

function buildFrameSources(video) {
  const base = video.dataset.tiktokFrameBase;
  const count = Number.parseInt(video.dataset.tiktokFrameCount || "0", 10);
  const extension = video.dataset.tiktokFrameExt || ".jpg";
  const version = video.dataset.tiktokFrameVersion;

  if (!base || !count) {
    return [];
  }

  return Array.from({ length: count }, (_, index) => {
    const frameNumber = String(index + 1).padStart(4, "0");
    const cacheBust = version ? `?v=${version}` : "";
    return `${base}${frameNumber}${extension}${cacheBust}`;
  });
}

function animateFramePreview(image, sources, fps) {
  if (!sources.length) {
    return;
  }

  const loadedFrames = new Set([0]);
  const frameDuration = 1000 / fps;
  let activeFrame = 0;
  let startTime = 0;

  sources.forEach((source, index) => {
    const preloadImage = new Image();
    preloadImage.onload = () => loadedFrames.add(index);
    preloadImage.src = source;
  });

  function tick(timestamp) {
    if (!image.isConnected) {
      return;
    }

    if (!startTime) {
      startTime = timestamp;
    }

    if (!document.hidden) {
      const nextFrame = Math.floor((timestamp - startTime) / frameDuration) % sources.length;
      if (nextFrame !== activeFrame && loadedFrames.has(nextFrame)) {
        image.src = sources[nextFrame];
        activeFrame = nextFrame;
      }
    }

    window.requestAnimationFrame(tick);
  }

  window.requestAnimationFrame(tick);
}

function replacePreviewVideosForTikTok() {
  if (!isTikTokWebView) {
    return;
  }

  previewVideos.forEach((video) => {
    const frameSources = buildFrameSources(video);
    const fallbackSrc = frameSources[0] || video.dataset.tiktokFallback;
    if (!fallbackSrc) {
      return;
    }

    const fallbackImage = document.createElement("img");
    fallbackImage.src = fallbackSrc;
    fallbackImage.onerror = () => {
      const posterFallback = video.dataset.tiktokFallback;
      if (posterFallback && !fallbackImage.dataset.fallbackUsed) {
        fallbackImage.dataset.fallbackUsed = "true";
        fallbackImage.src = posterFallback;
      }
    };
    fallbackImage.alt = video.getAttribute("aria-label") || "Flip-through preview of the guide";
    fallbackImage.width = video.videoWidth || 360;
    fallbackImage.height = video.videoHeight || 640;
    fallbackImage.loading = "eager";
    fallbackImage.decoding = "async";
    protectMediaElement(fallbackImage);
    video.replaceWith(fallbackImage);

    if (frameSources.length) {
      const fps = Number.parseFloat(video.dataset.tiktokFrameFps || "16");
      animateFramePreview(fallbackImage, frameSources, fps || 16);
    }
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
