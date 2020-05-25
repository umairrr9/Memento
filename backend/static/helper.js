// Take 2 objects with the same key values.
// For each key, if the new objects value is null
// Set it to the value in the old object
// If not null then set it to the value in the new object   
function replaceWithNew(newFields, oldFields) {
    let obj = {};
    for (let [key, value] of Object.entries(newFields)) {
        if (!value) {
            obj[key] = oldFields[key];
        } else {
            obj[key] = value;
        }
    }
    return obj;
}

module.exports = {replaceWithNew};