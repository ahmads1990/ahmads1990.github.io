function submit_form() {
    document.formu1.submit();
    document.formu1.reset();
}
// redirects
function redirectToGoogleDrive() {
    window.location.href =
        "https://drive.google.com/file/d/1gtS48wI0ltcc-AuGmpzOlLRJjq7QCfIC/view?usp=sharing";
}

// Utility function to calculate the current theme setting.
function calculateSettingAsThemeString({
    localStorageTheme,
    systemSettingDark,
}) {
    // most important check first user selection
    if (localStorageTheme !== null) {
        return localStorageTheme;
    }
    // if user system is dark mode return dark
    if (systemSettingDark.matches) {
        return "dark";
    }
    return "light";
}

//Utility function to update the button and aria-label.
function updateButton({ buttonEl, isDark }) {
    // update the button
    const currentThemeIcon = isDark ? "sun icon" : "moon icon";

    if (isDark) {
        lightIcon.style.display = "block";
        darkIcon.style.display = "none";
    } else {
        lightIcon.style.display = "none";
        darkIcon.style.display = "block";
    }
    buttonEl.setAttribute("aria-label", currentThemeIcon);
}
// Utility function to update the theme setting on the html
function updateThemeOnHtmlEl({ theme }) {
    document.querySelector("html").setAttribute("data-theme", theme);
}

/**
 * On page load:
 */

// target the button using the data attribute
const button = document.querySelector("[data-theme-toggle]");
const lightIcon = document.getElementById("light-icon");
const darkIcon = document.getElementById("dark-icon");
// get theme on page load
const localStorageTheme = localStorage.getItem("theme");
// detect the user’s system settings
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

// Work out the current site settings
let currentThemeSetting = calculateSettingAsThemeString({
    localStorageTheme,
    systemSettingDark,
});

//Update the theme setting and button text according to current settings
updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
updateThemeOnHtmlEl({ theme: currentThemeSetting });

/**
 * 4. Add an event listener to toggle the theme
 */
button.addEventListener("click", (event) => {
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
    console.log(newTheme);
    localStorage.setItem("theme", newTheme);
    updateButton({ buttonEl: button, isDark: newTheme === "dark" });
    updateThemeOnHtmlEl({ theme: newTheme });

    currentThemeSetting = newTheme;
});
