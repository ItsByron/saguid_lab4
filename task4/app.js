const form = document.querySelector('#concern-form');
const category = document.querySelector('#category');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const dialog = document.querySelector('#result-dialog');
const toast = document.querySelector('#toast');
const exampleReports = [
  { reference: 'BCR-1001', category: 'Waste Disposal', title: 'Improper Waste Disposal', location: 'Purok 2', description: 'Garbage has been left along the roadside.', status: 'Pending', submittedAt: '2026-10-12T08:30:00.000Z' },
  { reference: 'BCR-1002', category: 'Road Damage', title: 'Damaged Road', location: 'Purok 4', description: 'A damaged section of the road may cause problems for passing residents.', status: 'Under Review', submittedAt: '2026-10-13T09:15:00.000Z' },
  { reference: 'BCR-1003', category: 'Street Lighting', title: 'Broken Streetlight', location: 'Purok 6', description: 'A streetlight near the footpath has not been working after dark.', status: 'Pending', submittedAt: '2026-10-14T17:45:00.000Z' },
  { reference: 'BCR-1004', category: 'Drainage', title: 'Clogged Drainage Canal', location: 'Purok 1', description: 'Leaves and debris are blocking the canal and water is collecting after rain.', status: 'Under Review', submittedAt: '2026-10-15T06:20:00.000Z' },
  { reference: 'BCR-1005', category: 'Public Safety', title: 'Fallen Tree Branch', location: 'Purok 3', description: 'A large fallen branch is partly blocking the sidewalk near the community hall.', status: 'In Progress', submittedAt: '2026-10-16T11:00:00.000Z' }
];

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
  let reports = [];
  try {
    const storedReports = JSON.parse(localStorage.getItem('civic-concerns') || '[]');
    if (Array.isArray(storedReports)) reports = storedReports;
  } catch {
    reports = [];
  }

  let addedExamples = false;
  exampleReports.forEach((example) => {
    if (!reports.some((report) => report.reference === example.reference)) {
      reports.push(example);
      addedExamples = true;
    }
  });
  if (addedExamples) {
    try { localStorage.setItem('civic-concerns', JSON.stringify(reports)); }
    catch { /* The examples remain available in memory for this page session. */ }
  }
  return reports;
}

function createReference(reports) {
  const existingNumbers = reports
    .map((report) => Number(report.reference?.match(/^BCR-(\d+)$/i)?.[1]))
    .filter(Number.isFinite);
  let number = Math.max(1000, ...existingNumbers) + 1;
  let reference = `BCR-${number}`;
  do {
    if (!reports.some((report) => report.reference === reference)) break;
    number += 1;
    reference = `BCR-${number}`;
  } while (true);
  return reference;
}

function renderExampleReports() {
  const list = document.querySelector('#report-example-list');
  exampleReports.forEach((report) => {
    const item = document.createElement('li');
    item.className = 'report-example';
    item.innerHTML = `<div class="example-report-top"><strong>${escapeHtml(report.title)}</strong><span class="status-pill ${statusClass(report.status)}">${escapeHtml(report.status)}</span></div><p>${escapeHtml(report.category)} · ${escapeHtml(report.location)}</p><p class="example-description">${escapeHtml(report.description)}</p><div class="example-report-bottom"><span>${escapeHtml(report.reference)}</span><button type="button" class="example-track-button" data-reference="${escapeHtml(report.reference)}">Check status</button></div>`;
    list.append(item);
  });
}

function statusClass(status) {
  return status.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '');
}

renderExampleReports();

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
document.querySelector('#report-example-list').addEventListener('click', (event) => {
  const button = event.target.closest('[data-reference]');
  if (!button) return;
  document.querySelector('#reference-input').value = button.dataset.reference;
  document.querySelector('#track-result').textContent = '';
  trackDialog.showModal();
  document.querySelector('#track-form').requestSubmit();
});
document.querySelector('#track-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const reference = document.querySelector('#reference-input').value.trim().toUpperCase();
  const report = loadReports().find((item) => item.reference === reference);
  const result = document.querySelector('#track-result');
  result.innerHTML = report
    ? `<b>${escapeHtml(report.title)}</b><br>${escapeHtml(report.category)} · ${escapeHtml(report.location || 'Location not provided')}<br>${escapeHtml(report.description || '')}<br>Status: <span class="status-pill ${statusClass(report.status)}">${escapeHtml(report.status)}</span> · Submitted ${new Date(report.submittedAt).toLocaleDateString()}`
    : 'We couldn’t find that reference in this browser. Check the number or contact the Governance Office.';
});

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}
