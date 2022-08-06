import { store } from './store';

const carImage = (color: string) => `
<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    width="79.536px" height="79.536px" viewBox="0 0 79.536 79.536" style="enable-background:new 0 0 79.536 79.536;"
    xml:space="preserve">
<g>
  <path style="fill:${color};" d="M15.532,56.706c-3.977,0-7.213-3.242-7.213-7.197c0-3.998,3.236-7.224,7.213-7.224
    c3.987,0,7.226,3.226,7.226,7.224C22.758,53.463,19.519,56.706,15.532,56.706z M15.532,45.604c-2.128,0-3.876,1.75-3.876,3.883
    c0,2.129,1.748,3.879,3.876,3.879c2.141,0,3.886-1.75,3.886-3.879C19.418,47.354,17.673,45.604,15.532,45.604z M64.137,56.706
    c-3.987,0-7.219-3.242-7.219-7.197c0-3.998,3.231-7.224,7.219-7.224c3.977,0,7.208,3.226,7.208,7.224
    C71.345,53.463,68.113,56.706,64.137,56.706z M64.137,45.604c-2.144,0-3.895,1.75-3.895,3.883c0,2.129,1.751,3.879,3.895,3.879
    c2.139,0,3.884-1.75,3.884-3.879C68.021,47.354,66.275,45.604,64.137,45.604z M78.138,44.091c0-7.011-4.365-7.842-4.365-7.842
    c-6.426-0.912-17.496-1.38-17.496-1.38c-1.016-1.766-5.707-12.039-8.44-12.039c-0.911,0-20.508,0-23.975,0
    c-3.472,0-9.167,10.024-10.413,12.285c0,0-4.36,0.758-6.416,1.219c-1.142,0.265-4.301,0.324-4.301,9.155H0v3.997h6.654
    c0-4.908,3.982-8.885,8.878-8.885c4.914,0,8.886,3.977,8.886,8.885h30.827c0-4.908,3.967-8.885,8.892-8.885
    c4.898,0,8.875,3.977,8.875,8.885h6.524v-5.396H78.138z M35.589,34.191H21.751c1.872-5.831,5.339-9.994,6.801-9.994
    c1.841,0,7.037,0,7.037,0V34.191z M38.168,34.191v-9.994c0,0,7.141,0,8.974,0c1.854,0,5.893,8.461,7.032,10.625L38.168,34.191z"/>
</g>`;

const renderCar = ({
  id,
  name,
  color,
  isEngineStarted = false,
}: {
  id: number;
  name: string;
  color: string;
  isEngineStarted?: boolean;
}) => `
  <div class="general-buttons">
    <button class="button select-button" id="select-car-${id}">
      Select
    </button>
    <button class="button remove-button" id="remove-car-${id}">
      Remove
    </button>
    <span class="car-name">${name}</span>
  </div>
  <div class="road">
    <div class="launch-pad">
      <div class="control-panel">
      <button class="start-button" id="start-car-${id}" ${isEngineStarted ? 'disabled' : ''}>
        Start
      </button>
      <button class="stop-button" id="stop-car-${id}" ${isEngineStarted ? '' : 'disabled'}>
        Stop
      </button>
      </div>
      <div class="car" id="car-${id}">
        ${carImage(color)}
      </div>
    </div>
    <div class="flag" id="flag-${id}">
      &#127937
    </div>
  </div>
`;

export const renderGarage = () => `
  <h1>Garage (${store.carsCount})</h1>
  <h2>Page #${store.carsPage}</h2>
  <ul class="garage">
    ${store.cars
      .map(
        (car) => `
      <li>${renderCar(car)}</li>
      `
      )
      .join('')}
  </ul>
  `;

export const renderWinners = () => `
  <h1>Winners (${store.winnersCount})</h1>
  <h2>Page (${store.winnersPage})</h2>
  <table class="table" border="2">
        <thead>
          <th>Number</th>
          <th>Car</th>
          <th>Name</th>
          <th class="button-sort table-wins ${
            store.sortBy === 'wins' ? store.sortOrder : ''
          }" id="sort-by-wins">Wins</th>
          <th class="button-sort table-time ${
            store.sortBy === 'time' ? store.sortOrder : ''
          }" id="sort-by-time">Best time (s)</th>
        </thead>
        <tbody>
          ${store.winners
            .map(
              (winner, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${carImage(winner.car.color)}</td>
            <td>${winner.car.name}</td>
            <td>${winner.wins}</td>
            <td>${winner.time}</td>
          </tr>
          `
            )
            .join('')}
        </tbody>
  </table>
`;

const renderMenu = () => `
  <div class="menu">
    <button class="button button-view-garage" id="garage-menu">
      To garage
    </button>
    <button class="button button-view-winners" id="winners-menu">
      To winners
    </button>
  </div>`;

const renderFormsMenu = () => `
  <form class="form" id="create" autocomplete="off">
    <input class="input" id="create-name" name="name" type="text">
    <input class="color" id="create-color" name="color" type="color" value="#fede00">
    <button class="button" type="submit">Create</button>
  </form>
  <form class="form" id="update" autocomplete="off">
    <input class="input" id="update-name" name="name" type="text" disabled>
    <input class="color" id="update-color" name="color" type="color" value="#fede00" disabled>
    <button class="button update-submit" type="update-submit">Update</button>
  </form>
`;
const renderRaceControls = () => `
  <button class="button race-button" id="race">Race</button>
  <button class="button reset-button" id="reset">Reset</button>
  <button class="button generator-button" id="generator">Generator cars</button>
`;
const renderGarageView = () => `
  <div id="garage-view">
    <div class="forms">
      ${renderFormsMenu()}
    </div>
    <div class="race-controls">
      ${renderRaceControls()}
    </div>
    <div id="garage">
      ${renderGarage()}
      <p class="message" id="message"></p>
    </div>
  </div>
`;

const renderPagination = () => `
  <button class="button button-prev" disabled id="prev">Prev</button>
  <button class="button button-next" disabled id="next">Next</button>
`;
export const render = async () => {
  const html = `
    ${renderMenu()}
    <div class="pagination">
      ${renderPagination()}
    </div>
    ${renderGarageView()}
    <div id="winners-view" style="display: none">
      ${renderWinners()}
    </div>
  `;
  const root = document.createElement('div');
  root.innerHTML = html;
  document.body.appendChild(root);
};
