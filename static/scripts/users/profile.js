
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


        
const email = document.querySelector("#email");
const username = document.querySelector("#username");
const age = document.querySelector("#age");
const gender = document.querySelector("#gender");
const profile_form = document.querySelector("#profile_form");
const pet_form = document.querySelector("#pet_form");
const yourPets = document.querySelector("#your-pets")


const fillProfileData = (profile)=> {    
    email.innerText = profile.email;
    username.innerText = profile.username;
    age.innerText = profile.age;
    gender.innerText = profile.gender;
}

const fillUserPets = (data)=> {
    const ulPets = document.createElement('ul');
    ulPets.classList.add("list-group", "list-group-flush", "mt-3")
    data.map((d)=> {
        const content = document.createElement('li');
        content.classList.add("list-group-item", "d-flex", "flex-row", "justify-content-between", "align-items-center");
        content.innerHTML = `
            <img src="/media/${d.cover_image}" alt="${d.pet_name}" class="rounded-circle" style="width: 3rem; height: 3rem;">
            <p class='fs-5'>${d.sale_adoption}</p>
            <p class='fs-5'>${d.price}</p>
        `
        ulPets.append(content)
    })
    yourPets.append(ulPets)
}

window.addEventListener("DOMContentLoaded", ()=> {
    document.querySelector("#id_pet_image").setAttribute("multiple", true)
    
    email.innerText = "................";
    username.innerText = "................";
    age.innerText = "................";
    gender.innerText = "................";
    
    // load user profile details
    getData("http://localhost:8000/user/get_profile/")
    .then(data=> {
        const prof = JSON.parse(data.profile)
        fillProfileData(prof[0].fields);
    })
    // get user pets
    getData("http://localhost:8000/get_user_pets/")
    .then(data=> {
        fillUserPets(data.all_pets)
    })
    // get bookmarked pets

})

profile_form.addEventListener("submit", (e)=> {
    e.preventDefault();
    const formData = new FormData(profile_form);
    postData("http://localhost:8000/user/edit_profile/", formData)
    .then(data=> {
        const prof = JSON.parse(data.profile);
        fillProfileData(prof[0].fields);
    })
})

pet_form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const formData = new FormData(pet_form);
    postData("http://localhost:8000/add_pet/", formData)
    .then(data=> console.log("whee !!", data))
})