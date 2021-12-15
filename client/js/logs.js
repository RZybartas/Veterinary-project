const wrapperLog = document.querySelector('.wrapper-log');
const spanName = document.querySelector('.log__pet-name');
const filterPrescription = document.querySelector('.btn.presc');
const filterLog = document.querySelector('.btn.logs');
const prescButton = document.querySelector('.prescription');
const logButton = document.querySelector('.log');

const getPets = async () => {
    const id =  location.search.substring(2)
    const res = await fetch(`http://localhost:5000/pets/${id}`);
    const data = await res.json();

    data.map(pets => {
        spanName.textContent = `${pets.name}`;
        prescButton.onclick = () => {
                window.location.href = `http://127.0.0.1:5500/client/html/addPrescription.html?=${id}`
            };
    
            logButton.onclick = () => {
                    window.location.href = `http://127.0.0.1:5500/client/html/addLog.html?=${id}`
                }
        
            });
}
getPets();
            
const petsLog = async () => {
    const id =  location.search.substring(2)
    console.log(id)
    const response = await fetch(`http://localhost:5000/prescriptions/${id}`);
    const logs = await response.json();
    wrapperLog.innerHTML = '';
    console.log(logs)
    logs.map(pet => {
        spanName.textContent = `${pet.name}`;
        const logInfo = document.createElement('div');
        logInfo.className = 'log-info'
        const div = document.createElement('div');
        const medName = document.createElement('h4');
        medName.className = 'med-name';
        medName.textContent = pet.m_name;
        const medDesc = document.createElement('p');
        medDesc.className = 'med-desc'
        medDesc.textContent = pet.m_description;
        const prescDate = document.createElement('p');
        prescDate.textContent = `${pet.timestamp.slice(0, 10)}`
        prescDate.className = 'presc-date';
        const prescComment = document.createElement('p');
        prescComment.className = 'presc-comment'
        prescComment.textContent = `${pet.comment}`;
        
        const logCard = document.createElement('div');
        logCard.className = 'log-card'
        const logStatus = document.createElement('h4');
        logStatus.className = 'log-status'
        logStatus.textContent = `${pet.status}`;
        const logDesc = document.createElement('p');
        logDesc.className = 'log-description'
        logDesc.textContent = `${pet.l_description}`;
        
        
        div.append(medName, medDesc, prescDate, prescComment);
        logCard.append(logStatus, logDesc);
        logInfo.append(div, logCard);
        wrapperLog.appendChild(logInfo);
        
        prescButton.onclick = () => {
            window.location.href = `http://127.0.0.1:5500/client/html/addPrescription.html?=${id}`
        };

        logButton.onclick = () => {
            window.location.href = `http://127.0.0.1:5500/client/html/addLog.html?=${id}`
        }

        filterLog.addEventListener('click', () => {
            if (logCard.style.display == 'block') {
                filterLog.style.backgroundColor = 'var(--color-secondary)'
                logCard.style.display = 'none'
                filterLog.style.border = '1px solid var(--color-primary)'
                filterLog.style.color = 'var(--color-primary)'
                filterLog.innerHTML = 'Logs'
            } else {
                logCard.style.display = 'block'
                filterLog.style.backgroundColor = 'var(--color-primary)'
                filterLog.style.color = 'var(--color-secondary)'
                filterLog.innerHTML = 'Logs &#x2713'
            }
        });

        filterPrescription.addEventListener('click', () => {
            if (div.style.display === 'block') {
                filterPrescription.style.backgroundColor = 'var(--color-secondary)'
                div.style.display = 'none'
                filterPrescription.style.border = '1px solid var(--color-primary)'
                filterPrescription.style.color = 'var(--color-primary)'
                filterPrescription.innerHTML = 'Prescriptions'
            } else {
                div.style.display = 'block'
                filterPrescription.style.backgroundColor = 'var(--color-primary)'
                filterPrescription.style.color = 'var(--color-secondary)'
                filterPrescription.innerHTML = 'Prescriptions &#x2713'
            }
        })
    })
    
    return wrapperLog
}




petsLog();