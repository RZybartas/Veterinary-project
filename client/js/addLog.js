const form = document.querySelector('form');
        const input = document.querySelectorAll('input');
        const pet_id = location.search.substring(2);
        input.innerHtml = "";
        form.addEventListener('submit', async (e) => {
            e.preventDefault()
            const formElements = new FormData(form);
            const [description, status] = formElements.values();

            try {
                const req = await fetch('http://localhost:5000/logs', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({pet_id, description, status}),
                });
                const data = await req.json();
                window.location.reload(true)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        })