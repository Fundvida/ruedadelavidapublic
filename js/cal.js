  
  const monthAlpha = document.getElementById("monthAlpha");
  const monthOmega = document.getElementById("monthOmega");
  const dateAlpha = document.getElementById("dateAlpha");
  const dateOmega = document.getElementById("dateOmega");
  const message = document.getElementById("message");
  
  dateAlpha.addEventListener("click", () => {
    monthAlpha.disabled = true;
    monthOmega.disabled = true;
    message.innerHTML = "Los campos de mes han sido deshabilitados.";
  });
  
  dateOmega.addEventListener("click", () => {
    monthAlpha.disabled = true;
    monthOmega.disabled = true;
    message.innerHTML = "Los campos de mes han sido deshabilitados.";
  });

  monthAlpha.addEventListener("change", () => {
    dateAlpha.disabled = true;
    dateOmega.disabled = true;
    message.innerHTML = "Los campos de fecha han sido deshabilitados.";
  });
  
  monthOmega.addEventListener("change", () => {
    dateAlpha.disabled = true;
    dateOmega.disabled = true;
    message.innerHTML = "Los campos de fecha han sido deshabilitados.";
  });
  
$(function () {
    $("[data-format]").click(function (event) {
      var input = {
        title: $("#title").val(),
        description: $("#description").val(),
        dateAlpha: $("#dateAlpha")
          .val()
          .replace(/[^0-9]+/g, ""),
        dateOmega: $("#dateOmega")
          .val()
          .replace(/[^0-9]+/g, ""),
        timeAlpha: $("#timeAlpha")
          .val()
          .replace(/[^0-9]+/g, ""),
        timeOmega: $("#timeOmega")
          .val()
          .replace(/[^0-9]+/g, ""),
        monthAlpha: $("#monthAlpha").val(),
        monthOmega: $("#monthOmega").val(),
      };
      //limpiar los valores de los campos del formulario después de 2 minutos
      setTimeout(function () {
        $(
          ".form-evaluacionFinal input[type='text'], .form-evaluacionFinal textarea, .form-evaluacionFinal input[type='date'], .form-evaluacionFinal input[type='time'], .form-evaluacionFinal input[type='month']"
        ).val("");
      }, 6000); // 120000 = 2 minutos en milisegundos
  
      //valores de los meses
      if (input.monthAlpha && input.monthOmega) {
        input.dateAlpha = input.monthAlpha + "-01";
        input.dateOmega = input.monthOmega + "-01";
        var omegaDate = new Date(input.dateOmega);
        omegaDate.setMonth(omegaDate.getMonth() + 1);
        input.dateOmega = omegaDate.toISOString().substring(0, 10);
      } else {
        if (input.dateAlpha && input.dateOmega) {
          input.dateAlpha = input.dateAlpha;
          input.dateOmega = input.dateOmega;
        } else {
          input.dateAlpha = "";
          input.dateOmega = "";
        }
      };
      
      input.getAlpha = function () {
        var result = this.dateAlpha;
  
        if (this.timeAlpha != "") {
          result += "T" + this.timeAlpha + "00";
        }
  
        return result;
      };
  
      input.getOmega = function () {
        var result = this.dateOmega;
  
        if (this.timeOmega != "") {
          result += "T" + this.timeOmega + "00";
        }
  
        return result;
      };
  
      input.getTimeAlpha = function () {
        if (this.timeAlpha != "") {
          return "T" + this.timeAlpha + "00";
        }
  
        return "";
      };
  
      input.getTimeOmega = function () {
        if (this.timeOmega != "") {
          return "T" + this.timeOmega + "00";
        }
  
        return "";
      };
  
      // Validación para verificar que todos los campos del formulario estén llenos
      if (
        (input.title && input.description && input.dateAlpha) ||
        (input.monthAlpha && input.dateOmega) ||
        (input.monthOmega && input.timeAlpha && input.timeOmega)
      ) {
        if ($(this).data("format") === "google") {
          var data = [
            "action=TEMPLATE",
            "text=" + encodeURIComponent(input.title),
            "dates=" + input.getAlpha() + "/" + input.getOmega(),
            // ||
            //  + input.getalpha() + "/" + input.getomega(),
            "details=" + encodeURIComponent(input.description),
            "ctz=US/Central",
          ];
  
          $(this).attr(
            "href",
            "https://www.google.com/calendar/event?" + data.join("&")
          );
        } else if ($(this).data("format") === "ical") {
          var data = [
            "BEGIN:VCALENDAR",
            "BEGIN:VEVENT",
            "UID:" + Math.random().toString(36).substring(8),
            "SEQUENCE:0",
            "TRANSP:OPAQUE",
            "DTSTART;TZID=US/Central:" + input.dateAlpha + input.getTimeAlpha(),
            "DTEND;TZID=US/Central:" + input.dateAlpha + input.getTimeOmega(),
            "RRULE:FREQ=DAILY;UNTIL=" + input.getOmega(),
            "SUMMARY:" + input.title,
            // "LOCATION:" + input.location,
            "DESCRIPTION:" + input.description.replace(/\n/g, "\n"),
            "END:VEVENT",
            "END:VCALENDAR",
          ];
  
          $(this)
            .attr("download", "event.ics")
            .attr(
              "href",
              "data:text/calendar;charset=utf8," + escape(data.join("\n"))
            );
        }
        
      } else {
        message.innerHTML = "Por favor complete todos los campos del formulario.";
      }
    });
  });
