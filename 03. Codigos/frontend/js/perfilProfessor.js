document.querySelectorAll('.editar-icone-menor').forEach(icon => {
    icon.addEventListener('click', () => {
        const input = icon.parentElement.querySelector('input, select');
        if (input) {
            input.disabled = !input.disabled;
            if (!input.disabled) input.focus();
        }
    });
});

document.querySelectorAll('.toggle-senha').forEach(eye => {
    eye.addEventListener('click', () => {
        const input = eye.previousElementSibling;
        if (input.type === "password") {
            input.type = "text";
            eye.classList.replace("fa-eye", "fa-eye-slash");
        } else {
            input.type = "password";
            eye.classList.replace("fa-eye-slash", "fa-eye");
        }
    });
});
