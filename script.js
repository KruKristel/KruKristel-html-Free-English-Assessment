console.log("JS LOADED");

// START TEST
function startTest(){
  const name = document.getElementById("studentName").value.trim();
  const age = document.getElementById("age").value;
  const classLevel = document.getElementById("classLevel").value;

  if(name === "" || age === "" || classLevel === ""){
    alert("Please complete all fields before starting.");
    return;
  }

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("test-screen").classList.remove("hidden");
}

// SIMPLE FEEDBACK (OVERALL ONLY)
function getFeedback(percent){
  if(percent >= 80){
    return "Excellent performance! You have strong English skills. You are ready for advanced speaking and real-life communication.";
  } else if(percent >= 50){
    return "Good foundation! You can communicate basic ideas, but you need more practice with grammar and fluency.";
  } else {
    return "You are starting your English journey. With guided lessons, you can improve quickly!";
  }
}

function getSmartFeedback(grammar, reading, listening){
  let strengths = [];
  let weaknesses = [];

  // Identify strengths (≥70)
  if(grammar >= 70) strengths.push("Grammar & Vocabulary");
  if(reading >= 70) strengths.push("Reading");
  if(listening >= 70) strengths.push("Listening");

  // Identify weaknesses (<50)
  if(grammar < 50) weaknesses.push("Grammar & Vocabulary");
  if(reading < 50) weaknesses.push("Reading");
  if(listening < 50) weaknesses.push("Listening");

  // Build feedback message
  let feedback = "";

  if(strengths.length > 0){
    feedback += `Strong performance in ${strengths.join(", ")}. `;
  }

  if(weaknesses.length > 0){
    feedback += `Needs improvement in ${weaknesses.join(", ")}. `;
  }

  // Add recommendation based on weakest area
  if(weaknesses.includes("Listening")){
    feedback += "Focus on listening practice using simple audio and repetition.";
  } 
  else if(weaknesses.includes("Grammar & Vocabulary")){
    feedback += "Review basic grammar structures and expand vocabulary.";
  } 
  else if(weaknesses.includes("Reading")){
    feedback += "Practice reading short passages daily to improve comprehension.";
  } 
  else {
    feedback += "Continue practicing speaking to build confidence and fluency.";
  }

  return feedback;
}

// SUBMIT TEST
function submitTest(){

  // VALIDATION (ALL QUESTIONS REQUIRED)
  for(let i = 1; i <= 30; i++){
  let answer = document.querySelector(`input[name="q${i}"]:checked`);
  let questionBox = document.querySelectorAll(".question")[i-1];

  if(!answer){
    questionBox.style.border = "2px solid red";
  } else {
    questionBox.style.border = "none";
  }
}

if(document.querySelectorAll("input:checked").length < 30){
  alert("Please answer all questions before submitting.");
  return;
}

  const name = document.getElementById("studentName").value;
  const age = document.getElementById("age").value;
  const classLevel = document.getElementById("classLevel").value;

  // CATEGORY SCORES
  let grammar = 0;
  let reading = 0;
  let listening = 0;

  for(let i=1;i<=15;i++){
    let ans = document.querySelector(`input[name="q${i}"]:checked`);
    if(ans) grammar += parseInt(ans.value);
  }

  for(let i=16;i<=20;i++){
    let ans = document.querySelector(`input[name="q${i}"]:checked`);
    if(ans) reading += parseInt(ans.value);
  }

  for(let i=21;i<=30;i++){
    let ans = document.querySelector(`input[name="q${i}"]:checked`);
    if(ans) listening += parseInt(ans.value);
  }

  const grammarPercent = (grammar / 15) * 100;
  const readingPercent = (reading / 5) * 100;
  const listeningPercent = (listening / 10) * 100;

  const totalScore = grammar + reading + listening;
  const totalPercent = (totalScore / 30) * 100;

  const feedback = getSmartFeedback(
  grammarPercent,
  readingPercent,
  listeningPercent
);

  // LINE MESSAGE
  const message = `
New Student Inquiry
Name: ${name}
Age: ${age}
Class Level: ${classLevel}

Grammar: ${grammarPercent.toFixed(0)}%
Reading: ${readingPercent.toFixed(0)}%
Listening: ${listeningPercent.toFixed(0)}%

Overall Score: ${totalPercent.toFixed(0)}%
`;

  const encodedMessage = encodeURIComponent(message);
  const lineLink = `https://line.me/R/msg/text/?${encodedMessage}`;

  // SHOW RESULT PAGE
  document.getElementById("test-screen").classList.add("hidden");

  document.getElementById("result-screen").classList.remove("hidden");
  document.getElementById("result-screen").innerHTML = `

    <h2>📊 Your Test Results</h2>

    <!-- STUDENT INFO -->
    <div class="info-row">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Age:</strong> ${age}</p>
      <p><strong>Class:</strong> ${classLevel}</p>
    </div>

    <!-- BREAKDOWN -->
    <div class="breakdown">
      <p>Grammar & Vocabulary: <strong>${grammarPercent.toFixed(0)}%</strong></p>
      <p>Reading: <strong>${readingPercent.toFixed(0)}%</strong></p>
      <p>Listening: <strong>${listeningPercent.toFixed(0)}%</strong></p>
    </div>

    <!-- OVERALL BOX -->
    <div class="overall-box">
      <h3>Overall Result: ${totalPercent.toFixed(0)}%</h3>
      <p>${feedback}</p>
    </div>

    <!-- MESSAGE -->
    <div class="message-box">
      <p>✨ Want to improve your English skills faster?</p>
      <p>Get personalized lessons and real speaking practice with Kru Kristel!</p>
    </div>

    <!-- CTA -->
    <div class="cta-box">
      <p class="flash">🔥 Book a class with Kru Kristel!</p>

      <a href="https://line.me/ti/p/RikGqAy8FA" target="_blank" class="line-btn">
        Book Now!
      </a>
    </div>

    <!-- EXTRA NOTE -->
    <div class="message-box">
      <p>🗣 Speaking and Writing test available upon booking a class.</p>
    </div>

    <p class="footer-text">See you soon! 👋</p>

  `;
}

// EXPORT
window.startTest = startTest;
window.submitTest = submitTest;

function goHome(){
  location.reload(); // reloads the page = homepage
}