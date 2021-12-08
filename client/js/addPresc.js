const form = document.querySelector('form');
        const input = document.querySelectorAll('input');
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