const form = document.querySelector('form');
const input = document.querySelectorAll('input');
const medDiv = document.querySelector('.medication');
const button = document.querySelector('.add-presc');
const textArea = document.querySelector('textarea')

const getMeds = async () => {
    const res = await fetch('http://localhost:5000/meds');
    const data = await res.json();
    data.map(meds => {
        const select = document.getElementById('select');
        select.name = "medication_id";
        let optInput = document.createElement('option');
        optInput.value = meds.id;
        optInput.textContent = meds.name
        select.append(optInput);
        medDiv.append(select, textArea, button);
        form.appendChild(medDiv)
        console.log(optInput)
    })
}
getMeds()
input.innerHtml = "";

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formElements = new FormData(form);
    const [medication_id, comment] = formElements.values();
    const pet_id = location.search.substring(2);

    try {
        const req = await fetch(`http://localhost:5000/prescriptions`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({medication_id, pet_id, comment}),
        });
        
        const data = await req.json();
        window.location.reload(true)
        console.log(data)
    } catch (error) {
        throw new Error(error)
    }
})