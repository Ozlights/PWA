firebase.initializeApp({
  apiKey: 'AIzaSyAAcTUjY48zVRT0Nv9a7faIZZYKdso5SLk',
  authDomain: 'pwa2-62c14.firebaseapp.com',
  databaseURL: 'https://pwa2-62c14.firebaseio.com',
  projectId: 'pwa2-62c14',
  storageBucket: '',
  messagingSenderId: '434572588146',
  appId: '1:434572588146:web:4beee6de7f5dad9c'
});

// Datos offline

firebase
  .firestore()
  .enablePersistence()
  .then(function() {
    // Initialize Cloud Firestore through firebase
    var db = firebase.firestore();
  })
  .catch(function(err) {
    if (err.code == 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code == 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  });

// Initialize Firebase

const auth = firebase.auth();
var db = firebase.firestore();
let user = {};
const saveA = document.getElementById('saveA');
const saveList = document.getElementById('saveList');

// Display de correo y regreso al index en caso de logout

auth.onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
    user = firebaseUser;
    document.getElementById('dispE').innerHTML +=
      '<br> <b> Cuenta de correo: </b>' + user.email;
  } else {
    console.log('not logged in');
    window.location = 'index.html';
  }
});

// Boton de Log Out

logout.addEventListener('click', () => {
  auth.signOut();
});

// Guardar alumnos en db

function guardar() {
  let txtnombre = document.getElementById('name').value;
  let txtapellido = document.getElementById('surename').value;

  db.collection('Alumnos')
    .add({
      first: txtnombre,
      last: txtapellido,
      asistencia: 'No tomada'
    })
    .then(function(docRef) {
      console.log('Document written with ID: ', docRef.id);
      document.getElementById('name').value = '';
      document.getElementById('surename').value = '';
    })
    .catch(function(error) {
      console.error('Error adding document: ', error);
    });
}

// Leer datos de db

var tabla = document.getElementById('tbody');

db.collection('Alumnos').onSnapshot(querySnapshot => {
  tabla.innerHTML = '';
  querySnapshot.forEach(doc => {
    console.log(`${doc.id} => ${doc.data()}`);
    tabla.innerHTML += `
      <tr>
      <td>${doc.data().first}</td>
      <td>${doc.data().last}</td>
      <td>
      <p> ${doc.data().asistencia} </p>
      <div class="control">
        <button id="delete" class="button is-success" onclick="presente('${
          doc.id
        }')"><i class="fas fa-check"></i></button>
      </div>
      <div class="control">
        <button id="delete" class="button is-warning" onclick="tarde('${
          doc.id
        }')"><i class="far fa-clock"></i></button>
    </div>
      <div class="control">
      <button id="delete" class="button is-danger" onclick="falta('${
        doc.id
      }')"><i class="fas fa-skull"></i></i></button>
    </div>    
      </td>
    <td>
      <div class="control">
        <button id="delete" class="button is-danger" onclick="borrar('${
          doc.id
        }')"><i class="fas fa-trash"></i></button>
      </div>
      <div class="control">
      <button id="delete" class="button is-warning" onclick="editar('${
        doc.id
      }', '${doc.data().first}', '${
      doc.data().last
    }')"><i class="far fa-edit"></i></button>
    </div>
    </td>
    </tr>
      
      `;
  });
});

// Borrar datos
function borrar(id) {
  db.collection('Alumnos')
    .doc(id)
    .delete()
    .then(function() {
      console.log('Document successfully deleted!');
    })
    .catch(function(error) {
      console.error('Error removing document: ', error);
    });
}

// Editar Alumnos
function editar(id, nombre1, apellido1) {
  document.getElementById('name').value = nombre1;
  document.getElementById('surename').value = apellido1;

  var buttun = document.getElementById('saveA');
  buttun.innerHTML = 'Editar';

  buttun.onclick = function() {
    var alumni = db.collection('Alumnos').doc(id);

    var nombre = document.getElementById('name').value;
    var apellido = document.getElementById('surename').value;

    return alumni
      .update({
        first: nombre,
        last: apellido
      })
      .then(function() {
        console.log('Document successfully updated!');
        document.getElementById('name').value = '';
        document.getElementById('surename').value = '';
        buttun.innerHTML = 'Guardar';
        buttun.onclick = function() {
          guardar();
        };
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  };
}

// Guardar asistencia
/*
saveList.addEventListener('click', () => {
  var washingtonRef = db.collection("Alumnos").doc(id);

// Set the "capital" field of the city 'DC'
return washingtonRef.update({
    asistencia: 
})
.then(function() {
    console.log("Document successfully updated!");
})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});

})

*/

// Botones de asistencia

function presente(id) {
  var alumni = db.collection('Alumnos').doc(id);

  return alumni
    .update({
      asistencia: 'Presente'
    })
    .then(function() {
      console.log('Asistencia tomada: Presente!');
    })
    .catch(function(error) {
      // The document probably doesn't exist.
      console.error('Error updating document: ', error);
    });
}

function tarde(id) {
  var alumni = db.collection('Alumnos').doc(id);

  return alumni
    .update({
      asistencia: 'Tarde'
    })
    .then(function() {
      console.log('Asistencia tomada: Tarde!');
    })
    .catch(function(error) {
      // The document probably doesn't exist.
      console.error('Error updating document: ', error);
    });
}

function falta(id) {
  var alumni = db.collection('Alumnos').doc(id);

  return alumni
    .update({
      asistencia: 'Falta'
    })
    .then(function() {
      console.log('Asistencia tomada: Falta!');
    })
    .catch(function(error) {
      // The document probably doesn't exist.
      console.error('Error updating document: ', error);
    });
}
