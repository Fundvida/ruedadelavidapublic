$(function () {
  $("[data-format]").click(function (event) {
    var input = {

      // title: $("#resultadosSelect").val(),
      // description: $("#description").val(),
      // dateAlpha: $("#dateAlpha").val().replace(/[^0-9]+/g, ""),
      // dateOmega: $("#dateOmega").val().replace(/[^0-9]+/g, ""),
      // timeAlpha: $("#timeAlpha").val().replace(/[^0-9]+/g, ""),
      // timeOmega: $("#timeOmega").val().replace(/[^0-9]+/g, ""),
      title: $("#resultadosSelect").val(),
      description: $("#description").val(),
      dateAlpha: moment($("#dateAlpha").val()).toDate(),
      dateOmega: moment($("#dateOmega").val()).toDate(),
      timeAlpha: moment( $("#timeAlpha").val() + "Z", "HH:mm").toDate(),
      timeOmega: moment( $("#timeOmega").val() + "Z", "HH:mm").toDate(),
    };

    //limpiar los valores de los campos del formulario después de 2 minutos
    setTimeout(function () {
      $(
        ".form-evaluacionFinal input[type='text'], .form-evaluacionFinal textarea, .form-evaluacionFinal input[type='date'], .form-evaluacionFinal input[type='time'], .form-evaluacionFinal input[type='month'], .form-evaluacionFinal select"
      ).val("");
    }, 6000);

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
      // Formatear las fechas y horas utilizando Moment.js
      var formattedDateAlpha = moment(input.dateAlpha).format("DD/MM/YYYY");
      var formattedDateOmega = moment(input.dateOmega).format("DD/MM/YYYY");
      var formattedTimeAlpha = moment(input.timeAlpha).format("HH:mm");
      var formattedTimeOmega = moment(input.timeOmega).format("HH:mm");
      //Agregar los datos a la tabla
      var newRow = $("<tr>");
        newRow.append($("<td>").text(input.title));
        newRow.append($("<td>").text(input.description));
        newRow.append($("<td>").text(formattedDateAlpha)); //
        newRow.append($("<td>").text(formattedDateOmega)); // 
        newRow.append($("<td>").text(formattedTimeAlpha)); // 
        newRow.append($("<td>").text(formattedTimeOmega));

      $("#dataTable tbody").append(newRow);

      if ($(this).data("format") === "google") {
        var data = [
          "action=TEMPLATE",
          "text=" + encodeURIComponent(input.title),
          "dates=" + input.getAlpha() + "/" + input.getOmega(),
          "details=" + encodeURIComponent(input.description),
          "ctz=US/Central", 
        ];
        $(this).attr(
          "href",
          "https://www.google.com/calendar/event?" + data.join("&")
        );
      }
    } else {
      alert("Por favor complete todos los campos del formulario.");
    }
});

  //$(function () { excel
    $("#downloadButton").click(function () {
      var tableData = [];

      $("#dataTable tbody tr").each(function () {
        var rowData = [];
        $(this)
          .find("td")
          .each(function () {
            rowData.push($(this).text());
          });
        tableData.push(rowData);
      });

      // Agregar títulos de columna
      tableData.unshift([
        "Título",
        "Actividad",
        "Fecha de inicio",
        "Fecha de fin",
      ]);

      // Generar el archivo Excel
      var worksheet = XLSX.utils.aoa_to_sheet(tableData);
      var workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      var workbookOutput = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "binary",
      });

      saveAs(
        new Blob([s2ab(workbookOutput)], { type: "application/octet-stream" }),
        "tabla.xlsx"
      );
    });
    // Función auxiliar para convertir cadena a matriz de bytes
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }
  });
