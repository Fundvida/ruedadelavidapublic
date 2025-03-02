let switchStatus = document.getElementById('switchStatus');
let togBtn = document.getElementById('togBtn');

if (togBtn.checked) {
  switchStatus.innerHTML = "Calendario Google Activado";
  switchStatus.style.color = "green";
} else {
  switchStatus.innerHTML = "Calendario Google Desactivado";
  switchStatus.style.color = "red";
}

togBtn.addEventListener('change', function () {
  if (this.checked) {
    switchStatus.innerHTML = "Calendario Google Activado";
    switchStatus.style.color = "green";
  } else {
    switchStatus.innerHTML = "Calendario Google Desactivado";
    switchStatus.style.color = "red";
  }
});
function checkInputsTemp() {
  let input1, input2, input3, input4;
  if (checkResultsStoredSection('input1Temp')) {
    input1 = readActAfterSignInReload('input1Temp');
  }
  if (checkResultsStoredSection('input1Temp')) {
    input2 = readActAfterSignInReload('input2Temp');
  }
  if (checkResultsStoredSection('input1Temp')) {
    input3 = readActAfterSignInReload('input3Temp');
  }
  if (checkResultsStoredSection('input1Temp')) {
    input4 = readActAfterSignInReload('input4Temp');
  }
}
function checkReload() {
  if (localStorage.getItem('reload')) {
    if (JSON.parse(localStorage.getItem('reload'))) {
      localStorage.setItem('reload', JSON.stringify(false));
      validateValues();
    }
  }
}
function signIn() {
  let oauth2EndPoint = "https://accounts.google.com/o/oauth2/v2/auth";
  let form = document.createElement("form");
  form.setAttribute("method", "GET");
  form.setAttribute("action", oauth2EndPoint);

  let params = {
    client_id:
      "colocar su client_id",
    redirect_uri: "http://localhost/ruedadelavida/pruebav1.html",
    response_type: "token",
    scope:
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar",
    include_granted_scopes: "true",
    state: "pass-through-value",
  };

  for (var p in params) {
    let input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", p);
    input.setAttribute("value", params[p]);
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
}
window.onload = function () {
  showInfo();
};

const prepEvent = (evento, inputName) => {
  let event = {
    summary: "Título del evento",
    description: "Descripción del evento",
    start: {
      dateTime: "2023-06-01T09:00:00-07:00",
    },
    end: {
      dateTime: "2023-06-01T17:00:00-07:00",
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };

  if (localStorage.getItem("authInfo")) {
    const info = JSON.parse(localStorage.getItem("authInfo"));
    addEventToCalendar(info["access_token"], evento, inputName);
  }
};

function showInfo() {
  let params = {};
  let regex = /([^&=]+)=([^&]*)/g,
    m;

  while ((m = regex.exec(location.href))) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  if (Object.keys(params).length > 0) {
    localStorage.setItem("authInfo", JSON.stringify(params));
    // verifyGoogleAccessToken(params["access_token"], event);
  }
  window.history.pushState(
    {},
    document.title,
    "/" + "ruedadelavida/pruebav1.html"
  );
  checkReload();
}

function logout() {
  if (localStorage.getItem("authInfo")) {
    const info = JSON.parse(localStorage.getItem("authInfo"));
    fetch(
      "https://oauth2.googleapis.com/revoke?token=" + info["access_token"],
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    ).then(() => {
      location.href = "http://localhost/ruedadelavida";
    });
  }
}

function logoutWithoutRedirecting() {
  if (localStorage.getItem("authInfo")) {
    const info = JSON.parse(localStorage.getItem("authInfo"));
    fetch(
      "https://oauth2.googleapis.com/revoke?token=" + info["access_token"],
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  }
}

let event = {
  summary: "Título del evento",
  description: "Descripción del evento",
  start: {
    dateTime: "2023-06-01T09:00:00-07:00",
  },
  end: {
    dateTime: "2023-06-01T17:00:00-07:00",
  },
  reminders: {
    useDefault: false,
    overrides: [
      { method: "email", minutes: 24 * 60 },
      { method: "popup", minutes: 10 },
    ],
  },
};
let events = [
  // Lista de objetos de eventos aquí
];

function createEvents(accessToken, events, calendarId = "primary") {
  events.forEach((event) => {
    addEventToCalendar(accessToken, calendarId, event);
  });
}

function addEventToCalendar(accessToken, evento, inputName, calendarId = 'primary') {
  let url = 'https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events';
  console.log(accessToken);
  fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(evento)
  })
    // .then(response => response.json())
    .then(response => { console.log(response) })
    .then(data => {
      console.log(evento);
      console.log(data);
      showNotification('Actividades Guardadas Correctamente');
      removeResultsSections(inputName);
      prepareDownload(evento);
      //removeInputs(); resetActInputs(); 
      resetActInput(inputName);
    })
    .catch(error => console.log(error));
  // .catch(error => console.error(error));
}

function verifyGoogleAccessToken(googleAccessToken, input, inputName) {
  return fetch(
    "https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=" +
    googleAccessToken
  )
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("Token inválido");
      }
      return response.json();
    })
    .then((data) => {
      prepEvent(input, inputName);
      return data;
    })
    .catch((error) => {
      console.log("Hubo un problema con la operación fetch: " + error.message);
      // localStorage.removeItem("authInfo");
      // location.href = "http://localhost/ruedadelavida/pruebav1.html";
      localStorage.removeItem('authInfo');
      signIn();
    });
}

// Agrega el siguiente código para manejar el click en el botón G Calendario
// document.addEventListener('DOMContentLoaded', function() {
//   var btnSendGCalendar = document.getElementById('btnSendGCalendar');
//   btnSendGCalendar.addEventListener('click', function(event) {
//     event.preventDefault(); // Previene el comportamiento predeterminado del botón (recargar la página)
//     verifyGoogleAccessToken(localStorage.getItem('authInfo'), event);
//   });
// });

