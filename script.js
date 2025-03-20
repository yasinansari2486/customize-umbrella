document.addEventListener("DOMContentLoaded", function () {
  const uploadButton = document.getElementById("upload-button");
  const uploadInput = document.getElementById("file-input");
  const umbrellaImage = document.getElementById("umbrella-image");
  const removeFileButton = document.getElementById("remove-file");
  const loaderImage = document.getElementById("loader-image");
  const uploadIcon = document.getElementById("upload-icon");
  const colorButtonsContainer = document.getElementById("color-button-container");
  const mainContainer = document.getElementById("container");

  const colors = [
    { name: "pink", hex: "#f10fe6", bgColor: "#f5e2f7", image: "./assets/PinkUmbrella.png" },
    { name: "blue", hex: "#0f8bf1", bgColor: "#c7e3eb", image: "./assets/BlueUmbrella.png" },
    { name: "yellow", hex: "#f1c80f", bgColor: "#fcfae7", image: "./assets/YellowUmbrella.png" },
  ];

  // Dynamically create color buttons
  colors.forEach((color) => {
    const button = document.createElement("button");
    button.style.backgroundColor = color.hex;
    button.classList.add("color-button");
    button.addEventListener("click", () => changeUmbrellaImage(color.hex, color.bgColor, color.image));
    colorButtonsContainer.appendChild(button);
  });

  function changeUmbrellaImage(color, bgColor, imageSrc) {
    const uploadedLogo = document.getElementById("uploaded-logo");

    umbrellaImage.style.display = "none"; // Hide the umbrella image
    if (uploadedLogo) {
      uploadedLogo.style.display = "none"; // Hide uploaded logo
    }
    loaderImage.style.display = "block"; // Show the loader image
    mainContainer.style.backgroundColor = bgColor;
    uploadButton.style.backgroundColor = color;

    setTimeout(function () {
      umbrellaImage.src = imageSrc;

      loaderImage.style.display = "none"; // Hide the loader image
      umbrellaImage.style.display = "block"; // Show the umbrella image
      if (uploadedLogo) {
        uploadedLogo.style.display = "block"; // Show uploaded logo
      }
    }, 2000);
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

  // File Upload Handling
  uploadButton.addEventListener("click", () => uploadInput.click());
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
});
