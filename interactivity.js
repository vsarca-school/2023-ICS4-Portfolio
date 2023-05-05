var curPage = null;

function initPage() {
    // Find current hash of curl
    let curl = window.location.href;
    let pos = curl.lastIndexOf("#");
    let len = curl.length - pos - 1;

    // Find current page
    let newPage = null;
    if ((pos > 0) && (len > 0)) {
        newPage = document.getElementById(curl.substring(pos + 1));
    }
    if (newPage == null) newPage = document.getElementById("home");

    // Change page
    newPage.classList.add("highlight");
    document.getElementById(newPage.id + "-page").style.display = "block";
    curPage = newPage;

    // Scroll to top
    window.scrollTo(0, 0);

    // Change page title
    document.title = newPage.title;

    // Create popups for copyable text
    let codes = document.getElementsByTagName("code");
    let pres = document.getElementsByTagName("pre");
    for (let i = 0; i < codes.length; i++) {
        // Create popup
        let popup = document.createElement("span");
        popup.className = "clipboard-popup";
        popup.innerHTML = "Copied to clipboard!";
        // Add to code element
        codes[i].onclick = function (event) { copyCodeText(event); showPopup(popup); };
        codes[i].appendChild(popup);
    }
    for (let i = 0; i < pres.length; i++) {
        // Create popup
        let popup = document.createElement("span");
        popup.className = "clipboard-popup clipboard-popup-pre";
        popup.innerHTML = "Copied to clipboard!";
        // Create wrapper element
        let wrapper = document.createElement("div");
        wrapper.className = "pre-wrapper";
        // Finish pre element
        pres[i].onclick = function (event) { copyPreText(event); showPopup(popup); };
        pres[i].parentElement.insertBefore(wrapper, pres[i]); // Replace with wrapper
        // Add things to wrapper
        wrapper.appendChild(pres[i]);
        wrapper.appendChild(popup);
    }
}

function refreshPage() {
    // Find current hash of curl
    let curl = window.location.href;
    let pos = curl.lastIndexOf("#");
    let len = curl.length - pos - 1;

    // Find current page
    let newPage = "home";
    if ((pos > 0) && (len > 0)) {
        newPage = curl.substring(pos + 1);
    }

    let newPageButton = document.getElementById(newPage);
    if (newPageButton != null) changePage(newPageButton);
}

function changePage(newPage) {
    let newPageWrapper = document.getElementById(newPage.id + "-page");
    if (newPage != curPage && newPageWrapper != null) {
        // Change button highlights
        curPage.classList.remove("highlight");
        newPage.classList.add("highlight");

        // Change page displayed
        document.getElementById(curPage.id + "-page").style.display = "none";
        newPageWrapper.style.display = "block";

        // Update variable
        curPage = newPage;

        // Scroll to top
        window.scrollTo(0, 0);

        // Change page title
        document.title = newPage.title;
    }
}

function copyCodeText(event) {
    if (window.getComputedStyle(event.target.firstElementChild).getPropertyValue("visibility") == "hidden") // find visibility of element
        navigator.clipboard.writeText(event.target.innerText); // Popup text not included
    else
        navigator.clipboard.writeText(event.target.innerText.slice(0, -21)); // Removes the text from "Copied to clipboard!"
}

function copyPreText(event) {
    navigator.clipboard.writeText(event.target.innerText);
}

function showPopup(popup) {
    popup.style.animation = "none";
    popup.offsetHeight; // Makes browser update
    popup.style.animation = "popup-fade 4s";
    popup.addEventListener("animationend", function () { popup.style.animation = "none" }); // When changing pages the animation likes to play again, this stops it
}

