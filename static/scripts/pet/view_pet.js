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

async function postJsonData(url, data) {
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
      body: JSON.stringify(data)  // body data type must match "Content-Type" header
    });
    if (response.redirected) {
        window.location.href = response.url;
    }
    return response.json(); // parses JSON response into native JavaScript objects
}


const sale_adoption = document.querySelector("#sale-adoption");
const price = document.querySelector("#price");
const breed = document.querySelector("#breed");
const gender = document.querySelector("#gender");
const age = document.querySelector("#age");
const description = document.querySelector("#description");
const bookmark = document.querySelector("#bookmark")
const contact = document.querySelector("#contact")
const total = document.querySelector("#total")


const fillPetDetails = (data) => {
    sale_adoption.innerText = `For ${data.sale_adoption}`;
    price.innerText = `${data.price} ksh`;
    breed.innerText = data.breed;
    gender.innerText = data.gender;
    age.innerText = data.age;
    description.innerText = data.description;
    total.innerText = data.total;
    bookmark.setAttribute("data-slug", data.pet_name)
    contact.setAttribute("data-bs-content", data.contact)
}

const carousel = document.querySelector(".carousel-inner")

const spl = document.createElement("div")
spl.classList.add("d-flex", "justify-content-center")
spl.innerHTML = `
<div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;

const fillImages = (data) => {
    spl.remove()
    data.map((d)=> {
        const fields = d.fields;
        const div = document.createElement("div");
        div.classList.add('carousel-item')
        div.innerHTML = `<img src="/media/${fields.pet_image}" class="d-block w-100" alt="...">`;
        carousel.append(div);
    })
    carousel.firstChild.classList.add('active')
}


const loader = ()=> {

    sale_adoption.innerText = "....................";
    price.innerText = "....................";
    breed.innerText = "....................";
    gender.innerText = "....................";
    age.innerText = "....................";
    description.innerText = "....................";
    total.innerText = "....................";
    carousel.append(spl)
    carousel.firstChild.classList.add('active')
}
window.addEventListener("DOMContentLoaded", ()=> {
    let slug = (window.location.href).split("view_pet")

    loader()

    getData(`http://localhost:8000/get_pet${slug[1]}`)
    .then(data=> {
        fillPetDetails(data.pet)
        fillImages(JSON.parse(data.images))
    })
})

contact.addEventListener("click", ()=> {
    const showContact = new bootstrap.Popover(document.querySelector("#contact"))
    showContact.toggle()
})

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

bookmark.addEventListener("click", ()=> {
    const slug = bookmark.getAttribute("data-slug")
    const data ={"slug": slug}
    postJsonData("http://localhost:8000/add_bookmark/", data)
    .then(data=>{
        const toast = createToast(data.message, "success")
        let bsToast = new bootstrap.Toast(toast)
        bsToast.show()
    })
})