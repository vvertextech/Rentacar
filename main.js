document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const carData = [
    {
      id: 1,
      name: "Audi A4",
      images: [
        "https://www.pngplay.com/wp-content/uploads/13/Audi-A4-2019-Background-PNG.png",
        "https://cdn.pixabay.com/photo/2017/03/27/13/27/audi-2179220_960_720.jpg",
      ],
      price: "$80/day",
      description:
        "A smooth luxury sedan with a sporty edge. Perfect for business and leisure trips.",
    },
    {
      id: 2,
      name: "BMW M3",
      images: [
        "https://www.pngplay.com/wp-content/uploads/13/BMW-M3-2019-PNG-Images-HD.png",
        "https://cdn.pixabay.com/photo/2018/05/04/19/57/bmw-3379820_960_720.jpg",
      ],
      price: "$100/day",
      description:
        "High-performance and elegance combined. Ideal for speed lovers.",
    },
    {
      id: 3,
      name: "Tesla Model 3",
      images: [
        "https://www.pngplay.com/wp-content/uploads/13/Tesla-Model-3-Transparent-Background.png",
        "https://cdn.pixabay.com/photo/2019/07/03/14/11/tesla-4312456_960_720.jpg",
      ],
      price: "$90/day",
      description:
        "Electric luxury with autopilot. Silent, fast, and sustainable.",
    },
  ];

  // Render cars into HTML
  const carGrid = document.getElementById("carGrid");
  carData.forEach((car) => {
    const card = document.createElement("div");
    card.classList.add("car-card");
    card.innerHTML = `
      <img src="${car.images[0]}" alt="${car.name}">
      <h3>${car.name}</h3>
      <p>${car.price}</p>
      <button class="btn" onclick="openModal(${car.id})">View Details</button>
    `;
    carGrid.appendChild(card);
  });

  // Modal variables
  const modal = document.getElementById("carModal");
  const modalImg = document.getElementById("modalCarImage");
  const modalTitle = document.getElementById("modalCarTitle");
  const modalDesc = document.getElementById("modalCarDescription");
  const closeModalBtn = document.getElementById("closeModal");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentImages = [];
  let currentIndex = 0;

  // Open modal
  window.openModal = function (carId) {
    const car = carData.find((c) => c.id === carId);
    if (!car) return;

    currentImages = car.images;
    currentIndex = 0;

    modalImg.src = currentImages[currentIndex];
    modalTitle.textContent = car.name;
    modalDesc.textContent = car.description;

    modal.classList.remove("hidden");
  };

  // Close modal
  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Navigate images
  prevBtn.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + currentImages.length) % currentImages.length;
    modalImg.src = currentImages[currentIndex];
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    modalImg.src = currentImages[currentIndex];
  });
});
