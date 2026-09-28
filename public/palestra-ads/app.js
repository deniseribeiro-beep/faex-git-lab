const QUESTIONS = [
  {
    q: "O que significa ADS?",
    options: [
      "Administração de Dados Simplificados",
      "Análise e Desenvolvimento de Sistemas",
      "Aplicativos Digitais e Software",
      "Automação de Dispositivos Sensores",
    ],
    answer: 1,
  },
  {
    q: "Em quais das áreas abaixo a Tecnologia da Informação (TI) e a Programação são utilizadas hoje para transformar o mundo?",
    options: [
      "Apenas na criação de jogos e redes sociais como TikTok e Instagram.",
      "Apenas no desenvolvimento de aplicativos bancários e vendas online.",
      "Apenas na medicina, para cirurgias robóticas e diagnósticos por IA.",
      "Em absolutamente tudo: de jogos e medicina a carros autônomos, agricultura e Inteligência Artificial!",
    ],
    answer: 3,
  },
  {
    q: "Qual a única faculdade presencial de ADS em Extrema?",
    options: [
      "Nenhuma — só há cursos EAD na região",
      "Várias faculdades presenciais oferecem ADS",
      "FAEX — Faculdade de Extrema",
      "Somente universidades estaduais",
    ],
    answer: 2,
  },
];

const LETTERS = ["a", "b", "c", "d"];
const POLL_KEY = "faex-ads-poll-v1";

const slides = [...document.querySelectorAll(".slide")];
const dotsNav = document.getElementById("dots");
const counter = document.getElementById("slideCounter");
const progressBar = document.getElementById("progressBar");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const btnFs = document.getElementById("btnFs");
const btnExit = document.getElementById("btnExit");

let index = 0;
let revealStep = -1;

function currentSlide() {
  return slides[index];
}

function isRevealSlide() {
  return currentSlide()?.dataset.reveal === "true";
}

function revealItems() {
  return [...currentSlide().querySelectorAll("[data-reveal-step]")].sort(
    (a, b) => Number(a.dataset.revealStep) - Number(b.dataset.revealStep),
  );
}

function syncRevealUi() {
  const slide = currentSlide();
  const items = revealItems();
  const hint = slide?.querySelector(".reveal-hint");
  const btn = slide?.querySelector(".reveal-btn");
  const done = revealStep >= items.length - 1 && items.length > 0;
  if (hint) {
    hint.textContent = done
      ? "Enter ou botão = próximo slide"
      : revealStep < 0
        ? "Botão ou Enter = próximo ponto"
        : `Ponto ${revealStep + 1} de ${items.length} · continue revelando`;
  }
  if (btn) btn.textContent = done ? "Próximo slide" : "Revelar próximo";
}

function resetReveal() {
  revealStep = -1;
  currentSlide()
    ?.querySelectorAll("[data-reveal-step]")
    .forEach((el) => el.classList.remove("is-shown"));
  syncRevealUi();
}

function advanceReveal() {
  const items = revealItems();
  if (!items.length) {
    go(index + 1);
    return;
  }
  if (revealStep >= items.length - 1) {
    go(index + 1);
    return;
  }
  revealStep += 1;
  items[revealStep].classList.add("is-shown");
  syncRevealUi();
}

function renderDots() {
  dotsNav.innerHTML = "";
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `Ir para o slide ${i + 1}`);
    if (i === index) b.setAttribute("aria-current", "true");
    b.addEventListener("click", () => go(i));
    dotsNav.appendChild(b);
  });
}

function go(i) {
  index = Math.max(0, Math.min(slides.length - 1, i));
  slides.forEach((slide, n) => {
    const active = n === index;
    slide.classList.toggle("is-active", active);
    slide.hidden = !active;
  });
  counter.textContent = `${index + 1} / ${slides.length}`;
  progressBar.style.width = `${((index + 1) / slides.length) * 100}%`;
  renderDots();
  if (isRevealSlide()) resetReveal();
}

async function leavePresentation() {
  if (document.fullscreenElement) {
    try {
      await document.exitFullscreen();
    } catch {
      /* ignore */
    }
  }
  window.location.href = "../index.html";
}

btnPrev.addEventListener("click", () => go(index - 1));
btnNext.addEventListener("click", () => go(index + 1));
btnFs.addEventListener("click", () => {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
  else document.exitFullscreen?.();
});
btnExit.addEventListener("click", () => leavePresentation());
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".reveal-btn");
  if (!btn) return;
  if (!isRevealSlide()) return;
  if (!currentSlide().contains(btn)) return;
  advanceReveal();
});

document.addEventListener("keydown", (e) => {
  if (e.target.matches("input, textarea")) return;
  if (e.key === "Escape") {
    e.preventDefault();
    if (document.fullscreenElement) document.exitFullscreen?.();
    else leavePresentation();
    return;
  }
  if (e.key === "Enter") {
    if (e.target.matches("button.quiz-option, button.poll-btn, button.reveal-btn")) return;
    e.preventDefault();
    if (isRevealSlide()) advanceReveal();
    else go(index + 1);
    return;
  }
  if (e.target.matches("button.quiz-option, button.poll-btn, button.reveal-btn")) return;
  if (e.key === "ArrowRight" || e.key === "PageDown") {
    e.preventDefault();
    go(index + 1);
  } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
    e.preventDefault();
    go(index - 1);
  } else if (e.key.toLowerCase() === "f") {
    btnFs.click();
  } else if (e.key === "Home") {
    go(0);
  } else if (e.key === "End") {
    go(slides.length - 1);
  }
});

/* ---- Poll ---- */
const pollOpts = document.getElementById("pollOpts");
const pollResults = document.getElementById("pollResults");
const pollTotal = document.getElementById("pollTotal");

function loadPoll() {
  try {
    return JSON.parse(sessionStorage.getItem(POLL_KEY) || '{"ja":0,"jogo":0,"nunca":0}');
  } catch {
    return { ja: 0, jogo: 0, nunca: 0 };
  }
}

function savePoll(data) {
  sessionStorage.setItem(POLL_KEY, JSON.stringify(data));
}

function renderPoll() {
  const data = loadPoll();
  const total = data.ja + data.jogo + data.nunca;
  pollTotal.textContent = String(total);
  if (total === 0) {
    pollResults.hidden = true;
    return;
  }
  pollResults.hidden = false;
  ["ja", "jogo", "nunca"].forEach((key) => {
    const row = pollResults.querySelector(`[data-bar="${key}"]`);
    if (!row) return;
    const pct = Math.round((data[key] / total) * 100);
    row.querySelector("strong").textContent = `${pct}%`;
    row.querySelector("i").style.width = `${pct}%`;
  });
}

pollOpts?.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-poll]");
  if (!btn) return;
  const key = btn.dataset.poll;
  const data = loadPoll();
  data[key] = (data[key] || 0) + 1;
  savePoll(data);
  pollOpts.querySelectorAll(".poll-btn").forEach((b) => b.classList.remove("is-picked"));
  btn.classList.add("is-picked");
  renderPoll();
});

renderPoll();

/* ---- Quiz ---- */
const quizStart = document.getElementById("quizStart");
const quizCountdown = document.getElementById("quizCountdown");
const quizPlay = document.getElementById("quizPlay");
const quizResult = document.getElementById("quizResult");
const quizBegin = document.getElementById("quizBegin");
const quizNext = document.getElementById("quizNext");
const quizRestart = document.getElementById("quizRestart");
const quizProgress = document.getElementById("quizProgress");
const quizScore = document.getElementById("quizScore");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
const quizResultTitle = document.getElementById("quizResultTitle");
const quizResultText = document.getElementById("quizResultText");
const countdownNum = document.getElementById("countdownNum");

let qIndex = 0;
let score = 0;
let locked = false;

function showPanel(panel) {
  [quizStart, quizCountdown, quizPlay, quizResult].forEach((el) => {
    if (el) el.hidden = el !== panel;
  });
}

function startCountdown() {
  showPanel(quizCountdown);
  let n = 3;
  countdownNum.textContent = String(n);
  const timer = setInterval(() => {
    n -= 1;
    if (n <= 0) {
      clearInterval(timer);
      startQuizPlay();
      return;
    }
    countdownNum.textContent = String(n);
  }, 700);
}

function startQuizPlay() {
  qIndex = 0;
  score = 0;
  locked = false;
  showPanel(quizPlay);
  renderQuestion();
}

function renderQuestion() {
  const item = QUESTIONS[qIndex];
  locked = false;
  quizProgress.textContent = `Pergunta ${qIndex + 1} de ${QUESTIONS.length}`;
  quizScore.textContent = `Acertos: ${score}`;
  quizQuestion.textContent = item.q;
  quizFeedback.hidden = true;
  quizFeedback.textContent = "";
  quizFeedback.className = "quiz-feedback";
  quizNext.hidden = true;
  quizOptions.innerHTML = "";

  item.options.forEach((label, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "quiz-option";
    btn.textContent = `${LETTERS[i]}) ${label}`;
    btn.addEventListener("click", () => pick(i, btn));
    quizOptions.appendChild(btn);
  });
}

function pick(choice, btn) {
  if (locked) return;
  locked = true;
  const item = QUESTIONS[qIndex];
  const buttons = [...quizOptions.querySelectorAll(".quiz-option")];
  buttons.forEach((b) => {
    b.disabled = true;
  });
  buttons[item.answer].classList.add("correct");

  if (choice === item.answer) {
    score += 1;
    btn.classList.add("correct");
    quizFeedback.textContent = "✓ Correto!";
    quizFeedback.classList.add("ok");
  } else {
    btn.classList.add("wrong");
    quizFeedback.textContent = `Quase! A resposta certa é a alternativa ${LETTERS[item.answer].toUpperCase()}.`;
    quizFeedback.classList.add("bad");
  }

  quizScore.textContent = `Acertos: ${score}`;
  quizFeedback.hidden = false;
  quizNext.hidden = false;
  quizNext.textContent = qIndex === QUESTIONS.length - 1 ? "Ver resultado" : "Próxima";
}

function nextQuestion() {
  if (qIndex >= QUESTIONS.length - 1) {
    finishQuiz();
    return;
  }
  qIndex += 1;
  renderQuestion();
}

function finishQuiz() {
  showPanel(quizResult);
  quizResultTitle.textContent = `${score} de ${QUESTIONS.length} acertos`;
  let msg = "Bom começo — a curiosidade já te coloca no caminho da TI.";
  if (score === QUESTIONS.length) msg = "Excelente! Brinde merecido — você mandou bem na arena.";
  else if (score >= 2) msg = "Muito bem! Com a prática da FAEX, você acelera rápido.";
  quizResultText.textContent = msg;
}

quizBegin.addEventListener("click", startCountdown);
quizNext.addEventListener("click", nextQuestion);
quizRestart.addEventListener("click", startCountdown);

go(0);
