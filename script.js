function changeColorAndImage(color, backgroundColor, imageName, buttonId) {
  const container = document.getElementById("container");
  const allColorButtons = document.getElementsByClassName("color-button");
  const selectedButton = document.getElementById(buttonId);
  const umbrellaImage = document.getElementById("umbrella-image");
  const uploadButton = document.getElementById("upload-button");

  uploadButton.style.backgroundColor = color; // Change the background color of the upload button

  // Remove the active class from all buttons
  for (let button of allColorButtons) {
    button.classList.remove("active");
  }
  // add the active class to the selected button
  selectedButton.classList.add("active");

  // change background color and umbrella image
  container.style.backgroundColor = backgroundColor;
  umbrellaImage.setAttribute("src", `./assets/${imageName}`);
}

// Function to handle click on the upload button
function handleUploadButtonClick() {
  const uploadInput = document.getElementById("file-input");
  uploadInput.click(); // Simulate a click on the hidden file input element
}

function handleUploadImage(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    const umbrellaImage = document.getElementById("umbrella-image");
    const loaderImage = document.getElementById("loader-image");
    const uploadedImage = document.createElement("img"); // Create a new img element
    uploadedImage.src = reader.result; // Set the source of the uploaded image to the file data
    uploadedImage.id = "uploaded-image"; // Add id to the uploaded logo

    umbrellaImage.style.display = "none"; // Hide the umbrella image
    loaderImage.style.display = "block"; // Show the loader image
    setTimeout(function () {
      document.getElementById("umbrella-container").appendChild(uploadedImage); // Append the uploaded image to the image container
      loaderImage.style.display = "none"; // Show the loader image
      umbrellaImage.style.display = "block"; // Hide the umbrella image
    }, 2000);
  };

  reader.readAsDataURL(file); // Read the file as a data URL
}

const uploadInput = document.getElementById("file-input");
uploadInput.addEventListener("change", handleUploadImage);
