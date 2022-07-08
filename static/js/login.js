const form = document.querySelector(".box>form"),
    feedback = document.querySelector(".feedback"),
    Btn = form.querySelector("input[type='submit']");

form.onsubmit = (e)=>{
    e.preventDefault();
}

Btn.onclick = ()=>{
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/auth", true);
    xhr.onload = ()=>{
        if (xhr.readyState === XMLHttpRequest.DONE){
            if (xhr.status === 200){
                let data = xhr.response;
                if (data === "admin"){
                    localStorage.clear()
                    localStorage.setItem('user_id', 'admin')
                    window.location.href = "/admin"
                }else if (data.substring(0,7) === "success") {
                    localStorage.clear()
                    localStorage.setItem('user_id', data.substring(7))
                    window.location.href = "/user/"+data.substring(7)
                }else {
                    feedback.textContent = data;
                    feedback.style.display = "block";
                }
            }
        }
    }
    let formData = new FormData(form);
    xhr.send(formData);
}