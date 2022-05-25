const navMenuBtn = document.querySelector(".hamburger-menu_header");
const navMenu = document.querySelector("#primary-nav");
const bar1 = document.querySelector("#Path_23");

navMenuBtn.addEventListener("click", menuDropdown);

function menuDropdown() {
    const visible = navMenu.getAttribute("data-visible")
    if(visible === "false") {
        navMenu.setAttribute("data-visible", true);
        navMenu.setAttribute("aria-expanded", true);
    } else {
        navMenu.setAttribute("data-visible", false);
        navMenu.setAttribute("aria-expanded", false);
    }

    bar1.classList.add = "bar1-cross"
}