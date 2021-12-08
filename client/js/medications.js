const wrapper = document.querySelector('.wrapper');
const DB = 'http://localhost:5000/meds';

const displayMeds = async () => {
    const res = await fetch(DB);
    const data = await res.json();
    console.log(data)

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
        wrapper.appendChild(div)
    })
    return wrapper
}

displayMeds()