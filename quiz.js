// quiz.js - Logic for the interactive chat funnel

const state = {
  userName: '',
  userSign: '',
  crushSign: '',
  timeTalking: '',
  goal: '',
  progress: 0,
  currentTurn: 0
};

// --- DATA DICTIONARY ---
// Trap and Roast logic based on Zodiac sign
const zodiacData = {
  Aries: {
    script: [
      { r: "yo my bad for ghosting, work was literally insane 💀", c: [{t: "all good, I was busy anyway", i: 20}, {t: "lol are you ever not busy?", i: -10}] },
      { r: "trying to catch my breath rn. what's your vibe today?", c: [{t: "going out with the girls tonight 🥂", i: 15}, {t: "nothing much, just chilling", i: -5}] },
      { r: "oh bet. might pull up to that new spot later", c: [{t: "have fun! it's packed tonight", i: 25}, {t: "take me with you!", i: -15}] },
      { r: "we'll see. lowkey tired but we should def do something soon", c: [{t: "I'll let you know if my schedule clears up 💅", i: 20}, {t: "we should! what day?", i: -10}] }
    ],
    trapQuestion: "actually nvm, I'm just gonna crash. next time tho",
    trapChoices: [ "Wait for him to text first. Play hard to get.", "Send a paragraph asking if everything is okay." ],
    roast: "Aries wants energy and boldness, not passivity or paragraphs of anxiety. They are attracted to people who are alive and direct. If you play games or act needy, they lose the spark instantly.",
    solution: "Send something short, bold, and slightly challenging. Make him feel like the chase is back on, but on your terms."
  },
  Taurus: {
    script: [
      { r: "hey sorry, was literally just sleeping for 12 hours 😭", c: [{t: "mood tbh. wish I was you", i: 20}, {t: "you sleep too much lol", i: -10}] },
      { r: "I needed it. just ordered food, probably gonna rot in bed", c: [{t: "enjoy your peace ✨", i: 15}, {t: "can I come over?", i: -15}] },
      { r: "haha maybe. kinda just want a quiet night tho", c: [{t: "I feel that. catch you later", i: 25}, {t: "I can be quiet!", i: -15}] },
      { r: "yeah we'll figure something out later this week", c: [{t: "sounds good, let me know", i: 20}, {t: "ok when exactly?", i: -10}] }
    ],
    trapQuestion: "actually I think I'm gonna take a step back, taking things slow rn",
    trapChoices: [ "Say 'Why? Are you talking to someone else?'", "Demand to know where this is going immediately." ],
    roast: "Taurus values comfort and slow burns. Do not rush emotional or physical intimacy. Pushing them for instant answers makes them feel controlled, and they will completely shut down.",
    solution: "Pull back slightly but remain warm. Let him feel your absence without drama. When a Taurus feels safe but realizes you aren't waiting around, they initiate."
  },
  Gemini: {
    script: [
      { r: "omg hey! sorry my brain has been completely scattered today", c: [{t: "haha same, it's the weather", i: 20}, {t: "it's fine, I'm used to it", i: -10}] },
      { r: "literally. I started 5 different projects and finished zero of them 🤡", c: [{t: "classic 😂 what are you working on?", i: 15}, {t: "you need to focus", i: -10}] },
      { r: "everything and nothing. might go to this random art show later", c: [{t: "oh sick, send pics!", i: 25}, {t: "why didn't you invite me?", i: -15}] },
      { r: "if I don't get distracted on the way there lol. we should hang soon tho", c: [{t: "for sure, let's plan something", i: 20}, {t: "please let's hang out", i: -10}] }
    ],
    trapQuestion: "hey I'm actually gonna go MIA for a bit, need a label-free weekend",
    trapChoices: [ "Ask 'What are we? I need a label.'", "Double text him asking why he's acting weird." ],
    roast: "Gemini needs mental movement and freedom to breathe. Do not pressure them for instant certainty or turn every conversation into a serious trial. They fear boredom and pressure more than most signs.",
    solution: "Send something completely unrelated and interesting—a meme, a weird fact, a joke. Shift the energy. If you engage his mind without pressure, he comes back."
  },
  Cancer: {
    script: [
      { r: "hey... sorry for being quiet. just been in my head a lot recently", c: [{t: "no worries, take your time 🤍", i: 20}, {t: "what's wrong now?", i: -10}] },
      { r: "just dealing with some family stuff. it's draining", c: [{t: "I'm here if you need to vent", i: 15}, {t: "oh that sucks", i: -5}] },
      { r: "thanks, I appreciate that. might just stay in and watch movies", c: [{t: "perfect night for it. what movie?", i: 25}, {t: "don't shut me out", i: -15}] },
      { r: "probably something nostalgic. I'll hit you up later if I'm feeling better", c: [{t: "take all the time you need", i: 20}, {t: "ok I'll be waiting", i: -10}] }
    ],
    trapQuestion: "yeah my ex used to love this movie... anyway I'm gonna go to sleep",
    trapChoices: [ "Tell him he's being too sensitive.", "Ignore it and change the subject completely." ],
    roast: "Cancer wants emotional safety. They remember details and are sensitive to coldness or mockery. Dismissing his feelings or treating his sensitivity like a problem destroys the trust.",
    solution: "Acknowledge the shift gently. 'Hey, I felt the vibe change. We don't have to talk about it, but I'm here.' Vulnerability without pressure is the key."
  },
  Leo: {
    script: [
      { r: "sorry I missed your text! was at the gym looking too good to check my phone 💅", c: [{t: "lol love the confidence", i: 20}, {t: "you're so full of yourself", i: -10}] },
      { r: "you know it 😂 honestly today has been a movie", c: [{t: "main character energy ✨", i: 15}, {t: "ok calm down", i: -10}] },
      { r: "literally. I bought this new jacket and it's actually insane", c: [{t: "need to see a fit pic asap", i: 25}, {t: "I'm sure it's fine", i: -15}] },
      { r: "I'll wear it next time we link. whenever I have time lol", c: [{t: "if you're lucky enough to see me in it", i: 20}, {t: "when is next time?", i: -10}] }
    ],
    trapQuestion: "[Sends a fit pic] kinda ate this look up ngl",
    trapChoices: [ "Ignore it so his ego doesn't get too big.", "Tease him about looking like he's trying too hard." ],
    roast: "Leo wants to be loved beautifully and admired. They need applause and recognition. Making them feel ordinary or embarrassing them is a guaranteed way to lose them.",
    solution: "Give him a specific, high-quality compliment. Not 'You look nice,' but 'That color on you is actually incredible.' Feed the ego, then step back."
  },
  Virgo: {
    script: [
      { r: "hey sorry for the delay, was organizing my entire life and lost track of time", c: [{t: "productive king 👑", i: 20}, {t: "you're too obsessed with working", i: -10}] },
      { r: "it had to be done. my schedule for this week was a mess", c: [{t: "I get it, gotta stay on top of things", i: 15}, {t: "boring", i: -10}] },
      { r: "yeah exactly. might grab a coffee later to keep pushing through", c: [{t: "don't burn yourself out!", i: 25}, {t: "bring me one?", i: -15}] },
      { r: "I know my limits lol. we'll figure out a time to see each other soon", c: [{t: "sounds like a plan", i: 20}, {t: "you never have time for me", i: -10}] }
    ],
    trapQuestion: "yeah the way you handled that situation makes no logical sense. I'm just gonna fix it.",
    trapChoices: [ "Start a massive emotional argument.", "Create chaos to show him he can't control you." ],
    roast: "Virgo falls in love through trust, usefulness, and clarity. Do not create chaos and call it romance. While you shouldn't accept harsh criticism, responding with pure chaos makes a Virgo walk away.",
    solution: "Set a calm, emotionless boundary. 'I value your opinion, but I don't respond to being talked down to.' Virgo respects structure and calm authority."
  },
  Libra: {
    script: [
      { r: "omg hey! sorry I was literally just thinking about you and forgot to reply 😅", c: [{t: "all good, I'm flattered 😏", i: 20}, {t: "sure you were", i: -10}] },
      { r: "I swear! I've been running around trying to decide what to wear tonight", c: [{t: "what are the options?", i: 15}, {t: "just pick something", i: -10}] },
      { r: "between the black shirt or the vintage one. I'm so indecisive it hurts", c: [{t: "vintage always wins", i: 25}, {t: "why is this so hard for you?", i: -15}] },
      { r: "you're so right. maybe we can go to that aesthetic place soon?", c: [{t: "only if you're buying 💅", i: 20}, {t: "yes please!", i: -10}] }
    ],
    trapQuestion: "actually I can't decide where to go tonight, I'm stressed, you pick or I'm cancelling",
    trapChoices: [ "Yell at him to just pick something.", "Give him an ultimatum right there on the text." ],
    roast: "Libra wants beauty, balance, and harmony. Pressure makes them indecisive. Raising your voice or forcing instant decisions shatters the elegant aesthetic they need in a relationship.",
    solution: "Remove the pressure but take the lead gracefully. 'Let's just do Italian. I know a place.' They will be intensely relieved and attracted to your gentle decisiveness."
  },
  Scorpio: {
    script: [
      { r: "hey. sorry I disappeared. just needed to unplug for a bit.", c: [{t: "I get it. hope you're good", i: 20}, {t: "where were you?", i: -10}] },
      { r: "I'm fine. just watching people. observing. you know.", c: [{t: "mysterious as always 🦇", i: 15}, {t: "that's weird", i: -10}] },
      { r: "not trying to be. just don't like everyone knowing my business", c: [{t: "your secrets are safe with me", i: 25}, {t: "what are you hiding?", i: -15}] },
      { r: "we'll see about that. let's link later. maybe.", c: [{t: "let me know if you survive the day", i: 20}, {t: "why maybe?", i: -10}] }
    ],
    trapQuestion: "yeah my phone is locked for a reason. don't try to look over my shoulder.",
    trapChoices: [ "Provoke jealousy by flirting with someone else.", "Demand instant vulnerability and passwords." ],
    roast: "Scorpio wants depth, truth, and deep trust. Do not provoke jealousy or demand instant vulnerability before trust is built. If you play shallow games with a Scorpio, they will cut you off permanently.",
    solution: "Match his privacy with your own mysterious independence. Focus on your own life. When a Scorpio realizes they don't fully possess you, their obsession kicks in."
  },
  Sagittarius: {
    script: [
      { r: "yooo sorry I went AWOL, just booked a random flight to Miami lol ✈️", c: [{t: "omg you're crazy, have fun!", i: 20}, {t: "wait without me?", i: -10}] },
      { r: "I needed to escape! life was getting too boring", c: [{t: "I respect the spontaneity 🌴", i: 15}, {t: "you're running from your problems", i: -10}] },
      { r: "maybe. anyway gonna be off my phone mostly", c: [{t: "enjoy the vibes! don't forget me", i: 25}, {t: "you literally never text me", i: -15}] },
      { r: "never! we'll def celebrate when I'm back. whenever that is.", c: [{t: "can't wait 💅", i: 20}, {t: "when are you coming back?", i: -10}] }
    ],
    trapQuestion: "actually I might extend the trip, I don't really want to be tied down rn",
    trapChoices: [ "Demand domestic predictability and ground rules.", "Try to control every step of his itinerary." ],
    roast: "Sagittarius needs freedom, adventure, and a bigger horizon. Do not demand domestic predictability too early or try to control them. If you shrink their world, they will run.",
    solution: "Show him you don't need him to have fun. 'Have the best time! I'm actually going out with the girls this weekend anyway.' Freedom attracts them."
  },
  Capricorn: {
    script: [
      { r: "hey, apologies for the late response. back-to-back meetings all day 📈", c: [{t: "secure the bag 💰", i: 20}, {t: "do you ever stop working?", i: -10}] },
      { r: "never. the grind doesn't stop. trying to hit my goals this quarter", c: [{t: "love the ambition tbh", i: 15}, {t: "that's so boring", i: -10}] },
      { r: "it pays off. might be late tonight, have to review some docs", c: [{t: "don't overwork yourself! get some rest", i: 25}, {t: "again? you promised we'd hang", i: -15}] },
      { r: "I know, I'll make it up to you. scheduling you in soon.", c: [{t: "I'll send you an invoice for my time", i: 20}, {t: "I'm not an appointment", i: -10}] }
    ],
    trapQuestion: "yeah I have to cancel our date again, work ran late. sorry.",
    trapChoices: [ "Create a chaotic emotional scene over text.", "Mock his ambition and tell him he's boring." ],
    roast: "Capricorn values respect, goals, and structure. Do not mock their ambition or create chaotic emotional scenes. They love through responsibility, and disrespecting their time is a dealbreaker.",
    solution: "Respond with cool professionalism. 'No problem, let me know when your schedule clears up.' Then, go silent. They respect people whose time is equally valuable."
  },
  Aquarius: {
    script: [
      { r: "hey sorry, went down a 3-hour rabbit hole about ancient aliens 👽", c: [{t: "lmao of course you did", i: 20}, {t: "you're so weird", i: -10}] },
      { r: "it's actually fascinating. humanity is a simulation anyway", c: [{t: "red pill or blue pill? 💊", i: 15}, {t: "can we talk about normal things?", i: -10}] },
      { r: "normal is a social construct. might go stargazing later tbh", c: [{t: "wait that sounds so peaceful", i: 25}, {t: "without me?", i: -15}] },
      { r: "yeah I just need some space to think. we'll vibe later.", c: [{t: "take your space! see ya", i: 20}, {t: "why do you always need space?", i: -10}] }
    ],
    trapQuestion: "honestly I just hate labels. I think relationships are a capitalist trap.",
    trapChoices: [ "Cling to him harder and demand he defines the relationship.", "Forbid him from seeing his friends until he commits." ],
    roast: "Aquarius needs freedom, friendship, and originality. Clinging when they ask for space or demanding standard labels instantly pushes them away. You must respect their personal space.",
    solution: "Agree with him and pull back girlfriend privileges. 'I completely agree, labels are restrictive. Let's just keep things casual.' He will panic when he realizes he's losing exclusivity."
  },
  Pisces: {
    script: [
      { r: "hey... sorry for disappearing. I fell asleep and had the craziest dream 🌊", c: [{t: "omg tell me about it", i: 20}, {t: "you're always asleep", i: -10}] },
      { r: "it was like we were in a past life or something. felt so real", c: [{t: "I love that. what happened?", i: 15}, {t: "that's not real life", i: -10}] },
      { r: "I'll tell you later. my energy is just really drained today", c: [{t: "protect your peace! rest up", i: 25}, {t: "stop making excuses", i: -15}] },
      { r: "thank you for understanding 🥺 we'll connect soon", c: [{t: "always 🤍", i: 20}, {t: "you better", i: -10}] }
    ],
    trapQuestion: "you're destroying the magic rn, you're being way too harsh with me.",
    trapChoices: [ "Mock his sensitivity and tell him to be realistic.", "Destroy the magic with unnecessary cynicism." ],
    roast: "Pisces wants magic, tenderness, and emotional depth. They love symbols and private worlds. Mocking their sensitivity or destroying the magic with harsh cynicism ruins the connection.",
    solution: "Lean into the imagination but keep your own boundaries strong. Validate his feelings without becoming his emotional therapist."
  }
};

const genericData = {
  script: [
    { r: "hey, sorry for the late reply. been super busy", c: [{t: "all good, me too", i: 20}, {t: "whatever", i: -10}] },
    { r: "how's your day going anyway?", c: [{t: "great actually, just relaxing", i: 15}, {t: "horrible, waiting for you", i: -15}] },
    { r: "nice nice. might go out later", c: [{t: "have fun!", i: 25}, {t: "can I come?", i: -15}] },
    { r: "yeah we'll see. let's catch up soon", c: [{t: "for sure", i: 20}, {t: "ok when?", i: -10}] }
  ],
  trapQuestion: "actually I'm gonna cancel tonight, maybe next week.",
  trapChoices: [
    "Send: 'Are you ignoring me?'",
    "Send: 'Fine, have a nice life.'"
  ],
  roast: "Sending anxious, double-texts from a place of insecurity triggers avoidance. You are showing them that they control your emotional state.",
  solution: "Put your phone on DND and go live your life. Silence is the most powerful text you can send when they pull away."
};

// --- DOM ELEMENTS ---
const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const step3 = document.getElementById('step-3');
const step4 = document.getElementById('step-4');
const step5 = document.getElementById('step-5');

const form = document.getElementById('onboarding-form');
const chatWindow = document.getElementById('chat-window');
const choicesContainer = document.getElementById('choices-container');
const choicesList = document.getElementById('choices-list');
const progressBar = document.getElementById('progress-bar');
const progressTextValue = document.getElementById('progress-text-value');
const chatTitle = document.getElementById('chat-title');
const progressLabel = document.getElementById('progress-label');

const goalLabels = {
  obsess:    'His Obsession Level',
  apologize: 'His Guilt Level',
  chase:     'His Chase Instinct',
  commit:    'His Commitment Drive'
};

// --- STEP 1: MULTI-STEP FORM LOGIC ---
const formSteps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next-btn');
const onboardingProgress = document.getElementById('onboarding-progress');
let currentFormStep = 0;

function updateFormProgress() {
  const percent = ((currentFormStep + 1) / formSteps.length) * 100;
  onboardingProgress.style.width = `${percent}%`;
}

function advanceFormStep() {
  formSteps[currentFormStep].classList.remove('active');
  formSteps[currentFormStep].classList.add('hidden');
  
  currentFormStep++;
  
  if (currentFormStep < formSteps.length) {
    formSteps[currentFormStep].classList.remove('hidden');
    formSteps[currentFormStep].classList.add('active');
    updateFormProgress();
  }
}

nextBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Basic validation
    const input = formSteps[currentFormStep].querySelector('input');
    if (!input.value) {
      input.style.borderColor = 'red';
      return;
    }
    input.style.borderColor = '#ddd';
    advanceFormStep();
  });
});

// Handle chunky option buttons
const optionBtns = document.querySelectorAll('.option-btn');
optionBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const container = btn.closest('.options-grid, .options-list');
    const targetId = container.dataset.target;
    const input = document.getElementById(targetId);
    
    // Visual selection
    container.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    
    // Set value
    input.value = btn.dataset.value;
    
    // Auto advance
    setTimeout(() => {
      advanceFormStep();
    }, 150);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Collect all data
  state.userName = document.getElementById('user-name').value;
  state.userSign = document.getElementById('user-sign').value;
  state.crushSign = document.getElementById('crush-sign').value;
  state.vibe = document.getElementById('vibe').value;
  state.goal = document.getElementById('goal').value;

  chatTitle.innerText = `${state.crushSign} 🔮`;
  progressLabel.innerText = goalLabels[state.goal] || 'His Obsession Level';
  
  const loading = document.getElementById('loading-overlay');
  loading.classList.remove('hidden');

  setTimeout(() => {
    loading.classList.add('hidden');
    switchStep(step1, step2);
    startChatSimulation();
  }, 1500);
});

// --- CHAT ENGINE ---
function switchStep(from, to) {
  from.classList.remove('active');
  from.classList.add('hidden');
  to.classList.remove('hidden');
  to.classList.add('active');
}

function updateProgress(value) {
  state.progress = value;
  progressBar.style.width = `${value}%`;
  progressTextValue.innerText = `${value}%`;
}

function appendMessage(text, type, status = '') {
  const wrapper = document.createElement('div');
  wrapper.className = `msg-wrapper ${type}`;
  
  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  if (status === 'error') bubble.classList.add('failed');
  bubble.innerText = text;
  
  wrapper.appendChild(bubble);

  if (status) {
    const statusEl = document.createElement('div');
    statusEl.className = `msg-status ${status === 'error' ? 'error' : ''}`;
    statusEl.innerText = status === 'error' ? 'Not Delivered' : status;
    wrapper.appendChild(statusEl);
  }

  chatWindow.appendChild(wrapper);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function showTypingIndicator() {
  const wrapper = document.createElement('div');
  wrapper.className = 'msg-wrapper received typing-indicator-wrapper';
  wrapper.id = 'typing-indicator';
  
  const bubble = document.createElement('div');
  bubble.className = 'typing-indicator';
  bubble.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
  
  wrapper.appendChild(bubble);
  chatWindow.appendChild(wrapper);
  window.scrollTo(0, document.body.scrollHeight);
}

function removeTypingIndicator() {
  const ind = document.getElementById('typing-indicator');
  if (ind) ind.remove();
}

function renderChoices(choices, callback) {
  choicesList.innerHTML = '';
  choices.forEach(choiceObj => {
    const text = typeof choiceObj === 'string' ? choiceObj : (choiceObj.text || choiceObj.t);
    const impact = typeof choiceObj === 'string' ? 0 : (choiceObj.impact || choiceObj.i || 0);
    
    const btn = document.createElement('div');
    btn.className = 'choice-btn';
    btn.innerText = text;
    btn.onclick = () => {
      choicesContainer.classList.remove('active');
      appendMessage(text, 'sent');
      callback(impact);
    };
    choicesList.appendChild(btn);
  });
  choicesContainer.classList.remove('hidden');
  
  setTimeout(() => {
    choicesContainer.classList.add('active');
  }, 50);
}

// --- CHAT SCRIPT LOGIC (DYNAMIC 4 TURNS) ---
function startChatSimulation() {
  state.progress = 15; // Start with a slight baseline
  updateProgress(state.progress);
  setTimeout(() => playDynamicTurn(0), 1000);
}

function playDynamicTurn(turnIndex) {
  const data = zodiacData[state.crushSign] || genericData;
  const turnData = data.script[turnIndex];

  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    appendMessage(turnData.r, 'received');
    
    setTimeout(() => {
      renderChoices(turnData.c, (impact) => {
        let newProg = Math.max(0, Math.min(100, state.progress + impact));
        updateProgress(newProg);
        
        if (turnIndex === 3) {
          document.querySelector('.progress-container').classList.add('pulse');
          setTimeout(() => playTurn5(), 1500);
        } else {
          setTimeout(() => playDynamicTurn(turnIndex + 1), 1000);
        }
      });
    }, 1000);
  }, 2000);
}

function playTurn5() {
  // The Trap
  const data = zodiacData[state.crushSign] || genericData;
  
  const timeJump = document.createElement('div');
  timeJump.style.textAlign = 'center';
  timeJump.style.color = '#888';
  timeJump.style.fontSize = '11px';
  timeJump.style.margin = '16px 0';
  timeJump.innerText = 'Today 4:12 PM';
  chatWindow.appendChild(timeJump);

  appendMessage(data.trapQuestion, 'received');

  setTimeout(() => {
    renderChoices(data.trapChoices, () => {
      // The Failure (Ignoring the impact here, as it's the fatal trap)
      setTimeout(() => {
        updateProgress(0);
        progressBar.classList.add('critical');
        progressTextValue.classList.add('critical');
        
        const lastSent = chatWindow.lastChild;
        lastSent.querySelector('.msg-bubble').classList.add('failed');
        const err = document.createElement('div');
        err.className = 'msg-status error';
        err.innerText = 'Read 4:15 PM - Ignored';
        lastSent.appendChild(err);

        setTimeout(() => {
          switchStep(step2, step3);
        }, 2000);
      }, 500);
    });
  }, 1500);
}

// --- STEP 3 & 4: PANIC AND ROAST ---
document.getElementById('btn-panic').addEventListener('click', () => {
  const loading = document.getElementById('roast-loading');
  const loadingText = document.getElementById('roast-loading-text');
  loading.classList.remove('hidden');
  
  // Dynamic text rotation
  setTimeout(() => loadingText.innerText = `Analyzing ${state.crushSign} psychology...`, 1500);
  setTimeout(() => loadingText.innerText = "Identifying attachment pattern...", 3000);
  setTimeout(() => loadingText.innerText = "Cross-referencing behavioral flags...", 4500);
  setTimeout(() => loadingText.innerText = "Generating Mistake Report...", 6000);

  // Populate Roast
  const data = zodiacData[state.crushSign] || genericData;
  document.getElementById('roast-name').innerText = state.userName;
  document.getElementById('roast-insight').innerText = data.roast;
  document.getElementById('roast-solution').innerText = data.solution;

  setTimeout(() => {
    loading.classList.add('hidden');
    switchStep(step3, step4);
    window.scrollTo(0,0);
  }, 7500); // 7.5 seconds wait to build anticipation
});

// --- STEP 5: PAYWALL ---
document.getElementById('btn-show-paywall').addEventListener('click', () => {
  // Update the dynamic sign in the paywall hero heading
  const paywallSign = document.getElementById('paywall-sign');
  if (paywallSign && state.crushSign) paywallSign.innerText = state.crushSign;
  
  switchStep(step4, step5);
  window.scrollTo(0,0);
});
