export const cat_dog_choice = ["Cat", "Dog"]
export const sex_choices = ["Male", "Female"]
export const sale_adopt = ["Sale", "Adoption"]

export const tokenJsonConfig = (token)=> {
    return {"headers": {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }}
}

export const tokenFileConfig = (token)=> {
  return {"headers": {        
    'Content-Type': 'multipart/form-data',
    "Authorization": `Bearer ${token}`
  }}
}


export const basicJsonConfig = {
  "headers": {
    "Content-Type": "application/json",
  }
}