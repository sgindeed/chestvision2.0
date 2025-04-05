from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import numpy as np
from PIL import Image
import tensorflow as tf
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

interpreter = tf.lite.Interpreter(model_path="covid19_vgg16_combined.tflite")
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

class_labels = ["COVID-19", "Lung_Opacity", "Normal", "Viral Pneumonia"]

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    file_path = f"static/uploads/{file.filename}"
    os.makedirs("static/uploads/", exist_ok=True)
    with open(file_path, "wb") as f:
        f.write(await file.read())

    img = Image.open(file_path).convert("RGB").resize((224, 224))
    img_array = np.array(img).astype(np.float32) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    interpreter.set_tensor(input_details[0]['index'], img_array)
    interpreter.invoke()
    output_data = interpreter.get_tensor(output_details[0]['index'])

    predicted_class = np.argmax(output_data)
    predicted_label = class_labels[predicted_class]

    return JSONResponse(content={"prediction": predicted_label, "file_path": file_path})

@app.get("/")
async def root():
    return {"message": "Welcome to ChestVision API! Visit /docs for API documentation."}
