
let quizData = [];
let index = 0;
let correct = 0,
  incorrect = 0;
let questionBox = document.getElementById("questionBox");
let allInputs = document.querySelectorAll("input[type='radio']");

function getQuestions() {
  const category =  document.getElementById('categoryInput').value;

  // Replace this with actual API call to your backend
  fetch(`http://localhost:8080/question/category/${category}`)
    .then(response => response.json())
    .then(data => {
      quizData = data;
      console.log(quizData);
      total = quizData.length; // Update total after receiving data
      loadQuestion(); // Call loadQuestion after fetching data
    })
    .catch(error => console.error('Error fetching questions:', error));
}

document.querySelector("#submit").addEventListener("click", function () {
  const data = quizData[index];
  const ans = getAnswer();
  if (ans === data.rightAnswer) {
    correct++;
  } else {
    incorrect++;
  }
  index++;
  loadQuestion();
});

// document.querySelector("#add_questions").addEventListener("click", function () {
//    window.location.href = 'addQuestions.html';
//   });

const loadQuestion = () => {
  if (total === index) {
    return quizEnd();
  }
  reset();
  const data = quizData[index];
  questionBox.innerHTML = `${index + 1}) ${data.questionTitle}`;
  allInputs[0].nextElementSibling.innerText = data.option1;
  allInputs[1].nextElementSibling.innerText = data.option2;
  allInputs[2].nextElementSibling.innerText = data.option3;
  allInputs[3].nextElementSibling.innerText = data.option4;
};

const getAnswer = () => {
  let ans;
  allInputs.forEach((inputEl) => {
    if (inputEl.checked) {
    //   ans = inputEl.value;
      ans = inputEl.nextElementSibling.innerText.trim();
    }
  });
  return ans;
};

const reset = () => {
  allInputs.forEach((inputEl) => {
    inputEl.checked = false;
  });
};

const quizEnd = () => {
  document.getElementsByClassName("container")[0].innerHTML = `
    <div class="col">
        <h3 class="w-100"> Hii, you've scored ${correct} / ${total} </h3>
    </div>
  `;
};

document.querySelector("#start").addEventListener("click", function () {
    getQuestions(); // Call getQuestions to initiate the process
  });



addQuestion();

function addQuestion() {
    const questionTitle = document.getElementById('questionTitle').value;
    const option1 = document.getElementById('option1').value;
    const option2 = document.getElementById('option2').value;
    const option3 = document.getElementById('option3').value;
    const option4 = document.getElementById('option4').value;
    const rightAnswer = document.getElementById('rightAnswer').value;
    const difficultyLevel = document.getElementById('difficultyLevel').value;
    const category = document.getElementById('category').value;

    const newQuestion = {
        questionTitle,
        option1,
        option2,
        option3,
        option4,
        rightAnswer,
        difficultyLevel,
        category
    };

    // Assuming you have an API endpoint to add questions
    fetch('http://localhost:8080/question/add/question', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestion),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Question added successfully:', data);
        })
        .catch(error => console.error('Error adding question:', error));
}

