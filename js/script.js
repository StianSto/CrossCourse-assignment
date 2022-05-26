const navMenuBtn = document.querySelector(".hamburger-menu_header");
const menuBars = document.querySelectorAll(".bar");
const navMenu = document.querySelector("#primary-nav");

navMenuBtn.addEventListener("click", () => {
    const visible = navMenu.getAttribute("data-visible");
    console.log(2);

    navMenu.classList.add("animate-nav")

    menuBars.forEach(bar => {
        bar.classList.toggle("close")
    });

    if(visible === "false") {
        navMenu.setAttribute("data-visible", true);
        navMenu.setAttribute("aria-expanded", true);
    } else {
        navMenu.setAttribute("data-visible", false);
        navMenu.setAttribute("aria-expanded", false);
    }

});

