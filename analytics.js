/**
 * PostHog Analytics Wrapper
 * ─────────────────────────────────────────────
 * Replace YOUR_POSTHOG_KEY with your actual phc_... key from:
 * app.posthog.com → Project Settings → Project API Key
 */
const POSTHOG_KEY = 'YOUR_POSTHOG_KEY';
const POSTHOG_HOST = 'https://eu.i.posthog.com'; // EU cloud — change to https://us.i.posthog.com if US

!(function (t, e) {
  var o, n, p, r;
  e.__SV ||
    ((window.posthog = e),
    (e._i = []),
    (e.init = function (i, s, a) {
      function g(t, e) {
        var o = e.split('.');
        2 == o.length && ((t = t[o[0]]), (e = o[1]));
        t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))); };
      }
      (p = t.createElement('script')),
        (p.type = 'text/javascript'),
        (p.crossOrigin = 'anonymous'),
        (p.async = !0),
        (p.src = s.api_host.replace('.i.posthog.com', '-assets.i.posthog.com') + '/static/array.js'),
        (r = t.getElementsByTagName('script')[0]),
        r.parentNode.insertBefore(p, r);
      var u = e;
      for (
        void 0 !== a ? (u = e[a] = []) : (a = 'posthog'),
          u.people = u.people || [],
          u.toString = function (t) {
            var e = 'posthog';
            return 'posthog' !== a && (e += '.' + a), t || (e += ' (stub)'), e;
          },
          u.people.toString = function () { return u.toString(1) + '.people (stub)'; },
          o = 'capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep onSessionId setPersonPropertiesForFlags'.split(' '),
          n = 0;
        n < o.length;
        n++
      )
        g(u, o[n]);
      e._i.push([i, s, a]);
    }),
    (e.__SV = 1));
})(document, window.posthog || []);

posthog.init(POSTHOG_KEY, {
  api_host: POSTHOG_HOST,
  // Session Replay — записывает ~2% сессий (каждую ~50-ю)
  session_recording: {
    sample_rate: 0.02,          // 0.02 = 2% = каждая ~50-я сессия
    maskAllInputs: false,       // имена/текст в инпутах видны
    maskTextSelector: '.sensitive', // добавь класс .sensitive на что хочешь скрыть
  },
  loaded: function (ph) {
    console.log('[Analytics] PostHog loaded, distinct_id:', ph.get_distinct_id());
  }
});

// ─────────────────────────────────────────────
// QUIZ EVENT HELPERS
// ─────────────────────────────────────────────

window.track = function (event, props) {
  if (typeof posthog !== 'undefined') {
    posthog.capture(event, props || {});
  }
};

// Identify user once we have their name
window.identifyUser = function (name) {
  if (typeof posthog !== 'undefined') {
    posthog.identify(posthog.get_distinct_id(), { name: name });
  }
};
