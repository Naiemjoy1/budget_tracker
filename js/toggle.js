const toggleButton = document.querySelector(".toggle-button");
      toggleButton.addEventListener("click", () => {
        document.body.dataset.theme =
          document.body.dataset.theme === "dark" ? "" : "dark";
      });