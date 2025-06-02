document.addEventListener('DOMContentLoaded', () => {
  // Модальные окна
  const cards = document.querySelectorAll('.card');
  const modals = document.querySelectorAll('.modal');
  const closeButtons = document.querySelectorAll('.modal-close');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const modalId = card.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      modals.forEach(modal => {
        modal.classList.remove('active');
      });
      document.body.style.overflow = 'auto';
    });
  });

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });

  const prompts = [
    "Советский агитационный плакат 1920-х годов в стиле конструктивизма. На переднем плане красноармеец в будёновке, с поднятым кулаком, в позе призыва к борьбе. На заднем плане абстрактные формы — красные лучи и геометрические фигуры. Цвета: красный, чёрный, белый. Сильный графический стиль с элементами Маяковского и Лисицкого. Высокая детализация, винтажная текстура бумаги.",
    
    "Пропагандистский плакат времён Первой мировой войны. В центре — русский солдат в шинели с винтовкой на плече, смотрит прямо перед собой с решимостью. Фон — поле битвы с дымом и силуэтами наступающих войск. Цветовая палитра: тёплые коричнево-серые оттенки, акценты в красном. Реалистичная иллюстрация с лёгким налётом патетики, стилизация под 1915 год.",
    
    "Агитационный плакат времён Гражданской войны в России. Центральная фигура — рабочий с молотом, стоящий на баррикаде. Фон — стилизованное городское восстание, красные флаги и дым. Минимализм и контраст — красный, белый, чёрный. Динамичная диагональная композиция, вдохновлённая стилем конструктивизма и плакатами Дмитрия Моора.",
    
    "Советский агитплакат 1920-х годов, изображающий женщину в платке, тянущуюся к книге. Фон — пейзаж деревни и красное солнце. Палитра: светло-коричневая, красная, жёлтая. Графический стиль — линейная композиция, элементы Мухиной и Родченко. Символика образования и прогресса.",
    
    "Карикатура времён Первой мировой войны. Белый медведь, символизирующий Россию, перегрызает лапу немецкому орлу. Динамичный сюжет, насыщенные цвета. Фон — снежная равнина и дымящиеся города. Сатирический стиль с подчеркнутой экспрессией, стилизация под дореволюционную эстетику начала XX века.",
    
    "Героический плакат Великой Отечественной войны. В центре — солдат с поднятым штыком, в динамичной позе наступления. Позади — пылающий город и танки. Цвета: насыщенные красный, серый, чёрный. Стиль: смесь реализма и символизма, вдохновлён работами Корецкого. Бумажная текстура, лёгкие повреждения по краям.",
    
    "Советский плакат 1930-х годов. Изображение тракториста на фоне широких полей и комбайнов. Красный флаг развивается на ветру. Палитра: зелёный, охра, красный, бежевый. Стиль — социалистический реализм с элементами авангарда. Винтажная фактура, атмосфера энтузиазма и индустриализации.",
    
    "Антикапиталистическая агитка времен гражданской войны. Огромный кулак громит жадного толстяка в цилиндре и с золотыми цепями. Фон — абстрактный город в руинах. Стиль: агрессивный, карикатурный, с элементами кубизма. Цвета: жёлтый, чёрный, красный. Износ на бумаге, имитация печатного офорта.",
    
    "Фантазийный советский плакат: Ленин как великан сметает врагов революции с карты, метлой. Фон — бурлящая толпа, громкие цвета. Красный, чёрный и белый. Стилизованный портрет, гипербола, экспрессивный стиль Виктора Дени. Грубая текстура и винтажный эффект.",
    
    "Плакат по образцу Первой мировой. Солдат в каске держит знамя с символом орла, стоит на вершине холма, позади рассвет. Цветовая гамма — пастельные жёлтые, серо-голубые и багровые оттенки. Стиль: классическая академическая живопись, типичная для плакатов Антанты."
  ];


  document.getElementById("random-btn").addEventListener("click", () => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    document.getElementById("prompt").value = randomPrompt;
  });

  // Показать ещё
  const showMoreBtn = document.getElementById('show-more');
  let hiddenCards = document.querySelectorAll('.card.hidden');
  let cardsToShow = 6;

  showMoreBtn.addEventListener('click', () => {
    const cardsToReveal = Array.from(hiddenCards).slice(0, cardsToShow);
    cardsToReveal.forEach(card => {
      card.classList.remove('hidden');
      card.style.animation = 'fadeInUp 0.5s ease forwards';
    });
    hiddenCards = document.querySelectorAll('.card.hidden');
    if (hiddenCards.length === 0) {
      showMoreBtn.classList.add('hidden');
    }
  });

  // Генерация изображений
  const generateBtn = document.getElementById('generate-btn');
  const promptInput = document.getElementById('prompt');
  const styleSelect = document.getElementById('style');
  const resultDiv = document.getElementById('result');
  const errorP = document.getElementById('error');

  generateBtn.addEventListener('click', async () => {
    const prompt = promptInput.value;
    const style = styleSelect.value;
    generateBtn.disabled = true;
    generateBtn.textContent = 'Генерация...';
    resultDiv.innerHTML = '';
    errorP.textContent = '';
    promptInput.value = "";

    const KEY = "Key D7A06B8E26A9DD587DDF8FFF09503DAE";
    const SECRET = "Secret AD3D9305FF09C2E53C3A38F4C8CBCC26";

    const headers = {
      "X-Key": KEY,
      "X-Secret": SECRET
    };

    try {
      const pipelineRes = await fetch("https://api-key.fusionbrain.ai/key/api/v1/pipelines", { headers });
      const pipelineData = await pipelineRes.json();
      const pipelineId = pipelineData[0].id;

      const params = {
        type: "GENERATE",
        numImages: 1,
        width: 512,
        height: 712,
        generateParams: {
          query: `${prompt || 'патриотический плакат Великой Отечественной войны, призыв к действию'}, стиль: ${style}`
        }
      };

      const formData = new FormData();
      formData.append("pipeline_id", pipelineId);
      formData.append("params", new Blob([JSON.stringify(params)], { type: "application/json" }));

      const genRes = await fetch("https://api-key.fusionbrain.ai/key/api/v1/pipeline/run", {
        method: "POST",
        headers,
        body: formData
      });

      const genData = await genRes.json();
      const uuid = genData.uuid;

      let attempts = 10;
      while (attempts-- > 0) {
        await new Promise(r => setTimeout(r, 5000));
        const statusRes = await fetch(`https://api-key.fusionbrain.ai/key/api/v1/pipeline/status/${uuid}`, { headers });
        const statusData = await statusRes.json();

        if (statusData.status === "DONE") {
          const base64 = statusData.result.files[0];
          const img = document.createElement('img');
          img.src = `data:image/png;base64,${base64}`;
          img.alt = 'Generated Poster';
          resultDiv.appendChild(img);
          generateBtn.disabled = false;
          generateBtn.textContent = 'Сгенерировать плакат';
          return;
        }
      }

      throw new Error("Время ожидания истекло. Попробуйте снова.");
    } catch (e) {
      console.error(e);
      errorP.textContent = "Произошла ошибка при генерации изображения.";
      generateBtn.disabled = false;
      generateBtn.textContent = 'Сгенерировать плакат';
    }
  });
});