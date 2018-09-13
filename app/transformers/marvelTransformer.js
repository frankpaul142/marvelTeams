import moment from 'moment'

const transform = data => {
    return {
        id: data.id,
        name: data.name,
        description: data.description || null,
    }
};

const transformCollection = (input, data) => {
    input.total = data.total;
    let result = {context: input, data: []};
    if (data.results) {
        for (let doc of data.results) {
            let docData = doc;
            docData.id = doc.id;
            result.data.push(transform(docData));
        }
    }
    return result;
};

module.exports = {
    transform,
    transformCollection
};