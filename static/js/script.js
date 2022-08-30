const formElem = document.querySelector("form");
formElem.addEventListener("submit", (e) => submitForm(e));

const shuffleBtn = document.getElementById("shuffle");
shuffleBtn.addEventListener("click", (e) => shuffleImages(e));

const moreBtn = document.getElementById("more");
moreBtn.addEventListener("click", (e) => loadMore(e));

const increaseBtn = document.getElementById("increase");
increaseBtn.addEventListener("click", (e) => changeSize(-1));

const decreaseBtn = document.getElementById("decrease");
decreaseBtn.addEventListener("click", (e) => changeSize(1));

const imageHolder = document.getElementById("image-holder");

let currColCount = 4;
let user = null;
let lastId = null;

const submitForm = async (e) => {
  e.preventDefault();

  // Clear current images
  imageHolder.innerHTML = "";

  // Get username from form input field
  const username = e.target[0].value;

  try {
    // Get data
    const data = await getData(username);

    // Store user for searching "more"
    user = username;

    // Process data to output images
    processData(data);
  } catch (err) {
    // alert(err);
    console.log(err);
  }
};

const processData = (data) => {
  addImages(data.images);

  // Store variables we need later.
  lastId = data.last_id;
};

const addImages = (imgArr) => {
  imgArr.forEach((element, index) => {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    const img = document.createElement("img");
    img.src = element;
    // img.style.animationDelay = `${index / 16}s;`;

    const deleteBtn = document.createElement("div");
    deleteBtn.classList.add("delete-button");

    // deleteBtn.textContent = "X";
    const deleteBtnText = document.createElement("div");
    // deleteBtnText.textContent = "X";
    deleteBtn.appendChild(deleteBtnText);
    // deleteBtn.style.position = "absolute";
    // deleteBtn.style.padding = "1rem";
    imageContainer.appendChild(deleteBtn);

    imageContainer.appendChild(img);

    const target = imageHolder.appendChild(imageContainer);

    deleteBtn.addEventListener("click", (e) => target.remove());
  });
};

const getData = async (username, id = null) => {
  let url = `/${username}${id ? `/${id}` : ""}`;

  try {
    const response = await fetch(url, { method: "GET", mode: "cors" });
    return response.json();
  } catch (err) {
    alert("Could not retrieve data.");
    console.log(err);
  }
};

const loadMore = async () => {
  if (!lastId) {
    alert("Search for a user before ");
    return;
  }
  const data = await getData(user, lastId);
  processData(data);
};

const shuffleImages = () => {
  let imageArray = Array.prototype.slice.call(imageHolder.childNodes);
  console.log(imageArray);
  let newArr = shuffle(imageArray);
  imageArray.innerHTML = "";
  newArr.forEach((element) => imageHolder.appendChild(element));
};

// Fisher-Yates shuffle algorithm
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const changeSize = (amount) => {
  if ((currColCount < 2 && amount < 0) || (currColCount > 6 && amount > 0))
    return;

  currColCount += amount;
  imageHolder.style.columnCount = currColCount;
};
