const types = [
  {
    id: 1,
    name: 'Parrucchieria'
  },
  {
    id: 2,
    name: 'Manicure'
  },
  {
    id: 3,
    name: 'Altro'
  }
];

let hairdresserApp = [];
let manicureApp = [];
let otherApp = [];

const cardWrapperHair = document.querySelector('#wrapperHair');
const cardWrapperMani = document.querySelector('#wrapperMani');
const cardWrapperOther = document.querySelector('#wrapperOther');
const descriptionHair = document.querySelector('#description-hair');
const descriptionMani = document.querySelector('#description-mani');
const descriptionOther = document.querySelector('#description-other');

// Function that generates a random number between min e max
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //max included - min included
};

const renderFunction = (renderList, appendElementId) => {
  renderList.forEach(appointment => {
    const myPriority = document.createElement('p')
    const myCardText = document.createElement('p');
    const mytypeId = document.createElement('h2');
    const myCardBody = document.createElement('div');
    const myCardHeader = document.createElement('div');
    const myCard = document.createElement('div');

    myPriority.textContent = 'Priorità: ' + appointment.priority;
    myCardText.textContent = appointment.title;
    mytypeId.textContent = 'Cliente: ' + appointment.id;

    myPriority.classList.add('priority');
    myCardBody.classList.add('card-body');
    myCardHeader.classList.add('card-header');
    myCard.classList.add('card');

    if (appointment.completed === true) {
      myCardBody.classList.add('is-completed');
      myCardText.classList.add('lineThrough')
      myPriority.textContent = 'Completato'
    };

    myCardBody.append(myCardText, myPriority);
    myCardHeader.appendChild(mytypeId);
    myCard.append(myCardHeader, myCardBody);
    appendElementId.appendChild(myCard);
  })
};

// API call
async function getAppointmentsAPI() {

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    // console.log(response);
    const appointments = await response.json();
    // console.log(appointments)
    const newAppointments = appointments.map((appointment) => {
      return {
        ...appointment,
        priority: getRandomInt(1, 4),
        typeId: getRandomInt(1, 3)
      }
    });

    // Created a new array for each typeId
    for (let i = 0; i < newAppointments.length; i++) {

      if (newAppointments[i].typeId === types[0].id) {
        hairdresserApp.push(newAppointments[i]);

      } else if (newAppointments[i].typeId === types[1].id) {
        manicureApp.push(newAppointments[i]);

      } else if (newAppointments[i].typeId === types[2].id) {
        otherApp.push(newAppointments[i])
      }

    };

    descriptionHair.textContent = 'Appuntamenti Parruccheria: ' + (hairdresserApp.length);
    descriptionMani.textContent = 'Appuntamenti Manicure: ' + (manicureApp.length);
    descriptionOther.textContent = 'Altri Appuntamenti: ' + (otherApp.length);

    renderFunction(hairdresserApp, cardWrapperHair);
    renderFunction(manicureApp, cardWrapperMani);
    renderFunction(otherApp, cardWrapperOther);

    return newAppointments;

  } catch (e) {
    throw (e);
  };
};

getAppointmentsAPI();