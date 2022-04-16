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

async function deleteData(url) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
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
    //   body: data // body data type must match "Content-Type" header
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
      mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //   body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

const imgsContainer = document.getElementById("imgs-container")
let slug = (window.location.href).split("edit_pet")

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


window.addEventListener("DOMContentLoaded", ()=> {

    document.querySelector("#id_pet_image").setAttribute("multiple", true)


    getData(`http://localhost:8000/edit_images${slug[1]}`)
    .then(data=> {
        const images = data.images
        images.map((image)=> {
            const imgContent = document.createElement("div");
            imgContent.style.width = 'fit-content'
            imgContent.classList.add("position-relative", "p-0", 'm-2')
            imgContent.innerHTML =`
            <span onclick="remove(event);" data-id="${image.id}" class="material-icons md-18 position-absolute top-0 start-100 translate-middle badge bg-danger pe-auto">clear</span>
            <img src="${image.pet_image}"  class="rounded-3"alt="pet image" style="width: 100px; height: 100px" >
            `
            imgsContainer.append(imgContent)
        })
    })
})

// update images
const imgForm = document.querySelector("#imgForm");
imgForm.addEventListener("submit", (e)=> {
    e.preventDefault();
    const formData = new FormData(imgForm)
    postData(`http://localhost:8000/edit_images${slug[1]}`, formData)
    .then(data=> {
        const toast = createToast(data.message, "success")
        let bsToast = new bootstrap.Toast(toast)
        bsToast.show()
    })

})

// update pet info
const form = document.querySelector("#form");
const breed = document.querySelector("#id_breed");
const age = document.querySelector("#id_age");
const gender = document.querySelector("#id_gender");
const sale_adoption = document.querySelector("#id_sale_adoption");
const price = document.querySelector("#id_price");
const description = document.querySelector("#id_description");

form.addEventListener("submit", (e)=> {
    e.preventDefault();
    const formData = new FormData(form)
    postData(`http://localhost:8000/edit_pet${slug[1]}`, formData)
    .then(data=> {
        const upData = JSON.parse(data.pet);
        const fields = upData[0].fields

        breed.setAttribute("value", fields.breed);
        age.setAttribute("value", fields.age);
        gender.setAttribute("value", fields.gender);
        sale_adoption.setAttribute("value", fields.sale_adoption);
        price.setAttribute("value", fields.price);
        description.setAttribute("value", fields.description);
    })

})

const remove = (e)=> {
    const id = e.target.getAttribute("data-id");
    deleteData(`http://localhost:8000/delete_image/${id}/`)
    .then(data=> {

        const toast = createToast(data.message, "success")
        let bsToast = new bootstrap.Toast(toast)
        bsToast.show()
        
        imgsContainer.childNodes.forEach(n => n.querySelector(".material-icons").getAttribute("data-id") == id && n.remove())
    })
}