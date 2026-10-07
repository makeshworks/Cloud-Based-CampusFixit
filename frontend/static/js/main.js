/**
 * CAMPUS COMPLAINT MANAGEMENT SYSTEM — MAIN JAVASCRIPT
 * Phase 1: Static Frontend with mock data
 *
 * What this file does:
 * - Provides utility functions used across all pages
 * - Handles the mock login flow (no real backend yet)
 * - Handles complaint submission form (mock, saves to browser memory)
 * - Shows toast notifications
 * - Handles modals
 * - Manages the sidebar on mobile
 * - Generates mock complaint IDs
 *
 * In Phase 2, we will replace mock data with real API calls to Flask.
 */

'use strict';

/* ============================================================
/* ============================================================
   SECTION 1: MOCK DATA
   This simulates what would normally come from a database.
   ============================================================ */

const MOCK_DATA = {
  // Demo users
  users: [
    { id: 1, name: 'Arjun Sharma',   email: 'arjun@campus.edu',   password: 'student123', role: 'student',  rollNo: 'CS2024001' },
    { id: 2, name: 'Priya Singh',    email: 'priya@campus.edu',   password: 'student123', role: 'student',  rollNo: 'CS2024002' },
    { id: 3, name: 'Admin Kumar',    email: 'admin@campus.edu',   password: 'admin123',   role: 'admin',    department: 'Maintenance Dept.' },
    { id: 4, name: 'Ramesh Patel',   email: 'ramesh@campus.edu',  password: 'emp123',     role: 'employee', department: 'Electrical' },
    { id: 5, name: 'Suresh Kumar',   email: 'suresh@campus.edu',  password: 'emp123',     role: 'employee', department: 'Plumbing' },
    { id: 6, name: 'Vikram Rao',     email: 'vikram@campus.edu',  password: 'emp123',     role: 'employee', department: 'Wi-Fi / IT Support' },
  ],

  // Sample complaints with view tracking, progress percent, and assignment metadata
  complaints: [
    {
      id: 'CMP-2024-0001',
      studentId: 1,
      studentName: 'Arjun Sharma',
      category: 'Electrical',
      location: 'Block A - Room 201',
      description: 'The ceiling fan in Room 201 is making loud noise and wobbling. It may fall soon.',
      priority: 'High',
      status: 'In Progress',
      progressPercent: 50,
      assignedTo: 'Ramesh Patel',
      assignedBy: 'Admin Kumar',
      isTriggered: true,
      submittedAt: '2024-10-01 09:15',
      updatedAt:   '2024-10-02 14:30',
      completedAt: null,
      isArchived: false,
      views: {
        admin: true,
        employee: true,
        viewers: ['Admin Kumar', 'Ramesh Patel']
      },
      image: null,
      updates: [
        { date: '2024-10-01 09:15', status: 'Submitted',    note: 'Complaint submitted by student.',          by: 'System' },
        { date: '2024-10-01 11:00', status: 'Under Review', note: 'Admin received and reviewing complaint.',  by: 'Admin Kumar' },
        { date: '2024-10-01 15:00', status: 'Assigned',     note: 'Admin assigned to Ramesh Patel (Electrical). Marked as Triggered Problem.',  by: 'Admin Kumar' },
        { date: '2024-10-02 10:00', status: 'In Progress',  note: 'Half work done (50%): Technician on site, parts being replaced.', by: 'Ramesh Patel' },
      ]
    },
    {
      id: 'CMP-2024-0002',
      studentId: 1,
      studentName: 'Arjun Sharma',
      category: 'Wi-Fi / Network',
      location: 'Library - Ground Floor',
      description: 'Wi-Fi is extremely slow in the library. Cannot load basic websites. Happening since 3 days.',
      priority: 'Medium',
      status: 'Resolved',
      progressPercent: 100,
      assignedTo: 'Suresh Kumar',
      assignedBy: 'Admin Kumar',
      isTriggered: false,
      submittedAt: '2024-09-28 16:00',
      updatedAt:   '2024-09-30 12:00',
      completedAt: '2024-09-30 12:00',
      isArchived: true,
      views: {
        admin: true,
        employee: true,
        viewers: ['Admin Kumar', 'Suresh Kumar']
      },
      image: null,
      feedback: { rating: 4, comment: 'Fixed quickly. Good work.' },
      updates: [
        { date: '2024-09-28 16:00', status: 'Submitted',    note: 'Complaint submitted.',                          by: 'System' },
        { date: '2024-09-29 09:00', status: 'Under Review', note: 'Reviewed by admin.',                           by: 'Admin Kumar' },
        { date: '2024-09-29 11:00', status: 'Assigned',     note: 'Admin assigned to Suresh Kumar (IT team).',   by: 'Admin Kumar' },
        { date: '2024-09-29 14:00', status: 'In Progress',  note: 'Work started (50%): Router configuration identified.', by: 'Suresh Kumar' },
        { date: '2024-09-30 12:00', status: 'Resolved',     note: 'Work completed (100%): Router reconfigured. Speed restored to normal.', by: 'Suresh Kumar' },
      ]
    },
    {
      id: 'CMP-2024-0003',
      studentId: 2,
      studentName: 'Priya Singh',
      category: 'Plumbing',
      location: 'Girls Hostel - Block C',
      description: 'Water is leaking from the bathroom ceiling. The floor is wet and slippery.',
      priority: 'Urgent',
      status: 'Submitted',
      progressPercent: 0,
      assignedTo: null,
      assignedBy: null,
      isTriggered: false,
      submittedAt: '2024-10-03 08:00',
      updatedAt:   '2024-10-03 08:00',
      completedAt: null,
      isArchived: false,
      views: {
        admin: false,
        employee: false,
        viewers: []
      },
      image: null,
      updates: [
        { date: '2024-10-03 08:00', status: 'Submitted', note: 'Complaint submitted by student. Transmitted to Admin & Staff.', by: 'System' },
      ]
    },
    {
      id: 'CMP-2024-0004',
      studentId: 2,
      studentName: 'Priya Singh',
      category: 'Furniture',
      location: 'Classroom 105 - Block B',
      description: 'Three chairs have broken legs in classroom 105. Students cannot sit properly.',
      priority: 'Low',
      status: 'Assigned',
      progressPercent: 25,
      assignedTo: 'Ramesh Patel',
      assignedBy: 'Admin Kumar',
      isTriggered: false,
      submittedAt: '2024-10-02 12:00',
      updatedAt:   '2024-10-03 09:00',
      completedAt: null,
      isArchived: false,
      views: {
        admin: true,
        employee: false,
        viewers: ['Admin Kumar']
      },
      image: null,
      updates: [
        { date: '2024-10-02 12:00', status: 'Submitted',    note: 'Complaint submitted.',          by: 'System' },
        { date: '2024-10-02 15:00', status: 'Under Review', note: 'Admin reviewing complaint.',    by: 'Admin Kumar' },
        { date: '2024-10-03 09:00', status: 'Assigned',     note: 'Admin assigned to Ramesh Patel.', by: 'Admin Kumar' },
      ]
    },
  ],

  // Complaint categories
  categories: [
    { value: 'electrical',    label: '💡 Electrical (Lights, Fans, Sockets)',       icon: '💡' },
    { value: 'wifi',          label: '📶 Wi-Fi / Network',                           icon: '📶' },
    { value: 'plumbing',      label: '🚿 Plumbing (Water, Leakage, Taps)',           icon: '🚿' },
    { value: 'furniture',     label: '🪑 Furniture (Chairs, Tables, Boards)',        icon: '🪑' },
    { value: 'cleaning',      label: '🧹 Cleaning / Hygiene',                        icon: '🧹' },
    { value: 'classroom',     label: '🏫 Classroom / Lab Equipment',                 icon: '🏫' },
    { value: 'hostel',        label: '🏠 Hostel Issue',                              icon: '🏠' },
    { value: 'ac_ventilation',label: '❄️ AC / Ventilation',                          icon: '❄️' },
    { value: 'safety',        label: '⚠️ Safety / Security Concern',                 icon: '⚠️' },
    { value: 'other',         label: '📝 Other Maintenance',                         icon: '📝' },
  ],

  // Campus locations
  locations: [
    'Block A - Ground Floor', 'Block A - Floor 1', 'Block A - Floor 2',
    'Block B - Ground Floor', 'Block B - Floor 1', 'Block B - Floor 2',
    'Block C - Ground Floor', 'Block C - Floor 1',
    'Library - Ground Floor', 'Library - Floor 1',
    'Lab 1 (Computer)', 'Lab 2 (Electronics)', 'Lab 3 (Physics)', 'Lab 4 (Chemistry)',
    'Boys Hostel - Block A', 'Boys Hostel - Block B',
    'Girls Hostel - Block C', 'Girls Hostel - Block D',
    'Cafeteria', 'Sports Ground', 'Auditorium', 'Seminar Hall',
    'Admin Block', 'Parking Area', 'Other'
  ]
};

/* ============================================================
   AUTO-CLASSIFICATION ROUTING MAP
   Maps each complaint category → the responsible staff member.
   When a student submits, the system reads this map and
   auto-assigns the complaint immediately — no admin action needed.
   Admin can always override and re-assign.
   ============================================================ */

const CATEGORY_ROUTING = [
  {
    categories:  ['electrical', 'ac_ventilation'],
    staff:       'Ramesh Patel',
    department:  'Electrical & AC',
    icon:        '⚡',
    color:       '#f0883e',
    description: 'Lights, fans, sockets, AC, electrical faults'
  },
  {
    categories:  ['plumbing', 'cleaning', 'hostel'],
    staff:       'Suresh Kumar',
    department:  'Plumbing & Sanitation',
    icon:        '🚿',
    color:       '#58a6ff',
    description: 'Water, leakage, taps, cleaning, hostel upkeep'
  },
  {
    categories:  ['wifi', 'classroom'],
    staff:       'Suresh Kumar',
    department:  'IT & Infrastructure',
    icon:        '📶',
    color:       '#bc8cff',
    description: 'Wi-Fi, network, projectors, lab equipment'
  },
  {
    categories:  ['furniture', 'safety', 'other'],
    staff:       'Ramesh Patel',
    department:  'General Maintenance',
    icon:        '🔧',
    color:       '#d29922',
    description: 'Furniture, safety concerns, general repairs'
  },
];

/**
 * Lookup: given a category value string, return the matched routing entry.
 * e.g. 'electrical' → { staff: 'Ramesh Patel', department: 'Electrical & AC', ... }
 */
function getRouteForCategory(categoryValue) {
  if (!categoryValue) return null;
  const lower = categoryValue.toLowerCase().replace(/[^a-z_]/g, '');
  return CATEGORY_ROUTING.find(r => r.categories.some(c => lower.includes(c))) || null;
}

/* ============================================================
   SECTION 1.5: THEME MANAGER (Light & Dark Mode)
   Supports instant toggling, contrast preservation, icon animation,
   and cross-page persistence via localStorage.
   ============================================================ */

const ThemeManager = {
  KEY: 'campusfixit_theme',

  init() {
    const saved = this.getSavedTheme();
    this.apply(saved);
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.updateUI(saved);
        this.ensureToggleExists();
      });
    } else {
      this.updateUI(saved);
      this.ensureToggleExists();
    }
  },

  getSavedTheme() {
    return localStorage.getItem(this.KEY) || 'light';
  },

  getCurrent() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  },

  apply(theme) {
    const validTheme = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', validTheme);
    if (document.body) {
      document.body.setAttribute('data-theme', validTheme);
    }
  },

  toggle() {
    const current = this.getCurrent();
    const next = current === 'dark' ? 'light' : 'dark';
    this.apply(next);
    localStorage.setItem(this.KEY, next);
    this.updateUI(next);
    if (typeof showToast === 'function') {
      showToast(`${next === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'} enabled`, 'info', 2000);
    }
  },

  updateUI(theme) {
    const isDark = theme === 'dark';
    const toggles = document.querySelectorAll('.theme-toggle, .theme-toggle-btn');
    toggles.forEach(btn => {
      btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      btn.setAttribute('title', isDark ? 'Switch to Light Mode (☀️)' : 'Switch to Dark Mode (🌙)');
      const label = btn.querySelector('.theme-label, .theme-toggle-label, #theme-toggle-label, #theme-label-text');
      if (label) {
        label.textContent = isDark ? 'Dark' : 'Light';
      }
    });
  },

  renderToggleHtml() {
    const isDark = this.getCurrent() === 'dark';
    return `
      <button class="theme-toggle" id="theme-toggle-btn" onclick="ThemeManager.toggle()" type="button"
              title="${isDark ? 'Switch to Light Mode (☀️)' : 'Switch to Dark Mode (🌙)'}"
              aria-label="${isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}">
        <span class="theme-icon sun-icon" aria-hidden="true">☀️</span>
        <span class="theme-toggle-pill" aria-hidden="true">
          <span class="theme-toggle-thumb"></span>
        </span>
        <span class="theme-icon moon-icon" aria-hidden="true">🌙</span>
        <span class="theme-label" id="theme-label-text">${isDark ? 'Dark' : 'Light'}</span>
      </button>
    `.trim();
  },

  ensureToggleExists() {
    if (document.querySelector('.theme-toggle, .theme-toggle-btn, #theme-toggle-btn')) {
      return;
    }
    // Check for navbar-nav
    const navNav = document.querySelector('.navbar-nav');
    if (navNav) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = this.renderToggleHtml();
      navNav.prepend(wrapper.firstElementChild);
      this.updateUI(this.getCurrent());
      return;
    }
    // Auth page or standalone page without navbar
    if (document.body) {
      const floatDiv = document.createElement('div');
      floatDiv.id = 'theme-toggle-floating-container';
      floatDiv.style.cssText = 'position:fixed; top:var(--space-4); right:var(--space-6); z-index:1001;';
      floatDiv.innerHTML = this.renderToggleHtml();
      document.body.appendChild(floatDiv);
      this.updateUI(this.getCurrent());
    }
  }
};

// Immediately apply saved theme as early as possible
ThemeManager.init();

const UserManager = {
  getAllUsers() {
    try {
      const custom = JSON.parse(localStorage.getItem('campusfixit_custom_users') || '[]');
      return [...MOCK_DATA.users, ...custom];
    } catch (e) {
      return MOCK_DATA.users;
    }
  },
  registerUser(userData) {
    const users = this.getAllUsers();
    if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase() && u.role === userData.role)) {
      return { success: false, message: 'An account with this email already exists for this role.' };
    }
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role || 'student',
      rollNo: userData.rollNo || ('STU' + Math.floor(1000 + Math.random() * 9000)),
      department: userData.department || (userData.role === 'student' ? 'General' : 'Maintenance')
    };
    try {
      const custom = JSON.parse(localStorage.getItem('campusfixit_custom_users') || '[]');
      custom.push(newUser);
      localStorage.setItem('campusfixit_custom_users', JSON.stringify(custom));
    } catch (e) {
      console.error('Error saving user to localStorage:', e);
    }
    return { success: true, user: newUser };
  }
};

const Session = {
  /** Save user to session */
  login(user) {
    const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role, rollNo: user.rollNo, department: user.department };
    localStorage.setItem('currentUser', JSON.stringify(safeUser));
    sessionStorage.setItem('currentUser', JSON.stringify(safeUser));
  },

  /** Get the currently logged-in user */
  getUser() {
    const data = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    return data ? JSON.parse(data) : null;
  },

  /** Check if anyone is logged in */
  isLoggedIn() {
    return this.getUser() !== null;
  },

  /** Log out */
  logout() {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    const prefix = depth <= 1 ? '' : '../'.repeat(depth - 1);
    window.location.href = prefix + 'index.html';
  },

  /** Guard function */
  guard(requiredRole) {
    const user = this.getUser();
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    const prefix = depth <= 1 ? '' : '../'.repeat(depth - 1);
    if (!user) {
      window.location.href = prefix + 'login.html';
      return null;
    }
    if (requiredRole && user.role !== requiredRole) {
      const dashboards = {
        student:  prefix + 'app/templates/student/dashboard.html',
        admin:    prefix + 'app/templates/admin/dashboard.html',
        employee: prefix + 'app/templates/employee/dashboard.html',
      };
      window.location.href = dashboards[user.role] || prefix + 'login.html';
      return null;
    }
    return user;
  }
};

/* ============================================================
   SECTION 2.5: TOP-RIGHT POPUP NOTIFICATION SYSTEM
   ============================================================ */

const Notifications = {
  getAll() {
    const data = localStorage.getItem('campus_notifications');
    return data ? JSON.parse(data) : [];
  },

  save(list) {
    localStorage.setItem('campus_notifications', JSON.stringify(list));
  },

  /**
   * Queue a notification
   * @param {Object} opts { targetRole, targetUser, studentId, title, message, type: 'urgent'|'success'|'info', complaintId }
   */
  send(opts) {
    const all = this.getAll();
    const notif = {
      id: 'NTF-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      targetRole: opts.targetRole || 'all',
      targetUser: opts.targetUser || null,
      studentId:  opts.studentId || null,
      title:      opts.title,
      message:    opts.message,
      type:       opts.type || 'info',
      complaintId: opts.complaintId || null,
      date:       formatDateTime(new Date()),
      readBy:     [] // IDs of users who have dismissed/seen this
    };
    all.push(notif);
    this.save(all);
    // Trigger storage event manually for same-window listeners
    window.dispatchEvent(new CustomEvent('campus_notification_added', { detail: notif }));
    return notif;
  },

  /** Check for unread notifications targeted to the logged-in user */
  getUnreadFor(user) {
    if (!user) return [];
    const all = this.getAll();
    return all.filter(n => {
      if (n.readBy && n.readBy.includes(user.id)) return false;
      if (n.targetRole && n.targetRole !== 'all' && n.targetRole !== user.role) return false;
      if (n.targetUser && n.targetUser !== user.name) return false;
      if (n.studentId && n.studentId !== user.id) return false;
      return true;
    });
  },

  /** Mark notification as read by user */
  markRead(notifId, userId) {
    const all = this.getAll();
    const n = all.find(item => item.id === notifId);
    if (n) {
      if (!n.readBy) n.readBy = [];
      if (!n.readBy.includes(userId)) n.readBy.push(userId);
      this.save(all);
    }
  },

  /** Render top-right corner popup */
  showPopup(notif, userId) {
    let container = document.querySelector('.corner-popup-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'corner-popup-container';
      document.body.appendChild(container);
    }

    const popup = document.createElement('div');
    popup.className = `corner-popup corner-popup-${notif.type}`;
    popup.id = `popup-${notif.id}`;

    const icons = {
      urgent:  '🚨',
      success: '✅',
      info:    '🔔',
    };

    popup.innerHTML = `
      <span class="corner-popup-icon">${icons[notif.type] || '🔔'}</span>
      <div class="corner-popup-content">
        <div class="corner-popup-title">${escapeHtml(notif.title)}</div>
        <div class="corner-popup-message">${escapeHtml(notif.message)}</div>
        <div class="corner-popup-meta">Just now ${notif.complaintId ? `• <strong>${escapeHtml(notif.complaintId)}</strong>` : ''}</div>
      </div>
      <button class="corner-popup-close" title="Dismiss">✕</button>
    `;

    const closeBtn = popup.querySelector('.corner-popup-close');
    const dismiss = () => {
      popup.classList.add('closing');
      setTimeout(() => {
        popup.remove();
        if (userId) Notifications.markRead(notif.id, userId);
      }, 300);
    };

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dismiss();
    });

    container.appendChild(popup);

    // Auto dismiss after 7 seconds
    setTimeout(() => {
      if (document.body.contains(popup)) {
        dismiss();
      }
    }, 7500);
  },

  /** Check unread notifications and pop them up on screen */
  checkAndDisplay(user) {
    if (!user) return;
    const unread = this.getUnreadFor(user);
    unread.slice(0, 3).forEach((notif, index) => {
      setTimeout(() => {
        this.showPopup(notif, user.id);
      }, index * 600);
    });
  }
};

/* ============================================================
   SECTION 3: COMPLAINT HELPERS
   ============================================================ */

const Complaints = {
  generateId() {
    const year = new Date().getFullYear();
    const existing = this.getAll();
    const nextNum = existing.length + 1;
    return `CMP-${year}-${String(nextNum).padStart(4, '0')}`;
  },

  /** Get all complaints from localStorage */
  getAll() {
    const stored = localStorage.getItem('complaints') || sessionStorage.getItem('complaints');
    if (!stored) {
      this.save(MOCK_DATA.complaints);
      return [...MOCK_DATA.complaints];
    }
    return JSON.parse(stored);
  },

  /** Save complaints back */
  save(complaints) {
    localStorage.setItem('complaints', JSON.stringify(complaints));
    sessionStorage.setItem('complaints', JSON.stringify(complaints));
  },

  /** Initialize complaints in storage */
  init() {
    if (!localStorage.getItem('complaints')) {
      this.save(MOCK_DATA.complaints);
    }
  },

  getByStudent(studentId) {
    return this.getAll().filter(c => c.studentId === studentId);
  },

  getByEmployee(employeeName) {
    return this.getAll().filter(c => c.assignedTo === employeeName);
  },

  getById(id) {
    return this.getAll().find(c => c.id === id) || null;
  },

  /** Mark complaint as viewed by Admin or Employee */
  markViewed(id, role, userName) {
    const all = this.getAll();
    const c = all.find(item => item.id === id);
    if (!c) return null;

    if (!c.views) {
      c.views = { admin: false, employee: false, viewers: [] };
    }
    if (!c.views.viewers) c.views.viewers = [];

    let updated = false;
    if (role === 'admin' && !c.views.admin) {
      c.views.admin = true;
      updated = true;
    } else if (role === 'employee' && !c.views.employee) {
      c.views.employee = true;
      updated = true;
    }

    if (userName && !c.views.viewers.includes(userName)) {
      c.views.viewers.push(userName);
      updated = true;
    }

    if (updated) {
      this.save(all);
    }
    return c;
  },

  /** Get view dot state: 'both' | 'admin' | 'employee' | 'none' */
  getViewStatus(c) {
    if (!c.views) return 'none';
    if (c.views.admin && c.views.employee) return 'both';
    if (c.views.admin) return 'admin';
    if (c.views.employee) return 'employee';
    return 'none';
  },

  /** Render Who Viewed dot indicator */
  renderViewDot(c) {
    const status = this.getViewStatus(c);
    const viewersList = c.views?.viewers?.length ? c.views.viewers.join(', ') : 'None yet';

    if (status === 'both') {
      return `
        <span class="view-indicator" title="Viewed by both Admin and Staff: ${escapeHtml(viewersList)}">
          <span class="view-dot view-dot-both pulse"></span>
          <span>Both Viewed</span>
        </span>
      `;
    }
    if (status === 'admin') {
      return `
        <span class="view-indicator" title="Viewed by Admin only: ${escapeHtml(viewersList)}">
          <span class="view-dot view-dot-admin pulse"></span>
          <span>Admin Viewed</span>
        </span>
      `;
    }
    if (status === 'employee') {
      return `
        <span class="view-indicator" title="Viewed by Staff only: ${escapeHtml(viewersList)}">
          <span class="view-dot view-dot-employee pulse"></span>
          <span>Staff Viewed</span>
        </span>
      `;
    }
    return `
      <span class="view-indicator" title="Not viewed yet">
        <span class="view-dot view-dot-none"></span>
        <span style="color: var(--text-tertiary);">Unread</span>
      </span>
    `;
  },

  /**
   * Add a new complaint with SMART AUTO-CLASSIFICATION ROUTING.
   * The category is matched against CATEGORY_ROUTING and the complaint
   * is immediately auto-assigned to the responsible staff — no admin click needed.
   */
  add(complaintData) {
    const all = this.getAll();
    const newId = this.generateId();
    const now = formatDateTime(new Date());

    // ── AUTO-CLASSIFY: find the right staff for this category ──
    const route = getRouteForCategory(complaintData.category);
    const autoAssignedTo   = route ? route.staff : null;
    const autoAssignedDept = route ? route.department : 'General Maintenance';
    const autoStatus       = route ? 'Assigned' : 'Submitted';
    const autoProgress     = route ? 15 : 0;

    const updates = [
      {
        date:   now,
        status: 'Submitted',
        note:   'Complaint submitted by student. Broadcasted to Admin & Campus Maintenance Staff.',
        by:     'System'
      }
    ];

    if (route) {
      updates.push({
        date:     now,
        status:   'Assigned',
        progress: autoProgress,
        note:     `🤖 Auto-Classified: "${complaintData.category}" → routed to ${route.staff} (${autoAssignedDept}). Staff has been alerted.`,
        by:       'System (Auto-Routing)'
      });
    }

    const newComplaint = {
      id:              newId,
      studentId:       complaintData.studentId,
      studentName:     complaintData.studentName,
      category:        complaintData.category,
      location:        complaintData.location,
      description:     complaintData.description,
      priority:        complaintData.priority || 'Medium',
      status:          autoStatus,
      progressPercent: autoProgress,
      assignedTo:      autoAssignedTo,
      assignedBy:      'System (Auto-Routing)',
      assignedDept:    autoAssignedDept,
      isAutoAssigned:  !!route,
      isTriggered:     false,
      submittedAt:     now,
      updatedAt:       now,
      completedAt:     null,
      isArchived:      false,
      image:           complaintData.image || null,
      views: {
        admin: false,
        employee: false,
        viewers: []
      },
      updates
    };

    all.push(newComplaint);
    this.save(all);

    // ── NOTIFICATIONS ──

    // Notify Admin: new complaint auto-routed
    Notifications.send({
      targetRole:  'admin',
      title:       route ? `🤖 Auto-Routed: ${complaintData.category}` : '📢 New Complaint Raised!',
      message:     route
        ? `${complaintData.studentName}'s complaint auto-assigned to ${route.staff} (${autoAssignedDept}). No manual action needed.`
        : `${complaintData.studentName} reported ${complaintData.category} at ${complaintData.location}. Assign manually.`,
      type:        'info',
      complaintId: newId
    });

    if (route) {
      // Direct urgent notification to the auto-assigned staff member!
      Notifications.send({
        targetRole:  'employee',
        targetUser:  route.staff,
        title:       `${route.icon} New Task Auto-Assigned to You`,
        message:     `Category: ${complaintData.category} • Location: ${complaintData.location} • Reported by ${complaintData.studentName}. Please inspect & update progress.`,
        type:        'urgent',
        complaintId: newId
      });
    } else {
      // Fallback: broadcast to all employees if no route matched
      Notifications.send({
        targetRole:  'employee',
        title:       '📢 New Campus Complaint Available',
        message:     `New ${complaintData.category} issue at ${complaintData.location}. Check complaints pool.`,
        type:        'info',
        complaintId: newId
      });
    }

    return newComplaint;
  },

  /** Get the routing info for a complaint (for display purposes) */
  getRoute(complaint) {
    return getRouteForCategory(complaint.category);
  },

  /** Update work progress & status (e.g. half work done, completed, etc.) */
  updateProgress(id, percent, note, updatedBy) {
    const all = this.getAll();
    const idx = all.findIndex(c => c.id === id);
    if (idx === -1) return null;

    const c = all[idx];
    c.progressPercent = parseInt(percent, 10);
    c.updatedAt = formatDateTime(new Date());

    let statusText = c.status;
    let notifType = 'info';

    if (c.progressPercent >= 100) {
      statusText = 'Resolved';
      c.status = 'Resolved';
      c.completedAt = formatDateTime(new Date());
      notifType = 'success';
    } else if (c.progressPercent > 0) {
      statusText = 'In Progress';
      c.status = 'In Progress';
    }

    c.updates.push({
      date:     formatDateTime(new Date()),
      status:   statusText,
      progress: c.progressPercent,
      note:     note || `Progress updated to ${c.progressPercent}% (${statusText}).`,
      by:       updatedBy || 'Staff'
    });

    this.save(all);

    // Send notifications to Student and Admin
    if (c.progressPercent >= 100) {
      Notifications.send({
        targetRole: 'student',
        studentId: c.studentId,
        title: '🎉 Complaint Completed & Resolved!',
        message: `Your complaint ${c.id} (${c.category}) is completed by ${updatedBy}. Check and rate the work!`,
        type: 'success',
        complaintId: c.id
      });
      Notifications.send({
        targetRole: 'admin',
        title: '✅ Work Completed on Complaint',
        message: `${updatedBy} marked ${c.id} (${c.category}) as 100% completed & resolved.`,
        type: 'success',
        complaintId: c.id
      });
    } else {
      const progressLabel = c.progressPercent === 50 ? 'Half Work Done (50%)' : `${c.progressPercent}% Completed`;
      Notifications.send({
        targetRole: 'student',
        studentId: c.studentId,
        title: `🔧 Work Update: ${progressLabel}`,
        message: `${updatedBy} updated: "${note || 'Work is ongoing.'}"`,
        type: 'info',
        complaintId: c.id
      });
      Notifications.send({
        targetRole: 'admin',
        title: `🔧 Task Progress: ${progressLabel}`,
        message: `${updatedBy} updated ${c.id}: "${note || 'Work in progress.'}"`,
        type: 'info',
        complaintId: c.id
      });
    }

    return c;
  },

  /** Update a complaint's status directly */
  updateStatus(id, newStatus, note, updatedBy) {
    const all = this.getAll();
    const idx = all.findIndex(c => c.id === id);
    if (idx === -1) return null;

    all[idx].status    = newStatus;
    all[idx].updatedAt = formatDateTime(new Date());
    if (newStatus === 'Resolved') {
      all[idx].progressPercent = 100;
      all[idx].completedAt = formatDateTime(new Date());
    } else if (newStatus === 'In Progress' && (!all[idx].progressPercent || all[idx].progressPercent === 0)) {
      all[idx].progressPercent = 50; // default halfway
    }

    all[idx].updates.push({
      date:   formatDateTime(new Date()),
      status: newStatus,
      note:   note || `Status updated to ${newStatus}.`,
      by:     updatedBy || 'Staff'
    });
    this.save(all);

    if (newStatus === 'Resolved') {
      Notifications.send({
        targetRole: 'student',
        studentId: all[idx].studentId,
        title: '🎉 Complaint Resolved!',
        message: `Complaint ${all[idx].id} has been marked resolved by ${updatedBy}.`,
        type: 'success',
        complaintId: all[idx].id
      });
    }

    return all[idx];
  },

  /** Admin Assigns a complaint to an employee with Triggered Problem priority */
  assign(id, employeeName, priority, adminName, isTriggered = false, note = '') {
    const all = this.getAll();
    const idx = all.findIndex(c => c.id === id);
    if (idx === -1) return null;

    const c = all[idx];
    c.assignedTo   = employeeName;
    c.assignedBy   = adminName;
    c.isTriggered  = isTriggered || priority === 'Urgent';
    c.priority     = c.isTriggered ? 'Urgent' : (priority || c.priority);
    c.status       = 'Assigned';
    if (!c.progressPercent) c.progressPercent = 15;
    c.updatedAt    = formatDateTime(new Date());

    const noteText = note
      ? `Assigned by Admin ${adminName} to ${employeeName}. Note: ${note}`
      : `Assigned by Admin ${adminName} to ${employeeName} with ${c.priority} priority.${c.isTriggered ? ' [Triggered Problem]' : ''}`;

    c.updates.push({
      date:   formatDateTime(new Date()),
      status: 'Assigned',
      note:   noteText,
      by:     adminName
    });
    this.save(all);

    // Urgent popup notification to the assigned employee!
    Notifications.send({
      targetRole: 'employee',
      targetUser: employeeName,
      title: c.isTriggered ? '🚨 PRIORITY TRIGGERED: Assigned to You!' : '⚡ Important: Admin Assigned a Task to You',
      message: `${adminName} assigned ${c.id} (${c.category}) at ${c.location} to you. Priority: ${c.priority}.`,
      type: 'urgent',
      complaintId: c.id
    });

    // Notify student
    Notifications.send({
      targetRole: 'student',
      studentId: c.studentId,
      title: '👷 Staff Assigned to Your Issue',
      message: `Admin ${adminName} assigned ${employeeName} to inspect and resolve your complaint ${c.id}.`,
      type: 'info',
      complaintId: c.id
    });

    return c;
  },

  /** Add feedback to a resolved complaint */
  addFeedback(id, rating, comment) {
    const all = this.getAll();
    const idx = all.findIndex(c => c.id === id);
    if (idx === -1) return null;

    all[idx].feedback = { rating, comment };
    all[idx].status   = 'Closed';
    all[idx].isArchived = true;
    all[idx].updates.push({
      date:   formatDateTime(new Date()),
      status: 'Closed',
      note:   `Feedback submitted. Rating: ${rating}/5. "${comment}"`,
      by:     'Student'
    });
    this.save(all);
    return all[idx];
  }
};

/* ============================================================
   SECTION 4: UTILITY FUNCTIONS
   ============================================================ */

/**
 * Format a Date object as "YYYY-MM-DD HH:MM"
 * Example output: "2024-10-03 14:30"
 */
function formatDateTime(date) {
  const pad = n => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())} ` +
         `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/**
 * Get the CSS class for a status badge
 * We need different colors for each status
 */
function getStatusBadgeClass(status) {
  const map = {
    'Submitted':    'badge-submitted',
    'Under Review': 'badge-review',
    'Assigned':     'badge-assigned',
    'In Progress':  'badge-inprogress',
    'Resolved':     'badge-resolved',
    'Closed':       'badge-closed',
  };
  return map[status] || 'badge-submitted';
}

/**
 * Get the CSS class for a priority badge
 */
function getPriorityBadgeClass(priority) {
  const map = {
    'Low': 'badge-low', 'Medium': 'badge-medium',
    'High': 'badge-high', 'Urgent': 'badge-urgent'
  };
  return map[priority] || 'badge-medium';
}

/**
 * Escape HTML to prevent XSS attacks.
 * XSS = Cross-Site Scripting. If we put user input directly in HTML,
 * a malicious user could inject JavaScript. This prevents that.
 */
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Truncate text to a max length
 * Useful for table rows where we don't want long descriptions overflowing
 */
function truncate(text, maxLen = 60) {
  if (!text) return '';
  return text.length > maxLen ? text.substring(0, maxLen) + '...' : text;
}

/* ============================================================
   SECTION 5: TOAST NOTIFICATIONS
   These are the small popup messages at the bottom-right corner
   that tell the user if something succeeded or failed.
   ============================================================ */

function showToast(message, type = 'info', duration = 4000) {
  // Make sure the toast container exists
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  // Icon for each type
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
    <span class="toast-message">${escapeHtml(message)}</span>
    <button onclick="this.parentElement.remove()" style="background:none;border:none;cursor:pointer;color:var(--text-tertiary);margin-left:auto;font-size:16px;">✕</button>
  `;

  container.appendChild(toast);

  // Automatically remove after duration
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

/* ============================================================
   SECTION 6: MODAL HELPERS
   ============================================================ */

function openModal(modalId) {
  const overlay = document.getElementById(modalId);
  if (overlay) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

function closeModal(modalId) {
  const overlay = document.getElementById(modalId);
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Close modal when clicking the overlay background (outside the modal box)
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

/* ============================================================
   SECTION 7: LOGIN HANDLER
   Called from login.html
   ============================================================ */

function handleLogin(event) {
  event.preventDefault(); // Stop the form from refreshing the page

  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const role     = document.querySelector('.role-tab.active')?.dataset.role || 'student';

  // Clear any previous error
  clearFormErrors();

  // Find user across default mock data and registered users
  const allUsers = typeof UserManager !== 'undefined' ? UserManager.getAllUsers() : MOCK_DATA.users;
  const user = allUsers.find(u =>
    u.email.toLowerCase() === email.toLowerCase() && u.password === password && u.role === role
  );

  if (!user) {
    showFieldError('login-email', 'Invalid email or password for this role.');
    showFieldError('login-password', ' ');
    showToast('Login failed. Check your credentials.', 'error');
    return;
  }

  // Save user to session
  Session.login(user);

  // Initialize complaints in session storage
  Complaints.init();

  showToast(`Welcome back, ${user.name}! 👋`, 'success');

  // Redirect based on role
  setTimeout(() => {
    const routes = {
      student:  'app/templates/student/dashboard.html',
      admin:    'app/templates/admin/dashboard.html',
      employee: 'app/templates/employee/dashboard.html',
    };

    // Determine the correct path based on current page location
    const basePath = window.location.pathname.includes('login.html')
      ? routes[user.role]
      : '../../' + routes[user.role];

    window.location.href = basePath;
  }, 800);
}

function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (field) {
    field.classList.add('is-invalid');
    const errorEl = field.nextElementSibling;
    if (errorEl && errorEl.classList.contains('form-error')) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
  }
}

function clearFormErrors() {
  document.querySelectorAll('.form-control.is-invalid').forEach(el => {
    el.classList.remove('is-invalid');
  });
  document.querySelectorAll('.form-error').forEach(el => {
    el.style.display = 'none';
  });
}

/* ============================================================
   SECTION 8: SIDEBAR TOGGLE (for mobile)
   ============================================================ */

function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.classList.toggle('open');
}

/* ============================================================
   SECTION 9: PAGE INITIALIZATION
   Called on every dashboard page to set up user info and notifications
   ============================================================ */

function initPage(requiredRole) {
  const user = Session.getUser();

  // Guard role
  if (requiredRole && (!user || user.role !== requiredRole)) {
    return Session.guard(requiredRole);
  }

  // Set username in sidebar if element exists
  const nameEl   = document.getElementById('sidebar-user-name');
  const roleEl   = document.getElementById('sidebar-user-role');
  const avatarEl = document.getElementById('sidebar-user-avatar');

  if (user) {
    if (nameEl) nameEl.textContent = user.name;
    if (roleEl) roleEl.textContent = user.role;
    if (avatarEl) avatarEl.textContent = user.name.charAt(0).toUpperCase();

    // Check unread notifications and show top-right popups!
    Notifications.checkAndDisplay(user);
  }

  // Initialize complaints
  Complaints.init();

  // Listen for storage events (real-time popups when another tab triggers an event)
  window.addEventListener('storage', (e) => {
    if (e.key === 'campus_notifications') {
      const curUser = Session.getUser();
      if (curUser) {
        Notifications.checkAndDisplay(curUser);
      }
    }
  });

  window.addEventListener('campus_notification_added', (e) => {
    const curUser = Session.getUser();
    if (curUser) {
      const unread = Notifications.getUnreadFor(curUser);
      const target = unread.find(n => n.id === e.detail?.id);
      if (target) {
        Notifications.showPopup(target, curUser.id);
      }
    }
  });
}

/* ============================================================
   SECTION 10: COMPLAINT STATISTICS HELPER
   Used by admin and employee dashboards
   ============================================================ */

function getStats() {
  const all = Complaints.getAll();
  return {
    total:      all.length,
    submitted:  all.filter(c => c.status === 'Submitted').length,
    inProgress: all.filter(c => c.status === 'In Progress').length,
    resolved:   all.filter(c => c.status === 'Resolved' || c.status === 'Closed').length,
    urgent:     all.filter(c => c.priority === 'Urgent' || c.isTriggered).length,
    unassigned: all.filter(c => !c.assignedTo && c.status === 'Submitted').length,
  };
}

/* ============================================================
   SECTION 11: RENDER HELPERS
   Functions that create HTML strings for common UI elements
   ============================================================ */

/**
 * Create a status badge HTML string
 */
function renderBadge(text, cssClass) {
  if (text === 'Resolved' || text === 'Closed') {
    return `<span class="badge badge-completed-calm">✅ ${escapeHtml(text)}</span>`;
  }
  return `<span class="badge ${cssClass}">${escapeHtml(text)}</span>`;
}

/**
 * Render a progress chip
 */
function renderProgressChip(percent = 0) {
  const p = parseInt(percent || 0, 10);
  if (p >= 100) return `<span class="progress-chip progress-chip-100">✅ 100% Done</span>`;
  if (p >= 75)  return `<span class="progress-chip progress-chip-75">🔨 75% Near Finish</span>`;
  if (p >= 50)  return `<span class="progress-chip progress-chip-50">⚡ 50% Half Work</span>`;
  if (p > 0)   return `<span class="progress-chip progress-chip-25">🔧 ${p}% Started</span>`;
  return `<span class="progress-chip" style="background:var(--color-surface-2);color:var(--text-tertiary);border:1px solid var(--color-border);">⏳ 0% Waiting</span>`;
}

/**
 * Render visual progress bar
 */
function renderProgressBar(percent = 0) {
  const p = Math.min(100, Math.max(0, parseInt(percent || 0, 10)));
  let fillClass = 'fill-25';
  if (p >= 100) fillClass = 'fill-100';
  else if (p >= 75) fillClass = 'fill-75';
  else if (p >= 50) fillClass = 'fill-50';

  return `
    <div class="work-progress-track" title="Work progress: ${p}%">
      <div class="work-progress-fill ${fillClass}" style="width: ${p}%;"></div>
    </div>
  `;
}

/**
 * Create a complaint row for a table
 */
function renderComplaintRow(c, actions = '') {
  const isCompleted = c.status === 'Resolved' || c.status === 'Closed';
  return `
    <tr class="${isCompleted ? 'card-completed' : ''}">
      <td>
        <div style="display:flex; align-items:center; gap:var(--space-2);">
          <span class="complaint-id">${escapeHtml(c.id)}</span>
          ${Complaints.renderViewDot(c)}
        </div>
      </td>
      <td>${escapeHtml(c.category)}</td>
      <td>${escapeHtml(truncate(c.location, 28))}</td>
      <td>${escapeHtml(truncate(c.description, 45))}</td>
      <td>
        ${renderBadge(c.priority, getPriorityBadgeClass(c.priority))}
        ${c.isTriggered ? '<span class="badge badge-triggered" style="font-size:10px; margin-left:4px;">🚨 Triggered</span>' : ''}
      </td>
      <td>
        <div style="display:flex; flex-direction:column; gap:4px;">
          ${renderBadge(c.status, getStatusBadgeClass(c.status))}
          ${renderProgressChip(c.progressPercent)}
        </div>
      </td>
      <td style="font-size:var(--font-size-xs); color:var(--text-secondary);">${escapeHtml(c.submittedAt)}</td>
      ${actions ? `<td>${actions}</td>` : ''}
    </tr>
  `;
}

// Initialize on every page load
document.addEventListener('DOMContentLoaded', () => {
  Complaints.init();
});

