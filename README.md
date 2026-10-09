# CampusFixit - Campus Complaint Management System

> A smart, role-based complaint management platform built for campus communities.
> Submit issues, track progress, and get them resolved — fast.

---

## Features

- **Student Portal** — Submit complaints, track status & give feedback
- **Admin Panel** — Assign complaints to staff with priority levels
- **Employee Dashboard** — Update progress & resolve assigned tasks
- **Analytics** — Live stats on the admin dashboard
- **Toast Notifications** — Real-time feedback on every action
- **Responsive Design** — Works on desktop, tablet & mobile

---

## User Roles

| Role               | Access                                                            |
| ------------------ | ----------------------------------------------------------------- |
| **Student**  | Submit complaints, view history, track status, give feedback      |
| **Admin**    | View all complaints, assign to employees, set priority & notes    |
| **Employee** | View assigned tasks, update status & progress, resolve complaints |

---

## Project Structure

```
aws project/
|
|-- frontend/                    # Everything the user sees
|   |-- index.html               # Landing / home page
|   |-- login.html               # Login page (Student / Admin / Employee)
|   |-- static/
|   |   |-- css/style.css        # Global stylesheet
|   |   |-- js/main.js           # UI logic
|   |-- templates/
|       |-- student/             # Student pages
|       |-- admin/               # Admin pages
|       |-- employee/            # Employee pages
|
|-- README.md
|-- .gitignore
```

---

## Tech Stack

| Layer              | Technology                               |
| ------------------ | ---------------------------------------- |
| **Frontend** | HTML5, CSS3 (Vanilla), JavaScript (ES6+) |
| **Cloud**    | AWS (S3, EC2, CloudFormation)            |
| **Data**     | Browser sessionStorage (Phase 1)         |
| **Backend**  | Python / Flask (Phase 2 - planned)       |
| **Database** | AWS RDS / DynamoDB (Phase 2 - planned)   |

---

## Getting Started (Local)

```bash
# Option 1 - Python dev server (recommended)
python -m http.server 8000 --directory frontend
# Then open: http://127.0.0.1:8000

# Option 2 - Open directly
start frontend\index.html
```

---

## How It Works

```
Student submits complaint
        |
        v
Admin reviews & assigns to Employee
        |
        v
Employee updates progress & resolves
        |
        v
Student gives feedback
```

---

## Contributing

1. Fork the repo
2. git checkout -b feature/your-feature
3. git commit -m "Add feature"
4. git push origin feature/your-feature
5. Open a Pull Request

---

Built with care for Campus Communities
CampusFixit - Report Issues. Get Them Fixed Fast.
