var navLinks = document.getElementById("navLinks");
var host = "http://localhost:4000";

window.onload = async function () {
    let data = localStorage.getItem("token");
    if (localStorage.getItem("token")) {
        document.getElementById("nav-login1").style.display = "none";
        document.getElementById("nav-login2").style.display = "none";
    }
    else {
        document.getElementById("nav-logout").style.display = "none";
    }

    let maproom = document.getElementById("maproom");
    let propertydata = [];

    await fetch('http://localhost:4000/property', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(response => response.json())
        .then(response => propertydata = response);

    propertydata.map(dat => {
        let nthroom = `<div class="certification1-col">
                    <img src="images/br1.jpg" height="175px" alt=" ">
                     <h3>${dat.address}</h3>
                     <p>Rooms :${dat.rooms}</p>
                     <p>Capacity: ${dat.allowed} Members</p>
                     <p>Facility: ${dat.facilities}</p>
                    </div>`
        maproom.innerHTML += nthroom;
    })
}

function showMenu() {
    navLinks.style.right = "0";
}
function hideMenu() {
    navLinks.style.right = "-200px";
}
const login = async (e) => {
    console.log("Login");
    const body = await `{"email":"${document.getElementById("email").value}","password":"${document.getElementById("password").value}"}`;
    const response = await fetch(`${host}/login`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        body: body
    })
    const data = await response.json();
    if (data.success) {
        localStorage.setItem("token", data.token);
        window.location.href = "/index.html"
    }
    else {
        alert("invalid email/password")
    }

}
const signup = async (e) => {
    console.log("Signup");
    const body = await `{"name":"${document.getElementById("sname")}","email":"${document.getElementById("semail").value}","password":"${document.getElementById("spassword").value}"}`;
    console.log(body);
    const response = await fetch(`${host}/signup`, {
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        body: body,
    })
    const data = await response.json();
    if (data.success) {
        localStorage.setItem("token", data.token);
        window.location.href = "/index.html"
    }
    else {
        alert("invalid email/password")
    }
}

const logout = async () => {
    localStorage.removeItem("token");
    window.location.reload();
}
