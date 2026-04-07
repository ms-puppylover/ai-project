/**
 * Course flow: baseline quiz → (modules → checkpoint quiz) × 3 → level up.
 * State v2: per-level progress stored in levelData.
 */

const STORAGE_KEY = "realOrAiCourseV2";

let lastStarThreshold = 8;

const LEVEL_LABELS = {
  beginner:     "Beginner",
  intermediate: "Intermediate",
  advanced:     "Advanced",
};
const LEVEL_ORDER = ["beginner", "intermediate", "advanced"];

let state = loadState();
let lastQuizKind = "baseline";
let lastCheckpointPassed = false;
let lastScore = { correct: 0, total: 10, pct: 0 };
let activeModuleTrack = 1;
let moduleSlideIndex = 0;
let activeQuizItems = QUIZ_BASELINE_BEGINNER;

function defaultState() {
  return {
    v: 2,
    level: "beginner",
    levelData: {
      beginner:     { stars: 0, baselineDone: false, completed: false },
      intermediate: { stars: 0, baselineDone: false, completed: false },
      advanced:     { stars: 0, baselineDone: false, completed: false },
    },
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return migrateOldState();
    const p = JSON.parse(raw);
    if (p.v !== 2) return migrateOldState();
    const s = defaultState();
    s.level = LEVEL_ORDER.includes(p.level) ? p.level : "beginner";
    if (p.levelData) {
      LEVEL_ORDER.forEach(lv => {
        if (p.levelData[lv]) {
          s.levelData[lv].stars        = Math.min(3, Math.max(0, Number(p.levelData[lv].stars) || 0));
          s.levelData[lv].baselineDone = Boolean(p.levelData[lv].baselineDone);
          s.levelData[lv].completed    = Boolean(p.levelData[lv].completed);
        }
      });
    }
    return s;
  } catch { return defaultState(); }
}

function migrateOldState() {
  // Try to migrate from v1 storage
  try {
    const raw = localStorage.getItem("realOrAiCourseV1");
    if (!raw) return defaultState();
    const p = JSON.parse(raw);
    const s = defaultState();
    if (p.level === "graduate") {
      s.level = "advanced";
      s.levelData.beginner     = { stars: 3, baselineDone: true, completed: true };
      s.levelData.intermediate = { stars: 3, baselineDone: true, completed: true };
    } else if (p.level === "intermediate") {
      s.level = "intermediate";
      s.levelData.beginner     = { stars: 3, baselineDone: true, completed: true };
      s.levelData.intermediate = { stars: Math.min(3, Number(p.stars)||0), baselineDone: Boolean(p.baselineDone), completed: false };
    } else {
      s.level = "beginner";
      s.levelData.beginner = { stars: Math.min(3, Number(p.stars)||0), baselineDone: Boolean(p.baselineDone), completed: p.stars >= 3 };
    }
    return s;
  } catch { return defaultState(); }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ── Helpers for current level ──
function cur() { return state.levelData[state.level]; }
function nextLevel(lv) { return LEVEL_ORDER[LEVEL_ORDER.indexOf(lv) + 1] || null; }
function isUnlocked(lv) {
  const idx = LEVEL_ORDER.indexOf(lv);
  if (idx === 0) return true;
  const prev = LEVEL_ORDER[idx - 1];
  return state.levelData[prev].completed || state.levelData[lv].stars > 0 || state.levelData[lv].baselineDone;
}

function tierForPercent(p) {
  if (p < 50) return "foundation";
  if (p < 85) return "intermediate";
  return "expert";
}

function showPanel(id) {
  document.querySelectorAll(".panel").forEach((el) => {
    const on = el.id === id;
    el.classList.toggle("active", on);
    el.hidden = !on;
  });
}

function choiceLabels(kind) {
  if (kind === "image") return { human: "Real photo", ai: "AI or synthetic" };
  return { human: "Human-written", ai: "AI-style text" };
}

function answerLabel(kind, value) { return choiceLabels(kind)[value] || value; }

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function formatExplanationParagraphs(text) {
  return text.split(/\n\n+/).map(p => p.trim()).filter(Boolean).map(p => `<p>${escapeHtml(p)}</p>`).join("");
}

function renderStarsRow() {
  const row = document.getElementById("stars-row");
  const filled = cur().stars;
  row.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const span = document.createElement("span");
    span.className = "star-slot" + (i < filled ? " filled" : "");
    span.textContent = "★";
    span.setAttribute("aria-label", i < filled ? "Star earned" : "Star not earned yet");
    row.appendChild(span);
  }
}

function renderLevelTabs() {
  const tabs = document.getElementById("level-tabs");
  if (!tabs) return;
  tabs.innerHTML = LEVEL_ORDER.map(lv => {
    const unlocked = isUnlocked(lv);
    const active   = lv === state.level;
    const done     = state.levelData[lv].completed;
    const prev     = LEVEL_ORDER[LEVEL_ORDER.indexOf(lv) - 1];
    const hint     = prev ? `Complete ${LEVEL_LABELS[prev]} first` : "";
    return `<button class="level-tab${active ? " active" : ""}${!unlocked ? " locked" : ""}" data-level="${lv}" ${!unlocked ? `disabled title="${hint}"` : ""}>
      ${LEVEL_LABELS[lv]}${done ? " ✅" : ""}
    </button>`;
  }).join("");

  tabs.querySelectorAll(".level-tab:not([disabled])").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.dataset.level === state.level) return;
      state.level = btn.dataset.level;
      saveState();
      renderHome();
    });
  });
}

function renderProgressStrip() {
  document.getElementById("level-pill").textContent = LEVEL_LABELS[state.level] || "Beginner";
  renderStarsRow();
}

function renderHome() {
  renderProgressStrip();
  renderLevelTabs();
  const status  = document.getElementById("home-status");
  const primary = document.getElementById("btn-home-primary");
  const reset   = document.getElementById("btn-reset-progress");

  const data = cur();
  reset.hidden = !data.baselineDone && data.stars === 0 && state.level === "beginner";

  if (data.completed) {
    const next = nextLevel(state.level);
    status.textContent = next
      ? `You've completed ${LEVEL_LABELS[state.level]} with 3 stars! Switch to ${LEVEL_LABELS[next]} above to keep going.`
      : "You've completed ALL levels — you're an AI literacy expert! 🎉";
    primary.textContent = next ? `Start ${LEVEL_LABELS[next]} →` : "Review opening quiz";
    primary.hidden = false;
    reset.hidden = false;
    return;
  }

  if (!data.baselineDone) {
    const sample = CHECKPOINT_QUIZZES[state.level === "intermediate" ? "intermediate" : "beginner"][0];
    const need = starThresholdForQuiz(sample);
    status.textContent = state.level === "beginner"
      ? `Start with an opening quiz. Then do 3 module tracks — each ends with a checkpoint (${need}+ of ${sample.length} for a ⭐).`
      : "Welcome to Intermediate! Take the opening quiz, then tackle 3 harder module tracks.";
    primary.textContent = "Take opening quiz";
    primary.hidden = false;
    return;
  }

  if (data.stars < 3) {
    const next = data.stars + 1;
    const cp   = getCheckpointQuizForLevel(state.level, next);
    const need = starThresholdForQuiz(cp);
    status.textContent = `You have ${data.stars} / 3 ⭐ on ${LEVEL_LABELS[state.level]}. Open module track ${next} of 3, then pass its checkpoint (${need}+ / ${cp.length}) for your next star.`;
    primary.textContent = `Open module track ${next} of 3`;
    primary.hidden = false;
    return;
  }

  status.textContent = "Unexpected state — try Reset progress.";
  primary.hidden = true;
}

function getModuleTracks() {
  return MODULES_BY_LEVEL[state.level] || MODULES_BY_LEVEL.beginner;
}

function renderModuleSlide() {
  const tracks = getModuleTracks();
  const slides = tracks[activeModuleTrack - 1] || [];
  const slide  = slides[moduleSlideIndex];
  if (!slide) return;

  document.getElementById("module-meta").textContent =
    `${LEVEL_LABELS[state.level]} · Module track ${activeModuleTrack} of 3 · Card ${moduleSlideIndex + 1} of ${slides.length}`;
  document.getElementById("modules-heading").textContent = slide.title;
  document.getElementById("module-body").innerHTML = slide.html;
  document.getElementById("module-slide-count").textContent = `Page ${moduleSlideIndex + 1} of ${slides.length}`;

  const btn  = document.getElementById("btn-module-next");
  const last = moduleSlideIndex >= slides.length - 1;
  btn.textContent = last ? "Take checkpoint quiz" : "Next";
}

function openModuleTrack(trackNumber) {
  activeModuleTrack = Math.max(1, Math.min(3, trackNumber));
  moduleSlideIndex  = 0;
  showPanel("screen-modules");
  document.getElementById("review-card").hidden = true;
  renderModuleSlide();
  requestAnimationFrame(() => window.scrollTo(0, 0));
}

function startBaselineQuiz() {
  lastQuizKind  = "baseline";
  activeQuizItems = getBaselineQuizForLevel(state.level === "intermediate" ? "intermediate" : "beginner");
  lastStarThreshold = starThresholdForQuiz(activeQuizItems);
  document.getElementById("star-award").hidden  = true;
  document.getElementById("review-card").hidden = true;
  document.getElementById("quiz-context").textContent =
    state.level === "beginner"
      ? `Opening quiz · ${activeQuizItems.length} questions · mixed warm-up`
      : `Opening quiz · Intermediate · ${activeQuizItems.length} questions`;
  renderQuiz(activeQuizItems);
  showPanel("screen-quiz");
  requestAnimationFrame(() => window.scrollTo(0, 0));
}

function startCheckpointQuiz() {
  lastQuizKind  = "checkpoint";
  activeQuizItems = getCheckpointQuizForLevel(state.level, activeModuleTrack);
  lastStarThreshold = starThresholdForQuiz(activeQuizItems);
  const tierKey = state.level === "intermediate" ? "intermediate" : "beginner";
  const title   = CHECKPOINT_TITLES[tierKey][activeModuleTrack - 1] || "Checkpoint";
  document.getElementById("star-award").hidden  = true;
  document.getElementById("review-card").hidden = true;
  document.getElementById("quiz-context").textContent = `${title} · need ${lastStarThreshold} / ${activeQuizItems.length} correct for a star`;
  renderQuiz(activeQuizItems);
  showPanel("screen-quiz");
  requestAnimationFrame(() => window.scrollTo(0, 0));
}

function renderQuiz(items) {
  const container = document.getElementById("quiz-items");
  container.innerHTML = "";
  items.forEach((item, index) => {
    const labels  = choiceLabels(item.kind);
    const typeTag = item.kind === "image" ? "Image" : "Text";
    const lastHint = index === items.length - 1 ? " · Toughest call" : "";
    const article = document.createElement("article");
    article.className = "quiz-item";
    const mediaBlock = item.kind === "image"
      ? `<div class="quiz-image-wrap"><img class="quiz-image" src="${item.imageSrc}" alt="${escapeHtml(item.imageAlt)}" width="480" height="320" loading="lazy" decoding="async" /></div><p class="image-prompt">Was this taken with a camera, or is it AI / synthetic?</p>`
      : `<p class="passage">${escapeHtml(item.passage)}</p>`;
    article.innerHTML = `
      <p class="quiz-item-label">${typeTag} · Question ${index + 1} of ${items.length}${lastHint}</p>
      ${mediaBlock}
      <div class="choice-row">
        <label class="choice-human"><input type="radio" name="${item.id}" value="human" required />${escapeHtml(labels.human)}</label>
        <label class="choice-ai"><input type="radio" name="${item.id}" value="ai" required />${escapeHtml(labels.ai)}</label>
      </div>`;
    container.appendChild(article);
  });
  updateProgress(items);
  document.getElementById("quiz-form").querySelectorAll('input[type="radio"]').forEach(input => {
    input.addEventListener("change", () => updateProgress(items));
  });
}

function updateProgress(items) {
  const answered = items.filter(item => document.querySelector(`input[name="${item.id}"]:checked`)).length;
  document.getElementById("quiz-progress").textContent = `${answered} of ${items.length} answered`;
}

function scoreForm(form, items) {
  let correct = 0;
  const details = items.map(item => {
    const selected = form.querySelector(`input[name="${item.id}"]:checked`);
    const guess = selected ? selected.value : null;
    const ok = guess === item.answer;
    if (ok) correct++;
    return { ...item, guess, ok };
  });
  return { correct, total: items.length, details };
}

function renderWrongReview(details, items) {
  const card  = document.getElementById("review-card");
  const intro = document.getElementById("review-intro");
  const list  = document.getElementById("review-list");
  card.hidden = false;
  const wrong = details.filter(d => !d.ok);
  if (wrong.length === 0) {
    intro.textContent = "Nothing to review — you labeled every item correctly! Keep combining clues when it counts.";
    list.innerHTML = `<p class="review-perfect-note">No missed questions. Your reading track is below.</p>`;
    return;
  }
  intro.textContent = "Below is each question you missed, what you picked, the correct label, and why.";
  list.innerHTML = wrong.map(d => {
    const idx     = items.findIndex(q => q.id === d.id) + 1;
    const typeTag = d.kind === "image" ? "Image" : "Text";
    const you     = answerLabel(d.kind, d.guess);
    const corr    = answerLabel(d.kind, d.answer);
    const thumb   = d.kind === "image"
      ? `<div class="review-thumb-wrap"><img class="review-thumb" src="${d.imageSrc}" alt="${escapeHtml(d.imageAlt)}" width="240" height="160" loading="lazy" decoding="async" /></div>`
      : `<blockquote class="review-quote">${escapeHtml(d.passage)}</blockquote>`;
    return `<article class="review-item">
      <h4 class="review-item-title">${typeTag} · Question ${idx}</h4>
      ${thumb}
      <p class="review-picks"><span class="review-wrong-pick">You chose: ${escapeHtml(you)}</span> · <span class="review-right-pick">Correct: ${escapeHtml(corr)}</span></p>
      <div class="review-explain">${formatExplanationParagraphs(d.explanation)}</div>
    </article>`;
  }).join("");
}

function renderReading(tierKey) {
  const data = READING_BY_TIER[tierKey];
  const body = document.getElementById("reading-body");
  body.innerHTML = `<p class="track-intro"><strong>${escapeHtml(data.title)}</strong> — ${escapeHtml(data.subtitle)}</p>`;
  data.sections.forEach(sec => {
    const h4  = document.createElement("h4"); h4.textContent = sec.heading;
    const wrap = document.createElement("div"); wrap.innerHTML = sec.html;
    body.appendChild(h4); body.appendChild(wrap);
  });
}

function configureResultsActions() {
  const primary   = document.getElementById("btn-results-primary");
  const secondary = document.getElementById("btn-results-secondary");
  secondary.hidden = true;

  const data = cur();

  if (data.completed) {
    const next = nextLevel(state.level);
    primary.textContent = next ? `Go to ${LEVEL_LABELS[next]} →` : "Back to home";
    primary.hidden = false;
    return;
  }

  if (lastQuizKind === "baseline") {
    primary.textContent = "Continue to module track 1 of 3";
    primary.hidden = false;
    return;
  }

  if (lastQuizKind === "checkpoint") {
    if (lastCheckpointPassed) {
      if (data.stars === 3) {
        primary.textContent = state.level === "beginner" ? "Level up to Intermediate →" : "Complete course 🎉";
      } else {
        primary.textContent = `Continue to module track ${data.stars + 1} of 3`;
      }
      primary.hidden = false;
    } else {
      primary.textContent = "Review this module track again";
      primary.hidden = false;
      secondary.textContent = "Retry checkpoint quiz";
      secondary.hidden = false;
    }
  }
}

function applyResultsCopy() {
  const { correct, total, pct } = lastScore;
  document.getElementById("score-line").textContent = `${correct} / ${total} correct (${pct}%)`;
  const tierLabels = { foundation: "Growing observer", intermediate: "Solid instincts", expert: "Sharp eye — stay humble" };
  document.getElementById("tier-label").textContent = tierLabels[tierForPercent(pct)];

  const starAward = document.getElementById("star-award");
  const starText  = document.getElementById("star-award-text");
  const data = cur();
  if (lastQuizKind === "checkpoint" && lastCheckpointPassed) {
    starAward.hidden = false;
    starText.textContent = `Golden star ${data.stars} of 3 on ${LEVEL_LABELS[state.level]}!`;
  } else {
    starAward.hidden = true;
  }

  let blurb = "";
  const next = nextLevel(state.level);
  if (data.completed) {
    blurb = next
      ? `${LEVEL_LABELS[state.level]} complete! 3 stars earned — ${LEVEL_LABELS[next]} is now unlocked.`
      : "You've completed ALL levels — AI literacy expert unlocked! 🏆";
  } else if (lastQuizKind === "baseline") {
    blurb = "Opening quiz done. Read anything you missed, then head into module track 1.";
  } else if (lastCheckpointPassed) {
    blurb = `Checkpoint passed — star earned! (${lastStarThreshold}+ / ${total} required.)`;
    if (data.stars === 3) blurb += state.level === "beginner" ? " Ready to level up to Intermediate!" : " You've finished the whole course!";
  } else {
    blurb = `Need ${lastStarThreshold}+ correct (${total} questions) for a star. Revisit the modules, then retry.`;
  }
  document.getElementById("tier-blurb").textContent = blurb;
}

// ── Event listeners ──

document.getElementById("btn-home-primary").addEventListener("click", () => {
  const data = cur();
  const next = nextLevel(state.level);
  if (data.completed && next) {
    state.level = next;
    saveState();
    renderHome();
    return;
  }
  if (!data.baselineDone) { startBaselineQuiz(); return; }
  if (data.stars < 3) { openModuleTrack(data.stars + 1); }
});

function resetProgress() {
  if (!confirm("Reset all saved progress on this device?")) return;
  state = defaultState();
  saveState();
  renderHome();
  showPanel("screen-home");
  requestAnimationFrame(() => window.scrollTo(0, 0));
}

document.getElementById("btn-reset-progress").addEventListener("click", resetProgress);
document.getElementById("btn-module-reset").addEventListener("click", resetProgress);

document.getElementById("btn-module-next").addEventListener("click", () => {
  const tracks = getModuleTracks();
  const slides = tracks[activeModuleTrack - 1] || [];
  if (moduleSlideIndex < slides.length - 1) {
    moduleSlideIndex++;
    renderModuleSlide();
    return;
  }
  startCheckpointQuiz();
});

document.getElementById("quiz-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const { correct, total, details } = scoreForm(e.target, activeQuizItems);
  const pct = Math.round((correct / total) * 100);
  lastScore = { correct, total, pct };

  lastStarThreshold  = starThresholdForQuiz(activeQuizItems);
  lastCheckpointPassed = lastQuizKind === "checkpoint" && correct >= lastStarThreshold;

  const data = cur();
  if (lastQuizKind === "baseline") {
    data.baselineDone = true;
    saveState();
  } else if (lastQuizKind === "checkpoint" && lastCheckpointPassed) {
    data.stars = Math.min(3, data.stars + 1);
    if (data.stars === 3) data.completed = true;
    saveState();
  }

  if (pct === 100) {
    setTimeout(() => {
      confetti({ particleCount: 180, spread: 80, origin: { y: 0.3 }, colors: ["#7c4a1e","#c8831a","#f5d08a","#5a8a3c","#fff8f0"] });
      setTimeout(() => confetti({ particleCount: 120, spread: 100, origin: { x: 0.1, y: 0.5 } }), 300);
      setTimeout(() => confetti({ particleCount: 120, spread: 100, origin: { x: 0.9, y: 0.5 } }), 500);
    }, 400);
  }

  document.getElementById("reading-body").innerHTML = "";
  renderReading(tierForPercent(pct));
  renderWrongReview(details, activeQuizItems);
  applyResultsCopy();
  configureResultsActions();
  renderProgressStrip();
  showPanel("screen-results");
  requestAnimationFrame(() => window.scrollTo(0, 0));
});

document.getElementById("btn-results-primary").addEventListener("click", () => {
  document.getElementById("review-card").hidden = true;
  document.getElementById("star-award").hidden  = true;
  const data = cur();
  const next = nextLevel(state.level);

  const autoAdvance = () => {
    if (next) {
      state.level = next;
      saveState();
      showPanel("screen-levelup");
      const levelNames = { intermediate: "Intermediate", advanced: "Advanced" };
      const msgs = {
        intermediate: "You earned 3 stars on Beginner! 🎉 Intermediate unlocks new modules and trickier questions — same rhythm, harder habits.",
        advanced: "You earned 3 stars on Intermediate! 🎉 Advanced covers deepfakes, voice cloning, and provenance — the real expert stuff.",
      };
      document.getElementById("levelup-body").textContent = msgs[next] || `${levelNames[next]} is now unlocked!`;
      requestAnimationFrame(() => window.scrollTo(0, 0));
    } else {
      showPanel("screen-home");
      renderHome();
      requestAnimationFrame(() => window.scrollTo(0, 0));
    }
  };

  if (data.completed) { autoAdvance(); return; }
  if (lastQuizKind === "baseline") { openModuleTrack(1); return; }

  if (lastQuizKind === "checkpoint" && lastCheckpointPassed) {
    if (data.stars < 3) { openModuleTrack(data.stars + 1); return; }
    autoAdvance();
    return;
  }

  if (lastQuizKind === "checkpoint" && !lastCheckpointPassed) {
    openModuleTrack(data.stars + 1);
  }
});

document.getElementById("btn-results-secondary").addEventListener("click", () => {
  document.getElementById("review-card").hidden = true;
  document.getElementById("star-award").hidden  = true;
  startCheckpointQuiz();
});

document.getElementById("btn-levelup-ok").addEventListener("click", () => {
  saveState();
  renderProgressStrip();
  startBaselineQuiz();
});

renderHome();
showPanel("screen-home");
