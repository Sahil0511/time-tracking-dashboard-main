const cont = document.querySelector(".container");
const options = document.querySelectorAll(".options span");

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    options.forEach((elem) => {
      setCard = (type) => {
        Object.values(data).forEach((val) => {
          cont.innerHTML += `
              <div class="${
                val.class
              } flex items-end rounded-xl relative overflow-clip" style="overflow-clip-margin: 0.1px;">
                  <img class="h-12 absolute right-2 -top-2 z-0" src="${
                    val.url
                  }" alt="">
                  <div class="bg-[#1C1F4A] px-4 py-6 rounded-t-xl text-white mt-2 w-full z-10">
                    <div class="relative">
                      <h4 class="text-sm pb-4 title">${val.title}</h4>
                      <img class="absolute top-3 right-2" src="images/icon-ellipsis.svg" alt="">
                    </div>
                    <p class="text-4xl hours">
                    ${
                      type === "daily"
                        ? val.timeframes.daily.current
                        : type === "weekly"
                        ? val.timeframes.weekly.current
                        : val.timeframes.monthly.current
                    } hr</p>
                    <p class=" text-xs pt-2 text-gray-300 average">Last week - ${
                      type === "daily"
                        ? val.timeframes.daily.previous
                        : type === "weekly"
                        ? val.timeframes.weekly.previous
                        : val.timeframes.monthly.previous
                    }</p>
                  </div>
                </div>
                  `;
        });
      };

      elem.addEventListener("click", (childElem) => {
        type = childElem.target.innerHTML;
        cont.innerHTML = ``;

        options.forEach((childElem2) => {
          childElem2.classList.remove("bg-white/10");
        });

        childElem.target.classList.add("bg-white/10");

        setCard(type.toLowerCase());
      });
    });
    setCard("daily");
    options[0].classList.add("bg-white/10");
  });
