from flask import Flask, render_template, request, jsonify
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import os

app = Flask(__name__)

model = tf.keras.models.load_model("covid19_vgg16_combined.h5")

class_labels = ["COVID-19", "Lung_Opacity", "Normal", "Viral Pneumonia"]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"})

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"})

    file_path = os.path.join("/tmp", file.filename)
    file.save(file_path)

    img = image.load_img(file_path, target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    predicted_class = np.argmax(prediction)
    predicted_label = class_labels[predicted_class]

    return jsonify({"prediction": predicted_label})

if __name__ == "__main__":
    app.run(debug=True)
