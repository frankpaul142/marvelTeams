'use strict';
import validy from './baseValidator'
import * as util from '../libs/util'

const validateCreate = (req, res, next) => {
    let input = req.body;
    const schema = {
        email: {
            $validate: {
                required: {
                    message: "Campo Email obligatorio."
                },
                unique: {
                    collection: 'users',
                    isKey: false,
                    message: "El Usuario ya se ha registrado previamente."
                },
                email: {
                    message: "Ingrese un Email válido."
                },
            }
        },
        first_name: {
            $validate: {
                required: {
                    message: "Campo Nombre obligatorio."
                }
            }
        },
        last_name: {
            $validate: {
                required: {
                    message: "Campo Apellido obligatorio."
                }
            }
        },
        password: {
            $validate: {
                required: {
                    message: "Campo Contraseña obligatorio."
                },
                minLength: {
                    arg: 6,
                    message: "La Contraseña debe tener como mínimo 6 caracteres."
                }
            }
        },
        password_confirm: {
            $validate: {
                required: {
                    message: "Campo Confirmar Contraseña obligatorio."
                },
                equal: {
                    arg: input.password,
                    message: "Las contraseñas no coinciden."
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
                    collection: 'users',
                    isKey: true,
                    message: "No existe un usuario con ese ID."
                }
            }
        },
        first_name: {
            $validate: {
                required: {
                    message: "Campo Nombre obligatorio."
                }
            }
        },
        last_name: {
            $validate: {
                required: {
                    message: "Campo Apellido obligatorio."
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
const validateGetById = (req, res, next) => {
    let input = req.params;
    const schema = {
        id: {
            $validate: {
                required: {
                    message: "Parámetro ID obligatorio."
                },
                exists: {
                    collection: 'users',
                    isKey: true,
                    message: "No existe un usuario con ese ID."
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
const validateAssignRole = (req, res, next) => {
    let input = req.body;
    const schema = {
        user_ids: {
            $validate: {
                required: {
                    message: "Campo IDs de Usuario obligatorio."
                },
                array: {
                    message: "Campo IDs de Usuario debe ser un arreglo."
                }
            }
        },
        role_id: {
            $validate: {
                required: {
                    message: "Campo ID de Rol obligatorio."
                },
                exists: {
                    collection: 'roles',
                    isKey: true,
                    message: "No existe un rol con ese ID."
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
const validateCreateStep2 = (req, res, next) => {
    let input = req.body;
    input.id = res.locals.userId;
    input.email = res.locals.email;
    const schema = {
        id: {
            $validate: {
                required: {
                    message: "Parámetro ID obligatorio."
                },
                existsAuth: {
                    message: "No existe un usuario con ese ID."
                },
                unique: {
                    collection: 'users',
                    isKey: true,
                    message: "Ya existe un usuario registrado con ese ID."
                }
            }
        },
        first_name: {
            $validate: {
                required: {
                    message: "Campo Nombre obligatorio."
                }
            }
        },
        last_name: {
            $validate: {
                required: {
                    message: "Campo Apellido obligatorio."
                }
            }
        },
        document_type: {
            $validate: {
                required: {
                    message: "Campo Tipo de Documento obligatorio."
                },
                inclusion: {
                    arg: ['CI', 'RUC'],
                    message: "Campo Tipo de Documento no es válido"
                }
            }
        },
        document: {
            $validate: {
                required: {
                    message: "Campo Documento obligatorio."
                },
                unique: {
                    collection: 'users',
                    isKey: false,
                    message: "Ya existe un usuario registrado con ese Documento."
                },
                documentECU: {
                    type: 'document_type',
                    message: "Campo Documento no es válido."
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
const validateUpdateNewUser = (req, res, next) => {
    let input = req.body;
    const schema = {
        is_new_user: {
            $validate: {
                required: {
                    message: "Campo Nuevo Usuario obligatorio."
                },
                inclusion: {
                    arg: [true, false],
                    message: "Campo Nuevo Usuario no es válido"
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

module.exports = {
    validateCreate,
    validateUpdate,
    validateGetById,
    validateAssignRole,
    validateGetAll,
    validateCreateStep2,
    validateUpdateNewUser
};