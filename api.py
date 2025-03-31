from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import uvicorn
from fastapi.responses import JSONResponse
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

def load_model():
    global model
    if "model" not in globals():
        model = tf.keras.models.load_model("covid19_vgg16_combined.h5")

class_labels = ["COVID-19", "Lung_Opacity", "Normal", "Viral Pneumonia"]

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    load_model()

    file_path = f"static/uploads/{file.filename}"
    os.makedirs("static/uploads/", exist_ok=True)
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    img = image.load_img(file_path, target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    predicted_class = np.argmax(prediction)
    predicted_label = class_labels[predicted_class]

    return JSONResponse(content={"prediction": predicted_label, "file_path": file_path})

@app.get("/")
async def root():
    return {"message": "Welcome to ChestVision API! Visit /docs for API documentation."}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
