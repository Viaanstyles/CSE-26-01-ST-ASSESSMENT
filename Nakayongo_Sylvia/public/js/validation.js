const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  const name = document.querySelector('input[name="name"]').value.trim();
  const description = document
    .querySelector('textarea[name="description"]')
    .value.trim();

  const price = document.querySelector('input[name="price"]').value;
  const stock = document.querySelector('input[name="stock"]').value;

  if (name.length < 3) {
    alert("Product name must be at least 3 characters");
    e.preventDefault();
    return;
  }

  if (description.length < 10) {
    alert("Description must be at least 10 characters");
    e.preventDefault();
    return;
  }

  if (price < 0) {
    alert("Price cannot be negative");
    e.preventDefault();
    return;
  }

  if (stock < 0) {
    alert("Stock cannot be negative");
    e.preventDefault();
  }
});