import moment from 'moment'

const transform = data => {
    return {
        id: data.id,
        name: data.name,
        description: data.description,
        tasks: data.tasks || [],
        created_at: moment(data.created_at).utcOffset(-5).format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment(data.updated_at).utcOffset(-5).format('YYYY-MM-DD HH:mm:ss'),
    }
};

const transformCollection = (input, data) => {
    input.total = data.total;
    let result = {context: input, data: []};
    if (data.docs) {
        for (let doc of data.docs) {
            let docData = doc.data();
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