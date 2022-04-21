const sign_out = document.querySelector("#sign-out");


sign_out.addEventListener("click", ()=> {
    
    sign_out.setAttribute('disabled', true);
    sign_out.firstChild.classList.remove("d-none");
    sign_out.lastChild.classList.add("d-none");
    console.log(sign_out)

    // postData("http://localhost:8000/user/close_account/")
})