import joblib
import pandas as pd

model = joblib.load('predictModel/model_houses_trained.pkl')

def predecir_precio(json_casa):

  casa = convertir_datos(json_casa)
  x_new = pd.DataFrame([casa])
  return  model.predict(x_new)[0] 
  

def convertir_datos(json):
    
  return  {'Area': json["area"], 
          'Garage': json["garaje"], 
          'FirePlace': json["chimenea"], 
          'Baths': json["aseos"], 
          'White Marble': json["marmol_blanco"], 
          'Black Marble': json["marmol_negro"], 
          'Indian Marble': json["marmol_indio"], 
          'Floors': json["pisos"], 
          'City': json["ciudad"], 
          'Solar': json["solar"], 
          'Electric': json["electricidad"], 
          'Fiber': json["fibra"], 
          'Glass Doors': json["puertas_cristal"], 
          'Swiming Pool': json["piscina"], 
          'Garden': json["jardin"]}


