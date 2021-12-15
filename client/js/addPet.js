const form = document.querySelector('.pet-form');
const input = document.querySelectorAll('input');

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    input.innerHtml = "";
    const formElements = new FormData(form);
    const [name, dob, client_email] = formElements.values();

    try {
        const req = await fetch('http://localhost:5000/pets', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, dob, client_email}),
        });
        const data = await req.json();
        window.location.reload(true)
        console.log(data)
    } catch (error) {
        console.log(error)
    }
})