const form = document.querySelector('#concern-form');
const category = document.querySelector('#category');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const dialog = document.querySelector('#result-dialog');
const toast = document.querySelector('#toast');

function setCounter(input, output) {
  const update = () => { output.textContent = `${input.value.length} / ${input.maxLength}`; };
  input.addEventListener('input', update);
  update();
}
setCounter(title, document.querySelector('#title-count'));
setCounter(description, document.querySelector('#description-count'));

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2600);
}

function clearErrors() {
  document.querySelectorAll('.field-error').forEach((node) => { node.textContent = ''; });
  [category, title, description].forEach((field) => field.removeAttribute('aria-invalid'));
}

function validateForm() {
  clearErrors();
  let firstInvalid = null;
  const required = [
    { field: category, message: 'Please choose a category.', error: document.querySelector('#category-error') },
    { field: title, message: 'Please add a short title.', error: document.querySelector('#title-error') },
    { field: description, message: 'Please describe your concern.', error: document.querySelector('#description-error') }
  ];
  required.forEach(({ field, message, error }) => {
    if (!field.value.trim()) {
      error.textContent = message;
      field.setAttribute('aria-invalid', 'true');
      firstInvalid ??= field;
    }
  });
  if (firstInvalid) firstInvalid.focus();
  return !firstInvalid;
}

function loadReports() {
  try { return JSON.parse(localStorage.getItem('civic-concerns') || '[]'); }
  catch { return []; }
}

function createReference(reports) {
  let reference;
  do {
    reference = `GOV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  } while (reports.some((report) => report.reference === reference));
  return reference;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!validateForm()) return;

  const reports = loadReports();
  const reference = createReference(reports);
  const report = {
    reference,
    category: category.value,
    title: title.value.trim(),
    description: description.value.trim(),
    location: document.querySelector('#location').value.trim(),
    status: 'Received',
    submittedAt: new Date().toISOString()
  };
  reports.push(report);
  try {
    localStorage.setItem('civic-concerns', JSON.stringify(reports));
  } catch {
    showToast('Could not save this report in your browser. Please try again.');
    return;
  }
  document.querySelector('#reference-number').textContent = reference;
  dialog.showModal();
  form.reset();
  document.querySelector('#title-count').textContent = `0 / ${title.maxLength}`;
  document.querySelector('#description-count').textContent = `0 / ${description.maxLength}`;
});

document.querySelector('#copy-reference').addEventListener('click', async () => {
  const reference = document.querySelector('#reference-number').textContent;
  try {
    await navigator.clipboard.writeText(reference);
    showToast('Reference number copied.');
  } catch {
    showToast(`Your reference number is ${reference}`);
  }
});

document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
document.querySelector('#dialog-done').addEventListener('click', () => dialog.close());

const trackDialog = document.querySelector('#track-dialog');
document.querySelector('#track-button').addEventListener('click', () => trackDialog.showModal());
document.querySelector('#track-close').addEventListener('click', () => trackDialog.close());
document.querySelector('#track-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const reference = document.querySelector('#reference-input').value.trim().toUpperCase();
  const report = loadReports().find((item) => item.reference === reference);
  const result = document.querySelector('#track-result');
  result.innerHTML = report
    ? `<b>${escapeHtml(report.title)}</b><br>Status: ${escapeHtml(report.status)} · Submitted ${new Date(report.submittedAt).toLocaleDateString()}`
    : 'We couldn’t find that reference in this browser. Check the number or contact the Governance Office.';
});

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}
