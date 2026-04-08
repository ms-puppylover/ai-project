# Product Brief — Real or AI? AI Literacy Mini-Course

**Site:** learningaboutai.netlify.app
**Stack:** Static HTML / CSS / JS — no build step, auto-deploys from GitHub main branch
**Audience:** Middle schoolers, ages 11–14 (approx. 7th grade reading level)

---

## Problem Space

Middle schoolers struggle to distinguish AI-generated content from human-made content. As AI floods social media, news, and schoolwork, kids lack the skills to think critically about what they read and see online — making them easy targets for misinformation.

---

## Goal

Teach kids to confidently spot AI-generated text and images through short, engaging lessons and instant-feedback quizzes — without it feeling like school.

---

## Success Metrics

- Kids complete all 3 beginner module tracks and earn 3 stars
- Average checkpoint quiz score improves from baseline (measures learning)
- Kids can name at least 2 detection strategies unprompted after finishing

---

## Solution

A browser-based mini-course with no login required.

**User flow:** Land on home → take opening quiz → read module → take checkpoint → earn star → repeat × 3 → level up

---

## Levels

| Level | Focus | Unlocks when |
|-------|-------|--------------|
| Beginner | Filler text, obvious synthetic images, basic habits | Always unlocked |
| Intermediate | Genre awareness, caption vs. image mismatch, staying humble | Beginner completed |
| Advanced | Deepfakes, voice cloning, C2PA provenance, AI in journalism | Intermediate completed |

Each level has:
- **Opening quiz** — baseline skill check with instant explanations
- **3 module tracks** — bite-sized slides teaching text clues, image clues, and safe habits; each track has illustrated, interactive cards
- **Checkpoint quizzes** — 10 questions per track; pass 73%+ to earn a ⭐
- **Auto-progression** — completing a level surfaces a "Start [Next Level]" prompt

---

## Features Shipped

- **3-level curriculum** with full quiz banks (beginner, intermediate, advanced)
- **Level tabs** — switch between any unlocked level from the home screen
- **Stars + progress tracking** per level, stored locally
- **Reset progress** button available on home and module screens
- **Confetti animation** on 100% quiz score
- **Unique images per level** — 13 distinct SVG synthetic images + fresh Picsum photo seeds, no image repeated within a level
- **Brown warm palette** (Limelight headers, Kalnia body font)
- **Scroll fix** — quiz panels always open at the top of the page

---

## Image System

All "AI" quiz images are SVG data URLs generated in `course-content.js` — no external assets needed. Real photos use `picsum.photos` with unique seeds per level.

| Level | AI SVG images |
|-------|--------------|
| Beginner | FLORA, INDOOR, AI_HARD, STREET, BEACH, BEDROOM, HALLWAY |
| Intermediate | KITCHEN, PORTRAIT, MOUNTAIN, OFFICE |
| Advanced | STADIUM, NEWSROOM |

---

## Backlog

- Expand module slides (currently 3 slides per track, target 5)
- Mobile layout polish
- Share / print certificate on course completion
