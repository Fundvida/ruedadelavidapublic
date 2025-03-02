
document.querySelector(".box-2").classList.add("hidden");

(function () {
    const controls = document.querySelectorAll(".control");
    const box2 = document.querySelector(".box-2");
    const homeControl = document.querySelector("[data-id='home']");
    
    controls.forEach(control => {
      control.addEventListener("click", function() {
        document.querySelector(".active-btn").classList.remove("active-btn");
        this.classList.add("active-btn");
        document.querySelector(".active").classList.remove("active");
        document.getElementById(control.dataset.id).classList.add("active");
        
        // Si el control activo es el de 'home', mostramos box-2, de lo contrario lo ocultamos
        if (control === homeControl) {
          box2.classList.remove("hidden");
        } else {
          box2.classList.add("hidden");
        }
      })
    });
    
    document.querySelector(".theme-btn").addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
    });
  })();

  