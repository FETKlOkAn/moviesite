const questions = [
    {
        question: "Who directed the movie 'Inception'?",
        options: ["A. Christopher Nolan", "B. Steven Spielberg", "C. James Cameron", "D. Quentin Tarantino"],
        answer: "A"
    },
    {
        question: "Which movie won the Best Picture Oscar in 2020?",
        options: ["A. 1917", "B. Parasite", "C. Joker", "D. Once Upon a Time in Hollywood"],
        answer: "B"
    },
    {
        question: "Who played the character of Jack Dawson in 'Titanic'?",
        options: ["A. Brad Pitt", "B. Tom Cruise", "C. Leonardo DiCaprio", "D. Johnny Depp"],
        answer: "C"
    },
    {
        question: "Which movie features the quote 'Here's looking at you, kid'?",
        options: ["A. Casablanca", "B. Gone with the Wind", "C. The Godfather", "D. Citizen Kane"],
        answer: "A"
    },
    {
        question: "What is the name of the hobbit played by Elijah Wood in 'The Lord of the Rings'?",
        options: ["A. Frodo Baggins", "B. Samwise Gamgee", "C. Peregrin Took", "D. Meriadoc Brandybuck"],
        answer: "A"
    },
    {
        question: "Which actress played Katniss Everdeen in 'The Hunger Games' series?",
        options: ["A. Emma Watson", "B. Scarlett Johansson", "C. Jennifer Lawrence", "D. Anne Hathaway"],
        answer: "C"
    }
];

$(document).ready(function () {
    let quizContent = '';
    questions.forEach((question, index) => {
        quizContent += `
            <div class="card mb-3 p-3">
                <h5>${index + 1}. ${question.question}</h5>
                ${question.options.map((option, i) => `
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="question${index}" id="q${index}o${i}" value="${option[0]}">
                        <label class="form-check-label" for="q${index}o${i}">
                            ${option}
                        </label>
                    </div>
                `).join('')}
            </div>
        `;
    });
    $('#quiz').html(quizContent);

    $('.form-check-input').change(function() {
        $(this).closest('.card').addClass('bg-light');
    });

    $('#submit-btn').click(function () {
        let score = 0;
        questions.forEach((question, index) => {
            const selectedOption = $(`input[name="question${index}"]:checked`).val();
            if (selectedOption === question.answer) {
                score++;
                $(`#quiz .card:eq(${index})`).addClass('border-success');
            } else {
                $(`#quiz .card:eq(${index})`).addClass('border-danger');
            }
        });

        $('#result').html(`
            <div class="alert alert-info">
                You scored ${score} out of ${questions.length}.
            </div>
        `);

        // Scroll to result
        $('html, body').animate({
            scrollTop: $("#result").offset().top
        }, 1000);
    });
});
