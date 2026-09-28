/* White Roses@5 landing page. WhatsApp handoff configured for user review/testing. */
const CONFIG = {
  phone: "",                    // No separate voice-call number supplied
  whatsapp: "919776872555",    // User-provided verified WhatsApp number, digits only
  leadEndpoint: "",            // No CRM endpoint supplied; no server-side lead storage
  privacyNoticeUrl: "privacy-notice-draft.html", // Draft only; requires owner/legal review
  privacyNoticeStatus: "draft"
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const digitsOnly = value => (value || "").replace(/\D/g, "");
const form = $("#enquiry-form");
const fields = $("#enquiry-fields");
const intent = $("#intent");
const visitPreference = $("#visit-preference");
const visitDate = $("#day");
const visitTime = $("#visit-time");
const submitButton = $(".form-submit");
const configNote = $("#form-config-note");
const privacyLink = $(".form-privacy a");
const privacyNote = $("#privacy-note");
const thankYou = $("#thank-you");
const thankWhatsapp = $("#thank-whatsapp");
const formError = $("#form-error");
const editEnquiry = $("#edit-enquiry");

function track(eventName, details = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, project: "White Roses@5", ...details });
  if (typeof window.fbq === "function") window.fbq("trackCustom", eventName, details);
}
function hasLeadEndpoint() { return /^https:\/\//i.test(CONFIG.leadEndpoint.trim()); }
function hasWhatsApp() { return digitsOnly(CONFIG.whatsapp).length >= 10; }
function hasPrivacyNotice() { return /^https:\/\//i.test(CONFIG.privacyNoticeUrl.trim()) || CONFIG.privacyNoticeUrl.trim() === "privacy-notice-draft.html"; }
function whatsappUrl(message) {
  const number = digitsOnly(CONFIG.whatsapp);
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : "";
}
function buildMessage(data) {
  const lines = ["Hello! I’m interested in White Roses@5.", "", `Enquiry: ${data.intent}`, `Name: ${data.name}`, `Mobile: ${data.phone}`];
  if (data.day) lines.push(`Preferred site visit date: ${data.day}`);
  if (data.visitTime) lines.push(`Preferred visit time: ${data.visitTime}`);
  if (data.purpose) lines.push(`Buying for: ${data.purpose}`);
  if (data.timeline) lines.push(`Purchase timeline: ${data.timeline}`);
  lines.push("", "Please share the relevant available project information and next steps.");
  return lines.join("\n");
}
function setContactLinks() {
  $$('[data-contact="call"]').forEach(link => {
    if (CONFIG.phone) { link.href = `tel:+${digitsOnly(CONFIG.phone)}`; link.textContent = "Call"; }
    else { link.href = "#enquiry"; link.textContent = "Contact"; link.setAttribute("aria-label", "Contact the project team through the enquiry section"); }
  });
  $$('[data-contact="whatsapp"]').forEach(link => {
    if (hasWhatsApp()) {
      link.href = whatsappUrl("Hello! I’m interested in White Roses@5. Please share project information.");
      link.target = "_blank"; link.rel = "noopener noreferrer"; link.textContent = "WhatsApp";
    } else { link.href = "#enquiry"; link.textContent = "Enquire"; link.setAttribute("aria-label", "Enquire through the project enquiry section"); }
  });
}
setContactLinks();

const enquiryReady = (hasLeadEndpoint() || hasWhatsApp()) && hasPrivacyNotice();
fields.disabled = !enquiryReady;
if (enquiryReady) {
  const isDraft = CONFIG.privacyNoticeStatus === "draft";
  configNote.hidden = false;
  configNote.classList.toggle("is-draft", isDraft);
  configNote.textContent = isDraft
    ? "WhatsApp enquiry is configured for review. Your details will be placed into a WhatsApp message only after you continue; the message is sent only if you press Send in WhatsApp. The linked privacy notice is a draft and has not been legally approved. Review it before public launch."
    : "Your enquiry will open in WhatsApp. Review the prepared message and press Send to contact the project team.";
  form.setAttribute("aria-describedby", "form-config-note");
  privacyLink.href = CONFIG.privacyNoticeUrl.trim();
  privacyLink.removeAttribute("target");
  privacyLink.removeAttribute("rel");
  privacyLink.textContent = isDraft ? "Review privacy notice draft" : "Read the privacy notice";
  privacyNote.replaceChildren(document.createTextNode(isDraft ? "Privacy notice draft for review (not legally approved). " : "For details on enquiry data handling, read the "));
  const policyAnchor = document.createElement("a");
  policyAnchor.href = CONFIG.privacyNoticeUrl.trim();
  policyAnchor.textContent = isDraft ? "Open draft" : "privacy notice";
  privacyNote.append(policyAnchor, document.createTextNode(". Project information is based on supplied materials and remains subject to current developer confirmation. *Terms and conditions apply."));
} else {
  configNote.hidden = false;
  configNote.textContent = "Enquiry delivery is not configured. The form is in preview mode and cannot collect personal details.";
  form.classList.add("is-preview");
}

const today = new Date();
visitDate.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
function updateIntentFields() {
  const isVisit = intent.value === "Site Visit";
  visitPreference.hidden = !isVisit;
  visitDate.required = isVisit;
  visitTime.required = isVisit;
  if (!isVisit) { visitDate.value = ""; visitTime.value = ""; }
  const labels = {
    "Site Visit": "Continue to Site Visit Request",
    "Floor Plan": "Request the Floor Plan",
    "Price Details": "Request Price & Availability",
    "Project Information": "Request Project Information"
  };
  submitButton.innerHTML = `${labels[intent.value] || "Continue to Enquiry"} <span aria-hidden="true">↗</span>`;
}
intent.addEventListener("change", updateIntentFields);
updateIntentFields();

$$('[data-intent]').forEach(link => link.addEventListener("click", () => {
  if (intent && !fields.disabled) { intent.value = link.dataset.intent; updateIntentFields(); }
  track("enquiry_cta_click", { intent: link.dataset.intent, label: link.textContent.trim() });
}));
$$('a[href^="#"]').forEach(link => link.addEventListener("click", () => {
  const target = $(link.getAttribute("href"));
  if (target) track("section_navigation", { target: target.id });
}));

const menuToggle = $(".menu-toggle");
const nav = $("#primary-navigation");
function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  nav.classList.remove("is-open");
}
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  nav.classList.toggle("is-open", open);
  track("mobile_menu_toggle", { open });
});
$$("a", nav).forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => { if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") { closeMenu(); menuToggle.focus(); } });
document.addEventListener("click", event => { if (menuToggle.getAttribute("aria-expanded") === "true" && !nav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu(); });

let maxScroll = 0;
window.addEventListener("scroll", () => {
  const denominator = document.documentElement.scrollHeight - window.innerHeight;
  if (denominator <= 0) return;
  const depth = Math.round((window.scrollY / denominator) * 100);
  [25, 50, 75, 90].forEach(mark => { if (depth >= mark && maxScroll < mark) track("scroll_depth", { percent: mark }); });
  maxScroll = Math.max(maxScroll, depth);
}, { passive: true });
form.addEventListener("focusin", () => { if (!form.dataset.started) { form.dataset.started = "true"; track("form_start"); } });
form.addEventListener("submit", async event => {
  event.preventDefault();
  formError.textContent = "";
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form).entries());
  data.project = "White Roses@5";
  const waUrl = whatsappUrl(buildMessage(data));
  submitButton.disabled = true;
  submitButton.setAttribute("aria-busy", "true");
  try {
    if (hasLeadEndpoint()) {
      const response = await fetch(CONFIG.leadEndpoint.trim(), { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(data), mode: "cors", credentials: "omit" });
      if (!response.ok) throw new Error("Lead submission was not accepted");
      track("lead", { source: "landing_page_form", intent: data.intent });
      showConfirmation(true, waUrl, data.intent);
    } else if (waUrl) {
      showConfirmation(false, waUrl, data.intent);
      track("whatsapp_handoff_prepared", { intent: data.intent });
    } else {
      formError.textContent = "Enquiry delivery is not configured yet. Please try again later.";
      track("lead_submission_unconfigured", { intent: data.intent });
    }
  } catch (error) {
    formError.textContent = "We couldn't submit your request. Please try again later.";
    track("lead_submission_error", { intent: data.intent });
  } finally { submitButton.disabled = false; submitButton.removeAttribute("aria-busy"); }
});
function showConfirmation(accepted, waUrl, enquiryType) {
  form.hidden = true; thankYou.hidden = false;
  $("#thank-eyebrow").textContent = accepted ? "REQUEST SUBMITTED" : "WHATSAPP MESSAGE READY";
  $("#thank-title").textContent = accepted ? "Thank you for your enquiry." : "Your message is ready to send.";
  $("#thank-copy").textContent = accepted ? "Your enquiry has been accepted by the form service. The project team can follow up using the details you provided." : "WhatsApp will open with your enquiry prepared. Review the message and press Send in WhatsApp to complete your enquiry.";
  if (waUrl) { thankWhatsapp.href = waUrl; thankWhatsapp.hidden = false; thankWhatsapp.target = "_blank"; thankWhatsapp.rel = "noopener noreferrer"; }
  else thankWhatsapp.hidden = true;
  track("enquiry_confirmation_view", { accepted_by_endpoint: accepted, intent: enquiryType });
}
thankWhatsapp.addEventListener("click", () => track("whatsapp_click", { source: "confirmation" }));
editEnquiry.addEventListener("click", () => { thankYou.hidden = true; form.hidden = false; intent.focus(); });
