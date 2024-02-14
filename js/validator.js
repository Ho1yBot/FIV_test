document.addEventListener('DOMContentLoaded', () => {
    const price = document.querySelectorAll('.priceAndLabelForLandingInfoApi');
    const oldPrice = document.querySelectorAll('.oldPriceAndLabelForLandingInfoApi');
  
    function textPriceAndOldPrice() {
      price.forEach(priceUnit => {
        priceUnit.textContent = infoForLannding[0].price + ' ' + infoForLannding[0].labelPrice;
      });
  
      oldPrice.forEach(oldPriceUnit => {
        oldPriceUnit.textContent = infoForLannding[0].oldPrice + ' ' + infoForLannding[0].labelPrice;
      });
    }
  
    textPriceAndOldPrice();
  
    document.querySelectorAll('form').forEach(form => {
      const name = form.querySelector('[name="name"]');
      const phone = form.querySelector('[name="phone"]');
      const country = form.querySelector('[name="country"]')?.value;
  
      if (name && phone) {
  
        phone.placeholder = '';
  
        const iti = window.intlTelInput(phone, {
          utilsScript: "js/utils.js",
          onlyCountries: [country],
          nationalMode: false,
        });
  
        const flags = document.querySelectorAll('.iti__flag-container');
  
        flags.forEach(flag => {
          flag.style.display = 'none';
        })
  
        document.querySelector('.iti').style.width = '100%'
  
        const languageError = {
          "RU": {
            "name": "Неверно заполнено имя",
            "noPhone": "Вы не заполнили телефон",
            "errorPhone": "Неверно заполнен номер телефона"
          },
          "CZ": {
            "name": "Špatně napsané jméno",
            "noPhone": "Nenapsali jste telefonní číslo",
            "errorPhone": "Neplatné telefonní číslo"
          },
          "SK": {
            "name": "Špatně napsané jméno",
            "noPhone": "Nenapsali jste telefonní číslo",
            "errorPhone": "Neplatné telefonní číslo"
          },
          "LT": {
            "name": "Неверно заполнено имя",
            "noPhone": "Вы не заполнили телефон",
            "errorPhone": "Неверно заполнен номер телефона"
          },
          "BG": {
            "name": "Неправилно попълнено име",
            "noPhone": "Вие не сте попълнили телефон",
            "errorPhone": "Невалиден телефонен номер"
          },
          "ES": {
            "name": "Nombre no válido",
            "noPhone": "Usted no cargar en el teléfono",
            "errorPhone": "Inválida Teléfono lleno"
          },
          "EN": {
            "name": "Field filled not right name",
            "noPhone": "You did not fill your phone",
            "errorPhone": "Invalid filled Phone"
          },
          "IT": {
            "name": "Il campo \"nome\" non è compilato correttamente",
            "noPhone": "Non hai compilato un numero di telefono",
            "errorPhone": "Il campo con il numero di telefono è sbagliato"
          },
          "MY": {
            "name": "Field filled not right name",
            "noPhone": "You did not fill your phone",
            "errorPhone": "Invalid filled Phone"
          },
          "MS": {
            "name": "Field filled not right name",
            "noPhone": "You did not fill your phone",
            "errorPhone": "Invalid filled Phone"
          },
          "TH": {
            "name": "Field filled not right name",
            "noPhone": "You did not fill your phone",
            "errorPhone": "Invalid filled Phone"
          },
          "SG": {
            "name": "Field filled not right name",
            "noPhone": "You did not fill your phone",
            "errorPhone": "Invalid filled Phone"
          },
          "DE": {
            "name": "Der Name ist falsch eingegeben",
            "noPhone": "Sie haben die Telefonnummer nicht ausgefüllt",
            "errorPhone": "Die Telefonnummer ist falsch eingegeben"
          },
          "AT": {
            "name": "Der Name ist falsch eingegeben",
            "noPhone": "Sie haben die Telefonnummer nicht ausgefüllt",
            "errorPhone": "Die Telefonnummer ist falsch eingegeben"
          },
          "GR": {
            "name": "Το πεδίο δεν έχει συμπληρώθει με το σωστό όνομα",
            "noPhone": "Δεν πληκτρολογήσατε τον αριθμό του κινητού σας",
            "errorPhone": "Πληκτρολογήσατε έναν μη έγκυρο αριθμό"
          },
          "PL": {
            "name": "Niepoprawnie zapełnione imię",
            "noPhone": "Nie podano numeru telefonu",
            "errorPhone": "Niepoprawnie zapełniony numer telefonu"
          },
          "RO": {
            "name": "Nu ați indicat corect numele, prenumele",
            "noPhone": "Nu ați indicat numărul de telefon",
            "errorPhone": "Număr de telefon incorect"
          },
          "MD": {
            "name": "Неверно заполнено имя",
            "noPhone": "Вы не заполнили телефон",
            "errorPhone": "Неверно заполнен номер телефона"
          },
          "SE": {
            "name": "Felaktigt namn",
            "noPhone": "Du har inte fyllt telefonnummer",
            "errorPhone": "Felaktigt telefonnummer"
          },
          "CH": {
            "name": "Der Name ist falsch eingegeben",
            "noPhone": "Sie haben die Telefonnummer nicht ausgefüllt",
            "errorPhone": "Die Telefonnummer ist falsch eingegeben"
          },
          "NO": {
            "name": "Field filled not right name",
            "noPhone": "You did not fill your phone",
            "errorPhone": "Invalid filled Phone"
          },
          "HU": {
            "name": "'nev' a nev helytelenul van kitoltve",
            "noPhone": "'nincs telefon' nem irta be a telefon szamat",
            "errorPhone": "'telefonszam hiba' Helytelen telefonszam"
          },
          "SI": {
            "name": "Field filled not right name",
            "noPhone": "You did not fill your phone",
            "errorPhone": "Invalid filled Phone"
          },
          "PT": {
            "name": "O Nome não foi preenchido corretamente",
            "noPhone": "Você não adicionou o telefone",
            "errorPhone": "O número de telefone não foi preenchido corretamente"
          },
          "BR": {
            "name": "O Nome não foi preenchido corretamente",
            "noPhone": "Você não adicionou o telefone",
            "errorPhone": "O número de telefone não foi preenchido corretamente"
          },
          "FR": {
            "name": "Le nom est mal renseigné",
            "noPhone": "Vous n'avez pas enregistré Votre numéro de téléphone",
            "errorPhone": "Numéro de téléphone invalide"
          },
          "RS": {
            "name": "Field filled not right name",
            "noPhone": "You did not fill your phone",
            "errorPhone": "Invalid filled Phone"
          },
          "CO": {
            "name": "Nombre incorrectamente rellenado",
            "noPhone": "No ha ingresado su número de teléfono",
            "errorPhone": "Número de teléfono incorrectamente llenado"
          },
          "PE": {
            "name": "Nombre incorrectamente rellenado",
            "noPhone": "No ha ingresado su número de teléfono",
            "errorPhone": "Número de teléfono incorrectamente llenado"
          },
          "MX": {
            "name": "Nombre incorrectamente rellenado",
            "noPhone": "No ha ingresado su número de teléfono",
            "errorPhone": "Número de teléfono incorrectamente llenado"
          },
          "CL": {
            "name": "Nombre incorrectamente rellenado",
            "noPhone": "No ha ingresado su número de teléfono",
            "errorPhone": "Número de teléfono incorrectamente llenado"
          },
          "CE": {
            "name": "Nombre incorrectamente rellenado",
            "noPhone": "No ha ingresado su número de teléfono",
            "errorPhone": "Número de teléfono incorrectamente llenado"
          },
          "EC": {
            "name": "Nombre incorrectamente rellenado",
            "noPhone": "No ha ingresado su número de teléfono",
            "errorPhone": "Número de teléfono incorrectamente llenado"
          },
          "CR": {
            "name": "Nombre incorrectamente rellenado",
            "noPhone": "No ha ingresado su número de teléfono",
            "errorPhone": "Número de teléfono incorrectamente llenado"
          },
          "NG": {
            "name": "Field filled not right name",
            "noPhone": "You did not fill your phone",
            "errorPhone": "Invalid filled Phone"
          },
          "BE": {
            "name": "Le nom est mal renseigné",
            "noPhone": "Vous n'avez pas enregistré Votre numéro de téléphone",
            "errorPhone": "Numéro de téléphone invalide"
          },
          "GH": {
            "name": "Field filled not right name",
            "noPhone": "You did not fill your phone",
            "errorPhone": "Invalid filled Phone"
          },
          "BO": {
            "name": "Nombre incorrectamente rellenado",
            "noPhone": "No ha ingresado su número de teléfono",
            "errorPhone": "Número de teléfono incorrectamente llenado"
          },
          "PA": {
            "name": "Nombre incorrectamente rellenado",
            "noPhone": "No ha ingresado su número de teléfono",
            "errorPhone": "Número de teléfono incorrectamente llenado"
          },
          "KE": {
            "name": "Field filled not right name",
            "noPhone": "You did not fill your phone",
            "errorPhone": "Invalid filled Phone"
          },
          "CI": {
            "name": "Le nom est mal renseigné",
            "noPhone": "Vous n'avez pas enregistré Votre numéro de téléphone",
            "errorPhone": "Numéro de téléphone invalide"
          },
          "ZA": {
            "name": "Field filled not right name",
            "noPhone": "You did not fill your phone",
            "errorPhone": "Invalid filled Phone"
          },
          "SN": {
            "name": "Le nom est mal renseigné",
            "noPhone": "Vous n'avez pas enregistré Votre numéro de téléphone",
            "errorPhone": "Numéro de téléphone invalide"
          },
          "GT": {
            "name": "Nombre incorrectamente rellenado",
            "noPhone": "No ha ingresado su número de teléfono",
            "errorPhone": "Número de teléfono incorrectamente llenado"
          },
          "HR": {
            "name": "Upisano ime je pogrešno",
            "noPhone": "Niste upisali broj telefona",
            "errorPhone": "Pogrešno upisan broj telefona"
          }
        };
  
        let isNameValid;
        let nameValue;
  
        const errorBoxName = document.createElement("div");
        errorBoxName.className = "error-box";
  
        function nameValid() {
          nameValue = name.value;
          isNameValid = nameValue.trim().length >= 3 && !/\d/.test(nameValue);
          if (!isNameValid) {
            name.parentNode.insertBefore(errorBoxName, name.nextSibling);
            errorBoxName.innerHTML = languageError[country]["name"];
          } else {
            errorBoxName.remove();
          }
        }
  
        name.addEventListener('change', () => {
          nameValid();
        });
  
        let isPhoneValid;
        let phoneValue;
  
        phone.addEventListener('focus', () => {
          if (phone.value === '') {
            const countryData = iti.getSelectedCountryData();
            const countryCode = countryData.dialCode;
            phone.value = '+' + countryCode;
          }
        })
  
        const DEBOUNCE_DELAY = 400;
        const debounce = (func, timeout = DEBOUNCE_DELAY) => {
          let timer;
          return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
          };
        }
  
        const handler = debounce(() => {
          phoneValid();
        });
  
        const errorBoxPhone = document.createElement("div");
        errorBoxPhone.className = "error-box";
  
        function phoneValid() {
          phoneValue = phone.value;
          const intlNumber = iti.getNumber();
          isPhoneValid = iti.isValidNumber();
  
          if (intlNumber) {
            phone.value = intlNumber;
          }
  
          if (phoneValue.trim() === "") {
            phone.parentNode.insertBefore(errorBoxPhone, phone.nextSibling);
            errorBoxPhone.innerHTML = languageError[country]["noPhone"];
          } else {
            errorBoxPhone.remove()
  
            if (!isPhoneValid) {
              phone.parentNode.insertBefore(errorBoxPhone, phone.nextSibling);
              errorBoxPhone.innerHTML = languageError[country]["errorPhone"];
            } else {
              errorBoxPhone.remove()
            }
          }
        };
  
        phone.addEventListener('input', handler);
  
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          nameValid();
          phoneValid();
          if (isNameValid && isPhoneValid) {
            form.submit();
          }
        });
      }
    })
  })