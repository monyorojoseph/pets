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

const all_pets = document.getElementById("all-pets")

window.addEventListener("DOMContentLoaded", ()=> {
    getData("http://localhost:8000/get_all_pets/")
    .then(data=> {
        const pets = data.all_pets;
        pets.map(pet=>{
            const col = document.createElement('div');
            col.classList.add('col');
            col.innerHTML = `
                <div class="card h-100">
                    <a href="view_pet/${pet.pet_name}/" class="text-reset text-decoration-none">
                        <img src="/media/${pet.cover_image}" class="card-img-top" alt="${pet.pet_name}">
                    </a>
                    <div class="card-body">
                    <h5 class="card-title">${pet.age}</h5>
                    <p class="card-text">${pet.description}</p>
                    <a href="view_pet/${pet.pet_name}/" class="w-100 btn btn-success">View</a>
                    </div>
                </div>
            `
            all_pets.append(col)
        })
    })
})
