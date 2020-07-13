let contactForm = document.querySelector(".contactForm"),
  modal = document.querySelector(".modal-container"),
  closeBtn = document.querySelector(".close-btn"),
  contactBtn = document.querySelector(".btn.btn-nav"),
  nav = document.querySelector("nav");

// function displays contact form Modal
let showContactForm = () => {
  contactForm.style = "display:block";
  modal.style = "display:block";
};
let closeContactForm = () => {
  contactForm.style = "display:none";
  modal.style = "display:none";
};
// event listner contact button
contactBtn.addEventListener("click", () => {
  showContactForm();
});
closeBtn.addEventListener("click", () => {
  closeContactForm();
});
modal.addEventListener("click", () => {
  closeContactForm();
});
// event listner scroll nav bar effect
