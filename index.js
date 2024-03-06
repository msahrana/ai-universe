const cardContainer = document.getElementById("card-container");
const modalContainer = document.getElementById("show-details-container");

const loadAllData = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  const allData = data.data.tools;
  displayData(allData);
};
const displayData = (allData) => {
  allData.forEach((card) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card w-full bg-base-100 shadow-xl">
                <figure class="overflow-hidden h-72">
                    <img class="w-full" src=${card.image} alt="Shoes" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title font-bold">Features:</h2>
                    <div>
                        <ul class="list-decimal">
                            ${card.features
                              .map((item) => `<li>${item}</li>`)
                              .join("")}
                        </ul>
                    </div>
                    <div class="divider"></div>
                    <div class="flex justify-between items-center">
                        <div class="space-y-2">
                            <h2 class="card-title font-bold">${card.name}</h2>
                            <div class="flex space-x-2">
                                <img src="./images/calender.png" alt="">
                                <p>${card.published_in}</p>
                            </div>
                        </div>
                        <div>
                            <button id="show-modal" onclick="handleShowModal('${
                              card.id
                            }')" class="bg-red-100 btn rounded-full p-4"><img src="./images/arrow.png" alt=""></button>
                        </div>
                    </div>
                </div>
            </div>
    `;
    cardContainer.appendChild(div);
  });
};

const handleShowModal = async (ID) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${ID}`
  );
  const data = await res.json();
  const singleData = data.data;
  //   console.log(singleData, ID);
  showAllDataByModal(singleData);
};
const showAllDataByModal = (modal) => {
  modalContainer.innerHTML = `
    <div class="flex flex-col lg:flex-row gap-5">
    <div class="w-1/2 bg-red-100 p-5 border-2 border-red-400 rounded-xl">
        <h2 class="card-title font-bold text-justify mb-2">${
          modal.description
        }</h2>
        <div class="flex gap-3 justify-around">
            <div class="bg-white text-center p-3 rounded-lg text-green-500 w-1/3">
                <p class="font-medium">${modal.pricing[0].price}</p>
                <p class="font-medium">${modal.pricing[0].plan}</p>
            </div>
            <div class="bg-white text-center p-3 rounded-lg text-orange-500 w-1/3">
                <p class="font-medium">${modal.pricing[1].price}</p>
                <p class="font-medium">${modal.pricing[1].plan}</p>
            </div>
            <div class="bg-white text-center p-3 rounded-lg text-red-500 w-1/3">
                <p class="font-medium">${modal.pricing[2].price}</p>
                <p class="font-medium">${modal.pricing[2].plan}</p>
            </div>
        </div>
        <div class="flex gap-3 justify-between">
            <div>
                <h2 class="card-title font-bold">Features:</h2>
                <ul class="list-disc">
                    <li>${modal.features["1"].feature_name}</li>
                    <li>${modal.features["2"].feature_name}</li>
                    <li>${modal.features["3"].feature_name}</li>
                </ul>
            </div>
            <div>
                <h2 class="card-title font-bold">Integrations:</h2>
                <ul class="list-disc">
                ${modal.integrations.map((item) => `<li>${item}</li>`).join("")}
                </ul>
            </div>
        </div>
    </div>
    <div class="w-1/2 bg-gray-100 p-5 border-2 border-red-200 rounded-xl mx-auto">
        <div>
            <img class="rounded-xl"
                src=${modal.image_link[0]}
                alt="">
        </div>
        <div>
            <h2 class="text-xl font-bold my-3 text-center">${
              modal.input_output_examples[0].input
            }</h2>
            <p class="text-center">${modal.input_output_examples[0].output}</p>
        </div>
    </div>
</div>
    `;
  my_modal_3.showModal();
};

loadAllData();
