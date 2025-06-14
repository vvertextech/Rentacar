window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.classList.add('hidden');
  setTimeout(() => {
    loadingScreen.style.display = 'none';
  }, 2500);
});


let countersAnimated = false;

const counters = document.querySelectorAll(".counter");

const animateCounters = () => {
  counters.forEach((counter) => {
    counter.innerText = "0";
    const updateCounter = () => {
      const target = +counter.getAttribute("data-target");
      const current = +counter.innerText;
      const increment = target / 100;

      if (current < target) {
        counter.innerText = `${Math.ceil(current + increment)}`;
        setTimeout(updateCounter, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCounter();
  });
};

window.addEventListener("scroll", () => {
  const section = document.querySelector(".stats-section");
  const sectionTop = section.getBoundingClientRect().top;
  const triggerPoint = window.innerHeight - 100;

  if (sectionTop < triggerPoint && !countersAnimated) {
    animateCounters();
    countersAnimated = true; // Prevents re-animation
  }
});

const cars = [
  {
    id: 1,
    name: "BMW M1",
    images: [
      "img/bmwm1/1.jpg",
      "img/bmwm1/2.jpg",
      "img/bmwm1/3.jpg",
      "img/bmwm1/4.jpg",
      "img/bmwm1/5.jpg",
    ],
    description: "M140i SPECIAL EDITION SPORT",
    price: "$20/day",
    year: "2010",
    engine: "88 kW (120 hp)",
    fuel: "Diesel",
  },
  {
    id: 2,
    name: "Volkswagen Golf 6",
    images: [
      "img/golf7blue/1.jpg",
      "img/golf7blue/2.jpg",
      "img/golf7blue/3.jpg",
      "img/golf7blue/4.jpg",
      "img/golf7blue/5.jpg",
    ],
    description: "1.0 TSI 115 CV DSG 5p. Comfortline BlueMotion",
    price: "$45/day",
    year: "2017",
    engine: "85 kW (116 hp)",
    fuel: "Gasoline",
  },
  {
    id: 3,
    name: "Volkswagen Golf 7",
    images: [
      "img/golf7red/1.jpg",
      "img/golf7red/2.jpg",
      "img/golf7red/3.jpg",
      "img/golf7red/4.jpg",
      "img/golf7red/5.jpg",
    ],
    description: "1.6 TDI BMT Lounge DSG Bi-Xenon",
    price: "$35/day",
    year: "2015",
    engine: "81 kW (110 hp)",
    fuel: "Diesel",
  },
  {
    id: 4,
    name: "Skoda Octavia",
    images: [
      "img/scoda/1.jpg",
      "img/scoda/2.jpg",
      "img/scoda/3.jpg",
      "img/scoda/4.jpg",
      "img/scoda/5.jpg",
    ],
    description: "1.0 TSI Style",
    price: "$30/day",
    year: "2016",
    engine: "85 kW (116 hp)",
    fuel: "Gasoline",
  },
  {
    id: 5,
    name: "Volkswagen Golf GTE",
    images: [
      "img/gte/2.webp",
      "img/gte/1.webp",
      "img/gte/3.webp",
      "img/gte/4.webp",
      "img/gte/5.webp",
    ],
    description: "1.4 TSI Connected Series | Navigatie | CruiseContr",
    price: "$50/day",
    year: "2016",
    engine: "150 kW (204 hp)",
    fuel: "Electric/Gasoline",
  },
  {
    id: 6,
    name: "Opel Astra",
    images: [
      "img/opel/1.webp",
      "img/opel/2.webp",
      "img/opel/3.webp",
      "img/opel/4.webp",
      "img/opel/5.webp",
    ],
    description: "K Sports Tourer Elegance Klima 12/25",
    price: "$25/day",
    year: "2020",
    engine: "90 kW (122 hp)",
    fuel: "Diesel",
  },
];

// Display cars in the car list
const carList = document.getElementById("carList");
carList.innerHTML = cars
  .map(
    (car) => `
  <div class="car-card" data-id="${car.id}">
    <img src="${car.images[0]}" alt="${car.name}" />
    <h3>${car.name}</h3>
    <p>${car.description}</p>
    <button class="btn" data-id="${car.id}">View Details</button>
  </div>`
  )
  .join("");

// Open the car modal with details
const carModal = document.getElementById("carModal");
const modalTitle = document.getElementById("modalCarTitle");
const modalImage = document.getElementById("modalCarImage");
const modalDescription = document.getElementById("modalCarDescription");
const modalPrice = document.getElementById("modalCarPrice");
const closeModal = document.getElementById("closeModal");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentCar = null;

// Show modal with car details
carList.addEventListener("click", (event) => {
  if (event.target && event.target.matches("button")) {
    const carId = event.target.getAttribute("data-id");
    currentCar = cars.find((car) => car.id == carId);
    openModal(currentCar);
  }
});

// Open modal function
function openModal(car) {
  modalTitle.textContent = car.name;
  modalImage.src = car.images[0];
  modalDescription.textContent = car.description;
  modalPrice.textContent = `Price: ${car.price}`;
  document.getElementById("modalCarYear").textContent = car.year;
  document.getElementById("modalCarEngine").textContent = car.engine;
  document.getElementById("modalCarFuel").textContent = car.fuel;
  carModal.classList.remove("hidden");
  currentImageIndex = 0; // Reset slider index
}

// Close modal
closeModal.addEventListener("click", () => {
  carModal.classList.add("hidden");
});

// Image slider functionality
let currentImageIndex = 0;
prevBtn.addEventListener("click", () => {
  if (currentCar) {
    currentImageIndex--;
    if (currentImageIndex < 0) {
      currentImageIndex = currentCar.images.length - 1; // wrap to last image
    }
    modalImage.src = currentCar.images[currentImageIndex];
  }
});

nextBtn.addEventListener("click", () => {
  if (currentCar) {
    currentImageIndex++;
    if (currentImageIndex >= currentCar.images.length) {
      currentImageIndex = 0; // wrap to first image
    }
    modalImage.src = currentCar.images[currentImageIndex];
  }
});

// List of available car models with booking state
const carModels = [
  { name: "BMW M1", isBooked: false },
  { name: "Volkswagen Golf 6", isBooked: false },
  { name: "Volkswagen Golf 7", isBooked: false },
  { name: "Skoda Octavia", isBooked: false },
  { name: "Volkswagen Golf GTE", isBooked: false },
  { name: "Opel Astra", isBooked: false },
];

// Randomly mark 2 or 3 unique cars as booked at the start
const markRandomCarsAsBooked = () => {
  const numberToBook = Math.floor(Math.random() * 2) + 2; // 2 or 3
  const bookedIndices = new Set();

  while (bookedIndices.size < numberToBook) {
    const randomIndex = Math.floor(Math.random() * carModels.length);
    bookedIndices.add(randomIndex);
  }

  bookedIndices.forEach((index) => {
    carModels[index].isBooked = true;
  });
};

// Populate dropdown with car models, disabling booked ones
const populateCarModelDropdown = () => {
  const carModelSelect = document.querySelector("#bookingForm #carModel");
  carModelSelect.innerHTML =
    "<option value='' disabled selected>Select a car model</option>";

  carModels.forEach((car) => {
    const option = document.createElement("option");
    option.value = car.name;
    option.textContent = car.name;

    if (car.isBooked) {
      option.textContent += " (Booked)";
      option.classList.add("booked");
      option.disabled = true;
    }

    carModelSelect.appendChild(option);
  });
};

// On page load
document.addEventListener("DOMContentLoaded", () => {
  markRandomCarsAsBooked();
  populateCarModelDropdown();

  // Set min date for pickup and return inputs
  const todayStr = new Date().toISOString().split("T")[0];
  document.getElementById("pickupDate").min = todayStr;
  document.getElementById("returnDate").min = todayStr;
});

// Booking form submission
document.querySelector("#bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const pickupInput = this.querySelector("#pickupDate");
  const returnInput = this.querySelector("#returnDate");

  const pickupDate = new Date(pickupInput.value);
  const returnDate = new Date(returnInput.value);
  const today = new Date();

  // Normalize time for date-only comparison
  today.setHours(0, 0, 0, 0);
  pickupDate.setHours(0, 0, 0, 0);
  returnDate.setHours(0, 0, 0, 0);

  // Validate dates
  if (pickupDate < today) {
    alert("🚫 Pick-up date cannot be in the past.");
    return;
  }

  if (returnDate < pickupDate) {
    alert("🚫 Return date cannot be before the pick-up date.");
    return;
  }

  // Validate car selection
  const carModelSelect = this.querySelector("#carModel");
  const selectedCarName = carModelSelect.value;

  if (!selectedCarName) {
    alert("⚠️ Please select a car model.");
    return;
  }

  // Check if car is already booked (extra safety)
  const selectedCar = carModels.find((car) => car.name === selectedCarName);
  if (selectedCar.isBooked) {
    alert("🚫 Selected car is already booked. Please choose another.");
    return;
  }

  // Disable button while submitting
  const button = this.querySelector("button");
  button.innerHTML = "Submitting...";
  button.disabled = true;

  setTimeout(() => {
    // Mark the selected car as booked
    selectedCar.isBooked = true;

    alert("✅ Your car booking request has been submitted!");

    this.reset(); // Reset form
    populateCarModelDropdown(); // Update dropdown with booked cars
    button.innerHTML = "Submit";
    button.disabled = false;
  }, 1500);
});

document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;

    // Close others:
    document.querySelectorAll('.faq-item').forEach(item => {
      if (item !== faqItem) {
        item.classList.remove('open');
      }
    });

    // Toggle this one:
    faqItem.classList.toggle('open');
  });
});

const allReviews = [
  { name: "Emily R.", rating: 5, text: "Amazing service and very clean cars! The booking process was super smooth. Highly recommend Loriki Rent-A-Car!" },
  { name: "Michael S.", rating: 4, text: "Good selection of vehicles and the customer support was helpful. Will rent again." },
  { name: "Sara T.", rating: 3, text: "The car was fine but the pickup took longer than expected. Overall okay experience." },
  { name: "James L.", rating: 5, text: "Best rental company I've used so far. Great prices and reliable cars." },
  { name: "Olivia P.", rating: 4, text: "Nice cars and friendly staff. Would like more options in electric vehicles." },
  { name: "David K.", rating: 5, text: "Professional, easy booking and the car was perfect for my trip." },
  { name: "Sophia W.", rating: 4, text: "Great experience overall, but the return process could be quicker." },
  { name: "Daniel M.", rating: 3, text: "Cars are decent but I found better deals elsewhere." },
  { name: "Isabella H.", rating: 5, text: "Loved the luxury cars available! Made my vacation special." },
  { name: "Ethan B.", rating: 4, text: "Reliable and good prices. Would recommend to friends." },
  { name: "Mia C.", rating: 5, text: "Customer service was excellent and the vehicle was spotless." },
  { name: "Liam J.", rating: 2, text: "Had some issues with the booking confirmation but they fixed it fast." },
  { name: "Charlotte F.", rating: 5, text: "Amazing fleet and easy online booking process." },
  { name: "Noah G.", rating: 4, text: "Very convenient service with friendly staff." },
  { name: "Amelia D.", rating: 3, text: "The car was good but felt the price was slightly high." }
];

function createStars(rating) {
  let starsHTML = "";
  for (let i = 1; i <= 5; i++) {
    starsHTML += i <= rating ? "&#9733;" : "&#9734;"; // filled or empty star
  }
  return starsHTML;
}

function getRandomReviews(arr, n) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function renderReviews(reviews) {
  const reviewsList = document.querySelector(".reviews-list");
  reviewsList.innerHTML = "";

  reviews.forEach(review => {
    const reviewItem = document.createElement("div");
    reviewItem.classList.add("review-item");

    reviewItem.innerHTML = `
      <strong class="reviewer-name">${escapeHTML(review.name)}</strong>
      <div class="rating">${createStars(review.rating)}</div>
      <p>${escapeHTML(review.text)}</p>
    `;

    reviewsList.appendChild(reviewItem);
  });
}

function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll("#rating-stars .star");
  let selectedRating = 0;

  stars.forEach(star => {
    star.addEventListener("mouseenter", () => {
      highlightStars(star.dataset.value);
    });
    star.addEventListener("mouseleave", () => {
      highlightStars(selectedRating);
    });
    star.addEventListener("click", () => {
      selectedRating = Number(star.dataset.value);
      highlightStars(selectedRating);
    });
  });

  function highlightStars(rating) {
    rating = Number(rating);
    stars.forEach(star => {
      star.classList.toggle("selected", Number(star.dataset.value) <= rating);
      star.innerHTML = Number(star.dataset.value) <= rating ? "&#9733;" : "&#9734;";
    });
  }

  document.getElementById("submit-review").addEventListener("click", e => {
    e.preventDefault();

    const nameInput = document.getElementById("reviewer-name");
    const reviewText = document.getElementById("review-text");
    const name = nameInput.value.trim();
    const text = reviewText.value.trim();

    if (!name) {
      alert("Please enter your name.");
      return;
    }
    if (selectedRating === 0) {
      alert("Please select a star rating.");
      return;
    }
    if (!text) {
      alert("Please enter your review text.");
      return;
    }

    const newReview = { name, rating: selectedRating, text };
    allReviews.push(newReview);

    renderReviews(getRandomReviews(allReviews, 3));

    // Clear inputs and reset
    nameInput.value = "";
    reviewText.value = "";
    selectedRating = 0;
    highlightStars(0);
  });

  // On page load, show 3 random reviews
  renderReviews(getRandomReviews(allReviews, 3));
});
