
window.addEventListener("DOMContentLoaded", () => {
    eliminarFieldsets();
});

    let eliminarFieldsets = () => {
        let deletedSections = localStorage.getItem("deletedSections1");
        if (deletedSections) {
        deletedSections = JSON.parse(deletedSections);

        let form = document.getElementById("msform");
        let fieldsets = form.querySelectorAll("fieldset");

        deletedSections.forEach((section) => {
            let fieldset = form.querySelector(`fieldset#${section.name}`);
            if (fieldset) {
            fieldset.remove();
            }
        });
        }
    };


