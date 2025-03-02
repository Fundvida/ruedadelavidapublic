$(function () {
  $("[data-format]").click(function (event) {
    var input = {
      title: $("#title").val(),
      description: $("#description").val(),
      dateAlpha: $("#dateAlpha").val().replace(/[^0-9]+/g, ""),
      dateOmega: $("#dateOmega").val().replace(/[^0-9]+/g, ""),
      timeAlpha: $("#timeAlpha").val().replace(/[^0-9]+/g, ""),
      timeOmega: $("#timeOmega").val().replace(/[^0-9]+/g, ""),
    };

    //limpiar los valores de los campos del formulario después de 2 minutos
    setTimeout(function () {
      $(
        ".form-evaluacionFinal input[type='text'], .form-evaluacionFinal textarea, .form-evaluacionFinal input[type='date'], .form-evaluacionFinal input[type='time'], .form-evaluacionFinal input[type='month']"
      ).val("");
    }, 6000);


    input.getAlpha = function () {
      var result = this.dateAlpha;

      if (this.timeAlpha != '') {
        result += 'T' + this.timeAlpha + '00';
      }

      return result;
    };

    input.getOmega = function () {
      var result = this.dateOmega;

      if (this.timeOmega != '') {
        result += 'T' + this.timeOmega + '00';
      }

      return result;
    };

    input.getTimeAlpha = function () {
      if (this.timeAlpha != '') {
        return 'T' + this.timeAlpha + '00';
      }

      return '';
    };

    input.getTimeOmega = function () {
      if (this.timeOmega != '') {
        return 'T' + this.timeOmega + '00';
      }

      return '';
    };

    // Validación para verificar que todos los campos del formulario estén llenos
    if (
      (input.title && input.description && input.dateAlpha) ||
      (input.monthAlpha && input.dateOmega) ||
      (input.monthOmega && input.timeAlpha && input.timeOmega)
    ) {
      if ($(this).data('format') === 'google') {
        var data = [
          'action=TEMPLATE',
          'text=' + encodeURIComponent(input.title),
          'dates=' + input.getAlpha() + '/' + input.getOmega(),
          'details=' + encodeURIComponent(input.description),
          'ctz=US/Central' // Cambiar la zona horaria a Bolivia
        ];

        $(this).attr('href', 'https://www.google.com/calendar/event?' + data.join('&'));
      } else if ($(this).data('format') === 'ical') {
        var data = [
          'BEGIN:VCALENDAR',
          'BEGIN:VEVENT',
          'UID:' + Math.random().toString(36).substring(8),
          'SEQUENCE:0',
          'TRANSP:OPAQUE',
          'DTSTART;TZID=US/Central:' + input.dateAlpha + input.getTimeAlpha(), // Cambiar la zona horaria a Bolivia
          'DTEND;TZID=US/Central:' + input.dateAlpha + input.getTimeOmega(), // Cambiar la zona horaria a Bolivia
          'RRULE:FREQ=DAILY;UNTIL=' + input.getOmega(),
          'SUMMARY:' + input.title,
          'DESCRIPTION:' + input.description.replace(/\n/g, '\n'),
          'END:VEVENT',
          'END:VCALENDAR'
        ];

        $(this).attr('download', 'event.ics').attr('href', "data:text/calendar;charset=utf8," + escape(data.join("\n")));
      }
    } else {
      message.innerHTML = "Por favor complete todos los campos del formulario.";
    }
  });
});

