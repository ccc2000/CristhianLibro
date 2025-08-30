$(document).ready(function () {
  const totalPages = 13;
  const totalTracks = 11;

  for (let i = 1; i <= totalPages; i++) {
    const imgSrc = `assets/${i}.jpg`;
    const img = $("<div />", { class: "page" }).append(
      $("<img />", {
        src: imgSrc,
        alt: `Página ${i}`,
        css: {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block"
        },
        error: function () {
          console.warn(`No se pudo cargar: ${imgSrc}`);
        }
      })
    );
    $("#flipbook").append(img);
  }

  $("#flipbook").turn({
    width: 800,
    height: 500,
    autoCenter: true
  });

  function ajustarFlipbook() {
    const ancho = Math.min(window.innerWidth * 0.95, 800);
    const alto = ancho * 0.625;
    $("#flipbook").turn("size", ancho, alto);
    $("#flipbook-container").css({ width: `${ancho}px`, height: `${alto}px` });
  }

  ajustarFlipbook();
  $(window).on("resize", ajustarFlipbook);

  $("#prevPage").click(() => $("#flipbook").turn("previous"));
  $("#nextPage").click(() => $("#flipbook").turn("next"));

  $("#zoomToggle").click(() => {
    $("#flipbook-container").toggleClass("zoomed");
  });

  $("#fullscreenToggle").click(() => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  });

  document.addEventListener("fullscreenchange", () => {
    const container = $("#flipbook-container");
    const flipbook = $("#flipbook");
    if (document.fullscreenElement) {
      container.css({ width: "100vw", height: "100vh" });
      flipbook.turn("size", window.innerWidth, window.innerHeight);
    } else {
      ajustarFlipbook();
    }
  });

  const audio = document.getElementById("bgMusic");

  $(document).one("click", () => {
    audio.play().catch(err => console.warn("Autoplay bloqueado"));
  });

  $("#flipbook").bind("turned", function () {
    const currentPage = $("#flipbook").turn("page");
    const trackNum = currentPage <= totalTracks ? currentPage : totalTracks;
    const newSrc = `music/${trackNum}.mp3`;

    if (!audio.src.includes(`${trackNum}.mp3`)) {
      audio.src = newSrc;
      audio.play().catch(err => console.warn("No se pudo reproducir"));
    }

    $("#pageIndicator").text(`${currentPage} / ${totalPages}`);
  });
});
