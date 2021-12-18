const form = document.querySelector("form");
const emailErr = document.querySelector(".email.error");
const passErr = document.querySelector(".pass.error");

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Reset errors
    emailErr.textContent = "";
    passErr.textContent = "";
    // Get the values
    const email = form.email.value;
    const password = form.password.value;
    try {
        const res = await fetch("http://localhost:5000/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const data = await res.json();

        
        if (data.error) {
            emailErr.textContent = "Incorrect email"
            passErr.textContent = "Incorrect  password"
        } else {
            location.assign('./home.html')
        }

        sessionStorage.setItem("token", data.token);

        
    } catch (error) {
        console.log(error)
    }
    
})