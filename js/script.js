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
//  MODAL & NAVEGACIÓN ENTRE IMÁGENES
// =======================================
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeModal = document.getElementById("closeModal");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Convertir NodeList a array
const itemList = Array.from(items);
let currentIndex = 0;

// Abrir modal con la imagen seleccionada
items.forEach((item, index) => {
    item.addEventListener("click", () => {
        currentIndex = index;
        showItem(currentIndex);
        modal.style.display = "flex";
    });
});

// Función que actualiza el modal
function showItem(index) {
    const item = itemList[index];
    modalImg.src = item.dataset.img;
    modalTitle.textContent = item.dataset.title;
    modalDesc.textContent = item.dataset.desc;
}

// Siguiente imagen
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % itemList.length;
    showItem(currentIndex);
});

// Imagen anterior
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + itemList.length) % itemList.length;
    showItem(currentIndex);
});

// Cerrar modal con botón
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Cerrar modal haciendo clic fuera
window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
});
