## Task 1 — Sector Selection
Sector: Governance
Project concept: Barangay Community Concern Reporting


Target users

- Residents who need a simple way to report local concerns, including improper waste disposal, damaged roads, and broken streetlights.
- Barangay personnel who need reports to be clear and organized so they can review concerns and decide what follow-up is needed.

Local challenge:
Residents may not know where or how to report neighborhood problems. Reports can be vague, lack location details, or be difficult to follow up on. Barangay personnel may consequently have trouble understanding and organizing incoming concerns.

Proposed solution
A single-page, responsive reporting prototype that guides residents through submitting a concern and gives them a reference number to use when checking its status. It demonstrates an organized reporting flow without requiring a server or database.

Three core features

1. Guided concern form — Residents select a concern category, add a short title and description, and optionally provide a location. Required fields and input hints help make reports clearer.
2. Submission confirmation and reference number — After submitting, the prototype displays a unique reference number residents can keep for follow-up.
3. Simple report-status lookup — Residents can enter their reference number to see the report’s saved status in the same browser. This demonstrates follow-up without implying that a real barangay system has received or processed the report.
The prototype uses semantic HTML, responsive CSS, and JavaScript with browser storage. It is suitable for a beginner frontend project; reports are only stored in that browser and are not sent to barangay personnel.**
## Task 2 — Zero-shot prompting
**Objective: Start a Governance-sector community concern reporting webpage from a brief request, without providing examples or a detailed feature specification.**
**Exact Prompt:**
> Create a Community Concern Reporting webpage for the Governance sector.
**Actual Copilot Output: Created the responsive Community Concern Reporting webpage with a three-step form, field validation, reference number generation, and local report tracking.

Files: index.html, styles.css, app.js.

Verified the page renders and a report submission produces a reference number in the browser. Submissions are stored locally in the browser; no backend is connected.**
**What Worked: The initial prompt led to a working single-page prototype with the three requested technologies and the basic reporting flow.**
**What Needs Improvement: The prompt did not specify target users, validation behavior, persistence requirements, exact status lookup behavior, or design constraints. Those details needed to be added later. **
**Next Action / Verification: The page was opened in a browser. A test submission displayed a generated reference number. The actual output files are**
## Task 3 — Anatomy of a Prompt
**Objective: Clarify the project concept and then specify the implementation requirements for a beginner-friendly, single-page prototype.**
**Exact Prompt: Act as a professional web developer. Develop a Barangay Community Concern Reporting Prototype that allows residents to submit local concerns, receive a reference number, and check the status of their reports. The project belongs to the Governance sector. Its target users are residents who need a simple way to report community problems and barangay personnel who need clear, organized reports for review. Examples of concerns include improper waste disposal, damaged roads, and broken streetlights. Create one responsive webpage or single-page frontend interface using semantic HTML, CSS, and JavaScript. Use browser storage to save reports locally. Do not require a backend, database, user authentication, or external APIs. Keep the implementation suitable for desktop and mobile screens. Provide the complete HTML, CSS, and JavaScript code for a webpage containing a guided concern submission form, a submission confirmation with a unique reference number, and a report-status lookup feature. The form should validate required fields and help users provide clear concern details. Successful submissions should generate a unique reference number and save the report in browser storage. Users should be able to enter a reference number and view the corresponding report status. Invalid or unknown reference numbers should display a helpful message. The webpage should be responsive, use semantic HTML, and work without a backend or external APIs.**
> [Copy your actual prompt here]
**Actual Copilot Output: Sector: Governance

Target users:
Residents who need a simple way to report local concerns, including improper waste disposal, damaged roads, and broken streetlights.
Barangay personnel who need reports to be clear and organized so they can review concerns and decide what follow-up is needed.

Local challenge:
Residents may not know where or how to report neighborhood problems. Reports can be vague, lack location details, or be difficult to follow up on. Barangay personnel may consequently have trouble understanding and organizing incoming concerns.

Proposed solution:
A single-page, responsive reporting prototype that guides residents through submitting a concern and gives them a reference number to use when checking its status. It demonstrates an organized reporting flow without requiring a server or database.

Three core features:
1. Guided concern form — Residents select a concern category, add a short title and description, and optionally provide a location. Required fields and input hints help make reports clearer.
2. Submission confirmation and reference number — After submitting, the prototype displays a unique reference number residents can keep for follow-up.
3. Simple report-status lookup — Residents can enter their reference number to see the report’s saved status in the same browser. This demonstrates follow-up without implying that a real barangay system has received or processed the report.
The implementation response described the prototype files as index.html, styles.css, and app.js.**
**What Worked: The planning prompt identified the resident and barangay-personnel audiences, the local reporting challenge, and three relevant features. The implementation prompt made the local-storage, validation, reference number, lookup, responsive layout, and no-backend constraints explicit.**
**What Needs Improvement: The implementation prompt specified a “Continue” action but the code submits immediately rather than providing the additional stages shown in the progress indicator. This mismatch was later identified during review.**
**Next Action / Verification: The prototype was opened in a browser, and a valid submission produced a reference number. Browser-local persistence was tested later in the conversation; the report remained available for lookup after refresh.**
## Task 4 — Few-Shot and Role Assignment
**Experiment A**
**Objective: Use two sample concern reports as examples, then request three additional reports in the same format and integrate them into the prototype without changing the numbered task folders.**


**Exact Prompt:**
> I am developing a Barangay Community Concern Reporting Prototype using HTML, CSS, and JavaScript.

Create concern report examples using the following format:

Example 1:
Reference Number: BCR-1001
Category: Waste Disposal
Title: Improper Waste Disposal
Location: Purok 2
Description: Garbage has been left along the roadside.
Status: Pending

Example 2:
Reference Number: BCR-1002
Category: Road Damage
Title: Damaged Road
Location: Purok 4
Description: A damaged section of the road may cause problems for passing residents.
Status: Under Review

Using the same format, generate three additional fictional concern reports with appropriate reference numbers, categories, titles, locations, descriptions, and statuses.

Integrate these examples into the existing Community Concern Reporting Prototype. Keep the project's three core features: a guided concern form, submission confirmation with a unique reference number, and report-status lookup. Use semantic HTML, responsive CSS, and JavaScript. Do not add a backend, database, authentication, or external APIs.
**Actual Copilot Output: 

Integrated five fictional reports into the existing prototype:

BCR-1001 — Waste Disposal · Improper Waste Disposal · Purok 2 · Pending
BCR-1002 — Road Damage · Damaged Road · Purok 4 · Under Review
BCR-1003 — Street Lighting · Broken Streetlight · Purok 6 · Pending
BCR-1004 — Drainage · Clogged Drainage Canal · Purok 1 · Under Review
BCR-1005 — Public Safety · Fallen Tree Branch · Purok 3 · In Progress
The sample panel displays report descriptions and status, and its “Check status” buttons open the lookup with the selected reference. New submissions use the same BCR reference format and are saved locally.

Validated sample lookups, new report submission, and the page layout. Only the root prototype files were changed; folders 1–5 were left untouched.**
**What Worked: The two given reports were retained, three more fictional reports were added, and sample records were included in the lookup flow. A sample lookup for BCR-1002 displayed the report and its “Under Review” status. A test submission generated BCR-1006.**
**What Needs Improvement: The sample records are demo data stored in the browser; they do not represent reports received or updated by actual barangay personnel. The sample statuses are not connected to a live service.**
**Next Action / Verification: The sample lookup and a new report submission were tested in the browser. The final root-level implementation is in index.html, styles.css, and app.js.**

**Experiment B**

**Objective: Ask Copilot to review the prototype from the perspective of a frontend accessibility reviewer, focusing on form semantics, keyboard use, errors, focus, and clarity.**


**Exact Prompt:**
> Act as a frontend accessibility reviewer experienced in semantic HTML and accessible user interfaces.

Examine my Barangay Community Concern Reporting Prototype. Review the concern submission form, submission confirmation with a reference number, and report-status lookup.

Identify problems involving HTML semantics, form labels, keyboard accessibility, visible focus indicators, error messages, and visual clarity. Recommend specific improvements that would make the webpage easier to use for community residents, including users who rely on a keyboard.

Keep the existing project scope and use HTML, CSS, and JavaScript only. Do not add a backend, database, authentication, external APIs, or unrelated features.

Provide the identified issues, the reason each issue matters, recommended corrections, and steps to verify the improvements. Do not claim that an issue exists unless it is supported by the actual code.
**Actual Copilot Output: 
The prototype already has several good foundations: a <main> landmark and page-level <h1>, explicit labels for the form controls, native required fields, and native <dialog> elements with accessible names. The status lookup’s result container also uses aria-live="polite", so dynamic lookup results can be announced to assistive technology.

Validation errors were not programmatically tied to their fields. The JavaScript set aria-invalid, but the error messages were not referenced by the corresponding inputs. The review recommended adding each error element’s ID to the related control’s aria-describedby.

It also recommended clearer :focus-visible styling and noted that some supporting text uses very small type and pale colors. The progress indicator may imply steps that the form does not perform.**

**What Worked: The role and review criteria led to evidence-based observations, including both existing accessible patterns and specific shortcomings rather than assuming the interface was inaccessible in every respect.**
**What Needs Improvement: The review was based on code inspection, not a complete screen-reader, keyboard, contrast, or physical-device accessibility test. The focus and small-text recommendations still require testing and may need further implementation.**
**Next Action / Verification: The later refinement added error descriptions and tested empty-form errors and correction behavior. Manual keyboard and screen-reader checks remain recommended.**
## Task 5 — Analyze Structured Reasoning and Refinement
**Objective: Compare the implementation with the original requirements, identify the two most important weaknesses, and apply and verify a small correction.**
**Exact Prompt:**
> Review my Barangay Community Concern Reporting Prototype against the original project requirements. Examine the actual HTML, CSS, and JavaScript files.

Check these areas:

Concern submission: Are required fields validated, and does a successful submission generate a unique reference number?
Local storage: Are reports saved correctly in browser storage and still available after refreshing the page?
Status lookup: Can users find a saved report using its reference number? Are invalid or unknown reference numbers handled with a helpful message?
Usability and accessibility: Are form fields properly labeled, error messages clear, and the layout usable on mobile screens?
Identify the two most important implementation weaknesses based on the provided code. For each weakness, state the observed issue, the relevant code evidence, the probable cause, and the smallest appropriate correction.

Then provide the exact code changes needed for the most important issue and give me step-by-step instructions to verify the correction.

Constraints:

Preserve the project's three core features and existing design as much as possible.
Use semantic HTML, responsive CSS, and vanilla JavaScript.
Do not introduce a backend, database, authentication, external APIs, or unnecessary new features.
Do not assume a feature is broken without evidence from the code.
Clearly distinguish issues confirmed by the code from issues that still require testing.
Keep the analysis concise and beginner-friendly. Do not provide hidden internal reasoning; provide only the technical findings, corrections, and verification steps.
**Actual Copilot Output:Required fields are checked before submission; references are generated from the stored reports; reports are written to localStorage; and lookup handles saved and unknown references. I verified a submission could still be looked up after refreshing the page.

Validation errors were not associated with their fields — corrected. Added aria-describedby links for the required fields and their errors. Errors now clear when residents correct the relevant field.



Verified: Submitting an empty form shows the field errors; correcting the title clears its error and aria-invalid state. The editor reports no errors in the changed files.

The progress indicator implies steps the form does not perform. The page displays “Your details” and “Review & submit,” but the visible form submits immediately. The smallest correction recommended was to remove the unused stages and change “Continue” to “Submit report.” This change was recommended, not applied.**
**What Worked: The prompt required code evidence and verification rather than assumptions. The first issue was corrected in the root prototype. The current HTML associates error and character-count text with the relevant fields in index.html. The JavaScript clears a corrected field’s error and validates the required fields in app.js.**
**What Needs Improvement: The suggested progress-indicator/button-copy correction was not applied. Focus styling, visual contrast, mobile presentation, and screen-reader behavior still need dedicated manual accessibility checks.**
**Next Action / Verification: The following checks were performed in the browser:

Submitted an empty form. All three required-field error messages appeared.
Confirmed aria-describedby references the category, title, and description errors; title and description also reference their character counters.
Entered a title after validation failed. Its error text cleared and aria-invalid was removed.
Submitted a report. It received reference BCR-1006, remained in browser storage after refresh, and was found by the status lookup.
Entered an unknown reference. The lookup displayed: “We couldn’t find that reference in this browser. Check the number or contact the Governance Office.”**

## Task 6 — Compare and Submit
**Reflection: 
The different prompting techniques helped me understand how the way I write instructions affects the output generated by GitHub Copilot. Zero-shot prompting allowed me to generate an initial version of my Barangay Community Concern Reporting Prototype, but some requirements may have been unclear because the prompt provided limited details. Structured prompting helped provide clearer instructions by specifying the project's purpose, required features, technical constraints, and expected output. Few-shot prompting provided examples that guided Copilot in generating consistent sample concern reports. Role assignment directed Copilot to examine the project from a specialized perspective, while structured analysis and refinement helped identify possible implementation weaknesses and suggest targeted improvements. However, the effectiveness of each technique depended on the actual output and the results of testing.
Through this activity, I learned that writing a clear prompt is important when using AI for web development. Providing enough context, examples, and constraints can help Copilot understand the project requirements more accurately. I also learned that AI-generated code should not be accepted immediately without reviewing and testing it. For my Barangay Community Concern Reporting Prototype, I need to verify that the concern submission form works correctly, reference numbers are generated, reports remain saved after refreshing the page, and status lookup displays the correct information. Overall, this activity taught me that prompt engineering is not only about generating code but also about evaluating the results, identifying weaknesses, making improvements, and verifying that the final project meets its requirements.**