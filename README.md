# SIH 2026 AICTE Complaint Intelligence Platform

> **Integrated Dashboard for Monitoring and Tracking Institution-Related Complaint Cases Across AICTE Bureaus/Cells**  
> *Smart India Hackathon (SIH) 2026 Innovation Prototype – Problem Statement SIH26264*

---

## 1. Project Overview & Problem Statement

Technical institutions in India are governed across multiple bureaus within AICTE: the **Regulation Bureau (RB)**, the **Public Grievance Redressal Cell (PGRC)**, the **Approval Bureau**, **Skill Development**, **Finance Cell**, and **Regional Offices (RO)**. Without an integrated real-time tracking platform, concurrent complaints filed across different portals result in:
1. Duplicate and parallel hearings summoned by different bureaus for the same institution.
2. Contradictory orders and regulatory confusion.
3. Lack of unified institutional history and risk profiles.
4. SLA target breaches and untracked pending file ageing.

The **AICTE Complaint Intelligence Platform** solves SIH26264 by establishing a single source of truth that unites all bureaus with real-time updates, explainable multi-signal overlap detection, deterministic lead bureau guidance, and mock-safe multi-channel notifications.

---

## 2. Key Features Implemented (SIH26264 Checklist)

1. **Document Upload & Attachments**: Full `POST /api/cases/[id]/attachments` and `GET /api/cases/[id]/attachments/[attId]` support with strict type validation (`.pdf`, `.png`, `.jpg`, `.docx`, `.xlsx`) and 10MB limit enforcement. Shows attached evidence cards in case files and inside procedural history logs.
2. **Complete Search & Filters**: URL-synced multi-parameter query engine on `/cases` (Region, AICTE Permanent ID, Institution Name, Case ID, Date Range, Bureau, Status, Priority, Category, Overdue) with active filter chips and a global quick-search box in the Navbar.
3. **Mandatory Overlap Banner**: Prominently displays the exact mandated text:  
   `"Potential Overlapping Cases – Coordination Required"` with bureaus involved, case count, confidence score badge, and one-click action buttons (`Review Overlap`, `Open Coordination Group`).
4. **Monthly & Quarterly Performance Reports**: Periodic performance aggregation in `analyticsService` and `/api/reports` with period selector, Recharts trend charts, previous period comparative deltas, ageing analysis (<30d, 30-60d, 60-90d, >90d), and overlap duplicate reports.
5. **PDF & Excel Export**: Client & server-side export for Case History Sheets, Institution 360 Summaries, and Performance Reports using pure JavaScript engines (`jspdf` and `xlsx`) with full audit logging.
6. **Real-Time Updates**: Authenticated Server-Sent Events (SSE) at `/api/events`, `useLiveEvents` client hook with live status indicator, toast alerts, and automatic 15-second polling fallback.
7. **Mock-Safe Email/SMS Outbox**: Multi-channel notification delivery (`IN_APP`, `EMAIL`, `SMS`), persistent `Outbox` table, delivery audit log in Settings, per-user channel preferences, and configurable SLA policies with auto-escalation.
8. **Live Demo Simulator**: Guided 5-step problem statement flow at `/demo` (Pick institution -> Simulate PGRC complaint -> Simulate RB complaint -> Live overlap alert -> One-click Coordination Group with Recommended Lead Bureau) + Reset demo data button.
9. **Explainable Overlap & Lead Bureau Recommendation**: Score breakdown progress bars, side-by-side keyword highlighting, case timelines, plain-language reasoning, deterministic Recommended Lead Bureau, and mandatory warning: `"No parallel action until coordination is completed"`.
10. **Bulk Complaint Ingestion**: Bulk CSV/Excel file upload at `/import` with Zod validation, fuzzy institution name matching, manual match overrides, downloadable sample template, and post-ingestion overlap engine scan.
11. **Role-Based Dashboard Views**: Role-customized views for Senior Management/Viewer, RB Officers, PGRC Officers, Regional Officers, and Admins, featuring a dedicated **"My Work Queue"** widget sorted by due date.
12. **Natural-Language Search**: Rule-based parser understanding queries like `"overdue cases in southern region for RB"` or `"pending PGRC cases"`, displaying interpreted filter chips and syncing to `/cases`.
13. **Bilingual UI & Accessibility**: Navbar English / Hindi language toggle (`useI18n`), WCAG contrast, aria labels, and responsive layout for desktop, tablet, and mobile.
14. **Automated Vitest Tests & Smoke Test**: Over 40 unit and integration tests covering validation, query building, SLA escalation, NL search, reports, and RBAC, plus `scripts/smoke-test.mjs`.
15. **Production Readiness**: Multi-stage `Dockerfile`, `docker-compose.yml`, `/api/health` probe, complete documentation (`docs/ARCHITECTURE.md`, `docs/API.md`, `docs/DEMO_SCRIPT.md`), and realistic seed data (42 institutions, 260 cases over 6 months).

---

## 3. Technology Stack

- **Framework:** Next.js 14 (App Router), React 18, TypeScript (Strict Mode).
- **Styling:** Tailwind CSS with Government of India design aesthetics (`gov-navy`, Tiranga strip, clean cards).
- **Database & ORM:** SQLite via Prisma ORM (zero-config, runs completely locally in `prisma/dev.db`).
- **Data Visualization & Graphs:** Recharts for charts and `@xyflow/react` for the topological Institution Intelligence Graph.
- **Matching & AI:** Pure JavaScript tokenization, Fuse.js fuzzy string matching, TF-IDF cosine vector similarity, and deterministic local provider (zero paid APIs required).
- **Security & RBAC:** `bcryptjs` password hashing, `jose` signed JWT sessions in HTTP-only cookies, and granular permission checking.

---

## 4. Demo Login Credentials

| Role | Email / User ID | Password | Department / Bureau |
| :--- | :--- | :--- | :--- |
| **System Administrator** | `admin@aicte.gov.in` | `Admin@1234` | Central HQ / IT Cell |
| **Regulation Bureau Officer** | `rb.officer@aicte.gov.in` | `Officer@1234` | Regulation Bureau (RB) |
| **PGRC Officer** | `pgrc.officer@aicte.gov.in` | `Officer@1234` | Public Grievance Redressal (PGRC) |
| **Regional Officer** | `ro.western@aicte.gov.in` | `Officer@1234` | Western Regional Office (Mumbai) |
| **Senior Management (Viewer)**| `director@aicte.gov.in` | `Director@1234` | Member Secretary / Apex Oversight |

*Tip: The login page includes interactive one-click quick login buttons for all roles.*

---

## 5. Execution & Setup Instructions

### Local Development Setup (Quick Start)

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Initialize Database & Seed Data:**
   ```bash
   npm run db:push
   npm run db:seed
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open **http://localhost:3000** in your web browser.

4. **Run Automated Test Suite:**
   ```bash
   npm test
   ```

5. **Run Scripted End-to-End Smoke Test:**
   ```bash
   node scripts/smoke-test.mjs
   ```

6. **Start the Background SLA Automation Worker:**
   ```bash
   npm run worker
   ```

7. **Reset Database to Clean Demo State at Any Time:**
   ```bash
   npm run db:reset
   ```

---

### Docker Deployment

To spin up the web dashboard along with the background automation worker:
```bash
docker-compose up --build -d
```
Access the application at `http://localhost:3000` and inspect health at `http://localhost:3000/api/health`.

---

## 6. Documentation Directory

- **[System Architecture](docs/ARCHITECTURE.md)**: Mermaid diagrams, ER schema, overlap algorithm mathematical formulation, and API list.
- **[Integration API Guide](docs/API.md)**: REST endpoints for connecting external AICTE portals (CPGRAMS, AICTE Portal, National Scholarship Portal).
- **[3-Minute Demo Script](docs/DEMO_SCRIPT.md)**: Guided presentation script, talking points, and Q&A preparation for SIH judges.
