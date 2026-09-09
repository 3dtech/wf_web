export default function initializeKliinikum({ root }) {
    const buttons = document.getElementById("wf-kiosks");
    let wayfinder;

    if (!buttons) {
        return;
    }

    function selectButton(kioskId) {
        buttons.querySelectorAll("[data-wf-kiosk]").forEach((button) => {
            button.classList.toggle(
                "wf-active",
                button.dataset.wfKiosk === String(kioskId),
            );
        });
    }

    buttons.addEventListener("click", (event) => {
        const button = event.target.closest("[data-wf-kiosk]");
        if (!button || !wayfinder) {
            return;
        }

        wayfinder.setKiosk(Number(button.dataset.wfKiosk));
        wayfinder.map.update(true);
        selectButton(button.dataset.wfKiosk);
    });

    root.addEventListener("wf:data-loaded", (event) => {
        wayfinder = event.detail.wayfinder;
        selectButton(wayfinder.getKiosk());
    });
}
