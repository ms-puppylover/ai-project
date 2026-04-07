/**
 * All module copy + quiz banks. Loaded before app.js (globals).
 * Rewritten for 7th grade reading level — fun, relatable, clear.
 */

function svgDataUrl(svg) {
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg.trim());
}

function withIds(prefix, items) {
  return items.map((item, i) => ({ ...item, id: `${prefix}_q${i + 1}` }));
}

function starThresholdForQuiz(items) {
  return Math.max(6, Math.ceil(items.length * 0.73));
}

const IMG_SYN_INDOOR = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 320">
  <defs>
    <linearGradient id="iw" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#8d6e63"/><stop offset="0.45" stop-color="#5d4037"/><stop offset="1" stop-color="#3e2723"/>
    </linearGradient>
    <linearGradient id="iwin" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fffef7"/><stop offset="0.35" stop-color="#eceff1"/><stop offset="1" stop-color="#78909c"/>
    </linearGradient>
    <radialGradient id="ibloom" cx="32%" cy="22%" r="55%">
      <stop offset="0" stop-color="#fffde7" stop-opacity="0.95"/>
      <stop offset="0.35" stop-color="#fff8e1" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <filter id="igrain" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" seed="11" result="n"/>
      <feGaussianBlur in="n" stdDeviation="0.6" result="b"/>
      <feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.14 0"/>
    </filter>
    <filter id="isoft"><feGaussianBlur stdDeviation="1.4"/></filter>
  </defs>
  <rect width="480" height="320" fill="url(#iw)"/>
  <rect x="36" y="28" width="228" height="176" rx="3" fill="url(#iwin)" opacity="0.88"/>
  <rect x="36" y="28" width="228" height="176" fill="url(#ibloom)"/>
  <rect x="0" y="238" width="480" height="82" fill="#4e342e" opacity="0.92"/>
  <ellipse cx="290" cy="268" rx="130" ry="28" fill="#000" opacity="0.22" filter="url(#isoft)"/>
  <rect width="480" height="320" filter="url(#igrain)" opacity="0.4"/>
</svg>`);

const IMG_SYN_STREET = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 320">
  <defs>
    <linearGradient id="ssky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0d1642"/><stop offset="0.55" stop-color="#283593"/><stop offset="1" stop-color="#5c6bc0"/>
    </linearGradient>
    <linearGradient id="spave" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="#1c2529"/><stop offset="0.5" stop-color="#37474f"/><stop offset="1" stop-color="#546e7a"/>
    </linearGradient>
    <filter id="sgrain">
      <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" seed="88" result="t"/>
      <feColorMatrix in="t" type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.32"/></feComponentTransfer>
    </filter>
  </defs>
  <rect width="480" height="148" fill="url(#ssky)"/>
  <rect y="148" width="480" height="172" fill="url(#spave)"/>
  <rect x="18" y="42" width="68" height="218" fill="#37474f" opacity="0.88"/>
  <rect x="98" y="24" width="58" height="236" fill="#455a64" opacity="0.9"/>
  <rect x="172" y="58" width="64" height="202" fill="#546e7a"/>
  <rect x="252" y="32" width="88" height="228" fill="#607d8b"/>
  <rect x="358" y="52" width="102" height="208" fill="#455a64"/>
  <path d="M0 148 L480 148" stroke="#fff" stroke-opacity="0.04" stroke-width="2"/>
  <ellipse cx="240" cy="232" rx="210" ry="38" fill="#90caf9" opacity="0.07"/>
  <rect width="480" height="320" fill="#fff" filter="url(#sgrain)" opacity="0.2"/>
</svg>`);

const IMG_SYN_FLORA = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 320">
  <defs>
    <radialGradient id="fb" cx="48%" cy="38%" r="75%">
      <stop offset="0" stop-color="#dcedc8"/><stop offset="0.45" stop-color="#81c784"/><stop offset="1" stop-color="#1b5e20"/>
    </radialGradient>
    <filter id="fblur"><feGaussianBlur stdDeviation="2.8"/></filter>
    <filter id="fgrain">
      <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="4" seed="3" result="n"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
    </filter>
  </defs>
  <rect width="480" height="320" fill="url(#fb)"/>
  <g opacity="0.4" filter="url(#fblur)">
    <ellipse cx="110" cy="95" rx="95" ry="52" fill="#a5d6a7"/>
    <ellipse cx="290" cy="125" rx="115" ry="62" fill="#c8e6c9"/>
    <ellipse cx="410" cy="88" rx="75" ry="44" fill="#66bb6a"/>
  </g>
  <g opacity="0.55" filter="url(#fblur)">
    <ellipse cx="235" cy="205" rx="28" ry="72" fill="#388e3c"/>
    <ellipse cx="210" cy="198" rx="22" ry="65" fill="#2e7d32"/>
    <ellipse cx="260" cy="198" rx="22" ry="65" fill="#1b5e20"/>
  </g>
  <rect width="480" height="320" filter="url(#fgrain)"/>
</svg>`);

const IMG_AI_HARD = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 320">
  <defs>
    <linearGradient id="hs" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#082f49"/>
      <stop offset="42%" stop-color="#c2410c"/>
      <stop offset="72%" stop-color="#fb923c"/>
      <stop offset="100%" stop-color="#fef9c3"/>
    </linearGradient>
    <linearGradient id="sil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <filter id="film" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" seed="42" result="n"/>
      <feColorMatrix in="n" type="saturate" values="0" result="g"/>
      <feComponentTransfer in="g" result="a">
        <feFuncA type="linear" slope="0.28" intercept="0"/>
      </feComponentTransfer>
    </filter>
  </defs>
  <rect width="480" height="320" fill="url(#hs)"/>
  <path d="M0 192 L88 148 L152 172 L238 136 L302 158 L392 122 L480 148 L480 320 L0 320 Z" fill="url(#sil)"/>
  <path d="M0 214 Q 240 228 480 202 L480 320 L0 320 Z" fill="#020617" opacity="0.5"/>
  <rect width="480" height="320" fill="#f8fafc" filter="url(#film)" opacity="0.24"/>
</svg>`);

/* ── Intermediate / Advanced synthetic images (never shown in beginner) ── */

const IMG_SYN_KITCHEN = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 320">
  <defs>
    <linearGradient id="kwall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f5f0e8"/><stop offset="1" stop-color="#e0d6c4"/>
    </linearGradient>
    <linearGradient id="kcab" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#c8b89a"/><stop offset="1" stop-color="#a08060"/>
    </linearGradient>
    <linearGradient id="kcount" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#d0ccc8"/><stop offset="0.4" stop-color="#b8b4b0"/><stop offset="1" stop-color="#909090"/>
    </linearGradient>
    <filter id="kgrain">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" seed="17" result="n"/>
      <feColorMatrix in="n" type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.13"/></feComponentTransfer>
    </filter>
    <filter id="kglow"><feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="480" height="320" fill="url(#kwall)"/>
  <rect x="0" y="60" width="480" height="130" fill="url(#kcab)" opacity="0.9"/>
  <rect x="8" y="65" width="88" height="118" rx="2" fill="#b8a080" stroke="#9a7a55" stroke-width="1.5"/>
  <rect x="104" y="65" width="88" height="118" rx="2" fill="#b8a080" stroke="#9a7a55" stroke-width="1.5"/>
  <rect x="200" y="65" width="88" height="118" rx="2" fill="#b8a080" stroke="#9a7a55" stroke-width="1.5"/>
  <rect x="296" y="65" width="88" height="118" rx="2" fill="#b8a080" stroke="#9a7a55" stroke-width="1.5"/>
  <rect x="392" y="65" width="80" height="118" rx="2" fill="#b8a080" stroke="#9a7a55" stroke-width="1.5"/>
  <circle cx="48" cy="124" r="4" fill="#8a7060"/><circle cx="144" cy="124" r="4" fill="#8a7060"/>
  <circle cx="240" cy="124" r="4" fill="#8a7060"/><circle cx="336" cy="124" r="4" fill="#8a7060"/>
  <rect x="0" y="190" width="480" height="28" fill="url(#kcount)"/>
  <rect x="0" y="215" width="480" height="105" fill="#e8e0d4"/>
  <rect x="30" y="228" width="80" height="60" rx="2" fill="#c8c0b8" opacity="0.8"/>
  <ellipse cx="320" cy="200" rx="38" ry="8" fill="#d0c8c0" opacity="0.6"/>
  <rect x="295" y="170" width="50" height="34" rx="3" fill="#c8c4c0" opacity="0.9"/>
  <rect x="0" y="0" width="480" height="65" fill="url(#kwall)"/>
  <rect x="160" y="8" width="160" height="52" rx="2" fill="#b8a860" opacity="0.55" filter="url(#kglow)"/>
  <rect width="480" height="320" filter="url(#kgrain)"/>
</svg>`);

const IMG_SYN_PORTRAIT = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 320">
  <defs>
    <radialGradient id="pbg" cx="50%" cy="42%" r="62%">
      <stop offset="0" stop-color="#c8b8a8"/><stop offset="0.6" stop-color="#8a7060"/><stop offset="1" stop-color="#3a2820"/>
    </radialGradient>
    <radialGradient id="pface" cx="50%" cy="44%" r="50%">
      <stop offset="0" stop-color="#f0d8c0"/><stop offset="0.5" stop-color="#e0c0a0"/><stop offset="1" stop-color="#b89070"/>
    </radialGradient>
    <radialGradient id="pglow" cx="42%" cy="30%" r="40%">
      <stop offset="0" stop-color="#fff8f0" stop-opacity="0.7"/><stop offset="1" stop-color="#fff8f0" stop-opacity="0"/>
    </radialGradient>
    <filter id="psmooth"><feGaussianBlur stdDeviation="2.2"/></filter>
    <filter id="pgrain2">
      <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" seed="55" result="n"/>
      <feColorMatrix in="n" type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.11"/></feComponentTransfer>
    </filter>
  </defs>
  <rect width="480" height="320" fill="url(#pbg)"/>
  <ellipse cx="240" cy="310" rx="155" ry="58" fill="#1a1008" opacity="0.55" filter="url(#psmooth)"/>
  <ellipse cx="240" cy="170" rx="100" ry="130" fill="url(#pface)"/>
  <ellipse cx="240" cy="152" rx="74" ry="86" fill="url(#pface)"/>
  <rect x="172" y="218" width="136" height="102" fill="#e0c8b0" opacity="0.4"/>
  <ellipse cx="240" cy="320" rx="100" ry="38" fill="#d4b898" opacity="0.5"/>
  <ellipse cx="210" cy="145" rx="14" ry="9" fill="#3a2420" opacity="0.85"/>
  <ellipse cx="270" cy="145" rx="14" ry="9" fill="#3a2420" opacity="0.85"/>
  <ellipse cx="210" cy="143" rx="6" ry="5" fill="#1a1010"/>
  <ellipse cx="270" cy="143" rx="6" ry="5" fill="#1a1010"/>
  <path d="M 220 175 Q 240 185 260 175" stroke="#c08070" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <ellipse cx="240" cy="116" rx="68" ry="28" fill="#3a2820" opacity="0.9"/>
  <rect width="480" height="320" fill="url(#pglow)"/>
  <rect width="480" height="320" filter="url(#pgrain2)"/>
</svg>`);

const IMG_SYN_MOUNTAIN = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 320">
  <defs>
    <linearGradient id="msky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#b8d4f0"/><stop offset="0.55" stop-color="#d8eaf8"/><stop offset="1" stop-color="#f0f8ff"/>
    </linearGradient>
    <linearGradient id="mmtn" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f8f8f8"/><stop offset="0.25" stop-color="#c8c8d0"/><stop offset="1" stop-color="#6878a0"/>
    </linearGradient>
    <linearGradient id="mmtn2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#e0e0e8"/><stop offset="1" stop-color="#8090b0"/>
    </linearGradient>
    <linearGradient id="mground" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7a9860"/><stop offset="1" stop-color="#485830"/>
    </linearGradient>
    <filter id="mgrain">
      <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" seed="29" result="n"/>
      <feColorMatrix in="n" type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.16"/></feComponentTransfer>
    </filter>
  </defs>
  <rect width="480" height="320" fill="url(#msky)"/>
  <ellipse cx="200" cy="580" rx="420" ry="420" fill="#e8f4f8" opacity="0.4"/>
  <polygon points="240,38 380,210 100,210" fill="url(#mmtn)"/>
  <polygon points="360,72 480,210 240,210" fill="url(#mmtn2)" opacity="0.92"/>
  <polygon points="80,96 220,210 0,210 0,250" fill="url(#mmtn2)" opacity="0.75"/>
  <polygon points="240,38 276,80 240,75 204,80" fill="#f8f8fc" opacity="0.9"/>
  <polygon points="360,72 390,108 360,104 330,108" fill="#f0f0f8" opacity="0.85"/>
  <rect x="0" y="208" width="480" height="112" fill="url(#mground)"/>
  <ellipse cx="240" cy="212" rx="200" ry="14" fill="#5a7840" opacity="0.5"/>
  <rect x="60" y="195" width="12" height="28" fill="#3a5020"/><polygon points="66,170 54,200 78,200" fill="#4a6828"/>
  <rect x="380" y="188" width="10" height="35" fill="#3a5020"/><polygon points="385,160 375,195 395,195" fill="#4a6828"/>
  <rect width="480" height="320" filter="url(#mgrain)"/>
</svg>`);

const IMG_SYN_OFFICE = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 320">
  <defs>
    <linearGradient id="owall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#e8edf4"/><stop offset="1" stop-color="#cdd5e0"/>
    </linearGradient>
    <linearGradient id="odesk" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#b8a890"/><stop offset="1" stop-color="#90806a"/>
    </linearGradient>
    <linearGradient id="oscreen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1a2a4a"/><stop offset="1" stop-color="#0d1828"/>
    </linearGradient>
    <filter id="ograin">
      <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" seed="41" result="n"/>
      <feColorMatrix in="n" type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.14"/></feComponentTransfer>
    </filter>
    <filter id="oglow2"><feGaussianBlur stdDeviation="4"/></filter>
  </defs>
  <rect width="480" height="320" fill="url(#owall)"/>
  <rect x="30" y="20" width="160" height="118" rx="3" fill="#c8d0dc" stroke="#a0aab8" stroke-width="1.5"/>
  <rect x="35" y="25" width="150" height="108" fill="url(#oscreen)"/>
  <rect x="45" y="35" width="130" height="8" rx="1" fill="#4a6890" opacity="0.7"/>
  <rect x="45" y="50" width="100" height="5" rx="1" fill="#3a5878" opacity="0.5"/>
  <rect x="45" y="60" width="120" height="5" rx="1" fill="#3a5878" opacity="0.45"/>
  <rect x="45" y="70" width="90" height="5" rx="1" fill="#3a5878" opacity="0.4"/>
  <rect x="45" y="82" width="58" height="28" rx="2" fill="#2a7aff" opacity="0.6"/>
  <rect x="100" y="10" width="4" height="15" fill="#a0aab8"/>
  <ellipse cx="102" cy="8" rx="18" ry="6" fill="#b0bac8"/>
  <rect x="260" y="18" width="190" height="130" rx="3" fill="#c8d0dc" stroke="#a0aab8" stroke-width="1.5"/>
  <rect x="265" y="23" width="180" height="120" fill="url(#oscreen)"/>
  <rect x="278" y="35" width="80" height="80" rx="2" fill="#1a3a6a" opacity="0.8"/>
  <rect x="368" y="35" width="68" height="36" rx="1" fill="#3a5878" opacity="0.5"/>
  <rect x="368" y="78" width="68" height="36" rx="1" fill="#2a4868" opacity="0.5"/>
  <rect x="0" y="195" width="480" height="28" fill="url(#odesk)"/>
  <rect x="0" y="220" width="480" height="100" fill="#d4cabb"/>
  <rect x="160" y="155" width="60" height="44" rx="2" fill="#a0aab0" opacity="0.8"/>
  <rect x="155" y="196" width="70" height="5" rx="1" fill="#888898"/>
  <ellipse cx="240" cy="199" rx="180" ry="12" fill="#000" opacity="0.1" filter="url(#oglow2)"/>
  <rect width="480" height="320" filter="url(#ograin)"/>
</svg>`);

const PHOTO = (seed) => `https://picsum.photos/seed/${seed}/480/320`;

const CHECKPOINT_TITLES = {
  beginner: [
    "Round 1 · Words: spot the filler",
    "Round 2 · Images: real or computer-made?",
    "Round 3 · Habits: trust but verify",
  ],
  intermediate: [
    "Round 1 · Genre: who actually wrote this?",
    "Round 2 · Images + captions: do they match?",
    "Round 3 · Stay humble, stay safe",
  ],
  advanced: [
    "Round 1 · Deepfakes & synthetic faces",
    "Round 2 · Provenance & verification",
    "Round 3 · AI in the wild",
  ],
};

const READING_BY_TIER = {
  foundation: {
    title: "Foundation track",
    subtitle: "Learn the basics",
    sections: [
      {
        heading: "Why is this even hard?",
        html: `<p>AI can write sentences that sound totally normal — even smart. And humans can write stuff that sounds robotic (ever read a school announcement?). The goal isn't to be right every time. It's to <strong>slow down and look for clues</strong> instead of just guessing.</p>`,
      },
      {
        heading: "Two quick clues",
        html: `<ul>
          <li><strong>For text:</strong> Could you swap the main topic for literally anything else? "Innovation" → "snacks" → still makes sense? That's filler.</li>
          <li><strong>For images:</strong> Does it look weirdly perfect? Real photos have dust, weird shadows, and random stuff in the background. Fake images clean all that up.</li>
        </ul>`,
      },
      {
        heading: "Try this",
        html: `<p>Next time you see a vague inspirational quote online, ask: <em>What does this actually mean? Who is it about? What do I do with this info?</em> If you can't answer any of those — it's probably filler.</p>`,
      },
    ],
  },
  intermediate: {
    title: "Intermediate track",
    subtitle: "Stack your clues",
    sections: [
      {
        heading: "One clue is never enough",
        html: `<p>Don't just look at the writing style. Look at the image AND the caption AND where it was posted. The more clues that point the same direction, the more confident you can be.</p>`,
      },
      {
        heading: "Sounds fake but isn't",
        html: `<p>Legal documents, instruction manuals, and school handbooks all sound robotic — because that's their job. Don't call something AI just because it's stiff. Think about what <em>type</em> of writing it's supposed to be first.</p>`,
      },
      {
        heading: "Quick practice",
        html: `<p>Delete all the names, places, and numbers from a paragraph. If it's totally empty and meaningless without them, it was probably filler to begin with.</p>`,
      },
    ],
  },
  expert: {
    title: "Expert track",
    subtitle: "Think about the bigger picture",
    sections: [
      {
        heading: "High score — but stay humble",
        html: `<p>You crushed this quiz. But AI tools change every few months. The clues that work today might not work next year. Keep your skills updated the same way you update your apps.</p>`,
      },
      {
        heading: "Don't be that person",
        html: `<ul>
          <li>Don't publicly accuse someone of using AI based on writing style alone. They might be tired, nervous, or writing in a second language.</li>
          <li>For news or school work, track down a real source before you share or trust something.</li>
          <li>Remember: even experts get fooled sometimes. That's okay.</li>
        </ul>`,
      },
      {
        heading: "Go deeper",
        html: `<p>Look up "image metadata" — hidden info stored in photo files that can tell you when and where a photo was taken. It's like a receipt for a picture.</p>`,
      },
    ],
  },
};

/** Opening quiz — Beginner */
const QUIZ_BASELINE_BEGINNER = withIds("base_b", [
  {
    kind: "text",
    passage: "In today's world, it is more important than ever to stay healthy and build good habits every single day.",
    answer: "ai",
    explanation: "Try swapping 'stay healthy' with literally any other topic — 'do homework,' 'be kind,' 'eat pizza.' The sentence still kind of works, right? That's the problem. It says nothing specific.",
  },
  {
    kind: "text",
    passage: "I left my umbrella on the bus and got soaked walking home. Totally worth it for the dumplings though.",
    answer: "human",
    explanation: "Random chain of events, a specific food, and a slightly unhinged attitude about getting rained on. AI usually rounds stuff like this into something more balanced and polished.",
  },
  {
    kind: "image",
    imageSrc: IMG_SYN_FLORA,
    imageAlt: "Blurry green plants scene",
    answer: "ai",
    explanation: "Looks like a blurry close-up photo of plants — but it's actually made with code. The shapes are too symmetrical and the blur is way too even. Real plant photos are chaotic.",
  },
  {
    kind: "image",
    imageSrc: PHOTO("realbench24"),
    imageAlt: "Bench and path outdoors",
    answer: "human",
    explanation: "Real photo. The ground texture and plant edges are organic and random — exactly the messy detail a camera captures that's hard to fake.",
  },
  {
    kind: "text",
    passage: "Use a teamwork mindset to align your goals and maximize every opportunity for success.",
    answer: "ai",
    explanation: "No names, no deadline, no actual plan. You could paste this into any sports speech, school project, or corporate email. That's what makes it filler.",
  },
  {
    kind: "text",
    passage: "We should do this in stages so the help desk isn't slammed. If we go all at once, we'll drown in tickets.",
    answer: "human",
    explanation: "Short, direct, and worried about a real problem — getting overwhelmed by too many help requests. Humans use words like 'slammed' and 'drown.' AI would politely say 'to manage volume effectively.'",
  },
  {
    kind: "image",
    imageSrc: IMG_SYN_INDOOR,
    imageAlt: "Warm room with a glowing window",
    answer: "ai",
    explanation: "The window is a perfect glowing rectangle with zero smudges, reflections, or curtains. No real window looks like that.",
  },
  {
    kind: "text",
    passage: "Movie was fine. Theater was freezing and someone's phone buzzed the whole time.",
    answer: "human",
    explanation: "A grumpy one-liner with specific complaints. AI would say something like 'The film was enjoyable overall, though the environment could have been improved.'",
  },
  {
    kind: "text",
    passage: "When using this device, follow the recommended steps carefully to ensure the best results.",
    answer: "ai",
    explanation: "This could describe a microwave, a drone, a blender, or a time machine. When a sentence could apply to literally any product ever, that's a red flag.",
  },
  {
    kind: "image",
    imageSrc: IMG_AI_HARD,
    imageAlt: "Dramatic sunset with hills and film grain",
    answer: "ai",
    explanation: "Looks like a moody phone photo — but it's built with code. Lesson: when an image looks almost too cinematic, ask where it actually came from before you trust it.",
  },
]);

/** Opening quiz — Intermediate */
const QUIZ_BASELINE_INTERMEDIATE = withIds("base_i", [
  {
    kind: "text",
    passage: "Per Section 4.2, the contractor must deliver all files by 5:00 p.m. ET on March 14, 2026, unless both sides agree in writing to change it.",
    answer: "human",
    explanation: "Super specific — a section number, a time zone, a date, and a process. Legal writing sounds stiff, but all those details are real anchors.",
  },
  {
    kind: "text",
    passage: "In today's fast-changing world, building strong habits helps you reach your full potential and handle any challenge.",
    answer: "ai",
    explanation: "'Reach your full potential' and 'handle any challenge' — these phrases could go under literally any motivational poster ever made.",
  },
  {
    kind: "text",
    passage: "lol ok but if we're doing trivia night I'm not driving — last time I scraped the curb and my brother still brings it up every Thanksgiving",
    answer: "human",
    explanation: "Family drama, a specific embarrassing moment, and casual texting style. AI doesn't usually produce jokes this weirdly specific.",
  },
  {
    kind: "image",
    imageSrc: PHOTO("intlake66"),
    imageAlt: "Lake with reflections and shoreline",
    answer: "human",
    explanation: "The rippled reflections and uneven shoreline are exactly the kind of messy real detail that cameras capture naturally — and that generated images tend to flatten.",
  },
  {
    kind: "image",
    imageSrc: IMG_SYN_MOUNTAIN,
    imageAlt: "Mountain landscape at midday",
    answer: "ai",
    explanation: "The mountain is a perfect triangle, the sky gradient is too smooth, and the treeline is symmetrical. Real landscapes have irregular ridges, haze, and random detail.",
  },
  {
    kind: "text",
    passage: "The person signing this confirms they received the updated safety bulletin (version 3.1) and will brief team leads before the 6 a.m. shift.",
    answer: "human",
    explanation: "Version number, role, specific time — this is real workplace friction. These details show up in actual documents.",
  },
  {
    kind: "text",
    passage: "By working across departments, teams can drive innovation and grow sustainably in today's competitive environment.",
    answer: "ai",
    explanation: "No actual department, no goal, no industry. This could be copied into any company slideshow without changing a single word.",
  },
  {
    kind: "image",
    imageSrc: IMG_SYN_KITCHEN,
    imageAlt: "Modern kitchen with perfect cabinets",
    answer: "ai",
    explanation: "The cabinets are identical rectangles, the countertop gradient is too uniform, and every surface is spotless. Real kitchens have scratches, crumbs, and mismatched items.",
  },
  {
    kind: "text",
    passage: "Not sure I buy it — the study only had about 40 people and they all reported their own sleep. Happy to be wrong if someone can find the full paper.",
    answer: "human",
    explanation: "Calling out a small sample size and asking for evidence — that's how people actually talk about science. AI usually just summarizes without pushing back.",
  },
  {
    kind: "image",
    imageSrc: PHOTO("realdesk33"),
    imageAlt: "Messy desk with window light",
    answer: "human",
    explanation: "Clutter and uneven light are a dead giveaway that this is real. A generated image would feel more staged.",
  },
]);

/** Beginner checkpoint 1 — Words: spot the filler */
const QUIZ_CP_BEGINNER_1 = withIds("bb1", [
  {
    kind: "text",
    passage: "It's important to always keep trying to improve — that's the key to success in any area of life.",
    answer: "ai",
    explanation: "Swap 'improve' with 'eat cereal' — the sentence still technically makes sense. If the main idea can be replaced with anything, it's filler.",
  },
  {
    kind: "text",
    passage: "My dog ate half a loaf of sourdough and then stared at me like I was the unreasonable one. Vet said watch for bloating. Great Sunday.",
    answer: "human",
    explanation: "Specific food, specific dog expression, vet advice, and sarcasm. AI doesn't usually land this combination without it feeling forced.",
  },
  {
    kind: "text",
    passage: "Explore the exciting world of digital innovation, where new tools help people imagine a better tomorrow.",
    answer: "ai",
    explanation: "'Digital innovation' and 'better tomorrow' — what product? What person? What actually changes? None of that is here.",
  },
  {
    kind: "text",
    passage: "Can we push the update to Tuesday? QA found a bug in checkout and I really don't want a Friday night crisis.",
    answer: "human",
    explanation: "Specific day, specific bug location, specific fear. Real work messages have this kind of detail because stakes are real.",
  },
  {
    kind: "text",
    passage: "Thank you for reaching out! I'm happy to help ensure you have a great experience. Please don't hesitate to ask anything!",
    answer: "ai",
    explanation: "No actual issue is addressed. Just a polite template. It could open any customer service chat ever — that's the problem.",
  },
  {
    kind: "text",
    passage: "Left my keys in the fridge again. Third time this month. Not even mad — I'm impressed.",
    answer: "human",
    explanation: "Self-deprecating humor about a very specific, relatable mistake. AI would say something like 'consider establishing a consistent key storage routine.'",
  },
  {
    kind: "image",
    imageSrc: IMG_SYN_FLORA,
    imageAlt: "Blurry garden scene",
    answer: "ai",
    explanation: "Looks like a bokeh plant photo, but the shapes are too regular and the blur field is perfectly even. Real plant photos have messy, random edges.",
  },
  {
    kind: "text",
    passage: "We should not ignore the many challenges that come with living in a connected world today.",
    answer: "ai",
    explanation: "This could open a TED talk, a news article, or a school essay without changing a thing. It commits to nothing specific.",
  },
  {
    kind: "text",
    passage: "If the hummus is gone again I'm writing my name on it in Sharpie. This is not a threat. It's a logistics plan.",
    answer: "human",
    explanation: "A specific snack, a specific tool, and a very human joke. AI would recommend 'labeling shared food items to avoid confusion.'",
  },
  {
    kind: "text",
    passage: "By using the best tools available, teams can work more efficiently and deliver better results.",
    answer: "ai",
    explanation: "'Best tools,' 'more efficiently,' 'better results' — which tools? Which team? Better than what? All vague on purpose.",
  },
]);

/** Beginner checkpoint 2 — Images: real or computer-made? */
const QUIZ_CP_BEGINNER_2 = withIds("bb2", [
  {
    kind: "image",
    imageSrc: PHOTO("realstairs55"),
    imageAlt: "Stairs and light inside a building",
    answer: "human",
    explanation: "Real photo — worn materials, uneven shadows, random scuffs. Fake images tend to look cleaner and more 'designed' than this.",
  },
  {
    kind: "image",
    imageSrc: IMG_SYN_STREET,
    imageAlt: "City street at dusk",
    answer: "ai",
    explanation: "The buildings are just flat rectangles in a row, the sky fades too perfectly, and there are no signs, wires, or random street clutter anywhere.",
  },
  {
    kind: "image",
    imageSrc: PHOTO("realforest77"),
    imageAlt: "Forest path with trees",
    answer: "human",
    explanation: "Real photo — the light through the leaves and the random branch angles are the kind of beautiful chaos a camera captures naturally.",
  },
  {
    kind: "image",
    imageSrc: IMG_SYN_INDOOR,
    imageAlt: "Room with a bright window glow",
    answer: "ai",
    explanation: "The window is a perfect glowing rectangle. No reflections, no smudges, no curtain. Real windows are never that flawless.",
  },
  {
    kind: "text",
    passage: "Shot this at a really high ISO so it's super grainy, but I love the shadows on the brick — totally worth the noise.",
    answer: "human",
    explanation: "ISO is a real camera setting. This person made a real trade-off (grain vs. getting the shot) and has a specific opinion about it. Very human.",
  },
  {
    kind: "image",
    imageSrc: PHOTO("realwall12"),
    imageAlt: "Textured wall close-up",
    answer: "human",
    explanation: "Chipped paint, uneven surface — these tiny imperfections are exactly what real macro photos pick up and what simple fake images skip.",
  },
  {
    kind: "image",
    imageSrc: IMG_AI_HARD,
    imageAlt: "Moody sunset silhouette",
    answer: "ai",
    explanation: "Looks like a phone photo but it's made with code. Lesson: when something looks almost too cinematic, ask where it came from before sharing it.",
  },
  {
    kind: "text",
    passage: "This peaceful landscape captures the beauty and harmony of nature's timeless wonder.",
    answer: "ai",
    explanation: "This caption could go under literally any nature photo ever taken. No location, no season, no photographer — pure filler that sounds nice.",
  },
  {
    kind: "image",
    imageSrc: PHOTO("realcoffee88"),
    imageAlt: "Coffee cup with steam near a window",
    answer: "human",
    explanation: "Steam rising, soft window light, a real mug — all the cozy random detail that a phone camera captures and a generator tends to over-smooth.",
  },
  {
    kind: "image",
    imageSrc: IMG_SYN_FLORA,
    imageAlt: "Out-of-focus plants and stems",
    answer: "ai",
    explanation: "This one tries to look like a blurry close-up of plants. But the stems are too parallel and the blur is too uniform. Compare it to the real forest photo above.",
  },
]);

/** Beginner checkpoint 3 — Habits: trust but verify */
const QUIZ_CP_BEGINNER_3 = withIds("bb3", [
  {
    kind: "text",
    passage: "Experts agree this one simple habit could change everything — share before it disappears at midnight!!!",
    answer: "ai",
    explanation: "'Experts agree' with no names + fake urgency (midnight!!!) = classic engagement bait. Good habit: pause and look for the actual source before sharing.",
  },
  {
    kind: "text",
    passage: "Saw this on Reuters this morning about the port strike — dropping the link in our group doc with the headline date.",
    answer: "human",
    explanation: "Named source, real topic, sharing the link responsibly. This is how people handle news in a class project or group chat when they actually care about accuracy.",
  },
  {
    kind: "text",
    passage: "Studies suggest that many people find value in exploring strategies that may support overall well-being.",
    answer: "ai",
    explanation: "'Studies suggest' with no study name, no numbers, no effect size. This is the writing equivalent of 'someone said so once.' Not useful.",
  },
  {
    kind: "image",
    imageSrc: PHOTO("realbench24"),
    imageAlt: "Park bench scene",
    answer: "human",
    explanation: "Practice the habit: ask where this was posted before trusting it. In this case it's a real photo from a known source — but the habit of checking is what matters.",
  },
  {
    kind: "text",
    passage: "I might be wrong, but I think the meeting moved to 3:30 — double-check the calendar because I'm half asleep.",
    answer: "human",
    explanation: "Saying 'I might be wrong' and asking someone to verify — that's healthy. AI usually sounds confident even when it has no business being confident.",
  },
  {
    kind: "text",
    passage: "In conclusion, this overview has covered the key points worth thinking about going forward.",
    answer: "ai",
    explanation: "This conclusion says absolutely nothing. It could close any essay on any topic ever. If an ending doesn't add information, it's just taking up space.",
  },
  {
    kind: "image",
    imageSrc: IMG_SYN_INDOOR,
    imageAlt: "Cozy room with window light",
    answer: "ai",
    explanation: "Always ask for a source when someone uses an image to prove something. Also — this 'room' is still made with code: too blocky, too perfectly lit.",
  },
  {
    kind: "text",
    passage: "Don't call someone out publicly just because their writing sounds robotic — they might be tired, stressed, or writing in their second language. Talk to your teacher privately if it actually matters.",
    answer: "human",
    explanation: "Real empathy with multiple explanations before jumping to conclusions. Considers what 'actually matters' — very human judgment.",
  },
  {
    kind: "text",
    passage: "Find out the secrets they don't want you to know — this tip will shock you (step 4 is wild).",
    answer: "ai",
    explanation: "Mystery + fake urgency + no source = clickbait. Train yourself to scroll past this stuff until there's an actual link to something real.",
  },
  {
    kind: "image",
    imageSrc: PHOTO("realboats81"),
    imageAlt: "Harbor with boats",
    answer: "human",
    explanation: "Rich real detail — ropes, reflections, random boat angles. Habit check: if this image was used to 'prove' a news story, would you want to know where it originally came from? Yes.",
  },
]);

/** Intermediate checkpoint 1 — Genre: who actually wrote this? */
const QUIZ_CP_INTERMEDIATE_1 = withIds("ib1", [
  {
    kind: "text",
    passage: "WHEREAS Licensor grants Licensee a non-exclusive, revocable license to use the Marks solely in the Territory as described in Exhibit A.",
    answer: "human",
    explanation: "Legal writing sounds stiff on purpose — that's the genre. Defined terms, references to exhibits, specific limits. Stiff does NOT automatically mean AI.",
  },
  {
    kind: "text",
    passage: "Ultimately, the mix of diverse perspectives creates a vibrant space for innovation to thrive across the whole ecosystem.",
    answer: "ai",
    explanation: "No actors, no conflict, no evidence. This could be a quote from any company website, graduation speech, or mission statement ever written.",
  },
  {
    kind: "text",
    passage: "Bus was 18 minutes late, driver didn't apologize, and I still tipped because guilt is a lifestyle.",
    answer: "human",
    explanation: "Exact number (18 minutes), a specific social awkwardness, and a self-aware joke. Social media voice at its most human.",
  },
  {
    kind: "text",
    passage: "The City Council voted 6–1 Tuesday to delay the zoning decision until after the environmental review is filed.",
    answer: "human",
    explanation: "News lede style: vote tally, body, timing, cause. All the bones of a real story are there — checkable facts.",
  },
  {
    kind: "text",
    passage: "Organizations must harness synergistic approaches to future-proof their strategic priorities in a fast-moving, customer-first world.",
    answer: "ai",
    explanation: "Even if a human wrote this on a slide deck at some point, as standalone text it's pure word salad. No org, no priority, no timeline.",
  },
  {
    kind: "text",
    passage: "idk man the plot twist was dumb but the soundtrack slaps so I'll allow it",
    answer: "human",
    explanation: "Informal review register — contractions, slang, a split opinion. AI reviews usually try to balance both sides more formally.",
  },
  {
    kind: "image",
    imageSrc: IMG_SYN_OFFICE,
    imageAlt: "Neat modern office workspace",
    answer: "ai",
    explanation: "Genre cross-check: if this were used in a business news story, you'd want a photographer credit. The screens have no real interface, the desk has zero clutter — it's synthetic.",
  },
  {
    kind: "text",
    passage: "Please find attached the Q3 numbers — cells in red are still being checked by Finance as of 4 p.m. today.",
    answer: "human",
    explanation: "Work email with a specific attachment, a color convention, a department, and a timestamp. Real friction = real human.",
  },
  {
    kind: "text",
    passage: "Navigating modern life requires embracing mindfulness while building resilience through intentional daily practices.",
    answer: "ai",
    explanation: "No practice, no teacher, no tradition, no measurement. Wellness-template voice that could come from any app or self-help post.",
  },
  {
    kind: "image",
    imageSrc: PHOTO("intcafe77"),
    imageAlt: "Busy café interior with people",
    answer: "human",
    explanation: "Casual documentary photo — random seating, natural lighting, real faces at different angles. The genre is 'someone walked in with a phone,' and it looks exactly like that.",
  },
]);

/** Intermediate checkpoint 2 — Images + captions: do they match? */
const QUIZ_CP_INTERMEDIATE_2 = withIds("ib2", [
  {
    kind: "text",
    passage: "Caption says 'peaceful protest downtown yesterday' — but the photo's hidden data says it was taken two years ago in a different city.",
    answer: "human",
    explanation: "This is teaching you about caption vs. metadata mismatch — a human-written scenario about a real problem. Always check when and where a 'news' photo was actually taken.",
  },
  {
    kind: "image",
    imageSrc: PHOTO("intbridge99"),
    imageAlt: "Old stone bridge over a river",
    answer: "human",
    explanation: "Standalone image check: real stone texture, irregular moss, uneven water reflections. Passes the 'looks like a camera was actually there' test.",
  },
  {
    kind: "image",
    imageSrc: IMG_SYN_PORTRAIT,
    imageAlt: "Close-up portrait of a person",
    answer: "ai",
    explanation: "The skin is too smooth with no pores or fine lines, the lighting is a perfect radial gradient, and the hair blends into the background too cleanly. Deepfake-era lesson: faces are now the hardest thing to trust.",
  },
  {
    kind: "text",
    passage: "Breaking: scientists discover miracle fruit — no study link, just a 404 error and a Shopify store.",
    answer: "ai",
    explanation: "Big claim + missing source + something trying to sell you something = junk. Treat as fake until proven otherwise.",
  },
  {
    kind: "image",
    imageSrc: IMG_SYN_KITCHEN,
    imageAlt: "Perfectly clean kitchen interior",
    answer: "ai",
    explanation: "Even polished real-estate photos have some real-world chaos — fingerprints, off-center handles, one cabinet that doesn't quite align. This kitchen has none of that.",
  },
  {
    kind: "text",
    passage: "I cropped my ex out of the beach pic — don't look at the weird shadow on the sand, we're all healing.",
    answer: "human",
    explanation: "Confessing to a human edit (cropping) with a self-aware joke. This is humans being transparent about how they manipulate their own photos — very different from AI generation.",
  },
  {
    kind: "image",
    imageSrc: PHOTO("intmarket55"),
    imageAlt: "Busy outdoor market scene",
    answer: "human",
    explanation: "Overlapping stalls, motion blur on shoppers, uneven shadows — the chaotic depth of a real crowded place. If captioned as 'illegal market raided,' you'd want the original source before sharing.",
  },
  {
    kind: "text",
    passage: "This image captures the essence of innovation through a striking visual representation of forward momentum.",
    answer: "ai",
    explanation: "This caption could float above any stock photo of literally anything — a rocket, a runner, a lightbulb. No subject, place, or actual claim.",
  },
  {
    kind: "image",
    imageSrc: IMG_SYN_MOUNTAIN,
    imageAlt: "Serene mountain scene",
    answer: "ai",
    explanation: "Looks plausible as a travel photo, but the mountain is a perfect triangle, the trees are mirrored clones, and the sky fades with no clouds. Neither the caption nor the pixels add up.",
  },
  {
    kind: "text",
    passage: "From the group chat: 'that's not even the same building lol' — compare the roofline to the TV screenshot.",
    answer: "human",
    explanation: "Crowd fact-checking in real time — people spotting a visual mismatch and using a second source to confirm. This is the habit you want to copy.",
  },
]);

/** Intermediate checkpoint 3 — Stay humble, stay safe */
const QUIZ_CP_INTERMEDIATE_3 = withIds("ib3", [
  {
    kind: "text",
    passage: "I'm not sure it's fake — it might just be compressed weirdly. Let's wait for a second source before we pile on.",
    answer: "human",
    explanation: "Uncertainty + not wanting to cause harm = responsible thinking. Matches the 'limits' idea: don't rush to be certain.",
  },
  {
    kind: "text",
    passage: "AI detection tools are 100% accurate and can never be fooled — if you disagree, you don't understand technology.",
    answer: "ai",
    explanation: "False certainty with an insult attached. Real experts always talk about failure rates and edge cases — never 'never.'",
  },
  {
    kind: "text",
    passage: "If this were a court case I'd want the file's full history, not just a vibe check from someone's Twitter thread.",
    answer: "human",
    explanation: "Provenance over instinct — demanding a process instead of just a feeling. That's the right call for anything high-stakes.",
  },
  {
    kind: "image",
    imageSrc: PHOTO("intport22"),
    imageAlt: "Port with shipping containers and cranes",
    answer: "human",
    explanation: "Even real photos need ethical handling — consent, context, credit. Optically real (rust, uneven stacking, real depth) doesn't mean automatically okay to use as evidence.",
  },
  {
    kind: "text",
    passage: "100% guaranteed method to spot any AI image in one second — number 7 will surprise you.",
    answer: "ai",
    explanation: "Snake-oil listicle. There is no 100% guaranteed method for anything in AI detection. Anyone claiming otherwise is selling something.",
  },
  {
    kind: "text",
    passage: "I changed my mind after seeing the full thread — the 'smoking gun' screenshot had cropped out the sign behind them.",
    answer: "human",
    explanation: "Updating your opinion after seeing new evidence is exactly the kind of thinking this course trains. That's healthy.",
  },
  {
    kind: "image",
    imageSrc: IMG_SYN_OFFICE,
    imageAlt: "Polished corporate office with monitors",
    answer: "ai",
    explanation: "Looks plausible as a tech company photo, but the screens show no real interfaces, the desk has zero clutter, and every monitor is perfectly aligned. Don't use synthetic images as evidence of a real workplace.",
  },
  {
    kind: "text",
    passage: "Harassment reminder: don't publicly accuse a classmate of using AI based on writing style alone. Talk to the teacher privately if it actually matters.",
    answer: "human",
    explanation: "Institutional ethics language — aligns with responsible use. This is how schools and workplaces actually handle this.",
  },
  {
    kind: "text",
    passage: "Everything you learned about spotting AI this year still works perfectly and will never need to be updated.",
    answer: "ai",
    explanation: "False — AI models change constantly and your detection skills need to evolve with them. Anyone saying 'never update your heuristics' is wrong.",
  },
  {
    kind: "image",
    imageSrc: PHOTO("intriver44"),
    imageAlt: "River with rocks and current",
    answer: "human",
    explanation: "Closing on a simple, mundane real photo — uneven rocks, turbulent water, natural chaos. Ground truth still matters. Not everything needs to be dramatic to be real.",
  },
]);

/** Opening quiz — Advanced */
const QUIZ_BASELINE_ADVANCED = withIds("base_a", [
  {
    kind: "text",
    passage: "This video of the senator was analyzed by three independent forensic labs — all three flagged unnatural blinking patterns and ear-region artifacts consistent with GAN-based face synthesis.",
    answer: "human",
    explanation: "Real forensic analysis language: multiple independent labs, specific artifacts named, specific technique cited. This is how actual experts write reports.",
  },
  {
    kind: "text",
    passage: "Shocking leaked audio reveals the CEO saying things you won't believe — no transcript, no source, just hit play.",
    answer: "ai",
    explanation: "No transcript, no source, urgency + mystery = classic audio manipulation bait. Real leaked audio comes with at minimum a claim of where it came from.",
  },
  {
    kind: "image",
    imageSrc: PHOTO("realcrowd44"),
    imageAlt: "Crowd at an outdoor event",
    answer: "human",
    explanation: "Real crowd photo — hundreds of unique faces, random clothing, natural lighting inconsistencies. Generating a convincing crowd this size is still extremely hard for AI.",
  },
  {
    kind: "text",
    passage: "The C2PA content credential attached to this image shows it was captured by a Nikon Z9 at 14:32 UTC on March 2, 2026, with no post-processing edits recorded.",
    answer: "human",
    explanation: "C2PA is a real standard for content provenance. Specific camera, exact timestamp, provenance chain — this is what verified media actually looks like.",
  },
  {
    kind: "image",
    imageSrc: IMG_AI_HARD,
    imageAlt: "Dramatic sunset scene",
    answer: "ai",
    explanation: "Still our synthetic sunset — but at the advanced level, the lesson is: even when you're unsure, ask for the provenance chain before trusting it as evidence.",
  },
  {
    kind: "text",
    passage: "Voice clone detected: the pitch consistency is too perfect across 4 minutes with zero fatigue markers, and formant transitions between phonemes don't match this speaker's baseline recording.",
    answer: "human",
    explanation: "Real audio forensics vocabulary — fatigue markers, formant transitions, baseline comparison. Experts write precisely like this. Don't mistake technical language for AI.",
  },
  {
    kind: "text",
    passage: "AI-generated content is now so advanced that no human can ever reliably detect it — give up trying.",
    answer: "ai",
    explanation: "Absolute claim + defeatism. Neither is true. Detection is hard and imperfect, but humans + tools + provenance systems together do meaningfully better than chance.",
  },
  {
    kind: "image",
    imageSrc: PHOTO("realstreet99"),
    imageAlt: "Busy street scene with people",
    answer: "human",
    explanation: "Real street photo — motion blur on some pedestrians, varied focus, natural depth of field. AI still struggles with the physics of a moving scene.",
  },
  {
    kind: "text",
    passage: "We ran the image through Hive Moderation, FotoForensics ELA, and checked the EXIF — no GPS, camera model listed as 'unknown,' and pixel-level ELA shows heavy re-compression in the face region.",
    answer: "human",
    explanation: "Named real tools, described real workflow, specific anomaly found. This is what actual verification looks like — messy, tool-dependent, specific.",
  },
  {
    kind: "image",
    imageSrc: IMG_SYN_OFFICE,
    imageAlt: "Perfect modern office",
    answer: "ai",
    explanation: "Advanced check: every monitor is perfectly aligned, the desk has zero clutter, and the screens show no real interface content. Real offices have cables, sticky notes, and half-eaten snacks.",
  },
]);

/** Advanced checkpoint 1 — Deepfakes & synthetic faces */
const QUIZ_CP_ADVANCED_1 = withIds("ab1", [
  {
    kind: "text",
    passage: "Her eyes don't blink for 11 seconds straight and the lighting on her neck doesn't match the room behind her — that's two independent flags.",
    answer: "human",
    explanation: "Real deepfake analysis: specific duration, specific mismatch, two independent tells stacked. This is exactly how you should reason about video.",
  },
  {
    kind: "text",
    passage: "This is definitely a deepfake — you can just tell by looking at it.",
    answer: "ai",
    explanation: "Zero evidence, zero specific tells. 'You can just tell' is not a method. Anyone at the advanced level should be suspicious of this reasoning.",
  },
  {
    kind: "image",
    imageSrc: PHOTO("realface11"),
    imageAlt: "Portrait photo outdoors",
    answer: "human",
    explanation: "Real portrait — skin pores visible at high resolution, hair strands with natural variation, catchlights in eyes are asymmetric as they would be in real light.",
  },
  {
    kind: "text",
    passage: "GAN-generated faces typically show: symmetrical catchlights, smooth skin in background-adjacent areas, and occasional teeth/earring rendering errors.",
    answer: "human",
    explanation: "Accurate technical description of known GAN tells. This is real AI literacy content — it names specific, checkable patterns rather than vibes.",
  },
  {
    kind: "image",
    imageSrc: IMG_SYN_PORTRAIT,
    imageAlt: "Close-up portrait of a face",
    answer: "ai",
    explanation: "Advanced reminder: synthetic faces are now the hardest thing to detect. The skin is suspiciously smooth, the lighting is a perfect radial gradient, and there are no pores or asymmetries. Real portrait photography always has these.",
  },
  {
    kind: "text",
    passage: "The audio deepfake was convincing until we ran spectral analysis — the prosody was flat in a way that real emotional speech never is.",
    answer: "human",
    explanation: "Prosody (the rhythm and intonation of speech) is one of the hardest things for voice cloners to get right. This is a real, checkable tell.",
  },
  {
    kind: "image",
    imageSrc: PHOTO("realmarket55"),
    imageAlt: "Street market scene",
    answer: "human",
    explanation: "Real market — imperfect signage, varied product placement, people at different stages of motion. AI generates markets that look too 'curated.'",
  },
  {
    kind: "text",
    passage: "If someone sends you a voice message that sounds urgent and slightly 'off' — even from a known contact — call them back on a number you already have before acting.",
    answer: "human",
    explanation: "Practical, specific advice for voice clone scams. Real safety advice acknowledges that even known voices can be cloned and gives a concrete verification step.",
  },
  {
    kind: "text",
    passage: "Deepfake technology is only used by bad actors and governments — regular people never encounter it.",
    answer: "ai",
    explanation: "False and vague. Deepfake apps are widely available to anyone with a smartphone. Framing it as only a nation-state problem makes people less vigilant.",
  },
  {
    kind: "image",
    imageSrc: IMG_SYN_KITCHEN,
    imageAlt: "Spotless modern kitchen",
    answer: "ai",
    explanation: "Would you accept this as evidence in a serious context? At this level: always ask for source + provenance. The kitchen also has zero imperfections — cabinets identical, counters pristine, no items out of place.",
  },
]);

/** Advanced checkpoint 2 — Provenance & verification */
const QUIZ_CP_ADVANCED_2 = withIds("ab2", [
  {
    kind: "text",
    passage: "The image has a valid C2PA manifest signed by Reuters, showing original capture timestamp, no cropping, and camera model matching their field kit.",
    answer: "human",
    explanation: "C2PA (Coalition for Content Provenance and Authenticity) is a real standard. Named news org, specific fields verified, camera match — this is the gold standard for image provenance.",
  },
  {
    kind: "text",
    passage: "Reverse image search shows this 'breaking news' photo first appeared in a stock photo collection in 2019 — three years before the event it's being used to illustrate.",
    answer: "human",
    explanation: "Reverse image search catching a recycled photo — a classic and effective verification technique. This is exactly how fact-checkers work.",
  },
  {
    kind: "image",
    imageSrc: PHOTO("reallab22"),
    imageAlt: "Lab or workspace environment",
    answer: "human",
    explanation: "Real workspace — imperfect cable management, varied equipment wear, asymmetric lighting. Authenticity lives in the mess.",
  },
  {
    kind: "text",
    passage: "Error Level Analysis (ELA) highlights regions of an image that have been re-saved at different compression levels — useful for spotting composited areas.",
    answer: "human",
    explanation: "Accurate description of a real forensics technique. ELA is a genuine tool used by investigators — knowing what it does is part of advanced literacy.",
  },
  {
    kind: "image",
    imageSrc: IMG_AI_HARD,
    imageAlt: "Dramatic landscape",
    answer: "ai",
    explanation: "Provenance check: can you find a photographer credit, camera model, or publication for this image? No? Then treat it as unverified regardless of how it looks.",
  },
  {
    kind: "text",
    passage: "This watermark proves the image is authentic — watermarks can't be faked.",
    answer: "ai",
    explanation: "False. Watermarks can be copied, cropped, or synthesized. A watermark is a weak signal at best — provenance chains (C2PA, EXIF, known source) are much stronger.",
  },
  {
    kind: "image",
    imageSrc: PHOTO("realbuilding77"),
    imageAlt: "Building exterior",
    answer: "human",
    explanation: "Real architectural photo — weathering on concrete, uneven window reflections, natural shadow angles. Compare to AI buildings which are always suspiciously pristine.",
  },
  {
    kind: "text",
    passage: "Before using any image in a school report or presentation, run it through a reverse image search and check the earliest known source date.",
    answer: "human",
    explanation: "Practical, actionable advice with specific steps. This is good media literacy practice — not a vague 'be careful online' platitude.",
  },
  {
    kind: "text",
    passage: "AI-generated images always fail reverse image search — so if search finds results, the image must be real.",
    answer: "ai",
    explanation: "Wrong on both counts. AI images can appear in search if they've been shared before. And real images can fail to appear if they're new or obscure. Neither direction is reliable alone.",
  },
  {
    kind: "image",
    imageSrc: IMG_SYN_MOUNTAIN,
    imageAlt: "Perfect mountain landscape",
    answer: "ai",
    explanation: "Provenance test: no photographer, no location tag, no camera metadata. The image also shows AI tells — perfect triangle peak, symmetrical treeline, no haze or atmospheric variation. Two layers of evidence.",
  },
]);

/** Advanced checkpoint 3 — AI in the wild */
const QUIZ_CP_ADVANCED_3 = withIds("ab3", [
  {
    kind: "text",
    passage: "This news article has no byline, no publication date, no editor credit, and every quote is attributed to 'industry experts' with no names.",
    answer: "ai",
    explanation: "Missing byline + no date + vague unnamed sources = strong signals of AI-generated filler content, often used in SEO farms or low-quality news aggregators.",
  },
  {
    kind: "text",
    passage: "The study has 847 participants, was pre-registered on ClinicalTrials.gov (ID: NCT04821937), and results were replicated by a team in South Korea.",
    answer: "human",
    explanation: "Large sample, pre-registration (means the hypothesis was logged before results were collected), and independent replication — this is what good science actually looks like.",
  },
  {
    kind: "image",
    imageSrc: PHOTO("realcity33"),
    imageAlt: "City skyline photo",
    answer: "human",
    explanation: "Real city photo — haze variation at different distances, antenna imperfections, window reflections that actually follow physics.",
  },
  {
    kind: "text",
    passage: "Using AI to write a full news article and publishing it without disclosure is considered an ethical violation by the Society of Professional Journalists.",
    answer: "human",
    explanation: "True and verifiable. SPJ and AP have both published guidelines on AI use in journalism. Knowing that ethics bodies exist for this is part of advanced literacy.",
  },
  {
    kind: "text",
    passage: "All AI-generated text is dangerous misinformation and should be banned from the internet immediately.",
    answer: "ai",
    explanation: "Absolute claim, no nuance. AI-generated text has legitimate uses — summaries, drafts, accessibility tools. The issue is undisclosed AI in contexts requiring human accountability.",
  },
  {
    kind: "image",
    imageSrc: IMG_SYN_PORTRAIT,
    imageAlt: "Polished portrait photo",
    answer: "ai",
    explanation: "AI-generated faces still appear in fake news articles, social media profiles, and product reviews. The stakes of not checking: you might trust someone who doesn't exist.",
  },
  {
    kind: "text",
    passage: "I asked the chatbot to write a summary and it cited three papers — I checked all three and two of them don't exist.",
    answer: "human",
    explanation: "Hallucinated citations are a known, documented problem with LLMs. This person did the right thing: verified the citations. That's advanced practice.",
  },
  {
    kind: "text",
    passage: "If an AI tool is transparent about its limitations and tells you when it's uncertain, it's more trustworthy — not less.",
    answer: "human",
    explanation: "Correct. Calibrated uncertainty is a sign of a better-designed system. Tools that claim to always be right are more dangerous, not less.",
  },
  {
    kind: "image",
    imageSrc: PHOTO("realcoast88"),
    imageAlt: "Coastal scene",
    answer: "human",
    explanation: "Real coastal photo — wave physics, foam patterns, horizon haze. AI water is getting better but still tends toward too-regular wave patterns.",
  },
  {
    kind: "text",
    passage: "Media literacy is a skill you finish learning once and then have forever.",
    answer: "ai",
    explanation: "False — and this is the most important lesson of the whole course. AI evolves constantly. Your skills need to evolve too. Learning never stops.",
  },
]);

const CHECKPOINT_QUIZZES = {
  beginner:     [QUIZ_CP_BEGINNER_1,     QUIZ_CP_BEGINNER_2,     QUIZ_CP_BEGINNER_3],
  intermediate: [QUIZ_CP_INTERMEDIATE_1, QUIZ_CP_INTERMEDIATE_2, QUIZ_CP_INTERMEDIATE_3],
  advanced:     [QUIZ_CP_ADVANCED_1,     QUIZ_CP_ADVANCED_2,     QUIZ_CP_ADVANCED_3],
};

const MODULES_BY_LEVEL = {
  beginner: [
    [
      {
        title: "The swap-in test 🔄",
        html: `<p>Here's the fastest trick: read a sentence and try swapping the main topic for something random — like "pizza" or "dinosaurs." If the sentence still makes sense with any topic, it's probably filler.</p><p><strong>Example:</strong> "In today's world, it's important to prioritize <em>pizza</em> every single day." Still sounds like a sentence, right? That means the original said nothing real.</p>`,
      },
      {
        title: "Buzzwords are filler in a suit 🎩",
        html: `<p>Words like "innovative," "synergy," "holistic," and "moving forward" sound smart but mean almost nothing. Humans use them too — but when a whole paragraph is <em>stacked</em> with them and nothing specific underneath, that's a red flag.</p><p><strong>Skill:</strong> Strip the fancy words. What's actually left?</p>`,
      },
      {
        title: "Real humans are kind of chaotic 🌀",
        html: `<p>Real people vent, make jokes, contradict themselves, and bring up random stuff like their dog eating sourdough. AI tends to smooth everything out into calm, balanced, polite summaries.</p><p><strong>Skill:</strong> Look for risky specifics — money amounts, names, embarrassing events, strong opinions. AI usually avoids those.</p><p class="module-quiz-hint">🎯 Round 1 quiz is all about <strong>text clues</strong> — can you spot the filler?</p>`,
      },
    ],
    [
      {
        title: "What cameras actually capture 📷",
        html: `<p>Real photos come from lenses and sensors — which means uneven sharpness, dust, weird shadows, and random stuff in the background. Nothing has to look ugly. But <strong>something organic</strong> is always hiding somewhere.</p><p><strong>Skill:</strong> Mentally zoom in. Is the texture consistent everywhere, or does it get weird in the corners?</p>`,
      },
      {
        title: "Fake images are getting better 🤖",
        html: `<p>This course uses softer, more realistic synthetic images — window light, city dusk, blurry plants. They're trickier than obvious neon clipart. Look for <strong>repeating shapes, too-smooth gradients</strong>, and grain that doesn't behave like a real camera.</p><p><strong>Skill:</strong> When in doubt, ask: where did this image come from? Who took it? Vibes alone won't scale.</p>`,
      },
      {
        title: "A pretty image can still be a lie 🖼️",
        html: `<p>A caption like "serene landscape embodies tranquility" could go under half the photos on the internet. Always pair the <strong>image + caption + who posted it</strong> before you decide to believe or share something.</p><p class="module-quiz-hint">🎯 Round 2 quiz is <strong>image-heavy</strong> — apply what you learned about cameras vs. generators.</p>`,
      },
    ],
    [
      {
        title: "Triangulate before you trust 🔺",
        html: `<p>Before you reshare something: <strong>who posted it first?</strong> When? Is there a real outlet or document backing it up? "Experts agree" with no link is a stop sign, not a green light.</p><p><strong>Skill:</strong> Name the minimum evidence you'd need before you'd trust it. Then look for it.</p>`,
      },
      {
        title: "One clue isn't enough 🧩",
        html: `<p>Combine text style + image plausibility + account history (when you can see it). Contradictions are gold — like a caption saying "downtown yesterday" but the photo metadata says two years ago in another city.</p><p><strong>Skill:</strong> Give yourself a reason that uses <em>two</em> independent clues, not just one gut feeling.</p>`,
      },
      {
        title: "Don't be that person 🚫",
        html: `<p>Don't publicly call someone out for "sounding like AI." They might be tired, nervous, or writing in their second language. If it actually matters — like school work — talk to your teacher privately with clear reasons, not just vibes.</p><p class="module-quiz-hint">🎯 Round 3 mixes <strong>claims, ethics, and images</strong> — habits, not just pattern matching.</p>`,
      },
    ],
  ],
  intermediate: [
    [
      {
        title: "Genre changes the rules 📋",
        html: `<p>Legal clauses, Slack messages, and news stories all sound different — on purpose. <strong>Stiff doesn't mean AI</strong> in a contract. <strong>Casual doesn't mean honest</strong> in a scam DM. Identify the genre first, then judge whether the details actually fit that genre.</p>`,
      },
      {
        title: "Corporate polish isn't unique to AI 🏢",
        html: `<p>Humans write hollow strategy slides too. The real question isn't "does this sound robotic?" — it's "does this text actually enable a real decision?" Look for owners, dates, numbers, and trade-offs. Without them, even human text can be useless.</p>`,
      },
      {
        title: "Registers in the wild 🌐",
        html: `<p>Social posts break grammar on purpose. Manuals don't. AI can imitate both registers — so genre is a clue, not a verdict. Use it as one piece of your judgment, not the whole thing.</p><p class="module-quiz-hint">🎯 Round 1 tests <strong>genre mixing</strong>: legal, newsy, casual, and pure word salad.</p>`,
      },
    ],
    [
      {
        title: "Captions can lie about real photos 🏷️",
        html: `<p>A photo can be completely real while the caption is totally wrong — wrong date, wrong place, fake before/after. Separate "optical truth" (what the camera captured) from "story truth" (what someone claims the image proves).</p><p><strong>Skill:</strong> List what the image actually shows vs. what the words are claiming.</p>`,
      },
      {
        title: "Crops and edits are human too ✂️",
        html: `<p>Cropping, filters, and meme overlays are human choices — not the same as AI generation. But they're still reasons to slow down. Ask: what's outside the frame? What was removed?</p>`,
      },
      {
        title: "Clickbait never changes 🪤",
        html: `<p>"Doctors hate this one trick" and "miracle breakthrough" have been around forever. They work by pairing a huge claim with zero sources. Find the primary source or ignore it.</p><p class="module-quiz-hint">🎯 Round 2 focuses on <strong>frames + captions + skepticism</strong>.</p>`,
      },
    ],
    [
      {
        title: "Uncertainty is actually smart 🤔",
        html: `<p>Real experts say things like "the evidence suggests" and "I could be wrong." Absolute claims like "this tool is 100% accurate" are almost always marketing or ignorance — not expertise.</p><p><strong>Skill:</strong> Reward language that admits limits. It's usually more trustworthy, not less.</p>`,
      },
      {
        title: "Escalate responsibly 🪜",
        html: `<p>Use teachers, school policies, or managers — not pile-ons or public call-outs — for suspected cheating or misinformation. Public shaming based on writing style alone often backfires and hurts the wrong person.</p>`,
      },
      {
        title: "Update your skills like you update your apps 🔄",
        html: `<p>AI tools change every few months. The tells that worked last year might not work this year. Keep a mental (or real) list of what fooled you and update your rules instead of clinging to old ones.</p><p class="module-quiz-hint">🎯 Round 3 tests <strong>humility, ethics, and hype resistance</strong>.</p>`,
      },
    ],
  ],
  advanced: null, // filled in below after MODULES_ADVANCED is defined
};

const MODULES_ADVANCED = [
  // Track 1: Deepfakes & Synthetic Faces (4 slides)
  [
    {
      title: "Welcome to Advanced 🧠",
      html: `<div class="module-img-wrap"><img class="module-img" src="${PHOTO('realface11')}" alt="Portrait photo" loading="lazy" /></div>
<p>You've spotted filler text and AI images. Now the game gets harder. This level covers <strong>deepfakes, voice cloning, provenance systems, and AI in journalism</strong> — the stuff that actually fools experts.</p>
<div class="fun-box"><strong>⚠️ The advanced challenge:</strong><br/>At this level, "it looks real to me" is not enough. You need a <em>process</em> — tools, sources, and skepticism working together.</div>
<p>The skills here apply to real situations: news stories, social media "evidence," suspicious audio, and AI-written articles. Let's go.</p>`,
    },
    {
      title: "What Is a Deepfake? 🎭",
      html: `<p>A <strong>deepfake</strong> is a video, image, or audio clip where AI has replaced or synthesized a person's face, voice, or both. They range from obvious to nearly undetectable.</p>
<div class="compare-wrap">
  <div class="compare-ai"><div class="compare-label">🎭 Face swap deepfake</div>Real video of Person A, but their face is replaced with Person B's face. Used in political misinformation and non-consensual content.</div>
  <div class="compare-ai"><div class="compare-label">🔊 Voice clone</div>AI trained on recordings of someone's voice can generate new speech in their voice — saying things they never said.</div>
  <div class="compare-ai"><div class="compare-label">🤖 Fully synthetic person</div>No real person at all — face, voice, and body generated entirely from scratch by AI.</div>
</div>
<div class="fact-bubble"><strong>💡 Key tells in deepfake videos:</strong><br/>Unnatural blinking (too much or too little), lighting on face doesn't match the room, edges around hair look "soft" or "melted," and teeth/earrings render strangely.</div>`,
    },
    {
      title: "Voice Cloning Is Here 🔊",
      html: `<p>With just a few minutes of audio, AI can clone someone's voice well enough to fool their family members on a phone call. This is being used for <strong>fraud scams</strong> right now.</p>
<div class="fun-box"><strong>📞 The grandparent scam (upgraded):</strong><br/>"Grandma, it's me, I'm in trouble, I need money now!" — except "me" is an AI voice clone of the real grandchild. Same vocal patterns, same speech quirks. Grandparents have lost thousands of dollars to this.</div>
<div class="compare-wrap">
  <div class="compare-human"><div class="compare-label">✅ What to do if you get a suspicious call</div>Hang up. Call back on a number you already have saved. Ask a question only the real person would know — not their name or birthday (those are public).</div>
  <div class="compare-ai"><div class="compare-label">❌ What NOT to do</div>Act on urgency. Send money, gift cards, or wire transfers based on a voice call alone — even if it sounds exactly right.</div>
</div>
<p class="module-quiz-hint">🎯 Round 1 checkpoint focuses on <strong>deepfakes and synthetic faces</strong> — specific tells and real verification steps.</p>`,
    },
    {
      title: "Spotting Synthetic Faces 👁️",
      html: `<p>Here's your checklist for evaluating whether a face in an image is real or AI-generated:</p>
<ul class="module-checklist">
  <li data-icon="👁️">Check the <strong>eyes</strong> — catchlights (the tiny reflections) should be asymmetric in real photos. AI often makes them too symmetric.</li>
  <li data-icon="👂">Check the <strong>ears and earrings</strong> — AI frequently renders these incorrectly, especially if they're partially obscured by hair.</li>
  <li data-icon="🦷">Check the <strong>teeth</strong> — AI still struggles with individual tooth rendering and gum lines.</li>
  <li data-icon="💇">Check the <strong>hair edges</strong> — against complex backgrounds, AI hair often has a "melted" or too-smooth boundary.</li>
  <li data-icon="🌅">Check the <strong>background</strong> — does the lighting on the face match the light in the background? Mismatches = composite or deepfake.</li>
</ul>
<div class="try-it"><strong>🎯 Practice:</strong><br/>Search "This Person Does Not Exist" online — it generates a new AI face every time you refresh. Try applying this checklist to each one.</div>`,
    },
  ],
  // Track 2: Provenance & Verification (4 slides)
  [
    {
      title: "What Is Provenance? 📜",
      html: `<div class="module-img-wrap"><img class="module-img" src="${PHOTO('reallab22')}" alt="Research workspace" loading="lazy" /></div>
<p><strong>Provenance</strong> = where something came from, who made it, when, and what happened to it since. For digital media, provenance answers: was this image/video/text created by a human or AI, and can we verify that chain?</p>
<div class="fact-bubble"><strong>💡 Why it matters:</strong><br/>A real photo with a false caption is just as dangerous as a fake photo. Provenance covers BOTH — the origin of the pixels AND the claim being made about them.</div>
<p>Think of provenance like a <strong>receipt + shipping history</strong> for a piece of media. The best receipts are cryptographically signed and tamper-proof.</p>`,
    },
    {
      title: "C2PA: The Content Receipt System 🧾",
      html: `<p><strong>C2PA</strong> (Coalition for Content Provenance and Authenticity) is a real industry standard — backed by Adobe, Microsoft, BBC, and others — that attaches a signed, tamper-evident manifest to media files.</p>
<div class="compare-wrap">
  <div class="compare-human"><div class="compare-label">✅ What a C2PA manifest tells you</div>Camera make/model, exact capture time, GPS location, editing history, whether AI tools were used, and a cryptographic signature from the publisher.</div>
  <div class="compare-ai"><div class="compare-label">⚠️ What C2PA doesn't solve</div>It only works if the camera/software supports it. Old photos, screenshots, and most social media shares strip it out. It's a strong signal when present — but absence isn't proof of fakery.</div>
</div>
<div class="try-it"><strong>🎯 Try it:</strong><br/>Search "Content Credentials verify" — Adobe has a free tool where you can upload any image and check if it has a C2PA manifest attached.</div>`,
    },
    {
      title: "Your Verification Toolkit 🔧",
      html: `<p>These are real, free tools you can use right now:</p>
<ul class="module-checklist">
  <li data-icon="🔍"><strong>Google Reverse Image Search</strong> — drag any image to find where it first appeared online and when.</li>
  <li data-icon="📸"><strong>FotoForensics</strong> — free ELA (Error Level Analysis) tool that shows if parts of an image were edited at different compression levels.</li>
  <li data-icon="📋"><strong>Jeffrey's Exif Viewer</strong> — shows hidden EXIF metadata including camera model, GPS, and timestamp.</li>
  <li data-icon="🏷️"><strong>Content Credentials Verify</strong> (Adobe) — checks for C2PA provenance manifests.</li>
  <li data-icon="🎵"><strong>AI Voice Detector</strong> tools — several free browser tools can analyze audio for synthesis artifacts.</li>
</ul>
<div class="fun-box"><strong>🔑 The golden rule:</strong><br/>No single tool is conclusive. Use two or more tools that agree before making a strong claim. One flag = investigate more. Three flags pointing the same way = high confidence.</div>`,
    },
    {
      title: "When Evidence Gets Recycled 🔄",
      html: `<div class="module-img-wrap"><img class="module-img" src="${PHOTO('realnews44')}" alt="Newspaper and media" loading="lazy" /></div>
<p>One of the most common misinformation tactics: take a <strong>real photo from a past event</strong> and repost it as if it's happening right now.</p>
<div class="compare-wrap">
  <div class="compare-ai"><div class="compare-label">❌ The recycling trick</div>"Breaking: violence erupts in [city]!" — but the photo is from a 2015 event in a different country. The image is real. The claim is fake.</div>
  <div class="compare-human"><div class="compare-label">✅ How to catch it</div>Reverse image search the photo. Check the earliest date it appears. If the photo predates the claimed event — recycled.</div>
</div>
<div class="fact-bubble"><strong>💡 Real example pattern:</strong><br/>During almost every major news event, fact-checkers find dozens of old, unrelated photos being shared as "current evidence." This is so common it has a name: "context collapse."</div>
<p class="module-quiz-hint">🎯 Round 2 checkpoint tests <strong>provenance knowledge and verification tools</strong> — knowing what's real and how to check.</p>`,
    },
  ],
  // Track 3: AI in the Wild (4 slides)
  [
    {
      title: "AI-Written Content Is Everywhere 📰",
      html: `<div class="module-img-wrap"><img class="module-img" src="${PHOTO('realdesk33')}" alt="Writing workspace" loading="lazy" /></div>
<p>AI is now used to write news articles, product reviews, academic abstracts, social media posts, and entire websites — often with zero disclosure. Knowing how to spot it matters.</p>
<div class="compare-wrap">
  <div class="compare-ai"><div class="compare-label">🚩 Red flags for AI-written articles</div>No byline or vague byline, no publication date, all quotes from unnamed "experts," generic language that could apply to any story, no original reporting or interviews.</div>
  <div class="compare-human"><div class="compare-label">✅ Signs of real journalism</div>Named reporter with contact info, specific sources quoted by name, original documents or data cited, contradicting viewpoints included, editor/publication credited.</div>
</div>
<p>The issue isn't AI assistance — it's <strong>undisclosed AI replacing human accountability</strong> in contexts where that accountability matters.</p>`,
    },
    {
      title: "Hallucinations Are Real 🌀",
      html: `<p>AI language models <strong>hallucinate</strong> — they confidently generate facts, citations, statistics, and quotes that don't exist. This isn't a bug they'll fix soon; it's a fundamental characteristic of how they work.</p>
<div class="fun-box"><strong>📚 Real example:</strong><br/>A lawyer submitted a legal brief written by ChatGPT. It cited six court cases as precedents. A judge looked them up — none of them existed. The lawyer was fined and sanctioned.</div>
<ul class="module-checklist">
  <li data-icon="📖">Always verify citations from AI tools — look up the actual paper/article/case</li>
  <li data-icon="🔢">Never trust AI-generated statistics without a primary source</li>
  <li data-icon="💬">AI-generated quotes attributed to real people should always be verified against original sources</li>
  <li data-icon="🗺️">AI-generated maps, diagrams, and data visualizations can contain subtle errors</li>
</ul>`,
    },
    {
      title: "AI Ethics Isn't Optional 🤝",
      html: `<p>At the advanced level, spotting AI is only half the job. The other half is knowing what to <em>do</em> about it.</p>
<div class="compare-wrap">
  <div class="compare-human"><div class="compare-label">✅ Responsible use of your detection skills</div>Report AI misinformation to platforms using their reporting tools. Share fact-checks from established organizations (AP, Reuters, Snopes). Correct misinformation privately before publicly if possible.</div>
  <div class="compare-ai"><div class="compare-label">❌ What not to do</div>Publicly accuse someone of creating deepfakes without solid evidence — you could be wrong and cause serious harm. Don't amplify content you're trying to debunk (the "ratio" problem).</div>
</div>
<div class="fact-bubble"><strong>💡 The amplification problem:</strong><br/>Sharing misinformation with "this is fake" still spreads it. Studies show people often remember the claim but not the correction. Link to fact-checks instead of resharing the original.</div>`,
    },
    {
      title: "The Future Is Your Problem (In a Good Way) 🌍",
      html: `<div class="module-img-wrap"><img class="module-img" src="${PHOTO('realworld88')}" alt="People working together" loading="lazy" /></div>
<p>You've now completed all three levels of this course. Here's what you've actually learned:</p>
<ul class="module-checklist">
  <li data-icon="🔤"><strong>Beginner:</strong> Spot filler text, identify AI images, develop healthy sharing habits</li>
  <li data-icon="📋"><strong>Intermediate:</strong> Read genre and context, verify captions, stay calibrated and humble</li>
  <li data-icon="🧠"><strong>Advanced:</strong> Recognize deepfakes, use provenance tools, understand AI in journalism</li>
</ul>
<div class="fun-box"><strong>🚀 What comes next:</strong><br/>AI detection is a field that changes every few months. The specific tells you learned will evolve. But the <em>process</em> — stack clues, demand provenance, stay humble, update your model — never goes out of date.</div>
<p class="module-quiz-hint">🎯 Final checkpoint: <strong>AI in the wild</strong> — journalism, hallucinations, ethics, and the big picture. You've got this! 🏆</p>`,
    },
  ],
];

// Wire advanced modules in now that MODULES_ADVANCED is defined
MODULES_BY_LEVEL.advanced = MODULES_ADVANCED;

function getBaselineQuizForLevel(level) {
  if (level === "intermediate") return QUIZ_BASELINE_INTERMEDIATE;
  if (level === "advanced")     return QUIZ_BASELINE_ADVANCED;
  return QUIZ_BASELINE_BEGINNER;
}

function getCheckpointQuizForLevel(level, track1to3) {
  const key  = ["intermediate","advanced"].includes(level) ? level : "beginner";
  const list = CHECKPOINT_QUIZZES[key]?.[track1to3 - 1];
  return list || CHECKPOINT_QUIZZES.beginner[0];
}
