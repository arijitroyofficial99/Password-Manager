function maskPassword(pass) {
    let str = "";
    for (let index = 0; index < pass.length; index++) {
        str += "*";
    }
    return str;
}

function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
          /* clipboard successfully set */
          document.getElementById("alertC").style.display = "inline"
          setTimeout(() => {
            document.getElementById("alertC").style.display = "none"
          }, 2000);

        },
        () => {
          /* clipboard write failed */
          alert("Clipboard copying failed")
        },
    );
}
// Logic to fill the table
const deletePassword = (website)=>{
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    arrUpdate = arr.filter((e)=>{
        return e.website != website;
    })
    localStorage.setItem("passwords", JSON.stringify(arrUpdate)); 
    // alert(`Successfully deleted ${website}'s password`);
    document.getElementById("alertD").style.display = "inline"
        setTimeout(() => {
        document.getElementById("alertD").style.display = "none"
    }, 2000);
    showPasswords();
}
const showPasswords = ()=>{
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
    if(data == null || JSON.parse(data).length == 0) {
        tb.innerHTML = "No Data To Show";
    }
    else {
        tb.innerHTML = `<tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Delete</th>
        </tr>`
        let arr = JSON.parse(data);
        let str = "";
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];   

    str += `<tr>
        <td>${element.website} <img onclick="copyText('${element.website}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10"></td>

        <td>${element.username} <img onclick="copyText('${element.username}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10"></td>

        <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10"></td>
        
        <td><button class = "btnsm" onclick="deletePassword('${element.website}')">Delete</button></td>
    </tr>`   
    }
    tb.innerHTML = tb.innerHTML + str;
    }
    website.value = "";
    username.value = "";
    password.value = "";
}

console.log("working");
showPasswords();
document.querySelector(".btn").addEventListener("click", (e)=> {
    e.preventDefault()
    console.log("clicked....");
    console.log(username.value, password.value);

    if (!website.value || !username.value || !password.value) {
        alert("Please fill in all the fields before submitting.");
        return;
    }
    
    let passwords = localStorage.getItem("passwords");
    console.log(passwords);
    if(!passwords) {
        let json = [];
        json.push({website:website.value, username:username.value, password:password.value});
        document.getElementById("alertS").style.display = "inline"
        setTimeout(() => {
          document.getElementById("alertS").style.display = "none"
        }, 2000);
        localStorage.setItem("passwords", JSON.stringify(json)); 
    }
    else {
        let json = JSON.parse(localStorage.getItem("passwords"));
        json.push({website:website.value, username:username.value, password:password.value});
        document.getElementById("alertS").style.display = "inline"
        setTimeout(() => {
          document.getElementById("alertS").style.display = "none"
        }, 2000);
        localStorage.setItem ("passwords", JSON.stringify(json)); 
    }
    showPasswords();
})