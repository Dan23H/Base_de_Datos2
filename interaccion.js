const form = document.getElementById("profile-form");
const searchForm = document.getElementById("searchForm");
const searchResult = document.getElementById("search-result");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const name = document.getElementById("name").value;
  const tel = document.getElementById("tel").value;
  const birth = document.getElementById("birth").value;
  const data = { email, name, tel, birth };

  fetch("/addprofile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        alert("Perfil registrado correctamente");
        form.reset();
      } else {
        alert("Error al registrar el perfil");
      }
    })
    .catch((error) => {
      console.log(error);
      alert("Error al registrar el perfil");
    });
});

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const findEmail = document.getElementById("search-email").value;
  const email = document.getElementById("email");
  const name = document.getElementById("name");
  const tel = document.getElementById("tel");
  const birth = document.getElementById("birth");

  const data = await fetch(`/profile/${findEmail}`);
  if (data.status === 404) {
    alert("Perfil no encontrado");
    email.value = "";
    name.value = "";
    tel.value = "";
    birth.value = "";
  } else {
    const profileData = await data.json();
    email.value = findEmail;
    name.value = profileData.name;
    tel.value = profileData.tel;
    birth.value = profileData.birth;
  }
});