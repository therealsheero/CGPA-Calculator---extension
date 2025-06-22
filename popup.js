const gradeToPoints = {
  "O": 10,
  "A+": 10,
  "A": 9,
  "B+": 8,
  "B": 7,
  "C+": 6,
  "C": 5,
  "D": 4,
  "F": 0
};
const usGradeToPoints = {
  "A+": 4.0,
  "A": 4.0,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2.0,
  "C-": 1.7,
  "D+": 1.3,
  "D": 1.0,
  "F": 0.0
};

let semesterWiseCGPA = [];
let semesterWiseGPA4 = [];
let chartInstance = null;
let chartInstance4 = null;
let chartInstance6 = null;
// Button references
const startBtn = document.getElementById("startBtn");
const calcBtn = document.getElementById("calcBtn");
const editBtn = document.getElementById("editBtn");
const clearBtn = document.getElementById("clearBtn");
const progressBtn = document.getElementById("progressBtn");
const backBtn = document.getElementById("backBtn");
const downloadBtn = document.getElementById("downloadBtn");

const calcBtn4 = document.getElementById("calcBtn4");
const goBackBtn4 = document.getElementById("goBackBtn4");
const clearBtn4 = document.getElementById("clearBtn4");
const progressBtn4 = document.getElementById("progressBtn4");
const backBtn4 = document.getElementById("backBtn4");
const downloadBtn4 = document.getElementById("downloadBtn4");

const calcBtn6 = document.getElementById("calcBtn6");
const goBackBtn6 = document.getElementById("goBackBtn6");
const clearBtn6 = document.getElementById("clearBtn6");
const progressBtn6 = document.getElementById("progressBtn6");
const backBtn6 = document.getElementById("backBtn6");
const downloadBtn6 = document.getElementById("downloadBtn6");

const convertBtn10 = document.getElementById("convertBtn10");
const percentage10 = document.getElementById("percentage10");

const convertBtn4 = document.getElementById("convertBtn4");
const percentage4 = document.getElementById("percentage4");

let weightedPercentageData = [];

const gradingSystemSelect = document.getElementById("gradingSystem");

startBtn.addEventListener("click", () => {
  const gradingSystem = gradingSystemSelect.value;
  const numSemesters = parseInt(document.getElementById("numSemesters").value);

  if (gradingSystem === "4") {
    const gpaInputContainer = document.getElementById("gpa4Inputs");
    gpaInputContainer.innerHTML = "";

    for (let s = 1; s <= numSemesters; s++) {
      const semDiv = document.createElement("div");
      semDiv.className = "semester-block";
      semDiv.innerHTML = `
        <h4>Semester ${s}</h4>
        <label>Number of Subjects:</label>
        <input type="number" id="subjects4-${s}" class="num-subjects" data-sem="${s}" min="1" />
        <button type="button" class="add-subjects" data-sem="${s}">Add Subjects</button>
        <div id="sem4-${s}-inputs"></div>
      `;
      gpaInputContainer.appendChild(semDiv);
    }

    document.getElementById("page1").style.display = "none";
    document.getElementById("page4").style.display = "flex";
  }else if (gradingSystem === "10") {
    const numSemesters = parseInt(document.getElementById("numSemesters").value);
    const inputSection = document.getElementById("inputSection");
    inputSection.innerHTML = "";

    if (isNaN(numSemesters) || numSemesters <= 0) return;

    for (let s = 1; s <= numSemesters; s++) {
      const semDiv = document.createElement("div");
      semDiv.innerHTML = `
        <h4>Semester ${s}</h4>
        <label>Number of Subjects:</label>
        <input type="number" id="subjects-${s}" min="1" />
        <button type="button" id="addBtn-${s}">Add Subjects</button>
        <div id="sem-${s}-inputs"></div>
      `;
      inputSection.appendChild(semDiv);

      setTimeout(() => {
        const btn = document.getElementById(`addBtn-${s}`);
        if (btn) {
          btn.addEventListener("click", () => addSubjects(s));
        }
      }, 0);
    }

    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "flex";
    document.getElementById("calcBtn").style.display = "block";
  } else if (gradingSystem === "percentage") {
    const percentInputContainer = document.getElementById("percentageInputs");
    percentInputContainer.innerHTML = "";
    for (let s = 1; s <= numSemesters; s++) {
      const div = document.createElement("div");
      div.innerHTML = `
        <h4>Semester ${s}</h4>
        <label>Number of Subjects:</label>
        <input type="number" id="subjects6-${s}" class="num-subjects" data-sem="${s}" min="1" />
        <button type="button" class="add-percentage-subjects" data-sem="${s}">Add Subjects</button>
        <div id="sem6-${s}-inputs"></div>
      `;
      percentInputContainer.appendChild(div);
    }
    document.getElementById("page1").style.display = "none";
    document.getElementById("page6").style.display = "flex";
  }
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("add-subjects")) {
    const sem = e.target.dataset.sem;
    const count = parseInt(document.querySelector(`.num-subjects[data-sem='${sem}']`).value);
    const container = document.getElementById(`sem4-${sem}-inputs`);
    container.innerHTML = "";

    for (let i = 1; i <= count; i++) {
      const row = document.createElement("div");
      row.className = "gpa4-entry";
      row.innerHTML = `
        <label>Subject ${i} - Credit Hours:</label>
        <input type="number" class="gpa-credits" step="0.1" min="0" placeholder="Credits (e.g. 3)" />
        <label>Grade:</label>
        <select class="gpa-val">
          <option value="">Select</option>
          ${Object.entries(usGradeToPoints).map(([grade, point]) => `<option value="${grade}">${grade} (${point})</option>`).join('')}
        </select>
      `;
      container.appendChild(row);
    }
  }else if (e.target && e.target.classList.contains("add-gpa10-subjects")) {
    const sem = e.target.dataset.sem;
    const count = parseInt(document.querySelector(`#subjects2-${sem}`).value);
    const container = document.getElementById(`sem2-${sem}-inputs`);
    container.innerHTML = "";

    for (let i = 1; i <= count; i++) {
      const row = document.createElement("div");
      row.className = "gpa10-entry";
      row.innerHTML = `
        <label>Subject ${i} - Credit Hours:</label>
        <input type="number" class="gpa10-credits" step="0.1" min="0" placeholder="Credits" />
        <label>Grade Point (0–10):</label>
        <input type="number" class="gpa10-grade" step="0.1" min="0" max="10" placeholder="Grade Point" />
      `;
      container.appendChild(row);
    }
  } else if (e.target && e.target.classList.contains("add-percentage-subjects")) {
    const sem = e.target.dataset.sem;
    const count = parseInt(document.querySelector(`#subjects6-${sem}`).value);
    const container = document.getElementById(`sem6-${sem}-inputs`);
    container.innerHTML = "";

    for (let i = 1; i <= count; i++) {
      const row = document.createElement("div");
      row.className = "percentage-entry";
      row.innerHTML = `
        <label>Subject ${i} - Marks:</label>
        <input type="number" class="percentage-marks" step="0.1" min="0" placeholder="Marks" />
        <label>Credit:</label>
        <input type="number" class="percentage-credits" step="0.1" min="0" placeholder="Credits" />
      `;
      container.appendChild(row);
    }
  }
});

editBtn.addEventListener("click", () => {
  document.getElementById("page2").style.display = "none";
  document.getElementById("page1").style.display = "flex";
  document.getElementById("result").textContent = "";
});

clearBtn.addEventListener("click", () => {
  const creditInputs = document.querySelectorAll(".credit");
  const gradeInputs = document.querySelectorAll(".grade");
  const subjectInputs = document.querySelectorAll("input[id^='subjects-']");

  creditInputs.forEach(input => input.value = "");
  gradeInputs.forEach(input => {
    input.value = "";
    input.style.backgroundColor = "";
  });
  subjectInputs.forEach(input => input.value = "");

  document.getElementById("result").textContent = "";

  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
});

function addSubjects(semNum) {
  const subjectCount = parseInt(document.getElementById(`subjects-${semNum}`)?.value);
  const inputsDiv = document.getElementById(`sem-${semNum}-inputs`);
  inputsDiv.innerHTML = "";

  if (isNaN(subjectCount) || subjectCount <= 0) return;

  for (let i = 1; i <= subjectCount; i++) {
    inputsDiv.innerHTML += `
      <div style="margin-bottom: 10px;">
        <label>Subject ${i} - Credits:</label>
        <input type="number" class="credit" id="sem${semNum}-sub${i}-credits" min="1" />
        <label>Grade:</label>
        <select class="grade" id="sem${semNum}-sub${i}-grade">
          <option value="">Select</option>
          ${Object.keys(gradeToPoints).map(g => `<option value="${g}">${g}</option>`).join('')}
        </select>
      </div>
    `;
  }
}

calcBtn.addEventListener("click", () => {
  let totalPoints = 0;
  let totalCredits = 0;
  semesterWiseCGPA = [];

  const semesters = parseInt(document.getElementById("numSemesters")?.value);

  for (let s = 1; s <= semesters; s++) {
    const subCount = parseInt(document.getElementById(`subjects-${s}`)?.value);
    if (!subCount) continue;

    let semPoints = 0;
    let semCredits = 0;

    for (let i = 1; i <= subCount; i++) {
      const creditEl = document.getElementById(`sem${s}-sub${i}-credits`);
      const gradeEl = document.getElementById(`sem${s}-sub${i}-grade`);

      if (!creditEl || !gradeEl) continue;

      const credits = parseInt(creditEl.value);
      const grade = gradeEl.value.trim().toUpperCase();

      if (grade in gradeToPoints) {
        semPoints += credits * gradeToPoints[grade];
        semCredits += credits;

        gradeEl.style.backgroundColor = getGradeColor(grade);
      }
    }

    if (semCredits > 0) {
      semesterWiseCGPA.push((semPoints / semCredits).toFixed(2));
    } else {
      semesterWiseCGPA.push(null);
    }

    totalPoints += semPoints;
    totalCredits += semCredits;
  }

  const result = document.getElementById("result");
  if (totalCredits === 0) {
    result.textContent = "No valid inputs to calculate CGPA.";
    convertBtn10.style.display = "none";
    percentage10.textContent = "";
  } else {
    const cgpa = totalPoints / totalCredits;
    result.textContent = `Your CGPA is: ${cgpa.toFixed(2)}`;
    convertBtn10.style.display = "inline-block";
    percentage10.textContent = "";
    triggerConfetti();
  }
});
convertBtn10.addEventListener("click", () => {
  const cgpaText = document.getElementById("result").textContent;
  const match = cgpaText.match(/([\d.]+)/);
  if (match) {
    const cgpa = parseFloat(match[1]);
    const percentage = cgpa * 9.5;
    percentage10.textContent = `Your Percentage is: ${percentage.toFixed(2)}%`;
  }
});

progressBtn.addEventListener("click", () => {
  drawCGPAChart(semesterWiseCGPA);
  document.getElementById("page2").style.display = "none";
  document.getElementById("page3").style.display = "flex";

  const finalText = document.getElementById("result").textContent;
  document.getElementById("finalCGPAReportText").textContent = finalText;

  const list = document.getElementById("sgpaList");
  list.innerHTML = "";
  semesterWiseCGPA.forEach((sgpa, index) => {
    const li = document.createElement("li");
    li.textContent = `Semester ${index + 1} SGPA: ${sgpa}`;
    list.appendChild(li);
  });
});

backBtn.addEventListener("click", () => {
  document.getElementById("page3").style.display = "none";
  document.getElementById("page2").style.display = "flex";
});

downloadBtn.addEventListener("click", () => {
  const chartCanvas = document.getElementById("cgpaChart");
  const finalText = document.getElementById("finalCGPAReportText").textContent;
  const sgpaList = semesterWiseCGPA.map((sgpa, i) => `Semester ${i + 1} SGPA: ${sgpa}`).join("\n");


  const container = document.createElement("div");
container.style.textAlign = "center";
container.style.fontFamily = "Arial, sans-serif";

const cgpaPara = document.createElement("p");
cgpaPara.textContent = finalText;
cgpaPara.style.fontSize = "24px";
cgpaPara.style.fontWeight = "bold";
cgpaPara.style.marginBottom = "20px";

const sgpaPara = document.createElement("pre");
sgpaPara.textContent = sgpaList;
sgpaPara.style.fontSize = "18px";
sgpaPara.style.textAlign = "center";
sgpaPara.style.whiteSpace = "pre-wrap";


const clonedCanvas = chartCanvas.cloneNode(true);
clonedCanvas.style.display = "block";
clonedCanvas.style.margin = "20px auto"; // centers the canvas
clonedCanvas.style.maxWidth = "80%";

const ctx = clonedCanvas.getContext("2d");
ctx.drawImage(chartCanvas, 0, 0);


  container.appendChild(cgpaPara);
  container.appendChild(sgpaPara);
  container.appendChild(clonedCanvas);

  const opt = {
    margin: 0.5,
    filename: 'CGPA_Report.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  if (typeof html2pdf !== "undefined") {
    html2pdf().set(opt).from(container).save();
  } else {
    alert("PDF library not loaded. Please include html2pdf.js in your project.");
  }
});

function drawCGPAChart(data) {
  const canvas = document.getElementById("cgpaChart");
  const ctx = canvas.getContext("2d");

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map((_, i) => `Sem ${i + 1}`),
      datasets: [{
        label: "CGPA",
        data: data,
        backgroundColor: "rgba(31, 144, 95, 0.2)",
        borderColor: "#1f905f",
        borderWidth: 2,
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: false,
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          max: 10
        }
      }
    }
  });

  canvas.style.display = "block";
}

function getGradeColor(grade) {
  const colors = {
    "O": "#00c853",
    "A+": "#64dd17",
    "A": "#aeea00",
    "B+": "#ffd600",
    "B": "#ffab00",
    "C+": "#ff6d00",
    "C": "#ff3d00",
    "D": "#d50000",
    "F": "#b71c1c"
  };
  return colors[grade] || "white";
}

function triggerConfetti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}
// PAGE 4 BUTTONS
clearBtn4.addEventListener("click", () => {
  const creditInputs = document.querySelectorAll(".gpa-credits");
  const gradeSelects = document.querySelectorAll(".gpa-val");
  const subjectCountInputs = document.querySelectorAll(".num-subjects");
  const subjectContainers = document.querySelectorAll(".subjects-container");

  creditInputs.forEach(input => input.value = "");
  gradeSelects.forEach(select => select.selectedIndex = 0);
  subjectCountInputs.forEach(input => input.value = "");  // ✅ Clear subject count
  subjectContainers.forEach(div => div.innerHTML = "");   // ✅ Remove subject blocks
  document.getElementById("gpa4Result").textContent = "";
});


goBackBtn4.addEventListener("click", () => {
  document.getElementById("page4").style.display = "none";
  document.getElementById("page1").style.display = "flex";
});


calcBtn4.addEventListener("click", () => {
  semesterWiseGPA4 = [];
  let totalGradePoints = 0;
  let totalCredits = 0;

  const semesters = document.querySelectorAll(".semester-block");
  semesters.forEach((semBlock) => {
    let semTotal = 0;
    let semCredits = 0;
    const entries = semBlock.querySelectorAll(".gpa4-entry");
    entries.forEach((row) => {
      const grade = row.querySelector(".gpa-val").value;
      const credits = parseFloat(row.querySelector(".gpa-credits").value);
      if (grade in usGradeToPoints && !isNaN(credits)) {
        const gradePoint = usGradeToPoints[grade];
        semTotal += gradePoint * credits;
        semCredits += credits;
      }
    });
    if (semCredits > 0) {
      semesterWiseGPA4.push((semTotal / semCredits).toFixed(2));
      totalGradePoints += semTotal;
      totalCredits += semCredits;
    } else {
      semesterWiseGPA4.push(null);
    }
  });

  const result = document.getElementById("gpa4Result");
  if (totalCredits === 0) {
    result.textContent = "Invalid input.";
    convertBtn4.style.display = "none";
    percentage4.textContent = "";
  return;
  }

  const finalGPA = (totalGradePoints / totalCredits).toFixed(2);
  result.textContent = `Your GPA is: ${finalGPA}`;
  convertBtn4.style.display = "inline-block";
  percentage4.textContent = "";
  if (typeof confetti === "function") {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
  }
});
convertBtn4.addEventListener("click", () => {
  const gpaText = document.getElementById("gpa4Result").textContent;
  const match = gpaText.match(/([\d.]+)/);
  if (match) {
    const gpa = parseFloat(match[1]);
    const percentage = (gpa / 4.0) * 100;
    percentage4.textContent = `Your Percentage is: ${percentage.toFixed(2)}%`;
  }
});
progressBtn4.addEventListener("click", () => {
  drawCGPAChart4(semesterWiseGPA4.map(g => g || 0));
  document.getElementById("page4").style.display = "none";
  document.getElementById("page5").style.display = "flex";

  const validGpas = semesterWiseGPA4.filter(g => g !== null).map(g => parseFloat(g));
  const gpa = (validGpas.reduce((a, b) => a + b, 0) / validGpas.length).toFixed(2);
  document.getElementById("finalCGPAReportText4").textContent = `Your GPA is: ${gpa}`;

  const list = document.getElementById("sgpaList4");
  list.innerHTML = "";
  semesterWiseGPA4.forEach((g, i) => {
    const li = document.createElement("li");
    li.textContent = `Semester ${i + 1} GPA: ${g || "N/A"}`;
    list.appendChild(li);
  });
});

backBtn4.addEventListener("click", () => {
  document.getElementById("page5").style.display = "none";
  document.getElementById("page4").style.display = "flex";
});

downloadBtn4.addEventListener("click", () => {
  const container = document.createElement("div");
  container.style.textAlign = "center";
  container.style.fontFamily = "Arial, sans-serif";

  const gpaText = document.getElementById("finalCGPAReportText4").textContent;
  const sgpaList = semesterWiseGPA4.map((g, i) => `Semester ${i + 1} GPA: ${g}`).join("\n");

  const para = document.createElement("p");
  para.textContent = gpaText;
  para.style.fontSize = "24px";
  container.appendChild(para);

  const pre = document.createElement("pre");
  pre.textContent = sgpaList;
  container.appendChild(pre);

  const chartCanvas = document.getElementById("cgpaChart4");
  const clonedCanvas = chartCanvas.cloneNode(true);
  clonedCanvas.style.display = "block";
  clonedCanvas.style.margin = "20px auto";

  const ctx = clonedCanvas.getContext("2d");
  ctx.drawImage(chartCanvas, 0, 0);
  container.appendChild(clonedCanvas);

  html2pdf().from(container).save("GPA_Report_4Point.pdf");
});

function drawCGPAChart4(data) {
  const canvas = document.getElementById("cgpaChart4");
  const ctx = canvas.getContext("2d");

  if (chartInstance4) chartInstance4.destroy();

  chartInstance4 = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map((_, i) => `Sem ${i + 1}`),
      datasets: [{
        label: "GPA",
        data: data,
        backgroundColor: "rgba(31, 144, 95, 0.2)",
        borderColor: "#1f905f",
        borderWidth: 2,
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: false,
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          max: 4
        }
      }
    }
  });

  canvas.style.display = "block";
}



// PAGE 6 BUTTONS
clearBtn6.addEventListener("click", () => {
  const marksInputs = document.querySelectorAll(".percentage-marks");
  const creditInputs = document.querySelectorAll(".percentage-credits");
  const subjectCountInputs = document.querySelectorAll(".num-subjects");
  const subjectContainers = document.querySelectorAll("#page6 .percentage-entry");

  marksInputs.forEach(input => input.value = "");
  creditInputs.forEach(input => input.value = "");
  subjectCountInputs.forEach(input => input.value = "");
  subjectContainers.forEach(entry => entry.remove());
  document.getElementById("percentageResult").textContent = "";
});

goBackBtn6.addEventListener("click", () => {
  document.getElementById("page6").style.display = "none";
  document.getElementById("page1").style.display = "flex";
});

calcBtn6.addEventListener("click", () => {
  weightedPercentageData = [];
  let totalWeightedMarks = 0;
  let totalCredits = 0;

  const semesters = document.querySelectorAll("#page6 [id^='sem6-']");
  semesters.forEach((semBlock, index) => {
    let semTotal = 0;
    let semCredits = 0;
    const entries = semBlock.querySelectorAll(".percentage-entry");

    entries.forEach((row) => {
      const marks = parseFloat(row.querySelector(".percentage-marks").value);
      const credits = parseFloat(row.querySelector(".percentage-credits").value);
      if (!isNaN(marks) && !isNaN(credits)) {
        semTotal += marks * credits;
        semCredits += credits;
      }
    });

    if (semCredits > 0) {
      const percentage = semTotal / semCredits;
      weightedPercentageData.push(percentage.toFixed(2));
      totalWeightedMarks += semTotal;
      totalCredits += semCredits;
    } else {
      weightedPercentageData.push(null);
    }
  });

  const result = document.getElementById("percentageResult");
  if (totalCredits === 0) {
    result.textContent = "Invalid input.";
    return;
  }

  const finalPercentage = (totalWeightedMarks / totalCredits).toFixed(2);
  result.textContent = `Your Weighted Percentage is: ${finalPercentage}%`;

  if (typeof confetti === "function") {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
  }
});

progressBtn6.addEventListener("click", () => {
  drawPercentageChart(weightedPercentageData.map(p => p || 0));
  document.getElementById("page6").style.display = "none";
  document.getElementById("page7").style.display = "flex";

  const validPercentages = weightedPercentageData.filter(p => p !== null).map(p => parseFloat(p));
  const final = (validPercentages.reduce((a, b) => a + b, 0) / validPercentages.length).toFixed(2);
  document.getElementById("finalPercentageReportText").textContent = `Your Average Weighted Percentage is: ${final}%`;
  document.getElementById("finalPercentageReportText").style.display = "none";

  const list = document.getElementById("percentageList");
  list.innerHTML = "";
  list.style.display = "block";
  weightedPercentageData.forEach((p, i) => {
    const li = document.createElement("li");
    li.textContent = `Semester ${i + 1} Percentage: ${p || "N/A"}`;
    list.appendChild(li);
    document.getElementById("percentageList").style.display = "none";
  });
});

backBtn6.addEventListener("click", () => {
  document.getElementById("page7").style.display = "none";
  document.getElementById("page6").style.display = "flex";
});

downloadBtn6.addEventListener("click", () => {
  const container = document.createElement("div");
  container.style.textAlign = "center";
  container.style.fontFamily = "Arial, sans-serif";

  const percentageText = document.getElementById("finalPercentageReportText").textContent;
  const percentageListText = weightedPercentageData.map((p, i) => `Semester ${i + 1} Percentage: ${p}`).join("\n");

  const para = document.createElement("p");
  para.textContent = percentageText;
  para.style.fontSize = "24px";
  container.appendChild(para);

  const pre = document.createElement("pre");
  pre.textContent = percentageListText;
  container.appendChild(pre);

  const chartCanvas = document.getElementById("percentageChart");
  const clonedCanvas = chartCanvas.cloneNode(true);
  clonedCanvas.style.display = "block";
  clonedCanvas.style.margin = "20px auto";

  const ctx = clonedCanvas.getContext("2d");
  ctx.drawImage(chartCanvas, 0, 0);
  container.appendChild(clonedCanvas);

  html2pdf().from(container).save("Weighted_Percentage_Report.pdf");
});

function drawPercentageChart(data) {
  const canvas = document.getElementById("percentageChart");
  const ctx = canvas.getContext("2d");

  if (window.percentageChartInstance) {
    window.percentageChartInstance.destroy();
  }

  window.percentageChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map((_, i) => `Sem ${i + 1}`),
      datasets: [{
        label: "Weighted Percentage",
        data: data,
        backgroundColor: "rgba(31, 144, 95, 0.2)",
        borderColor: "#1f905f",
        borderWidth: 2,
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: false,
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          max: 100
        }
      }
    }
  });

  canvas.style.display = "block";
}



const semesterInput = document.getElementById("numSemesters");
semesterInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    startBtn.click();
  }
});

