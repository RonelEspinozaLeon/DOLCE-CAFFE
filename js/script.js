// =======================================
//  FILTRADO POR CATEGORÍAS
// =======================================
const filterBtns = document.querySelectorAll(".filter-btn");
const items = document.querySelectorAll(".item");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".filter-btn.active")?.classList.remove("active");
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        items.forEach(item => {
            item.style.display =
                filter === "all" || item.classList.contains(filter)
                ? "block"
                : "none";
        });
    });
});


// =======================================
//  THEME SWITCHER (LIGHT / DARK MODE)
// =======================================
const themeSwitcher = document.getElementById("themeSwitcher");

// Cargar preferencia guardada
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeSwitcher.checked = true;
}

// Cambiar tema al mover el switch
themeSwitcher.addEventListener("change", () => {
    const isDark = themeSwitcher.checked;
    document.body.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
});


// =======================================
//  MODAL DE IMÁGENES (Galería)
// =======================================
const imgModal = document.getElementById("modal");
const imgModalImg = document.getElementById("modalImg");
const imgModalTitle = document.getElementById("modalTitle");
const imgModalDesc = document.getElementById("modalDesc");
const imgCloseModal = document.getElementById("closeModal");

const imgPrevBtn = document.getElementById("prevBtn");
const imgNextBtn = document.getElementById("nextBtn");

let imgIndex = 0;

// Convertir NodeList a array
const itemList = Array.from(items);

// Abrir modal con imagen seleccionada
items.forEach((item, index) => {
    item.addEventListener("click", () => {
        imgIndex = index;
        showItem(imgIndex);
        imgModal.style.display = "flex";
    });
});

function showItem(index) {
    const item = itemList[index];
    imgModalImg.src = item.dataset.img;
    imgModalTitle.textContent = item.dataset.title;
    imgModalDesc.textContent = item.dataset.desc;
}

// Siguiente imagen
imgNextBtn.addEventListener("click", () => {
    imgIndex = (imgIndex + 1) % itemList.length;
    showItem(imgIndex);
});

// Anterior
imgPrevBtn.addEventListener("click", () => {
    imgIndex = (imgIndex - 1 + itemList.length) % itemList.length;
    showItem(imgIndex);
});

// Cerrar
imgCloseModal.addEventListener("click", () => {
    imgModal.style.display = "none";
});

window.addEventListener("click", e => {
    if (e.target === imgModal) imgModal.style.display = "none";
});

// =======================================
//  PAGINACIÓN MODERNA
// =======================================

let currentPage = 1;
const itemsPerPage = 6; // cantidad visible
const allItems = Array.from(items);

const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");
const pageNumbersContainer = document.getElementById("pageNumbers");

// Renderizar galería
function renderPage() {
    const activeFilter = document.querySelector(".filter-btn.active")?.dataset.filter;

    const filteredItems = allItems.filter(item =>
        activeFilter === "all" || item.classList.contains(activeFilter)
    );

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    if (currentPage > totalPages) currentPage = totalPages || 1;

    // Ocultar todo
    allItems.forEach(item => (item.style.display = "none"));

    // Mostrar rango
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    filteredItems.slice(start, end).forEach(item => item.style.display = "block");

    renderPageNumbers(totalPages);

    // Desactivar botones si corresponde
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
}

// Renderizar números de página bonitos
function renderPageNumbers(totalPages) {
    pageNumbersContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const numberBtn = document.createElement("span");
        numberBtn.textContent = i;
        numberBtn.classList.add("page-number");

        if (i === currentPage) numberBtn.classList.add("active");

        numberBtn.addEventListener("click", () => {
            currentPage = i;
            renderPage();
        });

        pageNumbersContainer.appendChild(numberBtn);
    }
}

// Botones siguiente / anterior
nextPageBtn.addEventListener("click", () => {
    currentPage++;
    renderPage();
});

prevPageBtn.addEventListener("click", () => {
    currentPage--;
    renderPage();
});

// Actualizar paginación cuando cambian filtros
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        currentPage = 1;
        setTimeout(renderPage, 50);
    });
});

// Cargar primera página
renderPage();
// ========== LISTA DE VIDEOS ==========
const videoThumbs = document.querySelectorAll(".video-thumb");
const modal = document.getElementById("videoModal");
const videoPlayer = document.getElementById("videoPlayer");
const closeModal = document.getElementById("closeVideoModal");

const prevBtn = document.getElementById("prevVideo");
const nextBtn = document.getElementById("nextVideo");

let currentIndex = 0;
let videoList = [];

// Guardar todos los videos en un array
videoThumbs.forEach((thumb, index) => {
    videoList.push(thumb.dataset.video);

    thumb.addEventListener("click", () => {
        currentIndex = index;
        openVideo(videoList[currentIndex]);
    });
});

// ========== ABRIR VIDEO ==========
function openVideo(src) {
    videoPlayer.src = src;
    modal.style.display = "flex";
    videoPlayer.play();
}

// ========== CERRAR MODAL ==========
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    videoPlayer.pause();
});

// ========== NAVEGAR ENTRE VIDEOS ==========
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + videoList.length) % videoList.length;
    openVideo(videoList[currentIndex]);
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % videoList.length;
    openVideo(videoList[currentIndex]);
});

// Cerrar clickeando fuera
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        videoPlayer.pause();
    }
});
