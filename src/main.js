// Select the profile icon and modal elements
const profileIcon = document.getElementById('profileIcon');
const profileFormModal = document.getElementById('profileFormModal');
const closeModal = document.getElementById('closeModal');
const profileForm = document.getElementById('profileForm');

// Toggle modal visibility when the profile icon is clicked
profileIcon.addEventListener('click', () => {
  profileFormModal.classList.remove('hidden');
});

// Close the modal when the cancel button is clicked
closeModal.addEventListener('click', () => {
  profileFormModal.classList.add('hidden');
});

// Handle form submission (save profile)
profileForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const avatar = document.getElementById('avatar').files[0];
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;

  // For now, just log the details to the console
  console.log('Avatar:', avatar);
  console.log('First Name:', firstName);
  console.log('Last Name:', lastName);

  // Close the modal after saving the profile
  profileFormModal.classList.add('hidden');
});

// Fetch movies function (keeps the existing functionality)
const API_KEY = '8fca2581';

const fetchMovies = async (title) => {
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`);
    const data = await response.json();
    console.log(data.Search); // Movie results
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};

// Example usage
fetchMovies('Inception');
