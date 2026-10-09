# Project Rules — Lab 2 Exercise 1

## Ngôn ngữ & Runtime
- Vanilla HTML5 + Modern CSS + ES6+ JavaScript
- KHÔNG framework, KHÔNG thư viện, KHÔNG CDN
- Local server: http://localhost:5500 (Live Server). file:/// BANNED.

## Quy tắc code (BANNED → MUST USE)
| BANNED | MUST USE |
| :--- | :--- |
| var / implicit global | const (default), let (chỉ khi reassign) |
| keypress / e.keyCode | keydown / e.key / e.code |
| innerHTML với user input | textContent hoặc DOM APIs (createTextNode, replaceChildren) |
| Inline event handler (onclick=, oninput=, ...) | Event Delegation tập trung |
| Array index làm key | stable unique ID (uuid) |

## Semantic HTML
- KHÔNG dùng <div> cho cấu trúc — dùng section, article, header, footer, nav, figure, main
- Exactly 1 <h1> mỗi document, không skip heading level (h1→h2→h3)

## Accessibility (WCAG 2.2 AA)
- Contrast ≥ 4.5:1
- Full keyboard Tab/Enter flow
- :focus-visible outline 3px

## Security
- Meta CSP trong <head>:
  `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; media-src 'self'">`
- KHÔNG innerHTML với user input (XSS prevention)

## Responsive
- Mobile-first: verify ở 375px trước desktop
- Zero horizontal scrollbar

## Git Workflow
- 1 task = 1 file = 1 commit
- Commit message format: type(scope): description
- Types: docs(spec), feat(html), feat(css), feat(js), feat(core), feat(state), feat(events), feat(ui), fix(a11y), fix(nav), fix(sec), perf, chore

**Rules bất biến — không thay đổi giữa chừng.**
