function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

async function postJsonData(url, data) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'same-origin', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    if (response.redirected) {
        window.location.href = response.url;
    }
    return response.json(); // parses JSON response into native JavaScript objects
}

async function postData(url, data) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'same-origin', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        // 'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: data // body data type must match "Content-Type" header
    });
    if (response.redirected) {
        window.location.href = response.url;
    }
    return response.json(); // parses JSON response into native JavaScript objects
}

const form = document.querySelector("#form");
const email = document.querySelector("#id_email");
const username = document.querySelector("#id_username");

const validation = (data, element) => {
    switch(data.valid){
        case true:
            element.classList.add("is-invalid")
            break

        case false:
            element.classList.add("is-valid")
            break
    }
}

username.addEventListener("focusout", (e)=> {
    const usernameValue = e.target.value;
    const data = {"username": usernameValue}
    usernameValue !== "" && postJsonData("http://localhost:8000/user/check_username/", data)
    .then(data => validation(data, username))
})

email.addEventListener("focusout", (e)=> {
    const emailValue = e.target.value
    const data = {"email": emailValue}
    emailValue !== "" && postJsonData("http://localhost:8000/user/check_mail/", data)
    .then(data => validation(data, email))
})

username.addEventListener("focusin", (e)=> {
    username.classList.remove("is-invalid")
})

email.addEventListener("focusin", (e)=> {
    email.classList.remove("is-invalid")
})


const sButton = document.getElementById("submit")

form.addEventListener("submit", (e)=> {
    e.preventDefault();
    const formData = new FormData(form);
    formData.append("password2", formData.get('password1'))

    sButton.setAttribute('disabled', true);
    sButton.firstChild.classList.remove("d-none");
    sButton.lastChild.classList.add("d-none");

    postData("http://localhost:8000/user/registration/", formData)
    .then(data=> {
        
        sButton.removeAttribute('disabled');
        sButton.firstChild.classList.add("d-none");
        sButton.lastChild.classList.remove("d-none");        
    })
    .catch(error=>console.log(error))

    // form.reset();
})