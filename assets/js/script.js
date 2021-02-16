const types = [{
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
console.log(hairdresserApp);
console.log(manicureApp);
console.log(otherApp);

// Function that generates a random number between min e max
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //max included - min included
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
      
    }
    return newAppointments;

  } catch (e) {
    throw (e);
  };
};

getAppointmentsAPI();