
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

async function postData(url, data={}) {
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


        
const email = document.querySelector("#email");
const username = document.querySelector("#username");
const age = document.querySelector("#age");
const gender = document.querySelector("#gender");
const contact = document.querySelector("#contact");
const profile_form = document.querySelector("#profile_form");
const pet_form = document.querySelector("#pet_form");
const yourPets = document.querySelector("#yours");
const bookmarkPets = document.querySelector("#bookmarks");

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

const fillProfileData = (profile)=> {    
    email.innerText = profile.email;
    username.innerText = profile.username;
    age.innerText = profile.age;
    gender.innerText = profile.gender;
    contact.innerText = profile.contact;
}

const fillPets = (pets, parent, urlPrefix, type)=> {       
    pets.map(pet=>{
        const col = document.createElement('div');
        col.classList.add('col');
        col.innerHTML = `
            <div class="card h-100">
                <a href="${urlPrefix}/${pet.pet_name}/" class="text-reset text-decoration-none">
                    <img src="${pet.cover_image}" class="card-img-top" alt="${pet.pet_name}">
                </a>
                <div class="card-body">
                <h5 class="card-title">${pet.age}</h5>
                <button type='button' data-type='${type}' data-id='${pet.id}' onclick="remove(event);" class="w-100 btn btn-sm btn-danger d-flex flex-row justify-content-center">
                    <span>Delete</span>
                    <span class="material-icons">delete</span>
                </button>
                </div>
            </div>
        `
        parent.append(col)
    })
}

const removePet = (nodeList, id)=> {
    nodeList.forEach(n => n.querySelector("button").getAttribute("data-id") == id && n.remove())
}

const remove = (e)=> {
    const id = e.target.parentNode.getAttribute("data-id")
    const data = {"id": id }
    const actionType = e.target.parentNode.getAttribute("data-type")
    const url = actionType == "bookmark" ? 'http://localhost:8000/remove_bookmark/' : 'http://localhost:8000/remove_pet/'
    postJsonData(url, data)
    .then(data=>{
        const toast = createToast(data.message, "success")
        let bsToast = new bootstrap.Toast(toast)
        bsToast.show()

        if (actionType == "bookmark") {
            removePet(bookmarkPets.childNodes, id)
        } else {
            removePet(yourPets.childNodes, id)
        }
    })

}

window.addEventListener("DOMContentLoaded", ()=> {
    document.querySelector("#id_pet_image").setAttribute("multiple", true)
    
    email.innerText = "................";
    username.innerText = "................";
    age.innerText = "................";
    gender.innerText = "................";
    contact.innerText = "................";

    
    // load user profile details
    getData("http://localhost:8000/user/get_profile/")
    .then(data=> {
        const prof = JSON.parse(data.profile)
        fillProfileData(prof[0].fields);
    })
    // get user pets
    getData("http://localhost:8000/get_user_pets/")
    .then(data=> {
        fillPets(data.all_pets, yourPets, 'http://localhost:8000/edit_pet', 'pet')
    })

})

profile_form.addEventListener("submit", (e)=> {
    e.preventDefault();

    const updateButton = document.querySelector("#update");

    updateButton.setAttribute('disabled', true);
    updateButton.firstChild.classList.remove("d-none");
    updateButton.lastChild.classList.add("d-none");

    const formData = new FormData(profile_form);
    postData("http://localhost:8000/user/edit_profile/", formData)
    .then(data=> {
        const prof = JSON.parse(data.profile);
        fillProfileData(prof[0].fields);
        const collapse = new bootstrap.Collapse(document.querySelector("#updateProfile"))
        collapse.hide()

        updateButton.removeAttribute('disabled');
        updateButton.firstChild.classList.add("d-none");
        updateButton.lastChild.classList.remove("d-none"); 
    })
})

document.querySelector("#bookmark-tab").addEventListener("click", ()=> { 
    // get bookmarked pets
    bookmarkPets.childElementCount === 0 && getData("http://localhost:8000/get_all_bookmarks/")
    .then(data=> {
        fillPets(data.bookmarks, bookmarkPets, 'http://localhost:8000/view_pet', 'bookmark')
    })
})


pet_form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const addButton = document.querySelector("#add")

    addButton.setAttribute('disabled', true);
    addButton.firstChild.classList.remove("d-none");
    addButton.lastChild.classList.add("d-none");

    const formData = new FormData(pet_form);
    postData("http://localhost:8000/add_pet/", formData)
    .then(data=> {
        const toast = createToast(data.message, "success")
        let bsToast = new bootstrap.Toast(toast)
        bsToast.show()

        addButton.removeAttribute('disabled');
        addButton.firstChild.classList.add("d-none");
        addButton.lastChild.classList.remove("d-none");
    })
    pet_form.reset()
})

const closeButton = document.querySelector("#close");
closeButton.addEventListener("click", ()=> {
    
    closeButton.setAttribute('disabled', true);
    closeButton.firstChild.classList.remove("d-none");
    closeButton.lastChild.classList.add("d-none");

    postData("http://localhost:8000/user/close_account/")
})