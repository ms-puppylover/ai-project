/**
 * Course flow: baseline quiz → (modules → checkpoint quiz) × 3 → level up.
 * Values: "human" = real photo or person-written; "ai" = synthetic / AI-style text.
 */

const STORAGE_KEY = "realOrAiCourseV1";

/** Updated on each quiz submit (checkpoints use ~73% threshold). */
let lastStarThreshold = 8;

const LEVEL_LABELS = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  graduate: "Graduate",
};

let state = loadState();
/** Quiz just submitted */
let lastQuizKind = "baseline";
let lastCheckpointPassed = false;
let lastScore = { correct: 0, total: 10, pct: 0 };
/** In-memory module navigation */
let activeModuleTrack = 1;
let moduleSlideIndex = 0;
/** Current question list (baseline or track-specific checkpoint) */
let activeQuizItems = QUIZ_BASELINE_BEGINNER;

function defaultState() {
  return {
    v: 1,
    level: "beginner",
    stars: 0,
    baselineDone: false,
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const p = JSON.parse(raw);
    if (p.v !== 1) return defaultState();
    return {
      ...defaultState(),
      ...p,
      level: p.level === "intermediate" || p.level === "graduate" ? p.level : "beginner",
      stars: Math.min(3, Math.max(0, Number(p.stars) || 0)),
      baselineDone: Boolean(p.baselineDone),
    };
  } catch {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
  if (kind === "image") {
    return { human: "Real photo", ai: "AI or synthetic" };
  }
  return { human: "Human-written", ai: "AI-style text" };
}

function answerLabel(kind, value) {
  return choiceLabels(kind)[value] || value;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function formatExplanationParagraphs(text) {
  return text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join("");
}

function renderStarsRow() {
  const row = document.getElementById("stars-row");
  const max = 3;
  const filled = state.level === "graduate" ? 3 : state.stars;
  row.innerHTML = "";
  for (let i = 0; i < max; i++) {
    const span = document.createElement("span");
    span.className = "star-slot" + (i < filled ? " filled" : "");
    span.textContent = "★";
    span.setAttribute("aria-label", i < filled ? "Star earned" : "Star not earned yet");
    row.appendChild(span);
  }
}

function renderProgressStrip() {
  document.getElementById("level-pill").textContent = LEVEL_LABELS[state.level] || "Beginner";
  renderStarsRow();
}

function renderHome() {
  renderProgressStrip();
  const status = document.getElementById("home-status");
  const primary = document.getElementById("btn-home-primary");
  const reset = document.getElementById("btn-reset-progress");

  if (state.level === "graduate") {
    status.textContent =
      "You finished the Beginner path (three golden stars), then the Intermediate path (three more). That’s the full track for now—your progress is saved in this browser.";
    primary.textContent = "Review opening quiz";
    primary.hidden = false;
    reset.hidden = false;
    return;
  }

  reset.hidden = state.level === "beginner" && !state.baselineDone && state.stars === 0;

  if (!state.baselineDone) {
    const sample = CHECKPOINT_QUIZZES.beginner[0];
    const need = starThresholdForQuiz(sample);
    status.textContent =
      state.level === "beginner"
        ? `Start with an opening quiz. Then open three module tracks—each teaches a different skill and ends in a new checkpoint quiz (${need}+ of ${sample.length} for a star, about 73%).`
        : "Welcome to Intermediate. Take the opening quiz, then three new module tracks—each checkpoint quiz matches what you just studied.";
    primary.textContent = "Take opening quiz";
    return;
  }

  if (state.stars < 3) {
    const next = state.stars + 1;
    const cp = getCheckpointQuizForLevel(state.level, next);
    const need = starThresholdForQuiz(cp);
    status.textContent = `You have ${state.stars} / 3 golden stars on the ${LEVEL_LABELS[state.level]} path. Open module track ${next} of 3, then pass its checkpoint (${need}+ / ${cp.length}) for your next star.`;
    primary.textContent = `Open module track ${next} of 3`;
    return;
  }

  status.textContent = "Unexpected state—try Reset progress.";
  primary.hidden = true;
}

function getModuleTracks() {
  if (state.level === "intermediate") return MODULES_BY_LEVEL.intermediate;
  return MODULES_BY_LEVEL.beginner;
}

function renderModuleSlide() {
  const tracks = getModuleTracks();
  const trackIndex = activeModuleTrack - 1;
  const slides = tracks[trackIndex] || [];
  const slide = slides[moduleSlideIndex];
  if (!slide) return;

  document.getElementById("module-meta").textContent =
    `${LEVEL_LABELS[state.level]} · Module track ${activeModuleTrack} of 3 · Card ${moduleSlideIndex + 1} of ${slides.length}`;
  document.getElementById("modules-heading").textContent = slide.title;
  document.getElementById("module-body").innerHTML = slide.html;
  document.getElementById("module-slide-count").textContent = `Page ${moduleSlideIndex + 1} of ${slides.length}`;

  const btn = document.getElementById("btn-module-next");
  const last = moduleSlideIndex >= slides.length - 1;
  btn.textContent = last ? "Take checkpoint quiz" : "Next";
}

function openModuleTrack(trackNumber) {
  activeModuleTrack = Math.max(1, Math.min(3, trackNumber));
  moduleSlideIndex = 0;
  showPanel("screen-modules");
  document.getElementById("review-card").hidden = true;
  renderModuleSlide();
  requestAnimationFrame(() => window.scrollTo(0, 0));
}

function baselineLevelKey() {
  if (state.level === "beginner") return "beginner";
  return "intermediate";
}

function startBaselineQuiz() {
  lastQuizKind = "baseline";
  activeQuizItems = getBaselineQuizForLevel(baselineLevelKey());
  lastStarThreshold = starThresholdForQuiz(activeQuizItems);
  document.getElementById("star-award").hidden = true;
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
  lastQuizKind = "checkpoint";
  activeQuizItems = getCheckpointQuizForLevel(state.level, activeModuleTrack);
  lastStarThreshold = starThresholdForQuiz(activeQuizItems);
  const tierKey = state.level === "intermediate" ? "intermediate" : "beginner";
  const title = CHECKPOINT_TITLES[tierKey][activeModuleTrack - 1] || "Checkpoint";
  document.getElementById("star-award").hidden = true;
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
    const labels = choiceLabels(item.kind);
    const typeTag = item.kind === "image" ? "Image" : "Text";
    const lastHint = index === items.length - 1 ? " · Toughest call" : "";
    const article = document.createElement("article");
    article.className = "quiz-item";
    const mediaBlock =
      item.kind === "image"
        ? `<div class="quiz-image-wrap">
             <img class="quiz-image" src="${item.imageSrc}" alt="${escapeHtml(item.imageAlt)}" width="480" height="320" loading="lazy" decoding="async" />
           </div>
           <p class="image-prompt">Was this taken with a camera in the real world, or is it AI / synthetic art?</p>`
        : `<p class="passage">${escapeHtml(item.passage)}</p>`;

    article.innerHTML = `
      <p class="quiz-item-label">${typeTag} · Question ${index + 1} of ${items.length}${lastHint}</p>
      ${mediaBlock}
      <div class="choice-row">
        <label class="choice-human">
          <input type="radio" name="${item.id}" value="human" required />
          ${escapeHtml(labels.human)}
        </label>
        <label class="choice-ai">
          <input type="radio" name="${item.id}" value="ai" required />
          ${escapeHtml(labels.ai)}
        </label>
      </div>
    `;
    container.appendChild(article);
  });
  updateProgress(items);
  const form = document.getElementById("quiz-form");
  form.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.addEventListener("change", () => updateProgress(items));
  });
}

function updateProgress(items) {
  const answered = items.filter((item) => {
    const checked = document.querySelector(`input[name="${item.id}"]:checked`);
    return Boolean(checked);
  }).length;
  document.getElementById("quiz-progress").textContent = `${answered} of ${items.length} answered`;
}

function scoreForm(form, items) {
  let correct = 0;
  const details = items.map((item) => {
    const selected = form.querySelector(`input[name="${item.id}"]:checked`);
    const guess = selected ? selected.value : null;
    const ok = guess === item.answer;
    if (ok) correct += 1;
    return { ...item, guess, ok };
  });
  return { correct, total: items.length, details };
}

function renderWrongReview(details, items) {
  const card = document.getElementById("review-card");
  const intro = document.getElementById("review-intro");
  const list = document.getElementById("review-list");
  card.hidden = false;

  const wrong = details.filter((d) => !d.ok);
  if (wrong.length === 0) {
    intro.textContent =
      "Nothing to review—you labeled every item correctly on this quiz. Keep combining clues (text + source + image) when it counts in the real world.";
    list.innerHTML = `<p class="review-perfect-note">No missed questions. Your reading track is below.</p>`;
    return;
  }

  intro.textContent = `Below is each question you missed, what you picked, the correct label, and why—so the quiz is a little lesson, not just a number.`;

  list.innerHTML = wrong
    .map((d) => {
      const idx = items.findIndex((q) => q.id === d.id) + 1;
      const typeTag = d.kind === "image" ? "Image" : "Text";
      const you = answerLabel(d.kind, d.guess);
      const corr = answerLabel(d.kind, d.answer);
      const thumb =
        d.kind === "image"
          ? `<div class="review-thumb-wrap"><img class="review-thumb" src="${d.imageSrc}" alt="${escapeHtml(d.imageAlt)}" width="240" height="160" loading="lazy" decoding="async" /></div>`
          : `<blockquote class="review-quote">${escapeHtml(d.passage)}</blockquote>`;
      return `<article class="review-item">
        <h4 class="review-item-title">${typeTag} · Question ${idx}</h4>
        ${thumb}
        <p class="review-picks"><span class="review-wrong-pick">You chose: ${escapeHtml(you)}</span> · <span class="review-right-pick">Correct: ${escapeHtml(corr)}</span></p>
        <div class="review-explain">${formatExplanationParagraphs(d.explanation)}</div>
      </article>`;
    })
    .join("");
}

function renderReading(tierKey) {
  const data = READING_BY_TIER[tierKey];
  const body = document.getElementById("reading-body");
  body.innerHTML = `<p class="track-intro"><strong>${escapeHtml(data.title)}</strong> — ${escapeHtml(data.subtitle)}</p>`;
  data.sections.forEach((sec) => {
    const h4 = document.createElement("h4");
    h4.textContent = sec.heading;
    const wrap = document.createElement("div");
    wrap.innerHTML = sec.html;
    body.appendChild(h4);
    body.appendChild(wrap);
  });
}

function configureResultsActions() {
  const primary = document.getElementById("btn-results-primary");
  const secondary = document.getElementById("btn-results-secondary");
  secondary.hidden = true;

  if (state.level === "graduate") {
    primary.textContent = "Back to home";
    primary.hidden = false;
    secondary.hidden = true;
    return;
  }

  if (lastQuizKind === "baseline") {
    primary.textContent = "Continue to module track 1 of 3";
    primary.hidden = false;
    return;
  }

  if (lastQuizKind === "checkpoint") {
    if (lastCheckpointPassed) {
      if (state.level === "beginner" && state.stars === 3) {
        primary.textContent = "Level up to Intermediate";
        primary.hidden = false;
      } else if (state.level === "intermediate" && state.stars === 3) {
        primary.textContent = "Complete course";
        primary.hidden = false;
      } else {
        primary.textContent = `Continue to module track ${state.stars + 1} of 3`;
        primary.hidden = false;
      }
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
  const tier = tierForPercent(pct);
  document.getElementById("score-line").textContent = `${correct} / ${total} correct (${pct}%)`;

  const tierLabels = {
    foundation: "Growing observer",
    intermediate: "Solid instincts",
    expert: "Sharp eye — stay humble",
  };
  document.getElementById("tier-label").textContent = tierLabels[tier];

  const starAward = document.getElementById("star-award");
  const starText = document.getElementById("star-award-text");
  if (
    state.level !== "graduate" &&
    lastQuizKind === "checkpoint" &&
    lastCheckpointPassed
  ) {
    starAward.hidden = false;
    starText.textContent = `Golden star ${state.stars} of 3 on ${LEVEL_LABELS[state.level]}.`;
  } else {
    starAward.hidden = true;
    starText.textContent = "";
  }

  let blurb = "";
  if (state.level === "graduate") {
    blurb = "Practice run — your course progress is already complete. Use this to stay sharp.";
  } else if (lastQuizKind === "baseline") {
    blurb =
      "Opening quiz logged. Read anything you missed below, skim your reading track, then continue into module track 1.";
  } else if (lastCheckpointPassed) {
    blurb = `Checkpoint passed — you earned a golden star. (${lastStarThreshold}+ / ${lastScore.total} required on this quiz.)`;
    if (state.stars === 3) {
      blurb +=
        state.level === "beginner"
          ? " Three stars on Beginner — you can move up to Intermediate next."
          : " That was your third Intermediate star — you’ve completed this course path.";
    }
  } else {
    blurb = `You need at least ${lastStarThreshold} correct on this checkpoint (${lastScore.total} questions) to earn the star. Revisit the modules, then retry.`;
  }

  document.getElementById("tier-blurb").textContent = blurb;
}

document.getElementById("btn-home-primary").addEventListener("click", () => {
  if (state.level === "graduate") {
    startBaselineQuiz();
    return;
  }
  if (!state.baselineDone) {
    startBaselineQuiz();
    return;
  }
  if (state.stars < 3) {
    openModuleTrack(state.stars + 1);
  }
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
    moduleSlideIndex += 1;
    renderModuleSlide();
    return;
  }
  startCheckpointQuiz();
});

document.getElementById("quiz-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const { correct, total, details } = scoreForm(form, activeQuizItems);
  const pct = Math.round((correct / total) * 100);
  lastScore = { correct, total, pct };
  const tier = tierForPercent(pct);

  lastStarThreshold = starThresholdForQuiz(activeQuizItems);
  lastCheckpointPassed = lastQuizKind === "checkpoint" && correct >= lastStarThreshold;

  if (state.level !== "graduate") {
    if (lastQuizKind === "baseline") {
      state.baselineDone = true;
      saveState();
    } else if (lastQuizKind === "checkpoint" && lastCheckpointPassed) {
      state.stars = Math.min(3, state.stars + 1);
      saveState();
    }
  }

  if (pct === 100) {
    setTimeout(() => {
      confetti({ particleCount: 180, spread: 80, origin: { y: 0.3 }, colors: ["#7c4a1e","#c8831a","#f5d08a","#5a8a3c","#fff8f0"] });
      setTimeout(() => confetti({ particleCount: 120, spread: 100, origin: { x: 0.1, y: 0.5 } }), 300);
      setTimeout(() => confetti({ particleCount: 120, spread: 100, origin: { x: 0.9, y: 0.5 } }), 500);
    }, 400);
  }

  document.getElementById("reading-body").innerHTML = "";
  renderReading(tier);
  renderWrongReview(details, activeQuizItems);

  applyResultsCopy();
  configureResultsActions();
  renderProgressStrip();

  showPanel("screen-results");
  requestAnimationFrame(() => window.scrollTo(0, 0));
});

document.getElementById("btn-results-primary").addEventListener("click", () => {
  document.getElementById("review-card").hidden = true;
  document.getElementById("star-award").hidden = true;

  if (state.level === "graduate") {
    showPanel("screen-home");
    renderHome();
    requestAnimationFrame(() => window.scrollTo(0, 0));
    return;
  }

  if (lastQuizKind === "baseline") {
    openModuleTrack(1);
    return;
  }

  if (lastQuizKind === "checkpoint" && lastCheckpointPassed) {
    if (state.level === "beginner" && state.stars === 3) {
      showPanel("screen-levelup");
      document.getElementById("levelup-body").textContent =
        "You collected three golden stars on the Beginner path. Intermediate adds new modules and three more checkpoints—the same rhythm, harder habits.";
      requestAnimationFrame(() => window.scrollTo(0, 0));
      return;
    }
    if (state.level === "intermediate" && state.stars === 3) {
      state.level = "graduate";
      saveState();
      showPanel("screen-home");
      renderHome();
      requestAnimationFrame(() => window.scrollTo(0, 0));
      return;
    }
    openModuleTrack(state.stars + 1);
    return;
  }

  if (lastQuizKind === "checkpoint" && !lastCheckpointPassed) {
    openModuleTrack(state.stars + 1);
    return;
  }
});

document.getElementById("btn-results-secondary").addEventListener("click", () => {
  document.getElementById("review-card").hidden = true;
  document.getElementById("star-award").hidden = true;
  startCheckpointQuiz();
});

document.getElementById("btn-levelup-ok").addEventListener("click", () => {
  state.level = "intermediate";
  state.stars = 0;
  state.baselineDone = false;
  saveState();
  renderProgressStrip();
  startBaselineQuiz();
});

renderHome();
showPanel("screen-home");
