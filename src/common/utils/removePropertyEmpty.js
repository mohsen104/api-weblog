const removePropertyEmpty = (obj) => {
    for (const key in obj) {
        if (obj[key] == "" || obj[key] == undefined || obj[key].length == 0) {
            delete obj[key];
        }
    }
    return obj;
}

export default removePropertyEmpty;