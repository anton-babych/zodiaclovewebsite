/**
 * PostHog Analytics
 * Key: phc_ytrP8FaJA5UykPSoRJWJYh2ZkHxELKPyn5CxK4Quv8CJ
 */
!function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="Rn Ln init Gn Jn Si Zn Yn Vn capture calculateEventProperties ns register register_once register_for_session unregister unregister_for_session ls getFeatureFlag getFeatureFlagPayload getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync us identify setPersonProperties unsetPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset setIdentity clearIdentity get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException addExceptionStep captureLog startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty ss ts createPersonProfile setInternalOrTestUser os Un ds opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing Xn debug Ii mr getPageViewId captureTraceFeedback captureTraceMetric jn".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

posthog.init('phc_ytrP8FaJA5UykPSoRJWJYh2ZkHxELKPyn5CxK4Quv8CJ', {
  api_host: 'https://us.i.posthog.com',
  defaults: '2026-05-30',
  person_profiles: 'identified_only',
  // Session Replay — каждая 10-я сессия (10%)
  session_recording: {
    sample_rate: 0.1,
    maskAllInputs: false,
    maskTextSelector: '.sensitive',
  },
});

// ─────────────────────────────────────────────
// HELPERS used by quiz.js
// ─────────────────────────────────────────────
window.track = function (event, props) {
  posthog.capture(event, props || {});
};

window.identifyUser = function (name) {
  posthog.identify(posthog.get_distinct_id(), { name: name });
};

function getCheckoutContext(button) {
  const activeStep = document.querySelector('.step-container.active');
  const props = {
    page_path: window.location.pathname,
    page_url: window.location.href,
    button_text: button.textContent.trim(),
    button_href: button.getAttribute('href') || '',
    button_location: button.closest('.mobile-cta') ? 'mobile_sticky' :
      button.closest('.hero-actions') ? 'hero' :
      button.closest('.checkout-sticky') ? 'quiz_paywall_sticky' :
      button.closest('.pricing-card') ? 'pricing' :
      'unknown',
  };

  if (activeStep) props.active_step = activeStep.id;

  const goal = document.getElementById('goal')?.value;
  const userSign = document.getElementById('user-sign')?.value;
  const crushSign = document.getElementById('crush-sign')?.value;
  const progress = document.getElementById('progress-text-value')?.textContent;

  if (goal) props.goal = goal;
  if (userSign) props.user_sign = userSign;
  if (crushSign) props.crush_sign = crushSign;
  if (progress) props.progress = progress;

  return props;
}

document.addEventListener('click', function (event) {
  const checkoutButton = event.target.closest && event.target.closest('.js-checkout');
  if (!checkoutButton) return;

  window.track('checkout_clicked', getCheckoutContext(checkoutButton));
}, true);
