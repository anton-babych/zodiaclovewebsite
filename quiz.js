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
    trapQuestion: "He hasn't texted back in 2 hours.",
    trapChoices: [
      "Wait for him to text first. Play hard to get.",
      "Send a paragraph asking if everything is okay."
    ],
    roast: "Aries wants energy and boldness, not passivity or paragraphs of anxiety. They are attracted to people who are alive and direct. If you play games or act needy, they lose the spark instantly.",
    solution: "Send something short, bold, and slightly challenging. Make him feel like the chase is back on, but on your terms."
  },
  Taurus: {
    trapQuestion: "He says he wants to take things slow.",
    trapChoices: [
      "Say 'Why? Are you talking to someone else?'",
      "Demand to know where this is going immediately."
    ],
    roast: "Taurus values comfort and slow burns. Do not rush emotional or physical intimacy. Pushing them for instant answers makes them feel controlled, and they will completely shut down.",
    solution: "Pull back slightly but remain warm. Let him feel your absence without drama. When a Taurus feels safe but realizes you aren't waiting around, they initiate."
  },
  Gemini: {
    trapQuestion: "He's acting a little distant today after a great date.",
    trapChoices: [
      "Ask 'What are we? I need a label.'",
      "Double text him asking why he's acting weird."
    ],
    roast: "Gemini needs mental movement and freedom to breathe. Do not pressure them for instant certainty or turn every conversation into a serious trial. They fear boredom and pressure more than most signs.",
    solution: "Send something completely unrelated and interesting—a meme, a weird fact, a joke. Shift the energy. If you engage his mind without pressure, he comes back."
  },
  Cancer: {
    trapQuestion: "He got quiet when you brought up an ex.",
    trapChoices: [
      "Tell him he's being too sensitive.",
      "Ignore it and change the subject completely."
    ],
    roast: "Cancer wants emotional safety. They remember details and are sensitive to coldness or mockery. Dismissing his feelings or treating his sensitivity like a problem destroys the trust.",
    solution: "Acknowledge the shift gently. 'Hey, I felt the vibe change. We don't have to talk about it, but I'm here.' Vulnerability without pressure is the key."
  },
  Leo: {
    trapQuestion: "He wore a new outfit and is waiting for a reaction.",
    trapChoices: [
      "Ignore it so his ego doesn't get too big.",
      "Tease him about looking like he's trying too hard."
    ],
    roast: "Leo wants to be loved beautifully and admired. They need applause and recognition. Making them feel ordinary or embarrassing them is a guaranteed way to lose them.",
    solution: "Give him a specific, high-quality compliment. Not 'You look nice,' but 'That color on you is actually incredible.' Feed the ego, then step back."
  },
  Virgo: {
    trapQuestion: "He criticized how you packed for the trip.",
    trapChoices: [
      "Start a massive emotional argument.",
      "Create chaos to show him he can't control you."
    ],
    roast: "Virgo falls in love through trust, usefulness, and clarity. Do not create chaos and call it romance. While you shouldn't accept harsh criticism, responding with pure chaos makes a Virgo walk away.",
    solution: "Set a calm, emotionless boundary. 'I value your opinion, but I don't respond to being talked down to.' Virgo respects structure and calm authority."
  },
  Libra: {
    trapQuestion: "He can't decide where to go for dinner.",
    trapChoices: [
      "Yell at him to just pick something.",
      "Give him an ultimatum right there on the street."
    ],
    roast: "Libra wants beauty, balance, and harmony. Pressure makes them indecisive. Raising your voice or forcing instant decisions shatters the elegant aesthetic they need in a relationship.",
    solution: "Remove the pressure but take the lead gracefully. 'Let's just do Italian. I know a place.' They will be intensely relieved and attracted to your gentle decisiveness."
  },
  Scorpio: {
    trapQuestion: "He is being secretive about his phone.",
    trapChoices: [
      "Provoke jealousy by flirting with someone else.",
      "Demand instant vulnerability and passwords."
    ],
    roast: "Scorpio wants depth, truth, and deep trust. Do not provoke jealousy or demand instant vulnerability before trust is built. If you play shallow games with a Scorpio, they will cut you off permanently.",
    solution: "Match his privacy with your own mysterious independence. Focus on your own life. When a Scorpio realizes they don't fully possess you, their obsession kicks in."
  },
  Sagittarius: {
    trapQuestion: "He booked a spontaneous trip without asking you.",
    trapChoices: [
      "Demand domestic predictability and ground rules.",
      "Try to control every step of his itinerary."
    ],
    roast: "Sagittarius needs freedom, adventure, and a bigger horizon. Do not demand domestic predictability too early or try to control them. If you shrink their world, they will run.",
    solution: "Show him you don't need him to have fun. 'Have the best time! I'm actually going out with the girls this weekend anyway.' Freedom attracts them."
  },
  Capricorn: {
    trapQuestion: "He's working late again and cancels the date.",
    trapChoices: [
      "Create a chaotic emotional scene over text.",
      "Mock his ambition and tell him he's boring."
    ],
    roast: "Capricorn values respect, goals, and structure. Do not mock their ambition or create chaotic emotional scenes. They love through responsibility, and disrespecting their time is a dealbreaker.",
    solution: "Respond with cool professionalism. 'No problem, let me know when your schedule clears up.' Then, go silent. They respect people whose time is equally valuable."
  },
  Aquarius: {
    trapQuestion: "He says he 'hates labels'.",
    trapChoices: [
      "Cling to him harder and demand he defines the relationship.",
      "Forbid him from seeing his friends until he commits."
    ],
    roast: "Aquarius needs freedom, friendship, and originality. Clinging when they ask for space or demanding standard labels instantly pushes them away. You must respect their personal space.",
    solution: "Agree with him and pull back boyfriend privileges. 'I completely agree, labels are restrictive. Let's just keep things casual.' He will panic when he realizes he's losing exclusivity."
  },
  Pisces: {
    trapQuestion: "He is talking about a dream he had.",
    trapChoices: [
      "Mock his sensitivity and tell him to be realistic.",
      "Destroy the magic with unnecessary cynicism."
    ],
    roast: "Pisces wants magic, tenderness, and emotional depth. They love symbols and private worlds. Mocking their sensitivity or destroying the magic with harsh cynicism ruins the connection.",
    solution: "Lean into the imagination but keep your own boundaries strong. Validate his feelings without becoming his emotional therapist."
  }
};

const genericData = {
  trapQuestion: "He hasn't replied in 5 hours.",
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
      if (targetId === 'goal') {
        document.getElementById('final-submit').click();
      } else {
        advanceFormStep();
      }
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
    const text = typeof choiceObj === 'string' ? choiceObj : choiceObj.text;
    const impact = typeof choiceObj === 'string' ? 0 : (choiceObj.impact || 0);
    
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

// --- CHAT SCRIPT LOGIC (5 TURNS) ---
function startChatSimulation() {
  state.progress = 15; // Start with a slight baseline so negative impact doesn't hit 0 immediately
  updateProgress(state.progress);
  setTimeout(() => playTurn1(), 1000);
}

function playTurn1() {
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    appendMessage("Hey, sorry I've been quiet. Crazy week.", 'received');
    setTimeout(() => {
      renderChoices([
        { text: "No worries! I've been super busy too. How's your day?", impact: 20 },
        { text: "It's fine.", impact: -10 }
      ], (impact) => {
        let newProg = Math.max(0, Math.min(100, state.progress + impact));
        updateProgress(newProg);
        setTimeout(() => playTurn2(), 1000);
      });
    }, 1000);
  }, 2000);
}

function playTurn2() {
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    appendMessage("My day was good. Just finished up some stuff.", 'received');
    setTimeout(() => {
      renderChoices([
        { text: "Nice! Getting ready to relax?", impact: 15 },
        { text: "Cool.", impact: -5 }
      ], (impact) => {
        let newProg = Math.max(0, Math.min(100, state.progress + impact));
        updateProgress(newProg);
        setTimeout(() => playTurn3(), 1000);
      });
    }, 1000);
  }, 2000);
}

function playTurn3() {
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    appendMessage("Yeah exactly. Actually thinking about doing something fun this weekend.", 'received');
    setTimeout(() => {
      renderChoices([
        { text: "Oh yeah? Like what? Sounds fun.", impact: 25 },
        { text: "Take me with you!", impact: -15 } // A bit needy
      ], (impact) => {
        let newProg = Math.max(0, Math.min(100, state.progress + impact));
        updateProgress(newProg);
        setTimeout(() => playTurn4(), 1000);
      });
    }, 1000);
  }, 2000);
}

function playTurn4() {
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    appendMessage("Not sure yet, maybe hitting that new place downtown.", 'received');
    setTimeout(() => {
      renderChoices([
        { text: "I've heard it's amazing. You'll love it.", impact: 20 }, // confident, detachment
        { text: "We should totally go together!", impact: -10 } // slightly chasing
      ], (impact) => {
        let newProg = Math.max(0, Math.min(100, state.progress + impact));
        updateProgress(newProg);
        document.querySelector('.progress-container').classList.add('pulse');
        setTimeout(() => playTurn5(), 1500);
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
