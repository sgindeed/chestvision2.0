from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import os
import requests

load_dotenv()

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")

def get_pm25(lat, lon):
    url = f"http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}"
    response = requests.get(url)
    data = response.json()

    if 'list' not in data or not data['list']:
        raise Exception("Air quality data unavailable for this location")

    return data['list'][0]['components']['pm2_5']

def interpret_cigs(pm25):
    cigs = round(pm25 / 22, 2)
    if cigs < 1:
        level = "Good"
        tips = "Air is healthy. No precautions needed."
    elif cigs < 3:
        level = "Moderate"
        tips = "Limit outdoor activity if sensitive."
    elif cigs < 6:
        level = "Unhealthy for sensitive groups"
        tips = "Wear a mask and avoid long outdoor exposure."
    elif cigs < 10:
        level = "Unhealthy"
        tips = "Minimize outdoor time, use air purifiers."
    else:
        level = "Very Unhealthy"
        tips = "Stay indoors, use N95 masks outside."
    return cigs, level, tips

@app.get("/air-quality")
async def air_quality(lat: float = Query(...), lon: float = Query(...)):
    try:
        pm25 = get_pm25(lat, lon)
        cigs, level, tips = interpret_cigs(pm25)
        return {
            "PM2.5": pm25,
            "CigaretteEquivalent": cigs,
            "HealthImpact": level,
            "Precautions": tips
        }
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.get("/")
async def root():
    return {"message": "Air Quality API is running"}
