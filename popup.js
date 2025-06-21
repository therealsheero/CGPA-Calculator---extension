// const gradeToPoints = {
//   "O": 10,
//   "A+": 10,
//   "A": 9,
//   "B+": 8,
//   "B": 7,
//   "C+": 6,
//   "C": 5,
//   "D": 4,
//   "F": 0
// };

// document.getElementById("startBtn").addEventListener("click", () => {
//   const numSemesters = parseInt(document.getElementById("numSemesters").value);
//   const inputSection = document.getElementById("inputSection");
//   inputSection.innerHTML = "";

//   if (isNaN(numSemesters) || numSemesters <= 0) return;

//   for (let s = 1; s <= numSemesters; s++) {
//     const semDiv = document.createElement("div");
//     semDiv.innerHTML = `
//       <h4>Semester ${s}</h4>
//       <label>Number of Subjects:</label>
//       <input type="number" id="subjects-${s}" min="1" />
//       <button type="button" id="addBtn-${s}">Add Subjects</button>
//       <div id="sem-${s}-inputs"></div>
//     `;
//     inputSection.appendChild(semDiv);

//     setTimeout(() => {
//       const btn = document.getElementById(`addBtn-${s}`);
//       if (btn) {
//         btn.addEventListener("click", () => addSubjects(s));
//       }
//     }, 0);
//   }

//   document.getElementById("page1").style.display = "none";
//   document.getElementById("page2").style.display = "flex";

//   document.getElementById("calcBtn").style.display = "block";
// });
// document.getElementById("numSemesters").addEventListener("keydown", (event) => {
//   if (event.key === "Enter") {
//     document.getElementById("startBtn").click();
//   }
// });

// document.getElementById("editBtn").addEventListener("click", () => {
//   document.getElementById("page2").style.display = "none";
//   document.getElementById("page1").style.display = "flex";
// });
// document.getElementById("clearBtn").addEventListener("click", () => {
//   // Loop through all input fields in inputSection
//   const inputSection = document.getElementById("inputSection");
//   const inputs = inputSection.querySelectorAll("input");

//   inputs.forEach(input => {
//     if (input.type === "number" || input.type === "text") {
//       input.value = "";
//     }
//   });

//   // Clear CGPA result
//   document.getElementById("result").textContent = "";
// });



// function addSubjects(semNum) {
//   const subjectCount = parseInt(document.getElementById(`subjects-${semNum}`).value);
//   const inputsDiv = document.getElementById(`sem-${semNum}-inputs`);
//   inputsDiv.innerHTML = "";

//   if (isNaN(subjectCount) || subjectCount <= 0) return;

//   for (let i = 1; i <= subjectCount; i++) {
//     inputsDiv.innerHTML += `
//       <div style="margin-bottom: 10px;">
//         <label>Subject ${i} - Credits:</label>
//         <input type="number" class="credit" id="sem${semNum}-sub${i}-credits" min="1" />
//         <label>Grade:</label>
//         <input type="text" class="grade" id="sem${semNum}-sub${i}-grade" />
//       </div>
//     `;
//   }
// }

// document.getElementById("calcBtn").addEventListener("click", () => {
//   let totalPoints = 0;
//   let totalCredits = 0;
//   const semesters = parseInt(document.getElementById("numSemesters").value);

//   for (let s = 1; s <= semesters; s++) {
//     const subCount = parseInt(document.getElementById(`subjects-${s}`).value);
//     if (!subCount) continue;

//     for (let i = 1; i <= subCount; i++) {
//       const creditEl = document.getElementById(`sem${s}-sub${i}-credits`);
//       const gradeEl = document.getElementById(`sem${s}-sub${i}-grade`);

//       if (creditEl && gradeEl) {
//         const credits = parseInt(creditEl.value);
//         const grade = gradeEl.value.trim().toUpperCase();

//         if (grade in gradeToPoints) {
//           totalPoints += credits * gradeToPoints[grade];
//           totalCredits += credits;
//         }
//       }
//     }
//   }

//   const result = document.getElementById("result");
//   if (totalCredits === 0) {
//     result.textContent = "No valid inputs to calculate CGPA.";
//   } else {
//     const cgpa = totalPoints / totalCredits;
//     result.textContent = `Your CGPA is: ${cgpa.toFixed(2)}`;
//   }
// });
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

let semesterWiseCGPA = [];
let chartInstance = null;

const startBtn = document.getElementById("startBtn");
const calcBtn = document.getElementById("calcBtn");
const editBtn = document.getElementById("editBtn");
const clearBtn = document.getElementById("clearBtn");
const progressBtn = document.getElementById("progressBtn");
const backBtn = document.getElementById("backBtn");

// startBtn.addEventListener("click", () => {
//   const numSemesters = parseInt(document.getElementById("numSemesters").value);
//   const inputSection = document.getElementById("inputSection");
//   inputSection.innerHTML = "";
//   semesterWiseCGPA = [];

//   if (isNaN(numSemesters) || numSemesters <= 0) return;

//   for (let s = 1; s <= numSemesters; s++) {
//     const semDiv = document.createElement("div");
//     semDiv.innerHTML = `
//       <h4>Semester ${s}</h4>
//       <label>Number of Subjects:</label>
//       <input type="number" id="subjects-${s}" min="1" />
//       <button type="button" id="addBtn-${s}">Add Subjects</button>
//       <div id="sem-${s}-inputs"></div>
//     `;
//     inputSection.appendChild(semDiv);

//     setTimeout(() => {
//       const btn = document.getElementById(`addBtn-${s}`);
//       if (btn) {
//         btn.addEventListener("click", () => addSubjects(s));
//       }
//     }, 0);
//   }

//   document.getElementById("page1").style.display = "none";
//   document.getElementById("page2").style.display = "flex";
//   calcBtn.style.display = "block";
// });

startBtn.addEventListener("click", () => {
  const numSemesters = parseInt(document.getElementById("numSemesters").value);
  const inputSection = document.getElementById("inputSection");
  inputSection.innerHTML = "";
  semesterWiseCGPA = [];

  // 🧹 Clear old result message here
  document.getElementById("result").textContent = "";

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

  calcBtn.style.display = "block";
});


editBtn.addEventListener("click", () => {
  document.getElementById("page2").style.display = "none";
  document.getElementById("page1").style.display = "flex";
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
    const subjectHTML = `
      <div style="margin-bottom: 10px;">
        <label>Subject ${i} - Credits:</label>
        <input type="number" class="credit" id="sem${semNum}-sub${i}-credits" min="1" />
        <label>Grade:</label>
        <select class="grade" id="sem${semNum}-sub${i}-grade">
          <option value="">Select</option>
          <option value="O">O</option>
          <option value="A+">A+</option>
          <option value="A">A</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="C+">C+</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="F">F</option>
          <option value="AU">AU</option>
          <option value="W">W</option>
          <option value="X">X</option>
          <option value="I">I</option>
        </select>
      </div>
    `;
    inputsDiv.innerHTML += subjectHTML;
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
      const grade = gradeEl.value;

      // Skip non-credit grades
      if (!grade || isNaN(credits)) continue;
      if (!(grade in gradeToPoints)) continue;

      semPoints += credits * gradeToPoints[grade];
      semCredits += credits;

      gradeEl.style.backgroundColor = getGradeColor(grade);
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
  } else {
    const cgpa = totalPoints / totalCredits;
    result.textContent = `Your CGPA is: ${cgpa.toFixed(2)}`;
    triggerConfetti();
  }
});

progressBtn.addEventListener("click", () => {
  drawCGPAChart(semesterWiseCGPA);
  document.getElementById("page2").style.display = "none";
  document.getElementById("page3").style.display = "flex";
});

backBtn.addEventListener("click", () => {
  document.getElementById("page3").style.display = "none";
  document.getElementById("page2").style.display = "flex";
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
    "F": "#b71c1c",
    "AU": "#888",
    "W": "#888",
    "X": "#888",
    "I": "#888"
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

// Enter key triggers Start
document.getElementById("numSemesters").addEventListener("keydown", (e) => {
  if (e.key === "Enter") startBtn.click();
});
