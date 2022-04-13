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

const fillPetDetails = (data) => {
    const body = document.querySelector(".card-body");

    const data_f =data[0];
    const fields = data_f.fields;

    body.innerHTML = `    
        <h5 class="card-title">For ${fields.sale_adoption} <small class="text-muted">${fields.price !== 0 && fields.price}</small></h5>
        <p class="card-text">${fields.breed}</p>
        <p class="card-text">${fields.gender}</p>
        <p class="card-text">${fields.age} old</p>
        <p class="card-text">${fields.description}</p>
    `
}

const fillImages = (data) => {
    const carousel = document.querySelector(".carousel-inner")
    data.map((d)=> {
        const fields = d.fields;
        const div = document.createElement("div");
        div.classList.add('carousel-item')
        div.innerHTML = `<img src="/media/${fields.pet_image}" class="d-block w-100" alt="...">`;
        carousel.append(div);
    })
    carousel.firstChild.classList.add('active')
}

window.addEventListener("DOMContentLoaded", ()=> {
    let slug = (window.location.href).split("view_pet")
    getData(`http://localhost:8000/get_pet${slug[1]}`)
    .then(data=> {
        fillPetDetails(JSON.parse(data.pet))
        fillImages(JSON.parse(data.images))
    })
})