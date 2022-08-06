import './style.scss';

import { listen } from './components/controllerPage';
import { render } from './components/pageView';
import { updateStateGarage } from './components/controllerGarage';

render();
await updateStateGarage();
listen();
