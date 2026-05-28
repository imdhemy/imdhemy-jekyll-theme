let activeTrigger = null;

const closeModal = (modal) => {
  if (modal && modal.open) {
    modal.close();
  }
};

export const init = () => {
  const triggers = document.querySelectorAll('[data-certificate-open]');
  const modals = document.querySelectorAll('[data-certificate-modal]');

  if (!triggers.length || !modals.length) {
    return;
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const modal = document.getElementById(trigger.dataset.certificateOpen);
      if (!modal || typeof modal.showModal !== 'function' || modal.open) {
        return;
      }

      activeTrigger = trigger;
      modal.showModal();
    });
  });

  modals.forEach((modal) => {
    const closeButton = modal.querySelector('[data-certificate-close]');

    closeButton?.addEventListener('click', () => {
      closeModal(modal);
    });

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });

    modal.addEventListener('close', () => {
      if (activeTrigger) {
        activeTrigger.focus();
        activeTrigger = null;
      }
    });
  });
};
