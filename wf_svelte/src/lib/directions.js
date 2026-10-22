/** @param {Record<string, any>} pois @param {string} language */
export function getRoutePOIs(pois, language) {
    return Object.values(pois)
        .filter((poi) => poi.getShowInMenu() && poi.getNode())
        .map((poi) => ({ id: String(poi.id), name: poi.getName(language) }))
        .sort((first, second) => first.name.localeCompare(second.name, language));
}

/** @param {any} wayfinder @param {string} type
 * @param {{ start: string, end: string, avoidStairs: boolean }} selection */
export function showSelectedRoute(wayfinder, type, selection) {
    const start = wayfinder.pois[selection.start];
    const end = wayfinder.pois[selection.end];
    if (!start?.getShowInMenu() || !end?.getShowInMenu()) return false;
    const startNode = start.getNode();
    const endNode = end.getNode();
    if (!startNode || !endNode || startNode.id === endNode.id) return false;
    const options = {
        toText: true,
        ignoreTypes: selection.avoidStairs ? ["stairs", "escalator"] : [],
    };
    const path = type === "3d"
        ? wayfinder.logic.showPath(startNode.id, endNode.id, end, options)
        : wayfinder.logic.showPath(startNode, endNode, end, options);
    return Boolean(path && (!Array.isArray(path) || path.length > 0));
}

/** @param {string} language @param {any} [translator] */
export function getDirectionsLabels(language, translator) {
    const estonian = language.toLowerCase().startsWith("et");
    const defaults = {
        title: estonian ? "Juhised" : "Directions",
        close: estonian ? "Sulge juhised" : "Close directions",
        start: estonian ? "Vali alguspunkt" : "Select starting point",
        end: estonian ? "Vali sihtpunkt" : "Select destination",
        avoidStairs: estonian ? "Väldi treppe ja eskalaatoreid" : "Avoid stairs and escalators",
        submit: estonian ? "Näita juhiseid kaardil" : "Show directions on map",
        empty: estonian ? "Navigeerimiseks pole asukohti saadaval." : "No locations available for directions.",
        error: estonian ? "Teekonda ei leitud. Vali teised punktid või muuda teekonna eelistusi." : "No route found. Choose different locations or change your route preferences.",
    };
    return Object.fromEntries(Object.entries(defaults).map(([name, fallback]) => {
        const key = "web-directions-" + name;
        const translation = translator?.get(key);
        return [name, translation && translation !== key ? translation : fallback];
    }));
}
