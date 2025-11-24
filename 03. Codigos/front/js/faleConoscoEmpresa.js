document.addEventListener("DOMContentLoaded", () => {
    const faqs = document.querySelectorAll(".faq");

    faqs.forEach(faq => {
        const question = faq.querySelector(".faq-question");
        const answer = faq.querySelector(".faq-answer");

        question.addEventListener("click", () => {
            const isOpen = answer.style.display === "block";
            document.querySelectorAll(".faq-answer").forEach(a => a.style.display = "none");

            answer.style.display = isOpen ? "none" : "block";
        });
    });
    const userIcon = document.getElementById("userIcon");
    const userDropdown = document.getElementById("userDropdown");

    userIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        userDropdown.style.display = userDropdown.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", (e) => {
        if (!userIcon.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.style.display = "none";
        }
    });
});
