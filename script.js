const uploadButton = document.getElementById("upload-button");
const umbrellaImage = document.getElementById("umbrella-image");
const removeFileButton = document.getElementById("remove-file");
const loaderImage = document.getElementById("loader-image");
const uploadIcon = document.getElementById("upload-icon");

function changeColorAndImage(color, backgroundColor, imageName, buttonId) {
  const container = document.getElementById("container");
  const allColorButtons = document.getElementsByClassName("color-button");
  const selectedButton = document.getElementById(buttonId);
  const uploadedLogo = document.getElementById("uploaded-logo");

  uploadButton.style.backgroundColor = color; // Change the background color of the upload button

  // Remove the active class from all buttons
  for (let button of allColorButtons) {
    button.classList.remove("active");
  }
  // add the active class to the selected button
  selectedButton.classList.add("active");

  // change background color and umbrella image
  container.style.backgroundColor = backgroundColor;

  umbrellaImage.style.display = "none"; // Hide the umbrella image
  if (uploadedLogo) {
    uploadedLogo.style.display = "none"; // Hide uploaded logo
  }
  loaderImage.style.display = "block"; // Show the loader image

  setTimeout(function () {
    loaderImage.style.display = "none"; // Hide the loader image
    umbrellaImage.style.display = "block"; // Show the umbrella image
    if (uploadedLogo) {
      uploadedLogo.style.display = "block"; // Show uploaded logo
    }
    umbrellaImage.setAttribute("src", `./assets/${imageName}`);
  }, 2000);
}

// Function to handle click on the upload button
function handleUploadButtonClick() {
  const uploadInput = document.getElementById("file-input");
  uploadInput.click(); // Simulate a click on the hidden file input element
}

function handleUploadImage(event) {
  const file = event.target.files[0];
  if (file && (file.type === "image/jpeg" || file.type === "image/png") && file.size <= 5242880) {
    const reader = new FileReader();

    reader.onload = function () {
      const uploadedLogo = document.createElement("img"); // Create a new img element
      uploadedLogo.src = reader.result; // Set the source of the uploaded image to the file data
      uploadedLogo.id = "uploaded-logo"; // Add id to the uploaded logo

      umbrellaImage.style.display = "none"; // Hide the umbrella image
      loaderImage.style.display = "block"; // Show the loader image
      setTimeout(function () {
        document.getElementById("umbrella-container").appendChild(uploadedLogo); // Append the uploaded image to the image container
        loaderImage.style.display = "none"; // Show the loader image
        umbrellaImage.style.display = "block"; // Hide the umbrella image
        uploadButton.textContent = file.name; // Change the text of the upload button to the name of the uploaded file
        uploadButton.appendChild(removeFileButton);
        removeFileButton.style.display = "block"; // Show the remove file button
      }, 2000);
    };
    reader.readAsDataURL(file); // Read the file as a data URL
  }
}

const uploadInput = document.getElementById("file-input");
uploadInput.addEventListener("change", handleUploadImage);

removeFileButton.addEventListener("click", (e) => {
  e.stopPropagation();

  uploadInput.value = ""; // Clear the file input
  uploadButton.textContent = "Upload Image";
  uploadButton.appendChild(uploadIcon);
  uploadButton.appendChild(removeFileButton);
  const uploadedLogo = document.getElementById("uploaded-logo");
  uploadedLogo.remove();
  removeFileButton.style.display = "none";
});
