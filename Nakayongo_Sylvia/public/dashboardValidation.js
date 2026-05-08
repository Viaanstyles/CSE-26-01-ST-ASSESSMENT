document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-card form");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop form from submitting immediately

    // Get all input values
    const productName = form
      .querySelector('input[placeholder="Product Name"]')
      .value.trim();
    const category = form
      .querySelector('input[placeholder="Category"]')
      .value.trim();
    const price = form.querySelector('input[placeholder="Price"]').value;
    const quantity = form.querySelector('input[placeholder="Quantity"]').value;
    const color = form.querySelector('input[placeholder="Color"]').value.trim();
    const file = form.querySelector('input[type="file"]').files[0];

    // Simple Validation Logic
    if (!productName || !category || !price || !quantity || !color) {
      alert("Please fill in all text fields.");
      return;
    }

    if (parseFloat(price) <= 0) {
      alert("Price must be a positive number.");
      return;
    }

    if (parseInt(quantity) < 1) {
      alert("Quantity must be at least 1.");
      return;
    }

    if (!file) {
      alert("Please upload a product image.");
      return;
    }

    // If validation passes
    console.log("Form Data:", {
      productName,
      category,
      price,
      quantity,
      color,
      file,
    });
    alert("Product added successfully!");
    form.reset();
  });
});
