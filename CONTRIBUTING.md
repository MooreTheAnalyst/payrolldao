# Contributing to PayrollDAO

Thanks for your interest in contributing to PayrollDAO. This is an early-stage open-source project and we welcome contributions of all kinds — code, design, documentation, testing, and ideas.

---

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/payrolldao.git
   cd payrolldao
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
5. **Start the dev server:**
   ```bash
   npm run dev
   ```

---

## How to Contribute

### Reporting Bugs

Open an issue with:
- A clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if relevant

### Suggesting Features

Open an issue with the `enhancement` label. Describe:
- The problem you're solving
- Your proposed solution
- Any alternatives you considered

### Submitting Code

1. Create a branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. Make your changes
3. Run the build to check for errors:
   ```bash
   npm run build
   ```
4. Commit with a clear message:
   ```bash
   git commit -m "add worker export to CSV"
   ```
5. Push and open a pull request against `main`

---

## Code Guidelines

- **TypeScript** — all new code must be typed
- **Components** — keep components focused and reusable
- **Naming** — use descriptive names; avoid abbreviations
- **Comments** — add comments for non-obvious logic
- **No lorem ipsum** — use realistic placeholder data
- **Accessibility** — use semantic HTML and ARIA labels where needed

### File structure conventions

```
src/components/ui/          # Generic, reusable UI primitives
src/components/[feature]/   # Feature-specific components
src/app/(app)/[page]/       # Dashboard pages
src/lib/stellar/            # Stellar SDK utilities
src/stores/                 # Zustand state
src/types/                  # Shared TypeScript types
```

---

## Good First Issues

Look for issues labeled `good first issue` on GitHub. These are well-scoped tasks suitable for new contributors.

Some areas where contributions are especially welcome:

- **Database integration** — connect API routes to Prisma/PostgreSQL
- **Real Stellar transactions** — wire up the payment flow end-to-end
- **Worker CSV import** — bulk add workers from a spreadsheet
- **Email notifications** — notify workers when they're paid
- **Mobile sidebar** — responsive sidebar for small screens
- **Tests** — unit and integration tests
- **Docs** — improve setup guides and API docs

---

## Questions?

Open a [GitHub Discussion](https://github.com/payrolldao/payrolldao/discussions) or file an issue. We're happy to help.
