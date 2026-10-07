"use strict";

const baseUrl = "http://127.0.0.1:8000";
const cdpUrl = "http://127.0.0.1:9222";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function findPage() {
  const pages = await (await fetch(`${cdpUrl}/json/list`)).json();
  const page = pages.find((item) => item.type === "page" && item.url.startsWith(baseUrl));
  if (!page) throw new Error("The local test browser has no CampusFixit page open.");
  return page;
}

async function run() {
  const page = await findPage();
  const socket = new WebSocket(page.webSocketDebuggerUrl);
  const pending = new Map();
  let nextId = 1;

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    const request = pending.get(message.id);
    if (!request) return;
    pending.delete(message.id);
    message.error ? request.reject(new Error(message.error.message)) : request.resolve(message.result);
  });

  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", () => reject(new Error("Could not connect to the local test browser.")), { once: true });
  });

  const command = (method, params = {}) => new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });

  const evaluate = async (expression) => {
    const response = await command("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
    if (response.exceptionDetails) throw new Error(response.exceptionDetails.text);
    return response.result.value;
  };

  const waitFor = async (condition, description) => {
    const deadline = Date.now() + 10000;
    while (Date.now() < deadline) {
      if (await evaluate(condition)) return;
      await sleep(100);
    }
    throw new Error(`Timed out waiting for ${description}.`);
  };

  const navigate = async (path) => {
    await command("Page.navigate", { url: `${baseUrl}${path}` });
    await sleep(500);
  };

  const click = async (selector) => {
    const point = await evaluate(`(() => {
      const element = document.querySelector(${JSON.stringify(selector)});
      if (!element) throw new Error("Missing element: ${selector}");
      element.scrollIntoView({ block: "center" });
      const rect = element.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    })()`);
    await command("Input.dispatchMouseEvent", { type: "mousePressed", x: point.x, y: point.y, button: "left", clickCount: 1 });
    await command("Input.dispatchMouseEvent", { type: "mouseReleased", x: point.x, y: point.y, button: "left", clickCount: 1 });
  };

  const type = async (selector, value) => {
    await click(selector);
    await command("Input.insertText", { text: value });
  };

  const select = (selector, value) => evaluate(`(() => {
    const element = document.querySelector(${JSON.stringify(selector)});
    element.value = ${JSON.stringify(value)};
    element.dispatchEvent(new Event("change", { bubbles: true }));
  })()`);

  const logout = async () => {
    await click("#logout-btn");
    await waitFor("document.querySelector('#nav-login-btn') !== null", "the home page after logout");
  };

  const login = async (role, email, password, dashboardPath) => {
    await click("#nav-login-btn");
    await waitFor("document.querySelector('#login-form') !== null", "the login page");
    if (role !== "student") await click(`#tab-${role}`);
    await type("#login-email", email);
    await type("#login-password", password);
    await click("#login-submit-btn");
    const dashboardSelector = {
      student: "#nav-submit",
      admin: "#nav-complaints",
      employee: "#tasks-container",
    }[role];
    await waitFor(`document.querySelector(${JSON.stringify(dashboardSelector)}) !== null`, `${role} dashboard`);
  };

  try {
    await navigate("/index.html");
    await evaluate("sessionStorage.clear()");

    await login("student", "arjun@campus.edu", "student123", "/app/templates/student/dashboard.html");
    await click("#nav-submit");
    await waitFor("document.querySelector('#complaint-form') !== null", "the complaint form");
    await evaluate(`(() => {
      const category = document.querySelector("#complaint-category");
      category.value = category.options[1].value;
      category.dispatchEvent(new Event("change", { bubbles: true }));
      const location = document.querySelector("#complaint-location");
      location.value = location.options[1].value;
      location.dispatchEvent(new Event("change", { bubbles: true }));
    })()`);
    await type("#complaint-description", "The library Wi-Fi is unavailable on the first floor and students cannot access course material.");
    await click("#submit-complaint-btn");
    await waitFor("document.querySelector('#success-complaint-id').textContent.trim().length > 0", "the complaint confirmation");
    const complaintId = await evaluate("document.querySelector('#success-complaint-id').textContent.trim()");
    await click("#track-complaint-btn");
    await waitFor("document.querySelector('#complaints-list') !== null", "student complaint history");
    await waitFor(`document.body.innerText.includes(${JSON.stringify(complaintId)})`, "the new complaint in student history");
    console.log(`Student: created and tracked ${complaintId}`);

    await logout();
    await login("admin", "admin@campus.edu", "admin123", "/app/templates/admin/dashboard.html");
    await click("#nav-complaints");
    await waitFor("document.querySelector('#assign-modal') !== null", "admin complaint management");
    const key = complaintId.replace(/[^a-zA-Z0-9]/g, "-");
    await click(`#assign-btn-${key}`);
    await select("#assign-employee", "Ramesh Patel");
    await select("#assign-priority", "High");
    await type("#assign-note", "Please resolve this network issue today.");
    await click("#confirm-assign-btn");
    await waitFor("document.querySelector('#assign-modal').classList.contains('open') === false", "the assignment confirmation");
    await waitFor("document.body.innerText.includes('Ramesh Patel')", "the assigned employee in the complaint details");
    console.log(`Admin: assigned ${complaintId} to Ramesh Patel with High priority`);

    await logout();
    await login("employee", "ramesh@campus.edu", "emp123", "/app/templates/employee/dashboard.html");
    await waitFor(`document.body.innerText.includes(${JSON.stringify(complaintId)})`, "the assigned complaint on the employee dashboard");
    await click(`#start-work-btn-${key}`);
    await waitFor("document.body.innerText.includes('In Progress')", "the in-progress status");
    await click(`#update-task-btn-${key}`);
    await select("#update-status", "Resolved");
    await type("#update-note", "Reset the access point and verified that the network is working.");
    await click("#confirm-update-btn");
    await waitFor("document.querySelector('#update-modal').classList.contains('open') === false", "the resolution update");
    await waitFor("document.body.innerText.includes('Resolved')", "the resolved status");
    console.log(`Employee: resolved ${complaintId}`);

    await logout();
    await login("student", "arjun@campus.edu", "student123", "/app/templates/student/dashboard.html");
    await click("#nav-history");
    await waitFor("document.querySelector('#complaints-list') !== null", "student history after resolution");
    await click(`#complaint-card-${key}`);
    await waitFor("document.querySelector('#detail-panel').classList.contains('hidden') === false", "the complaint details");
    await click("#detail-feedback-btn");
    await click(".star[data-value='5']");
    await type("#feedback-comment", "The issue was fixed quickly. Thank you.");
    await click("#submit-feedback-btn");
    await waitFor(`document.body.innerText.includes(${JSON.stringify(complaintId)}) && document.body.innerText.includes('Rated')`, "the saved student feedback");
    console.log(`Student: submitted 5/5 feedback and closed ${complaintId}`);
    console.log("PASS: visible browser workflow completed successfully.");
  } finally {
    socket.close();
  }
}

run().catch((error) => {
  console.error(`FAIL: ${error.message}`);
  process.exitCode = 1;
});
