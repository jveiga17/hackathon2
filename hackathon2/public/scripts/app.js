//alert('ola) // test

// AJAX requests function
async function makeRequest(url, method = 'GET', body = null) {
  try {
    const response = await fetch(url, {     // HTTP req through fetch API
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {     // if response is not ok
      throw new Error(`Request failed. Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {     // error handling
    console.error('Error during request:', error);
  }
}


// handling user registration
async function registerUser(event) {
  event.preventDefault(); // preventing default behavior

  const username = document.getElementById('username').value;     // retrieving values of usr and pwd
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/auth/register', {      // calls 'makeRequest' to send registration req
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Not able to register due to "${errorData.error}"`);
      return;
    }

    // Redirect to 'congrats.html' after successful registration
    window.location.href = 'congrats.html';
  } catch (error) {
    console.error('Error during registration:', error);
  }
}


// handling user login
async function login(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      alert(`Not able to login due to "${errorData.error}"`);
      throw new Error('Login failed');
    }
  
    // const result = await response.json();

    // Redirect to the account page after successful login
    window.location.href = 'account.html';
  } catch (error) {
    console.error("Error during login:", error);
  }
}


// defining my songs array
const songsArray = {
  calm: [{ name: 'Media Luna', artist: 'Mora', image: '../img/media-luna.jpeg'}, { name: 'Hélas', artist: 'Cœur de pirate', image: '../img/helas.jpg'}, { name: 'Hailleys Comet', artist: 'Billie Eilish', image: '../img/hailleys.jpeg'}, { name: 'Hornstullsstrand', artist: 'Hov1 & Veronica Maggio', image: '../img/hov1.png'}, { name: 'O Que Eu Bebi', artist: 'Clarice Falcão', image: '../img/clarice.jpg'}, { name: 'enough for you', artist: 'Olivia Rodrigo', image: '../img/olivia.jpeg'}, { name: 'Lonely', artist: 'Justin Bieber', image: '../img/lonely.jpeg'}, { name: 'Amorfoda', artist: 'Bad Bunny', image: '../img/amorfoda.png'}, { name: 'Somnambule', artist: 'Cœur de pirate', image: '../img/somnambule.jpg'}, { name: 'Supermarket Flowers', artist: 'Ed Sheeran', image: '../img/divide.jpg'}],
  energizing: [{ name: 'Yandel 150', artist: 'Yandel & Feid', image: '../img/yandel.png'}, { name: 'La Jumpa', artist: 'Arcangel & Bad Bunny', image: '../img/lajumpa.jpeg'}, { name: 'CLASSY 101', artist: 'Feid & Young Miko', image: '../img/classy.jpg'}, { name: 'Modelito', artist: 'Mora', image: '../img/modelito.jpg'}, { name: 'La Inocente', artist: 'Mora', image: '../img/lainocente.png'}, { name: 'Favelada', artist: 'Carla Prata', image: '../img/roots.jpg'}, { name: 'greedy', artist: 'Tate McRae', image: '../img/greedy.png'}, { name: 'T`as peur', artist: 'Aya Nakamura', image: '../img/aya.jpeg'}, { name: 'Madrid City', artist: 'Ana Mena', image: '../img/madrid.jpg'}, { name: 'Despechá', artist: 'Rosalia', image: '../img/despecha.png'}],
  focus: [{ name: 'Nunca Mais', artist: 'Sant', image: '../img/santdepara.jpg'}, { name: 'Pertence ao Crime', artist: 'Sant', image: '../img/rapdos.jpeg'}, { name: 'Till I Collapse', artist: 'Eminem', image: '../img/emshow.jpg'}, { name: 'Sing For The Moment', artist: 'Eminem', image: '../img/emshow.jpg'}, { name: 'When I Grow Up', artist: 'NF', image: '../img/nf.png'}, { name: 'Sigue', artist: 'Morad', image: '../img/sigue.jpg'}, { name: 'Bença', artist: 'Djonga', image: '../img/djonga.png'}, { name: 'Soma ou Some', artist: 'ADL', image: '../img/adl.jpg'}, { name: 'Stressed Out', artist: 'Twenty One Pilots', image: '../img/21p.png'}, { name: 'Ride', artist: 'Twenty One Pilots', image: '../img/21p.png'}]
}

// display 3 random songs based on the selected mood
function displayPlaylist() {
  // mood selector dropdown
  const moodSelector = document.getElementById('moodSelector');
  // get the selected mood
  const selectedMood = moodSelector.value;
  // get the container where you want to display the songs
  const songsContainer = document.getElementById('songsContainer');

  // checking if the selected mood is valid
  if (songsArray.hasOwnProperty(selectedMood)) {
    // getting 3 random songs from the songs array
    const selectedSongs = shuffleSongs(songsArray[selectedMood], 3);

  songsContainer.innerHTML = `<h2>Enjoy your ${selectedMood} playlist</h2>`;
  const tracksList = document.createElement('ul');

  selectedSongs.forEach((song) => {
  const trackItem = document.createElement('li');

  // h6 element for song name and artist
  const songInfo = document.createElement('h4');
  songInfo.style.textDecoration = 'none';
  songInfo.innerHTML = `<strong>"${song.name}"</strong> by ${song.artist}`;

  // img element
  const imageElement = document.createElement('img');
  imageElement.src = `img/${song.image}`; // Use the image property from the array
  imageElement.alt = `${song.name} cover`;
  imageElement.style.width = '80px'; 
  imageElement.style.marginLeft = '10px'; // Add some spacing between the text and image
  imageElement.style.borderRadius = '50%';  

  // appending the song info and image to the track item
  trackItem.appendChild(songInfo);
  trackItem.appendChild(imageElement);

  // appending the track item to the list
  tracksList.appendChild(trackItem);
});

// appending the tracks list to the container
songsContainer.appendChild(tracksList);

  } else {
    console.error('Invalid mood selected');
  }
}

// shuffle - helper function = to get random songs from an array
function shuffleSongs(array, count) {
  const shuffledArray = array.sort(() => Math.random() - 0.5);
  return shuffledArray.slice(0, count);
}

