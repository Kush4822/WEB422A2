let page = 1;
let perPage = 10;

const loadMovieData = async (title = null) => {
  let movies;
  if (title != null) {
    movies = await fetch(
      // http://127.0.0.1:5000/api/movies?page=1&perPage=1
      `http://127.0.0.1:5000/api/movies?page=${page}&perPage=${perPage}&title=${title}`
    );
    console.log(await movies.json(), title);
    // document.getElementsByClassName("pagination").classList.add("d-none");
  } else {
    movies = await fetch(
      `http://127.0.0.1:5000/api/movies?page=${page}&perPage=${perPage}`
    );
    // document.getElementsByClassName("pagination").classList.remove("d-none");
  }
  movies = await movies.json();
  movies.map((movie) => {
    html = `<tr onClick="getMovieById('${movie._id}')" data-id="${movie._id}">
      <td>${movie.year}</td>
      <td>${movie.title}</td>
      <td>
        ${movie.plot ? movie.plot : "N/A"}
      </td>
      <td>${movie.rating ? movie.rating : "N/A"}</td>
      <td>${movie.runtime}</td>
    </tr>`;
    document
      .getElementById("moviesTable")
      .insertAdjacentHTML("beforeend", html);
  });
  document.getElementById("current-page").innerHTML = page;
};

const getMovieById = async (id) => {
  movie = await fetch(`http://127.0.0.1:5000/api/movies/${id}`);
  movie = await movie.json();
  document.getElementsByClassName("modal-title").value = movie.title;
  html = `<img class="img-fluid w-100" src="${movie.poster}"><br><br>
<strong>Directed By:</strong>${movie.directors.join(", ")}<br><br>
<p>${movie.fullplot}</p>
<strong>Cast:</strong>${movie.cast && movie.cast.join(", ")}<br><br>
<strong>Awards:</strong>${movie.awards.text}<br>
<strong>IMDB Rating:</strong> ${movie.imdb.rating} (${movie.imdb.votes} votes)
`;
  document.querySelector(".modal-body").innerHTML = "";
  document.querySelector(".modal-body").insertAdjacentHTML("beforeend", html);
  let myModal = new bootstrap.Modal(document.getElementById("detailModal"), {
    backdrop: "static", // default true - "static" indicates that clicking on the backdrop will not close the modal window
    keyboard: false, // default true - false indicates that pressing on the "esc" key will not close the modal window
    focus: true, // default true - this instructs the browser to place the modal window in focus when initialized
  });

  myModal.show();
};

const previousPage = () => {
  if (page > 1) {
    page--;
    loadMovieData();
  }
};

const nextPage = () => {
  page++;
  loadMovieData();
};

const searchForm = () => {
  title = document.getElementById("title").value;
  loadMovieData(title);
};

const clearForm = () => {
  document.getElementById("title").value = "";
  loadMovieData();
};

window.addEventListener("load", loadMovieData);
