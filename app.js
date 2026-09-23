// LocalStorage persistence key
const STORAGE_KEY = 'live_sales_call_sheet_v1';
const TIMER_STORAGE_KEY = 'call_timer_data_v1';

// Call Timer State
let timerInterval = null;
let timerSeconds = 0;
let timerRunning = false;
let timerStartTime = null;

function formatTime(totalSecs) {
  const h = Math.floor(totalSecs / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = totalSecs % 60;
  if (h > 0) {
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function updateTimerDisplays() {
  const text = formatTime(timerSeconds);
  const topDisplay = document.getElementById('top-timer-display');
  const rsDisplay = document.getElementById('rs-timer-display');
  const topDot = document.getElementById('top-timer-dot');
  const rsDot = document.getElementById('rs-timer-dot');
  const topContainer = document.getElementById('top-timer-container');
  const rsWidget = document.getElementById('floating-right-widget');
  const rsStatus = document.getElementById('rs-status-text');
  const topToggle = document.getElementById('top-timer-toggle');
  const rsToggle = document.getElementById('rs-toggle-btn');

  if (topDisplay) topDisplay.textContent = text;
  if (rsDisplay) rsDisplay.textContent = text;

  if (timerRunning) {
    if (topDot) topDot.className = 'pulse-dot running';
    if (rsDot) rsDot.className = 'pulse-dot running';
    if (topContainer) topContainer.classList.add('active');
    if (rsWidget) rsWidget.classList.add('active');
    if (rsStatus) rsStatus.textContent = '🟢 Call in progress';
    if (topToggle) topToggle.textContent = '⏸️';
    if (rsToggle) rsToggle.textContent = '⏸️ Pause';
  } else if (timerSeconds > 0) {
    if (topDot) topDot.className = 'pulse-dot';
    if (rsDot) rsDot.className = 'pulse-dot';
    if (topContainer) topContainer.classList.remove('active');
    if (rsWidget) rsWidget.classList.remove('active');
    if (rsStatus) rsStatus.textContent = '⏸️ Call paused';
    if (topToggle) topToggle.textContent = '▶️';
    if (rsToggle) rsToggle.textContent = '▶️ Resume';
  } else {
    if (topDot) topDot.className = 'pulse-dot';
    if (rsDot) rsDot.className = 'pulse-dot';
    if (topContainer) topContainer.classList.remove('active');
    if (rsWidget) rsWidget.classList.remove('active');
    if (rsStatus) rsStatus.textContent = '⏳ Starts on edit';
    if (topToggle) topToggle.textContent = '⏸️';
    if (rsToggle) rsToggle.textContent = '⏸️ Pause';
  }
}

function startTimer() {
  if (timerRunning) return;
  timerRunning = true;
  if (!timerStartTime) {
    timerStartTime = Date.now() - (timerSeconds * 1000);
  } else {
    timerStartTime = Date.now() - (timerSeconds * 1000);
  }
  
  // Auto-populate Date/Time in header if empty
  const dtInput = document.getElementById('meta-datetime');
  if (dtInput && !dtInput.value.trim()) {
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    dtInput.value = `${pad(now.getDate())}/${pad(now.getMonth()+1)}/${now.getFullYear()}, ${pad(now.getHours())}:${pad(now.getMinutes())}`;
  }

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const now = Date.now();
    timerSeconds = Math.max(0, Math.floor((now - timerStartTime) / 1000));
    updateTimerDisplays();
    if (timerSeconds % 4 === 0) {
      localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify({
        seconds: timerSeconds,
        running: timerRunning,
        startTime: timerStartTime
      }));
    }
  }, 1000);

  updateTimerDisplays();
  localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify({
    seconds: timerSeconds,
    running: timerRunning,
    startTime: timerStartTime
  }));
}

function pauseTimer() {
  if (!timerRunning) return;
  timerRunning = false;
  clearInterval(timerInterval);
  updateTimerDisplays();
  localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify({
    seconds: timerSeconds,
    running: false,
    startTime: timerStartTime
  }));
}

function toggleTimer() {
  if (timerRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerSeconds = 0;
  timerRunning = false;
  timerStartTime = null;
  updateTimerDisplays();
  localStorage.removeItem(TIMER_STORAGE_KEY);
}

// Automatically triggers timer when the user begins filling in the worksheet
function checkAutoStartTimer() {
  if (!timerRunning && timerSeconds === 0) {
    startTimer();
  }
}

// Auto-save logic
function saveForm() {
  const data = {};
  document.querySelectorAll('input[type="text"], input[type="datetime-local"], textarea').forEach(el => {
    if (el.id) data[el.id] = el.value;
  });

  document.querySelectorAll('input[type="checkbox"]').forEach(el => {
    const key = el.id || `${el.name}_${el.value}`;
    data[key] = el.checked;
  });

  document.querySelectorAll('input[type="radio"]:checked').forEach(el => {
    data[el.name] = el.value;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  updateProgress();
  showSaveIndicator();
}

function loadForm() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    updateProgress();
    return;
  }
  try {
    const data = JSON.parse(raw);
    document.querySelectorAll('input[type="text"], input[type="datetime-local"], textarea').forEach(el => {
      if (el.id && data[el.id] !== undefined) el.value = data[el.id];
    });

    document.querySelectorAll('input[type="checkbox"]').forEach(el => {
      const key = el.id || `${el.name}_${el.value}`;
      if (data[key] !== undefined) el.checked = data[key];
    });

    document.querySelectorAll('input[type="radio"]').forEach(el => {
      if (data[el.name] === el.value) el.checked = true;
    });
  } catch (e) {
    console.error('Failed to load saved form state', e);
  }

  // Restore call timer state if previously saved
  const timerRaw = localStorage.getItem(TIMER_STORAGE_KEY);
  if (timerRaw) {
    try {
      const tData = JSON.parse(timerRaw);
      if (tData.running && tData.startTime) {
        timerStartTime = tData.startTime;
        timerSeconds = Math.max(0, Math.floor((Date.now() - timerStartTime) / 1000));
        startTimer();
      } else if (tData.seconds !== undefined) {
        timerSeconds = tData.seconds;
        updateTimerDisplays();
      }
    } catch(e) {}
  }

  updateProgress();
}

function showSaveIndicator() {
  const el = document.getElementById('save-status');
  if (el) {
    el.textContent = 'Saved just now';
    clearTimeout(window._saveTimer);
    window._saveTimer = setTimeout(() => {
      el.textContent = 'Auto-saved';
    }, 2000);
  }
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// Completion Rule Validator
function updateProgress() {
  const rules = [
    { label: 'Target hypothesis', check: () => (document.getElementById('hypo-initial')?.value || '').trim().length > 5 },
    { label: '5 prepared probes', check: () => ['probe-q1','probe-q2','probe-q3','probe-q4','probe-q5'].every(id => (document.getElementById(id)?.value || '').trim().length > 0) },
    { label: 'Exact prospect answers', check: () => ['disc-ans1','disc-ans2'].some(id => (document.getElementById(id)?.value || '').trim().length > 3) },
    { label: 'Updated buying motive', check: () => (document.getElementById('synth-final')?.value || '').trim().length > 3 },
    { label: 'Customized pitch angle', check: () => ['pitch-1','pitch-2','pitch-5'].some(id => (document.getElementById(id)?.value || '').trim().length > 5) },
    { label: 'Objection log', check: () => (document.getElementById('obj-exact-1')?.value || '').trim().length > 0 || !!document.querySelector('input[name="obj_category"]:checked') },
    { label: 'Outcome recorded', check: () => !!document.querySelector('input[name="final_outcome"]:checked') },
    { label: 'Next action recorded', check: () => !!document.querySelector('input[name="next_action"]:checked') }
  ];

  let completedCount = 0;
  rules.forEach(r => {
    if (r.check()) completedCount++;
  });

  const total = rules.length;
  const pct = Math.round((completedCount / total) * 100);
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');

  if (progressBar) progressBar.style.width = pct + '%';
  if (progressText) {
    progressText.textContent = `${completedCount} / ${total} Key Requirements Met (${pct}%)`;
    if (completedCount === total) {
      progressText.style.color = '#16a34a';
      progressText.textContent = `🎉 All ${total} Mandatory Requirements Completed!`;
    } else {
      progressText.style.color = '#2563eb';
    }
  }
}

// Attach real-time input event listeners
document.addEventListener('input', () => {
  checkAutoStartTimer();
  saveForm();
});
document.addEventListener('change', () => {
  checkAutoStartTimer();
  saveForm();
});

// Reset Form
function confirmReset() {
  if (confirm('Are you sure you want to reset this call sheet? All current field inputs and the timer will be cleared.')) {
    localStorage.removeItem(STORAGE_KEY);
    resetTimer();
    document.querySelectorAll('input[type="text"], input[type="datetime-local"], textarea').forEach(el => el.value = '');
    document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(el => el.checked = false);
    updateProgress();
    showToast('Form and timer have been reset');
  }
}

// Copy CRM Summary to Clipboard
function copyCrmSummary() {
  const prospect = document.getElementById('meta-prospect')?.value || 'N/A';
  const caller = document.getElementById('meta-caller')?.value || 'N/A';
  const duration = formatTime(timerSeconds);
  const outcome = document.querySelector('input[name="final_outcome"]:checked')?.value || 'Pending';
  const courses = Array.from(document.querySelectorAll('input[name="course"]:checked')).map(el => el.value).join(', ') || 'N/A';
  const fit = document.querySelector('input[name="fit_decision"]:checked')?.value || 'N/A';
  const finalMotive = document.getElementById('synth-final')?.value || 'N/A';
  const nextActions = Array.from(document.querySelectorAll('input[name="next_action"]:checked')).map(el => el.value).join(', ') || 'None specified';
  const owner = document.getElementById('action-owner')?.value || 'N/A';
  const dueDate = document.getElementById('action-duedate')?.value || 'N/A';
  const objectionPattern = document.getElementById('obj-pattern')?.value || 'None';

  const summary = `
=== LIVE SALES CALL SHEET SUMMARY ===
Prospect: ${prospect}
Caller: ${caller}
Call Duration: ${duration}
Course Pitched: ${courses}
Fit Decision: ${fit}
Validated Buying Motive: ${finalMotive}

Final Outcome: ${outcome}
Next Action(s): ${nextActions} (Owner: ${owner}, Due: ${dueDate})
Primary Objection / Pattern: ${objectionPattern}
=====================================
  `.trim();

  navigator.clipboard.writeText(summary).then(() => {
    showToast('CRM summary copied to clipboard! 📋');
  }).catch(err => {
    alert(summary);
  });
}

// Demo Data Pre-population for testing
function fillDemoData() {
  const sample = {
    'meta-caller': 'Alex Morgan',
    'meta-datetime': '23/09/2026, 15:30',
    'meta-prospect': 'Vikram Patel',
    'meta-contact': 'vikram.patel@techcorp.io / +91 98765 43210',
    'meta-source': 'LinkedIn Ad - Agentic AI Playbook',
    'meta-attempt': '1st Attempt',
    
    'target-role-know': 'Senior Backend / Cloud Architect (10+ yrs exp)',
    'target-role-why': 'Leading team transformation towards autonomous agent workflows; high accountability',
    'target-skill-know': 'Python, FastAPI, AWS, Docker; zero production LangGraph / Multi-agent setup',
    'target-skill-why': 'Feels at risk of being sidelined by younger engineers who use modern AI orchestrators',
    'target-company-know': 'Mid-tier enterprise consultancy servicing US fintech clients',
    'target-company-why': 'Client RFPs now mandate production-grade LLM guardrails and agent architectures',
    'target-pain-know': 'Downloaded the Agentic AI curriculum, clicked 3 times on the live cohort syllabus',
    'target-pain-why': 'Needs deep engineering depth with code-level capstones, not high-level slide overviews',
    'target-urgency-know': 'Budget approved for Q4 professional upskilling; manager appraisal in 6 weeks',
    'target-urgency-why': 'Has financial authority up to $2,500 on company corporate card without second approver',

    'hypo-initial': 'Wants to lead the newly formed Generative AI task force at his firm and needs verified multi-agent architecture credentials.',
    'hypo-evidence': 'Visited curriculum page 3 times, requested corporate invoice receipt sample.',
    'hypo-unknown': 'Whether company will reimburse directly or if he is personally investing upfront today.',

    'probe-q1': 'What specific client deliverables or agent use-cases is your team tasked with rolling out this quarter?',
    'probe-m1': 'Reveals if this is an urgent corporate mandate or casual curiosity.',
    'probe-f1': 'How are you currently preventing hallucination and managing latency in that workflow?',

    'probe-q2': 'When you build agents today, what has been the biggest bottleneck between prototyping and production deployment?',
    'probe-m2': 'Identifies exact technical pain point (evaluation, streaming, state persistence).',
    'probe-f2': 'How much time is your engineering team losing dealing with that every sprint?',

    'probe-q3': 'If you don\'t bridge this architectural gap in the next 60 days, what is the cost to your current project timeline?',
    'probe-m3': 'Measures business impact and urgency multiplier.',
    'probe-f3': 'Who else is depending on this being delivered successfully?',

    'probe-q4': 'How will your leadership evaluate whether you are the right person to lead this AI initiative?',
    'probe-m4': 'Uncovers internal political motive and personal career validation.',
    'probe-f4': 'Would having 3 production-grade enterprise agent deployments in your portfolio solidify that leadership position?',

    'probe-q5': 'Are you planning to sponsor this through your company\'s annual learning allowance or your personal card?',
    'probe-m5': 'Clarifies buying authority and purchasing timeline friction.',
    'probe-f5': 'If we can provide an instant employer reimbursement packet today, would that allow you to confirm your seat immediately?',

    'disc-q1': 'What made you prioritize agentic development right now over other engineering priorities?',
    'disc-ans1': '"Our US client is threatening to move their contract to an offshore vendor who already has production agent workflows running."',
    'disc-f1': 'How soon do you need to demo a functioning autonomous agent to retain their confidence?',

    'disc-q2': 'What has your experience been with online tutorials or standard documentation so far?',
    'disc-ans2': '"Everything on YouTube is a trivial toy demo. Nobody teaches memory persistence, real tool calling fallbacks, and multi-tenant telemetry."',
    'disc-f2': 'If our mentors walk you through building that exact production harness, how would that change your confidence?',

    'synth-initial': 'Believed he wanted general GenAI upskilling for career change.',
    'synth-new': 'Actual urgency is retaining an active $150k enterprise client account within 30 days.',
    'synth-final': 'Needs immediate hands-on multi-agent production architecture to prevent client churn.',
    
    'fit-evidence': 'Client-driven urgency, strong Python foundation, corporate credit card ready.',
    
    'pitch-1': 'From what you shared, your client needs a production agent architecture within 30 days, and you cannot afford toy demo tutorials.',
    'pitch-2': 'The real issue seems to be lack of battle-tested enterprise patterns for agent orchestration, state persistence, and fallbacks.',
    'pitch-3': 'If this continues, you risk losing an active client contract and falling behind the internal AI transformation mandate.',
    'pitch-4': 'What you want is a guided, intensive build cohort where you build your actual enterprise capstone under expert code review.',
    'pitch-5': 'This training helps because our mentors are lead AI architects who run these exact systems in production daily.',
    'pitch-6': 'The reason this is practical for you is that you can build your client\'s prototype directly as your capstone project.',
    'pitch-7': 'Based on your goal of saving the client contract this month, shall we secure your seat in the cohort starting this Saturday?',

    'pitch-prospect-response': '"The curriculum covers exactly what we need. I just want to ensure the weekend sessions fit my timezone."',

    'obj-exact-1': '"Can I expense this under my corporate card and get an official GST/tax invoice with our company name?"',
    'obj-cause-1': 'Administrative payment processing confirmation',
    'obj-resp-1': 'Confirmed instant automated GST invoice issuance upon checkout with custom corporate company fields',

    'obj-pattern': 'Corporate reimbursement documentation clarity needed prior to checkout',
    'obj-improve': 'Include downloadable Employer Expense Pitch Deck on the checkout landing page',

    'action-owner': 'Alex Morgan',
    'action-duedate': '24/09/2026, 11:00 AM',
    'obj-evidence-needed': 'Send GST invoice template sample and Employer Reimbursement cheat sheet to prospect via WhatsApp & Email',

    'learn-1': 'Fear of client account loss is 10x more compelling than personal salary hike.',
    'learn-2': 'Probe #1 on client deliverables instantly unlocked his true motive.',
    'learn-3': 'Assumed he was paying out of pocket; company card was available immediately.',
    'learn-4': 'Need to highlight GST invoice format explicitly before the prospect asks.',
    'learn-5': 'Highlight corporate reimbursement approval guarantee on syllabus page.',

    'reviewer-notes': 'Flawless call execution. Probing was surgical and customized pitch addressed prospect verbatim quotes directly.'
  };

  for (let k in sample) {
    const el = document.getElementById(k);
    if (el) el.value = sample[k];
  }

  // Checkboxes & Radios
  document.querySelector('input[name="course"][value="Pro Code Agentic Development"]').checked = true;
  document.querySelector('input[name="lead_stage"][value="Fresh lead"]').checked = true;
  document.querySelector('input[name="call_objective"][value="Qualify"]').checked = true;
  document.querySelector('input[name="call_objective"][value="Pitch"]').checked = true;
  document.querySelector('input[name="call_objective"][value="Close"]').checked = true;

  // Signals
  document.querySelectorAll('input[name="sig1"]').forEach(cb => {
    if (['Pain', 'Urgency', 'Authority'].includes(cb.value)) cb.checked = true;
  });
  document.querySelectorAll('input[name="sig2"]').forEach(cb => {
    if (['Goal', 'Budget'].includes(cb.value)) cb.checked = true;
  });

  // Radios
  const confRadio = document.querySelector('input[name="confidence"][value="High"]');
  if (confRadio) confRadio.checked = true;

  const fitRadio = document.querySelector('input[name="fit_decision"][value="Strong fit"]');
  if (fitRadio) fitRadio.checked = true;

  const closeAttempt = document.querySelector('input[name="close_attempted"][value="Asked to enroll"]');
  if (closeAttempt) closeAttempt.checked = true;

  const pitchDec = document.querySelector('input[name="pitch_decision"][value="Enrolled"]');
  if (pitchDec) pitchDec.checked = true;

  const objRes = document.querySelector('input[name="obj_res_1"][value="Resolved"]');
  if (objRes) objRes.checked = true;

  const finalOut = document.querySelector('input[name="final_outcome"][value="Won / enrolled"]');
  if (finalOut) finalOut.checked = true;

  const nextAct1 = document.querySelector('input[name="next_action"][value="Send payment link"]');
  if (nextAct1) nextAct1.checked = true;

  const nextAct2 = document.querySelector('input[name="next_action"][value="Send proof/case study"]');
  if (nextAct2) nextAct2.checked = true;

  const objCat = document.querySelector('input[name="obj_category"][value="Authority"]');
  if (objCat) objCat.checked = true;

  document.querySelectorAll('input[name="mandatory_check"]').forEach(cb => cb.checked = true);

  const qualRadio = document.querySelector('input[name="sheet_quality"][value="5"]');
  if (qualRadio) qualRadio.checked = true;

  const readyRadio = document.querySelector('input[name="ready_next_call"][value="Yes"]');
  if (readyRadio) readyRadio.checked = true;

  // Set sample live call timer (12m 25s)
  resetTimer();
  timerSeconds = 745;
  startTimer();

  saveForm();
  showToast('Sample enterprise call data loaded! 🪄');
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  loadForm();
});