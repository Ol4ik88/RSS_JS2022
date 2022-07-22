export class Modal {
  classes: string;
  modal: HTMLElement;
  modalContent: HTMLElement;
  modalCloseBtn: HTMLElement;
  overlay: HTMLElement;

  constructor(classes: string) {
    this.classes = classes;
    this.modal = document.createElement('div');
    this.modalContent = document.createElement('div');
    this.modalCloseBtn = document.createElement('span');
    this.overlay = document.createElement('div');
  }

  buildModal(content: string | HTMLElement) {
    this.overlay = this.createDomNode(
      this.overlay,
      'div',
      'overlay',
      'overlay_modal'
    );
    this.modal = this.createDomNode(this.modal, 'div', this.classes);
    this.modalContent = this.createDomNode(
      this.modalContent,
      'div',
      'modal__content'
    );
    this.modalCloseBtn = this.createDomNode(
      this.modalCloseBtn,
      'span',
      'modal__close-icon'
    );
    this.modalCloseBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#292929"/>
    </svg>`;

    this.setContent(content);
    this.appendModalElements();
    this.bindEvents();
    this.openModal();
  }

  createDomNode(node: HTMLElement, element: string, ...classes: string[]) {
    node = document.createElement(element);
    node.classList.add(...classes);
    return node;
  }

  setContent(content: string | HTMLElement) {
    if (typeof content === 'string') {
      this.modalContent.innerHTML = content;
    } else {
      this.modalContent.innerHTML = '';
      this.modalContent.appendChild(content);
    }
  }

  appendModalElements() {
    this.modal.append(this.modalCloseBtn);
    this.modal.append(this.modalContent);
    this.overlay.append(this.modal);
  }

  bindEvents() {
    this.modalCloseBtn.addEventListener('click', this.closeModal);
    this.overlay.addEventListener('click', this.closeModal);
  }

  openModal() {
    document.body.append(this.overlay);
  }

  closeModal(e: Event) {
    const classes = (e.target as Element).classList;
    if (classes.contains('overlay') || classes.contains('modal__close-icon')) {
      document.querySelector('.overlay')?.remove();
    }
  }
}
