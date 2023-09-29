from marshmallow import Schema, fields, validate

class CasaSchema(Schema):
    nombre = fields.Str(
        required=True,
        error_messages={"required": "El nombre es obligatorio"},
        validate=validate.Length(min=4, error="El nombre debe tener al menos 4 letras"),)

    area = fields.Number(
        required=True,
        error_messages={"required": "El area es obligatoria"},
        validate=validate.Range(min=0, error="El precio no puede ser negativo"),)

    garaje = fields.Number(
        required=True,
        error_messages={"required": "El número de garajes es obligatorio"},
        validate=validate.Range(min=0, error="El garaje no puede ser negativo"),)

    chimenea = fields.Number(
        required=True,
        error_messages={"required": "El número de chimeneas es obligatorio"},
        validate=validate.Range(min=0, error="La chimenea no puede ser negativo"),)

    aseos = fields.Number(
        required=True,
        error_messages={"required": "El número de aseos es obligatorio"},
        validate=validate.Range(min=0, error="Los aseos no pueden ser negativos"),)

    ciudad = fields.Number(required=False)
    electricidad = fields.Number(required=False)
    fibra = fields.Number(required=False)
    jardin = fields.Number(required=False)
    marmol_blanco = fields.Number(required=False)
    marmol_indio = fields.Number(required=False)
    marmol_negro = fields.Number(required=False)
    piscina = fields.Number(required=False)
    pisos = fields.Number(required=False)
    aseos = fields.Number(required=False)
    puertas_cristal = fields.Number(required=False)
    solar = fields.Number(required=False)
    precio_venta = fields.Number(required=False)
    precio_estimado = fields.Number(required=False)
