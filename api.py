from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import os

os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = tf.keras.models.load_model("covid19_vgg16_combined.h5")
class_labels = ["COVID-19", "Lung_Opacity", "Normal", "Viral Pneumonia"]

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        os.makedirs("static/uploads/", exist_ok=True)
        file_path = f"static/uploads/{file.filename}"
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        img = image.load_img(file_path, target_size=(224, 224))
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        prediction = model.predict(img_array)
        predicted_class = np.argmax(prediction)
        predicted_label = class_labels[predicted_class]

        return JSONResponse(content={"prediction": predicted_label, "file_path": file_path})
    except Exception as e:
        return JSONResponse(content={"prediction": "Error during prediction", "error": str(e)})

@app.get("/")
async def root():
    return {"message": "Welcome to ChestVision API! Visit /docs for API documentation."}
