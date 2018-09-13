import moment from 'moment'

const transform = data => {
    return {
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        document_type: data.document_type,
        document: data.document,
        email: data.email,
        role_id: data.role_id || null,
        country_id: data.country_id || null,
        city_id: data.city_id || null,
        postal_code: data.postal_code || null,
        country_code: data.country_code || null,
        phone: data.phone || null,
        is_new_user: data.is_new_user,
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