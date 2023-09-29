from flask import Blueprint, jsonify, request
from models import Casa
from schemas import CasaSchema, validate_json
from db import db
from predictModel import predecir_precio

casas = Blueprint('casas', __name__)


@casas.get("/")
def get_casas():
  select = db.select(Casa)
  casas = db.session.execute(select).scalars().all()
  return jsonify(casas)

@casas.get("/<int:id>")
def get_casa(id: int):
  casa = db.get_or_404(Casa, id)
  return jsonify(casa)

@casas.post("/")
@validate_json(CasaSchema)
def add_casa():
  json = request.json
  prediccion = predecir_precio(json)
  casa = Casa(nombre=json["nombre"],
              area=json["area"],
              garaje=json["garaje"],
              chimenea=json["chimenea"],
              aseos=json["aseos"],
              marmol_blanco=json["marmol_blanco"],
              marmol_negro=json["marmol_negro"],
              marmol_indio=json["marmol_indio"],
              pisos=json["pisos"],
              ciudad=json["ciudad"],
              solar=json["solar"],
              electricidad=json["electricidad"],
              fibra=json["fibra"],
              puertas_cristal=json["puertas_cristal"],
              piscina=json["piscina"],
              jardin=json["jardin"],
              precio_estimado=prediccion,
              precio_venta=json["precio_venta"])

  db.session.add(casa)
  db.session.commit()
  return jsonify(casa), 201


@casas.put("/<int:id>")
def update_casa(id: int):
  casa = db.get_or_404(Casa, id)
  json = request.json
  prediccion = predecir_precio(json)
  casa.nombre = json['nombre']
  casa.area = json["area"]
  casa.garaje = json["garaje"]
  casa.chimenea = json["chimenea"]
  casa.aseos = json["aseos"]
  casa.marmol_blanco = json["marmol_blanco"]
  casa.marmol_negro = json["marmol_negro"]
  casa.marmol_indio = json["marmol_indio"]
  casa.pisos = json["pisos"]
  casa.ciudad = json["ciudad"]
  casa.solar = json["solar"]
  casa.electricidad = json["electricidad"]
  casa.fibra = json["fibra"]
  casa.puertas_cristal = json["puertas_cristal"]
  casa.piscina = json["piscina"]
  casa.jardin = json["jardin"]
  casa.precio_estimado = prediccion
  casa.precio_venta = json["precio_venta"]
  db.session.commit()
  return jsonify(casa)


@casas.delete("/<int:id>")
def delete_casa(id: int):
  casa = db.get_or_404(Casa, id)
  db.session.delete(casa)
  db.session.commit()
  return "", 204

