const wrapperMeds = document.querySelector('.wrapper-meds');

const displayMeds = async () => {
    wrapperMeds.innerHTML = "";
    const res = await fetch('http://localhost:5000/meds');
    const data = await res.json();

    data.map(medication => {
        const div = document.createElement('div');
        div.className = 'medication-card';
        const medName = document.createElement('h3');
        medName.className = 'medication-name';
        medName.textContent = medication.name;
        const medDesc = document.createElement('p');
        medDesc.className = 'medication-description';
        medDesc.textContent = medication.description;

        div.append(medName, medDesc);
        wrapperMeds.appendChild(div)
    })
    return wrapperMeds
}

displayMeds()