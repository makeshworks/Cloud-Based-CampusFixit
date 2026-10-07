# ?? CampusFixit — Campus Complaint Management System

> A cloud-ready Campus Complaint Management System built with **pure HTML/CSS/JS frontend** and designed for **AWS deployment** using CloudFormation & S3.

---

## ?? Project Structure

```
aws project/
¦
+-- frontend/                          # ???  Everything the user sees
¦   +-- index.html                     # Landing / home page
¦   +-- login.html                     # Login page (Student / Admin / Employee)
¦   +-- static/
¦   ¦   +-- css/style.css              # Global stylesheet for all pages
¦   ¦   +-- js/main.js                 # All UI logic & mock data (Phase 1)
¦   +-- templates/
¦       +-- student/
¦       ¦   +-- dashboard.html         # Student home dashboard
¦       ¦   +-- submit.html            # Submit a new complaint
¦       ¦   +-- history.html           # Complaint history & feedback
¦       +-- admin/
¦       ¦   +-- dashboard.html         # Admin stats & overview
¦       ¦   +-- complaints.html        # Manage & assign complaints
¦       +-- employee/
¦           +-- dashboard.html         # Employee task list & updates
¦
+-- backend/                           # ??  Server & infrastructure
¦   +-- infrastructure/
¦   ¦   +-- campusfixit-template.yaml  # AWS CloudFormation IaC template
¦   +-- scripts/
¦   ¦   +-- e2e-demo.js                # Automated end-to-end browser demo
¦   +-- campusfixit-key.pem            # ?? EC2 SSH key (NEVER commit this!)
¦   +-- summary.txt                    # System health snapshot (JSON)
¦
+-- README.md
+-- .gitignore
```

---

## ?? Frontend vs Backend — What Goes Where

### ??? FRONTEND (`frontend/`)

| File / Folder | What it does |
|---|---|
| `index.html` | Landing page — hero, role cards, how-it-works |
| `login.html` | Login page with tabs for all three roles |
| `templates/student/` | Student dashboard, submit & history pages |
| `templates/admin/` | Admin dashboard + complaint assignment panel |
| `templates/employee/` | Employee task list, start/update/resolve |
| `static/css/style.css` | All CSS — layout, colors, cards, animations |
| `static/js/main.js` | All logic — login, forms, mock data, modals |

> ?? **Phase 1:** `main.js` acts as both frontend + mock backend using browser `sessionStorage`.
> **Phase 2:** A real Flask/Python API will replace the mock data layer.

---

### ?? BACKEND (`backend/`)

| File / Folder | What it does |
|---|---|
| `infrastructure/campusfixit-template.yaml` | CloudFormation — provisions private S3 archive bucket |
| `scripts/e2e-demo.js` | Automated full browser walkthrough via Chrome DevTools Protocol |
| `campusfixit-key.pem` | SSH key for EC2 access **(PRIVATE — never push!)** |
| `summary.txt` | JSON health snapshot (total/resolved/pending) |

#### Planned backend (Phase 2)
```
backend/
  +-- app.py           ? Flask entry point
  +-- routes/          ? REST API endpoints
  +-- models/          ? Database models (RDS / DynamoDB)
```

---

## ? Features

- ?? **Student Portal** — Submit, track & give feedback on complaints
- ??? **Admin Panel** — Assign complaints to staff with priority levels
- ?? **Employee Dashboard** — Update progress, resolve assigned tasks
- ?? **Analytics** — Live stats on admin dashboard
- ?? **Toast Notifications** — Real-time feedback on every action
- ?? **Responsive Design** — Works on desktop, tablet & mobile

---

## ?? User Roles

| Role | Access |
|---|---|
| **Student** | Submit complaints, view history, track status, give feedback |
| **Admin** | View all complaints, assign to employees, set priority & notes |
| **Employee** | View assigned tasks, update status & progress, resolve complaints |

---

## ??? Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3 (Vanilla), JavaScript (ES6+) |
| **Data (Phase 1)** | Browser `sessionStorage` with mock JSON |
| **Backend (Phase 2)** | Python / Flask *(planned)* |
| **Database (Phase 2)** | AWS RDS / DynamoDB *(planned)* |
| **Cloud** | AWS (EC2, S3, CloudFormation) |
| **IaC** | AWS CloudFormation (YAML) |
| **Testing** | Custom E2E via Chrome DevTools Protocol |

---

## ?? AWS Infrastructure

Deploy the CloudFormation stack:

```bash
aws cloudformation deploy \
  --template-file backend/infrastructure/campusfixit-template.yaml \
  --stack-name CampusFixit \
  --region ap-south-1
```

---

## ?? Getting Started (Local)

```bash
# Option 1 – Python dev server (recommended)
python -m http.server 8000 --directory frontend
# Then open: http://127.0.0.1:8000

# Option 2 – Open directly
start frontend\index.html
```

---

## ?? Demo Credentials

| Role | Email | Password |
|---|---|---|
| **Student** | `arjun@campus.edu` | `student123` |
| **Student 2** | `priya@campus.edu` | `student123` |
| **Admin** | `admin@campus.edu` | `admin123` |
| **Employee (Electrical)** | `ramesh@campus.edu` | `emp123` |
| **Employee (Plumbing)** | `suresh@campus.edu` | `emp123` |
| **Employee (Wi-Fi / IT)** | `vikram@campus.edu` | `emp123` |

---

## ?? E2E Demo Script

Runs a full automated walkthrough: student submits ? admin assigns ? employee resolves ? student rates.

```bash
# 1. Start the app
python -m http.server 8000 --directory frontend

# 2. Open Chrome with remote debugging
chrome --remote-debugging-port=9222 --user-data-dir=tmp-chrome http://127.0.0.1:8000

# 3. Run the demo
node backend/scripts/e2e-demo.js
```

---

## ?? Security

> **NEVER commit `campusfixit-key.pem` to a public repo!** It is already listed in `.gitignore`.

```gitignore
campusfixit-key.pem
*.pem
summary.txt
```

---

## ?? Contributing

1. Fork the repo
2. `git checkout -b feature/your-feature`
3. `git commit -m "Add feature"`
4. `git push origin feature/your-feature`
5. Open a Pull Request

---

<div align="center">
  <strong>Built with ?? for Campus Communities</strong><br/>
  <em>CampusFixit — Report Issues. Get Them Fixed Fast.</em>
</div>
