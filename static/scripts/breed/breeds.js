
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

async function getData(url) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'same-origin', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //   body: data // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}


const createToast = (msg, color)=> {
    const host = document.createElement('div');
    host.innerHTML = `
    <div class="toast align-items-center text-white bg-${color} border-0" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
        <div class="toast-body">${msg}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    </div>
    `
    document.querySelector(".toast-container").append(host);
    return host.querySelector(".toast")
}
 const form = document.querySelector("#form");
const sButton = document.querySelector("#submit");
form.addEventListener("submit", (e)=> {
    e.preventDefault();

    sButton.setAttribute('disabled', true);
    sButton.firstChild.classList.remove("d-none");
    sButton.lastChild.classList.add("d-none");

    const data = new FormData(form);

    postData("http://localhost:8000/add_breed/", data)
    .then(data=> {
        
        const toast = createToast(data.message, "success")
        let bsToast = new bootstrap.Toast(toast)
        bsToast.show()
        
        sButton.removeAttribute('disabled');
        sButton.firstChild.classList.add("d-none");
        sButton.lastChild.classList.remove("d-none");
    })
    form.reset()
})

const dogs = document.querySelector("#dogs")
const cats = document.querySelector("#cats")


const fillBreeds = (data) => {
    data.forEach(br=> {
        const content = document.createElement("li")
        content.classList.add("list-group-item", "border-0")
        if (br.cat_dog == "Dog") {
            content.innerText = br.breed_name
            dogs.append(content) 
        }  else {            
            content.innerText = br.breed_name
            cats.append(content) 
        }     

    })
}

window.addEventListener("DOMContentLoaded", ()=> {
    getData("http://localhost:8000/get_breeds/")
    .then(data=> {
        fillBreeds(data.breeds)
    })
})