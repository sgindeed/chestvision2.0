import tensorflow as tf

model = tf.keras.models.load_model("covid19_vgg16_combined.h5")

converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()

with open("covid19_vgg16_combined.tflite", "wb") as f:
    f.write(tflite_model)

print("Model converted and saved as .tflite!")
