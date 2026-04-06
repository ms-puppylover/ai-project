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
    imageSrc: PHOTO("realboats81"),
    imageAlt: "Harbor with boats and ropes",
    answer: "human",
    explanation: "Ropes, reflections, random boat angles — all that tangled detail is exactly what a camera captures and what fake images skip.",
  },
  {
    kind: "image",
    imageSrc: IMG_SYN_STREET,
    imageAlt: "City street at dusk",
    answer: "ai",
    explanation: "The buildings are perfectly spaced rectangles, the sky fades too cleanly, and the 'reflection' is just a simple shape. Real city streets are way messier.",
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
    imageSrc: IMG_SYN_INDOOR,
    imageAlt: "Room corner with soft window light",
    answer: "ai",
    explanation: "Too clean — no outlet covers, no furniture shadows, no paint texture variation. Real rooms always have something imperfect.",
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
    imageSrc: IMG_SYN_STREET,
    imageAlt: "Night street between tall buildings",
    answer: "ai",
    explanation: "Genre cross-check: if this were used in a breaking news story, you'd want a photographer credit and outlet. Structurally it's still synthetic blocks + grain — not a raw camera file.",
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
    imageSrc: PHOTO("realdesk33"),
    imageAlt: "Messy desk photo",
    answer: "human",
    explanation: "Casual documentary photo — matches real life clutter. The genre here is 'someone's actual desk,' and it looks like it.",
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
    imageSrc: PHOTO("realstairs55"),
    imageAlt: "Interior stairs photo",
    answer: "human",
    explanation: "Standalone image check: real physics, real materials, real wear. Passes the 'looks like a camera was actually there' test.",
  },
  {
    kind: "image",
    imageSrc: IMG_AI_HARD,
    imageAlt: "Sunset silhouette image",
    answer: "ai",
    explanation: "Captions can lie even about real images — and here, the pixels are synthetic too. Both the story AND the image need to check out.",
  },
  {
    kind: "text",
    passage: "Breaking: scientists discover miracle fruit — no study link, just a 404 error and a Shopify store.",
    answer: "ai",
    explanation: "Big claim + missing source + something trying to sell you something = junk. Treat as fake until proven otherwise.",
  },
  {
    kind: "image",
    imageSrc: IMG_SYN_INDOOR,
    imageAlt: "Indoor scene with window light",
    answer: "ai",
    explanation: "Even polished marketing photos have some real-world chaos — cables, shadows, uneven surfaces. This has none of that. Still synthetic.",
  },
  {
    kind: "text",
    passage: "I cropped my ex out of the beach pic — don't look at the weird shadow on the sand, we're all healing.",
    answer: "human",
    explanation: "Confessing to a human edit (cropping) with a self-aware joke. This is humans being transparent about how they manipulate their own photos — very different from AI generation.",
  },
  {
    kind: "image",
    imageSrc: PHOTO("realforest77"),
    imageAlt: "Forest trail",
    answer: "human",
    explanation: "Depth, dappled light, organic mess. If this were captioned 'enchanted forest discovered near city,' you'd want a second source — but optically it's a real camera.",
  },
  {
    kind: "text",
    passage: "This image captures the essence of innovation through a striking visual representation of forward momentum.",
    answer: "ai",
    explanation: "This caption could float above any stock photo of literally anything — a rocket, a runner, a lightbulb. No subject, place, or actual claim.",
  },
  {
    kind: "image",
    imageSrc: IMG_SYN_FLORA,
    imageAlt: "Soft green nature blur with stems",
    answer: "ai",
    explanation: "The caption is empty PR and the image is a bokeh mimic — both are faking depth they don't have.",
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
    imageSrc: PHOTO("realcoffee88"),
    imageAlt: "Cafe window photo",
    answer: "human",
    explanation: "Even real photos need ethical handling — consent, context, credit. Optically real doesn't mean automatically okay to share.",
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
    imageSrc: IMG_SYN_STREET,
    imageAlt: "Dusk city street with building silhouettes",
    answer: "ai",
    explanation: "Looks plausible as a real city photo, but it's still our synthetic street — flat buildings, smooth sky, no real street chaos. Don't use it as evidence of a real place.",
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
    imageSrc: PHOTO("realwall12"),
    imageAlt: "Wall texture macro",
    answer: "human",
    explanation: "Closing on a simple, mundane real photo — a reminder that ground truth still matters. Not everything needs to be dramatic to be real.",
  },
]);

const CHECKPOINT_QUIZZES = {
  beginner: [QUIZ_CP_BEGINNER_1, QUIZ_CP_BEGINNER_2, QUIZ_CP_BEGINNER_3],
  intermediate: [QUIZ_CP_INTERMEDIATE_1, QUIZ_CP_INTERMEDIATE_2, QUIZ_CP_INTERMEDIATE_3],
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
};

function getBaselineQuizForLevel(level) {
  if (level === "beginner") return QUIZ_BASELINE_BEGINNER;
  return QUIZ_BASELINE_INTERMEDIATE;
}

function getCheckpointQuizForLevel(level, track1to3) {
  const key = level === "intermediate" ? "intermediate" : "beginner";
  const list = CHECKPOINT_QUIZZES[key][track1to3 - 1];
  return list || CHECKPOINT_QUIZZES.beginner[0];
}
