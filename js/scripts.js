document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       SCROLL SUAVE PARA ÂNCORAS
    ========================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* =========================
       VALIDAÇÃO SIMPLES DE FORMULÁRIOS
    ========================== */
    const forms = document.querySelectorAll("form");

    forms.forEach(form => {
        form.addEventListener("submit", function (e) {

            const requiredFields = form.querySelectorAll("[required]");
            let valid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = "#dc3545";
                    valid = false;
                } else {
                    field.style.borderColor = "";
                }
            });

            if (!valid) {
                e.preventDefault();
                alert("Por favor, preencha todos os campos obrigatórios.");
            }
        });
    });

});
