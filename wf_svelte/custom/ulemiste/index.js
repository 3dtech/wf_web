export default function initializeUlemiste({ root, openPOI }) {
    const status = document.getElementById("ulemiste-wayfinder-status");
    const symbolsDropdown = document.querySelector(".wf-symbols-dropdown");
    const symbolsToggle = symbolsDropdown?.querySelector(".wf-symbols-header");

    function setStatus(message) {
        if (status) {
            status.textContent = message;
        }
    }

    root.addEventListener("wf:data-loaded", (event) => {
        const wayfinder = event.detail.wayfinder;
        const floorCount = wayfinder.building.getSortedFloors().length;

        root.classList.add("ulemiste-wayfinder--data-loaded");
        setStatus(`Kaart on valmis · ${floorCount} korrust`);

        if (window.location.hash && window.location.hash.indexOf("#/store=") > -1) {
            const roomId = window.location.hash.substring(8);
            const room = wayfinder.getRoom(roomId);

            if (room && room.pois && room.pois.length > 0) {
                const poi = room.pois[0];
                setTimeout(() => {
                    openPOI(poi);
                    wayfinder.setHighlights(room.pois);

                    const node = poi.getNode?.();
                    if (node?.floor) {
                        wayfinder.showFloor(node.floor);
                    }
                }, 300);
            }
        }
    });

    root.addEventListener("wf:map-ready", () => {
        root.classList.add("ulemiste-wayfinder--map-ready");
    });

    function setSymbolsMenuOpen(isOpen) {
        symbolsDropdown?.classList.toggle("is-open", isOpen);
        symbolsToggle?.setAttribute("aria-expanded", String(isOpen));
    }

    symbolsToggle?.addEventListener("click", () => {
        setSymbolsMenuOpen(symbolsToggle.getAttribute("aria-expanded") !== "true");
    });

    document.addEventListener("click", (event) => {
        if (!symbolsDropdown?.contains(event.target)) {
            setSymbolsMenuOpen(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            symbolsToggle?.getAttribute("aria-expanded") === "true"
        ) {
            setSymbolsMenuOpen(false);
            symbolsToggle.focus();
        }
    });
}
