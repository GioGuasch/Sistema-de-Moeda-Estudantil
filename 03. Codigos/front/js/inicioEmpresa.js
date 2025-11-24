const userIcon = document.getElementById("userIcon");
const userDropdown = document.getElementById("userDropdown");

userIcon.addEventListener("click", () => {
    userDropdown.style.display = 
        userDropdown.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", (e) => {
    if (!userIcon.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.style.display = "none";
    }
});