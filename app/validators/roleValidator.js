'use strict';
import validy from './baseValidator'
import * as util from '../libs/util'

const validateCreate = (req, res, next) => {
    let input = req.body;
    const schema = {
        description: {
            $validate: {
                required: {
                    message: "Campo Descripción obligatorio."
                }
            }
        },
        name: {
            $validate: {
                required: {
                    message: "Campo Nombre obligatorio."
                },
                unique: {
                    collection: 'roles',
                    isKey: false,
                    message: "Ya existe un rol con ese Nombre."
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
                    collection: 'roles',
                    isKey: true,
                    message: "No existe un rol con ese ID."
                }
            }
        },
        description: {
            $validate: {
                required: {
                    message: "Campo Descripción obligatorio."
                }
            }
        },
        name: {
            $validate: {
                required: {
                    message: "Campo Nombre obligatorio."
                },
                unique: {
                    collection: 'roles',
                    isKey: false,
                    message: "Ya existe un rol con ese Nombre."
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
                    collection: 'roles',
                    isKey: true,
                    message: "No existe un rol con ese ID."
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
const validateAssignTasks = (req, res, next) => {
    let input = req.body;
    const schema = {
        id: {
            $validate: {
                required: {
                    message: "Parámetro ID obligatorio."
                },
                exists: {
                    collection: 'roles',
                    isKey: true,
                    message: "No existe un rol con ese ID."
                }
            }
        },
        tasks: {
            $validate: {
                required: {
                    message: "Campo Tareas obligatorio."
                },
                array: {
                    message: "Campo Tareas debe ser un arreglo."
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
    validateAssignTasks,
    validateGetAll
};