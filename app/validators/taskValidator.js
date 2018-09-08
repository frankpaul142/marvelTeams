'use strict';
import validy from './baseValidator'
import * as util from '../libs/util'

const validateCreate = (req, res, next) => {
    let input = req.body;
    const schema = {
        action: {
            $validate: {
                required: {
                    message: "Campo Acción obligatorio."
                },
                unique: {
                    collection: 'tasks',
                    isKey: false,
                    message: "Ya existe una tarea con esa Acción."
                }
            }
        },
        name: {
            $validate: {
                required: {
                    message: "Campo Nombre obligatorio."
                },
                unique: {
                    collection: 'tasks',
                    isKey: false,
                    message: "Ya existe una tarea con ese Nombre."
                }
            }
        }
    };
    validy(input, schema).then(errors => {
        if (errors)
            res.status(422).send({errors: util.formatValidyErrors(errors)})
        else
            next()
    }).catch(err => {
        res.status(400).send({message: err.message});
    });
};
const validateUpdate = (req, res, next) => {
    let input = req.body;
    input.id = req.params.id;
    const schema = {
        id: {
            $validate: {
                required: {
                    message: "Parámetro ID obligatorio."
                },
                exists: {
                    collection: 'tasks',
                    isKey: true,
                    message: "No existe una tarea con ese ID."
                }
            }
        },
        action: {
            $validate: {
                required: {
                    message: "Campo Acción obligatorio."
                },
                unique: {
                    collection: 'tasks',
                    isKey: false,
                    message: "Ya existe una tarea con esa Acción."
                }
            }
        },
        name: {
            $validate: {
                required: {
                    message: "Campo Nombre obligatorio."
                },
                unique: {
                    collection: 'tasks',
                    isKey: false,
                    message: "Ya existe una tarea con ese Nombre."
                }
            }
        }
    };
    validy(input, schema).then(errors => {
        if (errors)
            res.status(422).send({errors: util.formatValidyErrors(errors)})
        else
            next()
    }).catch(err => {
        res.status(400).send({message: err.message});
    });
};
const validateGetById = (req, res, next) => {
    let input = req.params;
    const schema = {
        id: {
            $validate: {
                required: {
                    message: "Parámetro ID obligatorio."
                },
                exists: {
                    collection: 'tasks',
                    isKey: true,
                    message: "No existe una tarea con ese ID."
                }
            }
        },
    };
    validy(input, schema).then(errors => {
        if (errors)
            res.status(422).send({errors: util.formatValidyErrors(errors)})
        else
            next()
    }).catch(err => {
        res.status(400).send({message: err.message});
    });
};
const validateGetAll = (req, res, next) => {
    let input = req.query;
    const schema = {
        limit: {
            $validate: {
                requiredIf: {
                    field: 'page',
                    message: "Parámetro Límite obligatorio."
                }
            }
        },
        page: {
            $validate: {
                requiredIf: {
                    field: 'limit',
                    message: "Parámetro Página obligatorio."
                }
            }
        },
        orderBy: {
            $validate: {
                requiredIf: {
                    field: 'orderType',
                    message: "Parámetro Campo de Orden obligatorio."
                }
            }
        },
        orderType: {
            $validate: {
                requiredIf: {
                    field: 'orderBy',
                    message: "Parámetro Tipo de Orden obligatorio."
                },
                inclusion: {
                    arg: ['ASC', 'asc', 'DESC', 'desc'],
                    message: "El Tipo de Orden no es válido."
                }
            }
        },
    };
    validy(input, schema).then(errors => {
        if (errors)
            res.status(422).send({errors: util.formatValidyErrors(errors)})
        else
            next()
    }).catch(err => {
        res.status(400).send({message: err.message});
    });
};

module.exports = {
    validateCreate,
    validateUpdate,
    validateGetById,
    validateGetAll
};