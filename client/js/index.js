const wrapper = document.querySelector('.wrapper')
const DB = 'http://localhost:5000/pets'


const displayData = async () => {
  wrapper.innerHTML = '';
  
  const response = await fetch(DB);
  const data = await response.json();

  data.map(pet => {
    const div = document.createElement('div');
    div.className = 'pet-card';
    
    const h3 = document.createElement('h3');
    h3.className = 'pet-name'
    h3.innerText = pet.name;
    const h4 = document.createElement('h4');
    h4.className = 'date';
    const date = `${pet.dob}`.slice(0, 10)
    h4.innerText = date;
    const p = document.createElement('p');
    p.className = 'client-email';
    p.innerText = pet.client_email;
    
    const view = document.createElement('button');
    view.className = 'btn-view';
    view.innerText = 'View Log';
    const del = document.createElement('button');
    del.className = 'btn-delete'
    del.innerText = 'Delete';

   
   
    view.onclick = () => {
      window.location.href = `http://127.0.0.1:5500/client/html/log.html?=${pet.id}` 
    };
    
    const deletePet = async () => {
      await fetch(`${DB}/${pet.id}`, {method: 'DELETE'})
    }
    del.onclick = async () => {
      await deletePet()
      await displayData()
    }
    wrapper.appendChild(div);
    div.append(h3, h4, p, view, del)
  })
  return wrapper
}




displayData()
