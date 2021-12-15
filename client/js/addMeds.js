const formMeds = document.querySelector('.form-meds');
const input = document.querySelectorAll('input');
input.innerHtml = "";
formMeds.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formElements = new FormData(formMeds);
    const [name, description] = formElements.values();

    try {
        const req = await fetch('http://localhost:5000/meds', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, description}),
        });
        const data = await req.json();
        window.location.reload(true)
        return data
    } catch (error) {
        console.log(error)
    }
})