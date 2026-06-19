// quiz.js - Logic for the interactive chat funnel

// Track quiz page entry
document.addEventListener('DOMContentLoaded', () => {
  window.track && window.track('quiz_page_viewed');
});

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
  const currentStepEl = formSteps[currentFormStep];
  const stepNum = currentFormStep + 1;
  
  // Track every step completion
  const stepData = { step: stepNum };
  // Grab any set values for richer context
  const signInput = document.getElementById('user-sign');
  const crushInput = document.getElementById('crush-sign');
  const vibeInput = document.getElementById('vibe');
  const goalInput = document.getElementById('goal');
  if (signInput && signInput.value) stepData.user_sign = signInput.value;
  if (crushInput && crushInput.value) stepData.crush_sign = crushInput.value;
  if (vibeInput && vibeInput.value) stepData.vibe = vibeInput.value;
  if (goalInput && goalInput.value) stepData.goal = goalInput.value;
  window.track('quiz_step_completed', stepData);

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

  // Identify user by name + track submission
  window.identifyUser(state.userName);
  window.track('quiz_submitted', {
    user_sign: state.userSign,
    crush_sign: state.crushSign,
    vibe: state.vibe,
    goal: state.goal,
    name_provided: !!state.userName,
  });

  chatTitle.innerText = `${state.crushSign} 🔮`;
  progressLabel.innerText = goalLabels[state.goal] || 'His Obsession Level';
  
  const loading = document.getElementById('loading-overlay');
  loading.classList.remove('hidden');

  setTimeout(() => {
    loading.classList.add('hidden');
    switchStep(step1, step2);
    window.track('chat_simulation_started', {
      crush_sign: state.crushSign,
      goal: state.goal,
    });
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
      window.track('chat_choice_made', {
        choice_text: text,
        impact: impact,
        crush_sign: state.crushSign,
        is_good_choice: impact > 0,
      });
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
          window.track('trap_triggered', {
            crush_sign: state.crushSign,
            progress_at_trap: state.progress,
          });
        }, 2000);
      }, 500);
    });
  }, 1500);
}

// --- STEP 3 & 4: PANIC AND ROAST ---
document.getElementById('btn-panic').addEventListener('click', () => {
  window.track('roast_generation_started', { crush_sign: state.crushSign, goal: state.goal });
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
    window.track('roast_revealed', { crush_sign: state.crushSign, goal: state.goal });
    window.scrollTo(0,0);
  }, 7500); // 7.5 seconds wait to build anticipation
});

// --- EGO-STRIKE COPY MATRIX (goal × crushSign) ---
const egoCopy = {
  // ── GOAL: obsess ──────────────────────────────────────────────────
  obsess: {
    Aries:       { eyebrow: "The power shift",         headline: "How to shatter an <span id='paywall-sign'>Aries</span>'s ego so hard he can't stop thinking about you.",        subline: "One text. His pride breaks. His obsession starts.",        tease: "Aries runs on conquest. The moment you stop chasing, his brain short-circuits. You need the exact phrase that triggers his hunter panic.",    cta: "Show me the Aries ego switch →",    note: "The exact text is in the guide." },
    Taurus:      { eyebrow: "The control flip",        headline: "The one message that makes a <span id='paywall-sign'>Taurus</span> realize he's losing his grip on you.",         subline: "Calm. Cold. Devastating to his comfort zone.",           tease: "Taurus is wired to possess. Remove the safety, and his composure cracks. The text is surgical — no begging, no drama.",                  cta: "Show me the Taurus control break →",note: "The exact text is in the guide." },
    Gemini:      { eyebrow: "The attention cut",       headline: "How to become the only thing a <span id='paywall-sign'>Gemini</span> thinks about — by going quiet.",             subline: "No chase. No panic. Just vanishing from his brain — his worst nightmare.",  tease: "Gemini's ego feeds on constant stimulation. Pull the plug on his entertainment and watch his mind spiral back to you.",          cta: "Show me the Gemini silence trick →",note: "The exact text is in the guide." },
    Cancer:      { eyebrow: "The emotional reversal",  headline: "The message that makes a <span id='paywall-sign'>Cancer</span> feel like the one who messed up.",                 subline: "Gentle. Devastating. He won't see it coming.",          tease: "Cancer runs on emotional guilt. The right text doesn't attack — it makes him feel the weight of what he's losing. Silently.",           cta: "Show me the Cancer guilt flip →",   note: "The exact text is in the guide." },
    Leo:         { eyebrow: "The spotlight removal",   headline: "How to destroy a <span id='paywall-sign'>Leo</span>'s ego by making him invisible.",                               subline: "He needs your applause. Pull it. Watch him panic.",     tease: "Leo's entire identity collapses the moment you stop admiring him. One sentence removes his spotlight — and puts you in it.",            cta: "Show me the Leo ego kill →",        note: "The exact text is in the guide." },
    Virgo:       { eyebrow: "The competence strike",   headline: "The text that makes a <span id='paywall-sign'>Virgo</span> question his own self-image.",                          subline: "Precise. Calm. Hits him where he hides.",              tease: "Virgo's ego is built on being the smartest person in the room. One perfectly worded, unbothered line dismantles that identity.",         cta: "Show me the Virgo identity hit →",  note: "The exact text is in the guide." },
    Libra:       { eyebrow: "The balance break",       headline: "How to shatter a <span id='paywall-sign'>Libra</span>'s ego by removing his power to charm you.",                 subline: "He thrives on being chosen. Stop choosing. He unravels.", tease: "Libra's confidence lives in your reaction to him. The moment you become indifferent, his whole composure falls apart.",              cta: "Show me the Libra charm kill →",    note: "The exact text is in the guide." },
    Scorpio:     { eyebrow: "The control inversion",   headline: "The exact text that makes a <span id='paywall-sign'>Scorpio</span> realize he's not in control anymore.",           subline: "He thought he had you. One text changes that.",         tease: "Scorpio's ego is built on power. Strip it away calmly — no drama, no reaction — and his obsession kicks into overdrive.",               cta: "Show me the Scorpio power flip →",  note: "The exact text is in the guide." },
    Sagittarius: { eyebrow: "The freedom trap",        headline: "How to make a <span id='paywall-sign'>Sagittarius</span> panic by not caring if he leaves.",                       subline: "He expects you to chase. Don't. His ego shatters.",    tease: "Sagittarius is addicted to the thrill of being wanted. The moment you genuinely stop wanting him, his mind short-circuits.",            cta: "Show me the Sagittarius trap →",    note: "The exact text is in the guide." },
    Capricorn:   { eyebrow: "The status threat",       headline: "The message that makes a <span id='paywall-sign'>Capricorn</span> feel like he's losing someone valuable.",         subline: "He respects value. Show him yours — by leaving.",       tease: "Capricorn only moves for things worth fighting for. One text communicates that your time is a resource he can no longer take for granted.", cta: "Show me the Capricorn value move →",note: "The exact text is in the guide." },
    Aquarius:    { eyebrow: "The detachment mirror",   headline: "How to out-detach an <span id='paywall-sign'>Aquarius</span> and make his ego crack.",                             subline: "He thinks he's the unbothered one. Flip it.",          tease: "Aquarius prides himself on emotional freedom. When you genuinely don't need him, his whole identity as the 'free spirit' is threatened.", cta: "Show me the Aquarius detach flip →",note: "The exact text is in the guide." },
    Pisces:      { eyebrow: "The magic withdrawal",    headline: "The text that makes a <span id='paywall-sign'>Pisces</span> realize he destroyed something irreplaceable.",         subline: "He'll feel the loss before he can name it.",           tease: "Pisces ego is built on being someone's dream. The moment you remove him from that pedestal, quietly, his world loses color.",            cta: "Show me the Pisces loss trigger →", note: "The exact text is in the guide." },
    _default:    { eyebrow: "The power flip",          headline: "The exact text that flips the dynamic — and breaks his ego in the process.",                                        subline: "One sentence. His control gone. His mind on you.",     tease: "The right text doesn't beg. It removes something from him he didn't know he needed.",                                                  cta: "Show me the ego switch →",          note: "The exact text is in the guide." },
  },
  // ── GOAL: apologize ───────────────────────────────────────────────
  apologize: {
    Aries:       { eyebrow: "The guilt trigger",       headline: "How to make an <span id='paywall-sign'>Aries</span> feel the weight of what he did — without saying a word.",      subline: "No confrontation. Just silence that burns.",           tease: "Aries hates being wrong. One calm, unbothered response activates his guilt reflex and makes his ego demand he fix it.",                  cta: "Show me the Aries guilt move →",    note: "The exact text is in the guide." },
    Taurus:      { eyebrow: "The comfort removal",     headline: "The message that makes a <span id='paywall-sign'>Taurus</span>'s conscience kick in.",                              subline: "Remove his comfort. His guilt does the rest.",         tease: "Taurus hates losing something warm and stable. Withdraw that warmth calmly, and his guilt mechanism activates on its own.",             cta: "Show me the Taurus guilt trigger →",note: "The exact text is in the guide." },
    Gemini:      { eyebrow: "The narrative flip",      headline: "How to rewrite the story so a <span id='paywall-sign'>Gemini</span> becomes the villain in his own head.",          subline: "He's great at spinning stories — until yours is better.", tease: "Gemini needs to be the smart, charming one. One message reframes the situation so he sees himself as the one who messed up.",          cta: "Show me the Gemini story flip →",   note: "The exact text is in the guide." },
    Cancer:      { eyebrow: "The emotional mirror",    headline: "The text that forces a <span id='paywall-sign'>Cancer</span> to sit with what he broke.",                           subline: "He prides himself on emotional depth. Use it.",        tease: "Cancer's conscience is his biggest vulnerability. The right words hold up a mirror — gently, without aggression — and he can't look away.",cta: "Show me the Cancer mirror text →",  note: "The exact text is in the guide." },
    Leo:         { eyebrow: "The reputation hit",      headline: "How to make a <span id='paywall-sign'>Leo</span> feel like the bad guy in a story everyone will know.",             subline: "His image is everything. Leverage it.",               tease: "Leo's ego cannot survive being cast as the villain. One message subtly threatens that narrative — and he scrambles to fix it.",           cta: "Show me the Leo shame trigger →",   note: "The exact text is in the guide." },
    Virgo:       { eyebrow: "The logic trap",          headline: "The message that makes a <span id='paywall-sign'>Virgo</span> conclude — logically — that he owes you an apology.", subline: "He loves being right. Show him he's not.",             tease: "Virgo analyzes everything. One factual, unemotional text lays out what happened so clearly that his own brain forces him to admit fault.",  cta: "Show me the Virgo logic trap →",    note: "The exact text is in the guide." },
    Libra:       { eyebrow: "The fairness appeal",     headline: "How to make a <span id='paywall-sign'>Libra</span>'s obsession with fairness work against him.",                   subline: "He hates injustice. Remind him he created it.",        tease: "Libra cannot tolerate being the one who was unfair. One calm message activates his need to restore balance — starting with an apology.",   cta: "Show me the Libra guilt move →",    note: "The exact text is in the guide." },
    Scorpio:     { eyebrow: "The trust card",          headline: "The text that makes a <span id='paywall-sign'>Scorpio</span> feel the damage he did to something he can't rebuild.", subline: "He broke trust. Show him the cost. Calmly.",           tease: "Scorpio values loyalty above all. One message communicates that he violated something sacred — without drama, without begging.",            cta: "Show me the Scorpio trust hit →",   note: "The exact text is in the guide." },
    Sagittarius: { eyebrow: "The integrity check",    headline: "How to make a <span id='paywall-sign'>Sagittarius</span> feel like a hypocrite for treating you this way.",         subline: "He claims to be free and honest. Call the bluff.",    tease: "Sagittarius prides himself on honesty and good character. One message makes him confront the gap between who he says he is and what he did.",cta: "Show me the Sagittarius integrity hit →", note: "The exact text is in the guide." },
    Capricorn:   { eyebrow: "The respect move",        headline: "The message that makes a <span id='paywall-sign'>Capricorn</span> realize he failed his own standards.",             subline: "He holds himself to a code. Remind him he broke it.",  tease: "Capricorn's ego is tied to being a man of his word. One message holds up that standard — and lets him measure himself against it.",        cta: "Show me the Capricorn code trigger →",note:"The exact text is in the guide." },
    Aquarius:    { eyebrow: "The principle trap",      headline: "How to make an <span id='paywall-sign'>Aquarius</span> feel like he betrayed his own values.",                      subline: "He thinks he's evolved. Show him he's not.",           tease: "Aquarius loves being the enlightened, ethical one. One message reveals the gap between his ideology and his behavior — and it haunts him.", cta: "Show me the Aquarius values flip →",note: "The exact text is in the guide." },
    Pisces:      { eyebrow: "The empathy weapon",      headline: "The text that forces a <span id='paywall-sign'>Pisces</span> to feel exactly what he made you feel.",               subline: "He's all about feelings — until they're yours.",       tease: "Pisces absorbs emotions like a sponge. One message written with the right emotional weight makes his own conscience punish him.",           cta: "Show me the Pisces empathy trigger →",note:"The exact text is in the guide." },
    _default:    { eyebrow: "The conscience move",     headline: "The text that makes his own guilt do the work for you.",                                                             subline: "No drama. No begging. Just a well-placed mirror.",    tease: "The goal isn't to yell. It's to say the one thing that makes him unable to justify his own behavior.",                                   cta: "Show me the guilt trigger →",       note: "The exact text is in the guide." },
  },
  // ── GOAL: chase ───────────────────────────────────────────────────
  chase: {
    Aries:       { eyebrow: "Flip the hunt",           headline: "How to make an <span id='paywall-sign'>Aries</span>'s brain switch you from prey to prize.",                        subline: "Stop running with him. Make him run after you.",       tease: "Aries is wired to chase what moves away. The second you become unavailable, his hunter instinct fires and he can't help himself.",         cta: "Show me the Aries chase switch →",  note: "The exact text is in the guide." },
    Taurus:      { eyebrow: "The comfort threat",      headline: "The one move that makes a <span id='paywall-sign'>Taurus</span> realize he needs to act before he loses you.",       subline: "Slow and steady — until they sense you slipping away.", tease: "Taurus only mobilizes when their comfort is at real risk. One move signals that the window is closing, and his need to secure you kicks in.",cta: "Show me the Taurus urgency move →", note: "The exact text is in the guide." },
    Gemini:      { eyebrow: "The curiosity trap",      headline: "How to become the most interesting mystery in a <span id='paywall-sign'>Gemini</span>'s mind.",                     subline: "He chases what he can't fully read. Become unreadable.", tease: "Gemini chases stimulation. The moment you become slightly unpredictable and less available, his curiosity locks onto you.",               cta: "Show me the Gemini mystery move →", note: "The exact text is in the guide." },
    Cancer:      { eyebrow: "The warmth withdrawal",   headline: "The message that makes a <span id='paywall-sign'>Cancer</span> crave your emotional warmth desperately.",            subline: "He got comfortable. Withdraw the warmth. He'll follow.",tease: "Cancer chases emotional safety. One small withdrawal of warmth — not cold, just neutral — triggers his deep fear of losing connection.",     cta: "Show me the Cancer warmth pull →",  note: "The exact text is in the guide." },
    Leo:         { eyebrow: "The admiration game",     headline: "How to make a <span id='paywall-sign'>Leo</span> work for your attention instead of taking it for granted.",         subline: "Give him less. He'll crave more.",                     tease: "Leo chases admiration. Become slightly less available with your applause and he will perform harder, louder, specifically for you.",         cta: "Show me the Leo attention pull →",  note: "The exact text is in the guide." },
    Virgo:       { eyebrow: "The value signal",        headline: "The text that makes a <span id='paywall-sign'>Virgo</span> realize you are exactly what he was too slow to secure.", subline: "He took his time analyzing. You moved on. Now he's fast.",tease:"Virgo chases things of proven value. One message communicates your standards clearly enough that his analytical brain concludes: 'I need to move.'",cta:"Show me the Virgo value signal →",note:"The exact text is in the guide." },
    Libra:       { eyebrow: "The other option hint",   headline: "How to make a <span id='paywall-sign'>Libra</span>'s indecision collapse into urgency.",                            subline: "The only thing that cures his indecision is competition.", tease: "Libra stalls because he feels safe. One subtle signal that you have other options breaks the stall — and he suddenly knows exactly what he wants.",cta:"Show me the Libra urgency text →",note:"The exact text is in the guide." },
    Scorpio:     { eyebrow: "The mystery leverage",    headline: "The move that makes a <span id='paywall-sign'>Scorpio</span>'s obsession flip into pursuit mode.",                  subline: "He thought he had you figured out. He doesn't.",       tease: "Scorpio chases what he can't fully control or possess. Become slightly more mysterious and less accessible — his obsession activates.",      cta: "Show me the Scorpio obsession flip →",note:"The exact text is in the guide." },
    Sagittarius: { eyebrow: "The freedom mirror",      headline: "How to make a <span id='paywall-sign'>Sagittarius</span> chase you by becoming as free as him.",                    subline: "Stop waiting. He'll notice when you stop.",            tease: "Sagittarius chases people who don't need them. One move communicates you have your own adventure — and suddenly he wants in.",              cta: "Show me the Sagittarius freedom mirror →",note:"The exact text is in the guide." },
    Capricorn:   { eyebrow: "The ambition match",      headline: "The text that makes a <span id='paywall-sign'>Capricorn</span> see you as a goal worth pursuing.",                  subline: "He only chases things worth having. Become that.",     tease: "Capricorn is motivated by quality and scarcity. One message reframes you as a high-value opportunity with an expiration date.",             cta: "Show me the Capricorn goal text →", note: "The exact text is in the guide." },
    Aquarius:    { eyebrow: "The independence flex",   headline: "How to make an <span id='paywall-sign'>Aquarius</span> chase you by being more independent than him.",               subline: "He thought he was the free one. Surprise him.",        tease: "Aquarius is drawn to people who genuinely don't need them. One authentic act of independence makes him suddenly realize what he stands to lose.",cta:"Show me the Aquarius independence flex →",note:"The exact text is in the guide." },
    Pisces:      { eyebrow: "The magic cut",           headline: "The move that makes a <span id='paywall-sign'>Pisces</span> chase the dream version of you he's been ignoring.",    subline: "He romanticizes from a distance. Give him that distance.", tease: "Pisces chases emotional poetry. Step back slightly, maintain your mystery, and watch him romanticize the idea of you until he has to have it.", cta: "Show me the Pisces dream trigger →",note: "The exact text is in the guide." },
    _default:    { eyebrow: "The pursuit flip",        headline: "The exact move that makes him realize he's about to lose you — and makes him chase.",                                subline: "Stop being available. He'll notice immediately.",      tease: "The psychology of pursuit is simple: people want what they're about to lose. One text makes that loss feel real.",                          cta: "Show me the chase trigger →",       note: "The exact text is in the guide." },
  },
  // ── GOAL: commit ──────────────────────────────────────────────────
  commit: {
    Aries:       { eyebrow: "The stakes move",         headline: "How to make an <span id='paywall-sign'>Aries</span>'s ego demand he locks you down before someone else does.",       subline: "Make the risk real. He'll move fast.",                 tease: "Aries only commits when his competitive instinct kicks in. One move signals scarcity — and his need to win takes over.",                    cta: "Show me the Aries stakes move →",   note: "The exact text is in the guide." },
    Taurus:      { eyebrow: "The safety signal",       headline: "The text that makes a <span id='paywall-sign'>Taurus</span>'s need for security override his fear of commitment.",   subline: "He wants permanence. Show him what he's risking.",    tease: "Taurus commits to stability. One move shifts his thinking from 'I have time' to 'I could actually lose this' — and he decides.",           cta: "Show me the Taurus security flip →",note: "The exact text is in the guide." },
    Gemini:      { eyebrow: "The novelty lock",        headline: "How to become the one thing a <span id='paywall-sign'>Gemini</span> doesn't want to stop exploring.",                subline: "He fears boredom more than commitment. Be unpredictable.", tease: "Gemini avoids commitment because he fears losing options. Become the most interesting option — and suddenly you're the one he wants to keep.", cta: "Show me the Gemini lock move →",    note: "The exact text is in the guide." },
    Cancer:      { eyebrow: "The nest signal",         headline: "The text that activates a <span id='paywall-sign'>Cancer</span>'s deep need to build something with you.",            subline: "He wants a home. Show him what one could look like.",  tease: "Cancer commits when he feels emotionally safe AND afraid of losing that safety. One message balances both — and his instinct kicks in.",    cta: "Show me the Cancer nest trigger →", note: "The exact text is in the guide." },
    Leo:         { eyebrow: "The exclusive prize",     headline: "How to make a <span id='paywall-sign'>Leo</span> commit by making himself feel like the winner who earned you.",     subline: "He wants to win. Let him — on your terms.",           tease: "Leo commits to people who make them feel like they've secured something exceptional. One move frames commitment as his victory, not a trap.",  cta: "Show me the Leo prize move →",      note: "The exact text is in the guide." },
    Virgo:       { eyebrow: "The certainty close",     headline: "The message that gives a <span id='paywall-sign'>Virgo</span> enough data to finally decide — and decide on you.",   subline: "He overanalyzes. Give him one clear, final signal.",   tease: "Virgo stalls because he fears making the wrong decision. One message eliminates the uncertainty and gives his brain permission to commit.",    cta: "Show me the Virgo close text →",    note: "The exact text is in the guide." },
    Libra:       { eyebrow: "The decision force",      headline: "How to make a <span id='paywall-sign'>Libra</span>'s indecision collapse and force him to choose you — or lose you.", subline: "He's been weighing options. Remove the option.",      tease: "Libra avoids decisions because they fear regret. One calm, fair ultimatum removes his ability to keep stalling — without drama.",             cta: "Show me the Libra force close →",   note: "The exact text is in the guide." },
    Scorpio:     { eyebrow: "The trust unlock",        headline: "The text that breaks a <span id='paywall-sign'>Scorpio</span>'s walls and makes committing feel safe — for once.",   subline: "He's afraid of being vulnerable. Give him a reason not to be.",tease:"Scorpio withholds commitment until trust is absolute. One message communicates that you are trustworthy and worth the risk — without chasing.",   cta: "Show me the Scorpio trust unlock →",note: "The exact text is in the guide." },
    Sagittarius: { eyebrow: "The adventure pitch",     headline: "How to make a <span id='paywall-sign'>Sagittarius</span> see commitment as freedom, not a cage.",                    subline: "He runs from labels. Reframe the label.",             tease: "Sagittarius avoids commitment because it feels like a wall. One message reframes your relationship as the greatest adventure — not a limitation.", cta: "Show me the Sagittarius reframe →", note: "The exact text is in the guide." },
    Capricorn:   { eyebrow: "The long game move",      headline: "The text that makes a <span id='paywall-sign'>Capricorn</span> see you as the one investment worth making.",          subline: "He thinks long-term. Show him your ROI.",             tease: "Capricorn commits when they see long-term value and low risk. One message positions you as exactly that — and lets his strategic mind do the math.",cta:"Show me the Capricorn investment text →",note:"The exact text is in the guide." },
    Aquarius:    { eyebrow: "The equal partner move",  headline: "How to make an <span id='paywall-sign'>Aquarius</span> commit by making him feel like he's found his intellectual equal.", subline: "He doesn't want a partner. He wants a co-conspirator.", tease: "Aquarius commits to people who feel like teammates in an unconventional life. One message signals that you are that person — and he moves.",   cta: "Show me the Aquarius teammate text →",note:"The exact text is in the guide." },
    Pisces:      { eyebrow: "The soulmate signal",     headline: "The text that makes a <span id='paywall-sign'>Pisces</span> feel like letting you go would be cosmically wrong.",     subline: "He believes in signs. Become one.",                   tease: "Pisces commits to people they feel a fated connection with. One message deepens that feeling — and makes leaving feel like a spiritual mistake.",cta:"Show me the Pisces soul signal →",note:"The exact text is in the guide." },
    _default:    { eyebrow: "The commitment trigger",  headline: "The move that turns 'we're talking' into something real.",                                                             subline: "No ultimatums. No pressure. Just the right signal.",  tease: "Commitment isn't forced. It's triggered. One text makes the cost of NOT committing suddenly very clear to him.",                              cta: "Show me the commitment trigger →",  note: "The exact text is in the guide." },
  },
};

// ── Roast tease copy per goal ──────────────────────────────────────
const roastTeaseCopy = {
  obsess:    "But here's the thing — his ego has a specific crack. You just haven't found it yet. The right text doesn't beg. It breaks something in him.",
  apologize: "But guilt doesn't come from yelling. It comes from the one sentence that makes his own conscience do the work. You need that sentence.",
  chase:     "But pursuit doesn't start with pressure. It starts the moment he realizes you stopped waiting. You need the exact text that signals that.",
  commit:    "But commitment isn't forced — it's triggered. You need the one move that makes the cost of NOT choosing you suddenly very real to him.",
};

// ── STEP 5: PAYWALL — wire up dynamic copy ────────────────────────
document.getElementById('btn-show-paywall').addEventListener('click', () => {
  window.track('paywall_viewed', { crush_sign: state.crushSign, goal: state.goal, user_sign: state.userSign });

  const goal = state.goal || 'obsess';
  const sign = state.crushSign;

  const matrix = egoCopy[goal] || egoCopy.obsess;
  const copy   = matrix[sign]  || matrix._default;

  // Roast page CTA + tease
  const roastTease = document.getElementById('roast-tease');
  const roastCtaText = document.getElementById('roast-cta-text');
  if (roastTease) roastTease.innerText = roastTeaseCopy[goal] || roastTeaseCopy.obsess;
  if (roastCtaText) roastCtaText.innerText = copy.cta;

  // Paywall hero
  const elEyebrow   = document.getElementById('paywall-eyebrow');
  const elHeadline  = document.getElementById('paywall-headline');
  const elSubline   = document.getElementById('paywall-subline');
  const elFloatNote = document.getElementById('paywall-float-note');

  if (elEyebrow)   elEyebrow.innerText = copy.eyebrow;
  if (elHeadline)  elHeadline.innerHTML = copy.headline; // innerHTML for <span id='paywall-sign'>
  if (elSubline)   elSubline.innerText  = copy.subline;
  if (elFloatNote) elFloatNote.innerText = copy.note;

  switchStep(step4, step5);
  window.scrollTo(0, 0);
});

