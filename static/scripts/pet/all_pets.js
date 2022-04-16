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

// Example POST method implementation:
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

const all_pets = document.getElementById("all-pets");
const sales = document.querySelector("#sale-tab");
const adoption = document.querySelector("#adoption-tab");
const sale_pets = document.querySelector("#sale-pets");
const adoption_pets = document.querySelector("#adoption-pets");

const fillPets = (pets, parent)=> {    
    pets.length > 0 ? pets.map(pet=>{
        const col = document.createElement('div');
        col.classList.add('col');
        col.innerHTML = `
            <div class="card h-100">
                <a href="view_pet/${pet.pet_name}/" class="text-reset text-decoration-none">
                    <img src="${pet.cover_image}" class="card-img-top" alt="${pet.pet_name}">
                </a>
                <div class="card-body">
                <div class="d-flex flex-row justify-content-between align-items-center my-1 fw-bold">
                    <p class="m-0">For ${pet.sale_adoption}</p>
                    <p class="m-0 text-muted">${pet.price > 0 ? pet.price : ''}</p>
                </div>   
                <div class="d-flex flex-row justify-content-between align-items-center my-1">
                    <p class="m-0 fw-bold">${pet.breed}</p>
                    <p class="m-0">${pet.gender == "Male" ? "M" : "F"}</p>
                </div> 
                <div class='text-center my-1'><small>${pet.age} old</small></div>
                                
                <button type='button' data-slug="${pet.pet_name}" onclick="bookmark(event);" class="bookmark w-100 btn btn-sm btn-success d-flex flex-row justify-content-center">
                    <span>Bookmark</span>
                    <span class="material-icons">bookmark_add</span>
                </button>
                </div>
            </div>
        `
        parent.append(col)
    }) :
    parent.innerHTML = "<h6>No pets have been added <a href='http://localhost:8000/user/view_profile/'>add</a> </h6>"
}

const fetchFill = (url, parent)=> {
    const loader = document.createElement('div')
    loader.classList.add("text-center", "loader", "w-100", "d-flex", "justify-content-center")
    loader.style.height = "60vh"
    loader.innerHTML = `
        <div class="spinner-border text-success my-auto" style="width:3rem; height:3rem" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>`
    parent.append(loader)
    getData(url)
    .then(data=> {
        document.querySelector(".loader") && document.querySelector(".loader").remove()
        fillPets(data.all_pets, parent);
    })
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


window.addEventListener("DOMContentLoaded", fetchFill("http://localhost:8000/get_all_pets/", all_pets));
sales.addEventListener("click", fetchFill("http://localhost:8000/sale_pets/", sale_pets));
adoption.addEventListener("click", fetchFill("http://localhost:8000/adoption_pets/", adoption_pets));

const bookmark = (e)=> {
    const data ={"slug": e.target.parentNode.getAttribute("data-slug")}
    postJsonData("http://localhost:8000/add_bookmark/", data)
    .then(data=>{
        const toast = createToast(data.message, "success")
        let bsToast = new bootstrap.Toast(toast)
        bsToast.show()
    })
}