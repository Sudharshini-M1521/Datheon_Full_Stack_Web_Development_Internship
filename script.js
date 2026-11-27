const menuToggle = document.querySelector("#menuToggle");
const siteNav = document.querySelector("#siteNav");
const themeToggle = document.querySelector("#themeToggle");
const themeIcon = document.querySelector("#themeIcon");
const themeLabel = document.querySelector("#themeLabel");
const progressBar = document.querySelector("#scrollProgressBar");

menuToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

function setTheme(theme) {
  const light = theme === "light";
  document.body.classList.toggle("light-theme", light);
  themeIcon.textContent = light ? "☾" : "☼";
  themeLabel.textContent = light ? "Dark mode" : "Light mode";
  themeToggle.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
  try { localStorage.setItem("sudharshini-portfolio-theme", theme); } catch (error) {}
}

let savedTheme = "dark";
try { savedTheme = localStorage.getItem("sudharshini-portfolio-theme") || "dark"; } catch (error) {}
setTheme(savedTheme);
themeToggle.addEventListener("click", () => {
  setTheme(document.body.classList.contains("light-theme") ? "dark" : "light");
});

function updateScrollProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

document.querySelector("#year").textContent = new Date().getFullYear();
