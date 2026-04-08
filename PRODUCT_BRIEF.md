# Product Brief — Real or AI? Mini-Course

**Site:** learningaboutai.netlify.app  
**Stack:** Static HTML / CSS / JS — no build step, auto-deploys from GitHub main branch  
**Audience:** Middle schoolers (approx. 7th grade reading level)

---

## What it is

A self-paced, browser-based quiz course that teaches kids to tell apart human-made and AI-generated content (text and images). No login, no backend — progress lives in `localStorage`.

---

## Levels

| Level | Focus | Unlocks when |
|-------|-------|--------------|
| Beginner | Filler text, obvious synthetic images, basic habits | Always unlocked |
| Intermediate | Genre awareness, caption vs. image mismatch, staying humble | Beginner completed |
| Advanced | Deepfakes, voice cloning, C2PA provenance, AI in journalism | Intermediate completed |

Each level has:
- An opening baseline quiz (10 questions)
- 3 module tracks (reading + checkpoint quiz per track)
- Star rating based on quiz score
- Auto-progression to next level on completion

---

## Features shipped

- **3-level curriculum** with full quiz banks (beginner, intermediate, advanced)
- **Level tabs** — switch between any unlocked level from the home screen
- **Stars + progress tracking** per level, stored locally
- **Reset progress** button available on home and module screens
- **Confetti animation** on 100% quiz score
- **Auto-advance modal** — completing a level surfaces a "Start [Next Level]" prompt
- **Unique images per level** — 13 distinct SVG synthetic images + fresh Picsum photo seeds, no image repeated within or across levels
- **Brown warm palette** (Limelight headers, Kalnia body font)
- **Scroll fix** — quiz panels always open at the top of the page

---

## Image system

All "AI" quiz images are SVG data URLs generated in `course-content.js` — no external assets needed. Real photos use `picsum.photos` with unique seeds per level.

| Level | AI SVG images used |
|-------|-------------------|
| Beginner | FLORA, INDOOR, AI_HARD, STREET, BEACH, BEDROOM, HALLWAY |
| Intermediate | KITCHEN, PORTRAIT, MOUNTAIN, OFFICE |
| Advanced | STADIUM, NEWSROOM (+ AI_HARD, OFFICE, PORTRAIT, KITCHEN, MOUNTAIN from prior levels in different question contexts) |

---

## What's next (backlog)

- Expand beginner + intermediate module slides (currently 3 slides each, target 5)
- Add images to module slides across all tracks
- Mobile layout polish
- Share / print certificate on course completion
