/** @param {any} poi @param {string} language */
export function makePOI(poi, language) {
    return { id: poi.id, name: poi.getName(language) };
}

/** @param {any} group @param {any} allGroups @param {string} language
 * @returns {any} */
export function makeGroup(group, allGroups, language) {
    return {
        id: group.id,
        name: group.getName(language),
        pois: group.pois.map((/** @type {any} */ poi) => makePOI(poi, language)),
        children: group.getChildren().map((/** @type {number} */ id) => allGroups ? makeGroup(allGroups[id], allGroups, language) : []),
    };
}
