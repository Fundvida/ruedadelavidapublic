document.addEventListener("DOMContentLoaded", () => {
    const $button = document.querySelector("#downloadButtonpdf");
    $button.addEventListener("click", () => {
        const $elementoParaConvertir = document.querySelector("#dataTable");
        html2pdf()
            .set({
                margin: 1,
                fileName: 'plan_de_acción.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98,
                },
                html2canvas: {
                    scale: 3,
                    letterRendering: true,
                },
                jsPDF:{
                    unit: "in",
                    format: "a4",
                    orientation: 'portrait',
                }
            })
        .from($elementoParaConvertir)
        .save()
        .catch(err => console.log(err))
        .finally()
        .then(() => {
            console.log("guardado!!");
        });
    });
});