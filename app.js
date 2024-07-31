const { default: data } = await import('./data.json', {
  with: { type: 'json' },
});

const timeTrackingSection = document.querySelector('.time-tracking');
const dashboardBtns = document.querySelectorAll('.dashboard__button');

function displayTimeTrackingData(data, timeframe) {
  const newData = data
    .map((item) => {
      const {
        title,
        timeframes: {
          [timeframe]: { current, previous },
        },
      } = item;

      const timeframeLabel =
        timeframe === 'daily'
          ? 'Day'
          : timeframe === 'weekly'
          ? 'Week'
          : 'Month';

      return `
      <article class="time-tracking__card">
          <img
            src="./images/icon-${
              title === 'Self Care'
                ? 'self-care'
                : title.toLowerCase()
            }.svg"
            alt=""
            class="time-tracking__card-icon"
          />
          <header class="time-tracking__card-header">
            <div class="time-tracking__header-top">
              <h3 class="time-tracking__title">${title}</h3>
              <button
                class="time-tracking__options"
                aria-label="More options"
              >
                <svg
                  width="21"
                  height="5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                    fill="#BBC0FF"
                    fill-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div class="time-tracking__details">
              <span class="time-tracking__time">${current}hrs</span>
              <p class="time-tracking__previous">Last ${timeframeLabel} - ${previous}hrs</p>
            </div>
          </header>
        </article>`;
    })
    .join('');

  timeTrackingSection.insertAdjacentHTML('beforeend', newData);
}

displayTimeTrackingData(data, 'weekly');

dashboardBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const selectedBtn = e.target;
    const timeframe = selectedBtn.dataset.timeframe;

    timeTrackingSection.innerHTML = '';
    displayTimeTrackingData(data, timeframe);

    dashboardBtns.forEach((btn) => btn.classList.remove('active'));
    selectedBtn.classList.add('active');
  });
});
