const btnSendGCalendar = document.getElementById('btnSendGCalendar');
const btnOpenGCalendar = document.getElementById('btnOpenGCalendar');


btnSendGCalendar.onclick = (e) => {

    e.preventDefault();
    validateValues();
}

btnOpenGCalendar.onclick = (e) => {

    e.preventDefault();
    window.open('https://calendar.google.com/calendar/u/0/r/month', '_blank');
}
const resetActInput = (name) => {
    // console.log(name);
    let inputTitle;
    switch (name) {
        case 'input1':
            if (!localStorage.getItem('input1')) {
                inputTitle = document.querySelector("[name='title']");
                const inputTxtAct1 = document.querySelector("[name='txtAct1']");
                const inputStartDateAct1 = document.querySelector("[name='startDateAct1']");
                const inputEndDateAct1 = document.querySelector("[name='endDateAct1']");
                inputTitle.value = "";
                inputTxtAct1.value = "";
                inputStartDateAct1.value = "";
                inputEndDateAct1.value = "";
            }
            break;
        case 'input2':
            if (!localStorage.getItem('input2')) {

                inputTitle = document.querySelector("[name='title']");
                const inputTxtAct2 = document.querySelector("[name='txtAct2']");
                const inputStartDateAct2 = document.querySelector("[name='startDateAct2']");
                const inputEndDateAct2 = document.querySelector("[name='endDateAct2']");
                inputTitle.value = "";
                inputTxtAct2.value = "";
                inputStartDateAct2.value = "";
                inputEndDateAct2.value = "";
            }
            break;
        case 'input3':
            if (!localStorage.getItem('input3')) {
                inputTitle = document.querySelector("[name='title']");
                const inputTxtAct3 = document.querySelector("[name='txtAct3']");
                const inputStartDateAct3 = document.querySelector("[name='startDateAct3']");
                const inputEndDateAct3 = document.querySelector("[name='endDateAct3']");

                inputTitle.value = "";
                inputTxtAct3.value = "";
                inputStartDateAct3.value = "";
                inputEndDateAct3.value = "";
            }
            break;
        case 'input4':
            if (!localStorage.getItem('input4')) {
                inputTitle = document.querySelector("[name='title']");
                const inputTxtAct4 = document.querySelector("[name='txtAct4']");
                const inputStartDateAct4 = document.querySelector("[name='startDateAct4']");
                const inputEndDateAct4 = document.querySelector("[name='endDateAct4']");

                inputTitle.value = "";
                inputTxtAct4.value = "";
                inputStartDateAct4.value = "";
                inputEndDateAct4.value = "";
            }
            break;
        case 'default': break;

    }

}

const resetActInputs = () => {
    if (!localStorage.getItem('input1')) {
        const inputTitle = document.querySelector("[name='title']");
        const inputTxtAct1 = document.querySelector("[name='txtAct1']");
        const inputStartDateAct1 = document.querySelector("[name='startDateAct1']");
        const inputEndDateAct1 = document.querySelector("[name='endDateAct1']");

        inputTitle.value = "";
        inputTxtAct1.value = "";
        inputStartDateAct1.value = "";
        inputEndDateAct1.value = "";
    }
    if (!localStorage.getItem('input2')) {

        const inputTitle = document.querySelector("[name='title']");
        const inputTxtAct2 = document.querySelector("[name='txtAct2']");
        const inputStartDateAct2 = document.querySelector("[name='startDateAct2']");
        const inputEndDateAct2 = document.querySelector("[name='endDateAct2']");

        inputTitle.value = "";
        inputTxtAct2.value = "";
        inputStartDateAct2.value = "";
        inputEndDateAct2.value = "";
    }
    if (!localStorage.getItem('input3')) {

        const inputTitle = document.querySelector("[name='title']");
        const inputTxtAct3 = document.querySelector("[name='txtAct3']");
        const inputStartDateAct3 = document.querySelector("[name='startDateAct3']");
        const inputEndDateAct3 = document.querySelector("[name='endDateAct3']");

        inputTitle.value = "";
        inputTxtAct3.value = "";
        inputStartDateAct3.value = "";
        inputEndDateAct3.value = "";
    }
    if (!localStorage.getItem('input4')) {

        const inputTitle = document.querySelector("[name='title']");
        const inputTxtAct4 = document.querySelector("[name='txtAct4']");
        const inputStartDateAct4 = document.querySelector("[name='startDateAct4']");
        const inputEndDateAct4 = document.querySelector("[name='endDateAct4']");

        inputTitle.value = "";
        inputTxtAct4.value = "";
        inputStartDateAct4.value = "";
        inputEndDateAct4.value = "";
    }
}

const readSaveAct = () => {
    if (localStorage.getItem('input1')) {

        const inputTitle = document.querySelector("[name='title']");
        const inputTxtAct1 = document.querySelector("[name='txtAct1']");
        const inputStartDateAct1 = document.querySelector("[name='startDateAct1']");
        const inputEndDateAct1 = document.querySelector("[name='endDateAct1']");
        const input1 = JSON.parse(localStorage.getItem('input1'));
        console.log(input1);
        inputTitle.value = input1.summary;
        inputTxtAct1.value = input1.description;
        inputStartDateAct1.value = input1.start.dateTime.slice(0, -9);
        inputEndDateAct1.value = input1.end.dateTime.slice(0, -9);
    }
    if (localStorage.getItem('input2')) {

        const inputTitle = document.querySelector("[name='title']");
        const inputTxtAct2 = document.querySelector("[name='txtAct2']");
        const inputStartDateAct2 = document.querySelector("[name='startDateAct2']");
        const inputEndDateAct2 = document.querySelector("[name='endDateAct2']");
        const input2 = JSON.parse(localStorage.getItem('input1'));
        console.log(input2);
        inputTitle.value = input2.summary;
        inputTxtAct2.value = input2.description;
        inputStartDateAct2.value = input2.start.dateTime.slice(0, -9);
        inputEndDateAct2.value = input2.end.dateTime.slice(0, -9);
    }
    if (localStorage.getItem('input3')) {

        const inputTitle = document.querySelector("[name='title']");
        const inputTxtAct3 = document.querySelector("[name='txtAct3']");
        const inputStartDateAct3 = document.querySelector("[name='startDateAct3']");
        const inputEndDateAct3 = document.querySelector("[name='endDateAct3']");
        const input3 = JSON.parse(localStorage.getItem('input3'));
        console.log(input3);
        inputTitle.value = input3.summary;
        inputTxtAct3.value = input3.description;
        inputStartDateAct3.value = input3.start.dateTime.slice(0, -9);
        inputEndDateAct3.value = input3.end.dateTime.slice(0, -9);
    }
    if (localStorage.getItem('input4')) {

        const inputTitle = document.querySelector("[name='title']");
        const inputTxtAct4 = document.querySelector("[name='txtAct4']");
        const inputStartDateAct4 = document.querySelector("[name='startDateAct4']");
        const inputEndDateAct4 = document.querySelector("[name='endDateAct4']");
        const input4 = JSON.parse(localStorage.getItem('input4'));
        console.log(input4);
        inputTitle.value = input4.summary;
        inputTxtAct4.value = input4.description;
        inputStartDateAct4.value = input4.start.dateTime.slice(0, -9);
        inputEndDateAct4.value = input4.end.dateTime.slice(0, -9);
    }
}
const validateValues = () => {
    const actividad = ['Act1', 'Act2', 'Act3', 'Act4'];

    var input1 = {
        summary: document.querySelector("[name='title']").value.trim(),
        description: document.querySelector("[name='txtAct1']").value.trim(),
        start: { dateTime: document.querySelector("[name='startDateAct1']").value + ':00-00:00' },
        end: { dateTime: document.querySelector("[name='endDateAct1']").value + ':00-00:00' },
        reminders: {
            useDefault: false,
            overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 }
            ]
        }
    };

    var input2 = {
        summary: document.querySelector("[name='title']").value.trim(),
        description: document.querySelector("[name='txtAct2']").value.trim(),
        start: { dateTime: document.querySelector("[name='startDateAct2']").value + ':00-00:00' },
        end: { dateTime: document.querySelector("[name='endDateAct2']").value + ':00-00:00' },
        reminders: {
            useDefault: false,
            overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 }
            ]
        }
    };

    var input3 = {
        summary: document.querySelector("[name='title']").value.trim(),
        description: document.querySelector("[name='txtAct3']").value.trim(),
        start: { dateTime: document.querySelector("[name='startDateAct3']").value + ':00-00:00' },
        end: { dateTime: document.querySelector("[name='endDateAct3']").value + ':00-00:00' },
        reminders: {
            useDefault: false,
            overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 }
            ]
        }
    };

    var input4 = {
        summary: document.querySelector("[name='title']").value.trim(),
        description: document.querySelector("[name='txtAct4']").value.trim(),
        start: { dateTime: document.querySelector("[name='startDateAct4']").value + ':00-00:00' },
        end: { dateTime: document.querySelector("[name='endDateAct4']").value + ':00-00:00' },
        reminders: {
            useDefault: false,
            overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 }
            ]
        }
    };
    let needsSignIn = false;
    let errorCount = 0;
    if (validateInputs(input1)) {
        console.log(input1);
        localStorage.setItem('input1', JSON.stringify(input1));
        if (localStorage.getItem('authInfo')) {
            console.log('encontrado');
            const info = JSON.parse(localStorage.getItem('authInfo'));
            const googleAccessToken = info['access_token'];
            if (togBtn.checked) {
                let isGoogleAccessTokenValid = verifyGoogleAccessToken(googleAccessToken, input1, 'input1');
            } else {
                removeResultsSections('input1');
                prepareDownload(input1);                
                resetActInput('input1');
            }

        }  else if(!togBtn.checked){
			removeResultsSections('input1');
                prepareDownload(input1);                
                resetActInput('input1');
			
		}else {
            console.log('no encontrado');
            // saveActWhenSignInNeeded('input1Temp',input1)
            needsSignIn = true;
            // signIn();
        }
    } else {
        errorCount += 1;
    }

    if (validateInputs(input2)) {
        console.log(input2);
        localStorage.setItem('input2', JSON.stringify(input2));
        if (localStorage.getItem('authInfo')) {
            const info = JSON.parse(localStorage.getItem('authInfo'));

            const googleAccessToken = info['access_token'];
            if (togBtn.checked) {
                let isGoogleAccessTokenValid = verifyGoogleAccessToken(googleAccessToken, input2, 'input2');
            } else {
                removeResultsSections('input2');
                prepareDownload(input2);                
                resetActInput('input2');
            }
            

        }  else if(!togBtn.checked){
			removeResultsSections('input2');
                prepareDownload(input2);                
                resetActInput('input2');
			
		}else {
            // saveActWhenSignInNeeded('input2Temp',input2)
            needsSignIn = true;
            // signIn();
        }

    } else {
        errorCount += 1;
    }
    if (validateInputs(input3)) {
        console.log(input3);
        localStorage.setItem('input3', JSON.stringify(input3));
        if (localStorage.getItem('authInfo')) {
            const info = JSON.parse(localStorage.getItem('authInfo'));
            const googleAccessToken = info['access_token'];
            if (togBtn.checked) {
                let isGoogleAccessTokenValid = verifyGoogleAccessToken(googleAccessToken, input3, 'input3');
            } else {
                removeResultsSections('input3');
                prepareDownload(input3);                
                resetActInput('input3');
            }
        }  else if(!togBtn.checked){
			removeResultsSections('input3');
                prepareDownload(input3);                
                resetActInput('input3');
			
		}else {
            // saveActWhenSignInNeeded('input3Temp',input3)
            needsSignIn = true;
            // signIn();
        }

    } else {
        errorCount += 1;
    }
    if (validateInputs(input4)) {
        console.log(input4);
        localStorage.setItem('input4', JSON.stringify(input4));
        if (localStorage.getItem('authInfo')) {
            const info = JSON.parse(localStorage.getItem('authInfo'));
            const googleAccessToken = info['access_token'];
            if (togBtn.checked) {
                let isGoogleAccessTokenValid = verifyGoogleAccessToken(googleAccessToken, input4, 'input4');
            } else {
                removeResultsSections('input4');
                prepareDownload(input4);                
                resetActInput('input4');
            }
            
        } else if(!togBtn.checked){
			removeResultsSections('input4');
                prepareDownload(input4);                
                resetActInput('input4');
			
		}else
		{
            // saveActWhenSignInNeeded('input4Temp',input4)

            needsSignIn = true;
            // signIn();
        }
    } else {
        errorCount += 1;
    }
    console.log(needsSignIn);
    if (needsSignIn == true && togBtn.checked) {
        localStorage.setItem('reload', JSON.stringify(true));
        signIn();
    } else {
        localStorage.setItem('reload', JSON.stringify(false));
    }
    if (errorCount > 3)
        message.innerHTML = "Por favor complete todos los campos del formulario.";

}


const validateInputs = (input) => {
    console.log(input);
    if (input.summary != '' && input.description != '')
        return true;
    else return false;
}

const defaultValuesDateInputs = () => {

    let startDateAct1 = document.querySelector("[name='startDateAct1']");
    let startDateAct2 = document.querySelector("[name='startDateAct2']");
    let startDateAct3 = document.querySelector("[name='startDateAct3']");
    let startDateAct4 = document.querySelector("[name='startDateAct4']");
    let endDateAct1 = document.querySelector("[name='endDateAct1']");
    let endDateAct2 = document.querySelector("[name='endDateAct2']");
    let endDateAct3 = document.querySelector("[name='endDateAct3']");
    let endDateAct4 = document.querySelector("[name='endDateAct4']");
    let now = new Date();

    let formattedDate =
        now.getFullYear() + '-' +
        String(now.getMonth() + 1).padStart(2, '0') + '-' +
        String(now.getDate()).padStart(2, '0') + 'T' +
        String(now.getHours()).padStart(2, '0') + ':' +
        String(now.getMinutes()).padStart(2, '0');
    startDateAct1.value = formattedDate;
    startDateAct2.value = formattedDate;
    startDateAct3.value = formattedDate;
    startDateAct4.value = formattedDate;
    endDateAct1.value = formattedDate;
    endDateAct2.value = formattedDate;
    endDateAct3.value = formattedDate;
    endDateAct4.value = formattedDate;
}

const saveActWhenSignInNeeded = (name, activity) => {
    localStorage.setItem(name, JSON.stringify(activity));
}
const readActAfterSignInReload = (name) => {
    if (localStorage.getItem(name))
        return JSON.parse(localStorage.getItem(name));
    return "";
}

defaultValuesDateInputs();