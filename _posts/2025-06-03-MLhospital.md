---
layout: tailwind
title: Hospitals For You
description: Description of the machine learning  
menu: nav/home.html
permalink: /notebooks/hospitalsforyou/
---

# Hospital Recommendation System

Builds an algorithm using machine learning to recommend the best hospital based on user selections—medical issue, priority (e.g., quality, safety, or experience), and acceptable travel distance. Combines a Flask backend (serving hospital data from a CSV) with a user-facing frontend (HTML, JavaScript, and Leaflet for maps).

---

## Frontend (HTML, TailwindCSS, JavaScript)

1. **User Location & Medical Issue**  
   - The user can choose a location (has anonymous options liek san diego zoo or petco park in case the user isnt comfortable sharing) and select a specific medical issue from a dropdown.

2. **“What’s Most Important”**  
   - The frontend offers a choice among three key priorities:
     - **Quality**  
     - **Experience**  
     - **Safety**  
   - A distance slider lets the user specify a maximum travel range.

3. **Request & Display**  
   - On form submission, the frontend sends a POST request to the Flask endpoint with the user's location, distance, medical issue, and priority.
   - Receives a recommended hospital—or a list of top hospitals—and displays them:
     - Basic hospital info (name, distance).
     - A Leaflet map with markers for each recommended facility and the user’s location.

4. **Styling & Feedback**  
   - Utilizes TailwindCSS for a responsive layout and user-friendly design.
   - Shows loading/error messages and a clear results section once the recommendation is computed.

---

## Backend (Flask + Custom Model or Weighted RandomForest)

1. **Data Loading**  
   - Reads from a pre-cleaned CSV (`hospitaldatamodified.csv`) containing columns like:
     - `hospital`
     - `performance measure` (medical issue)
     - `latitude`, `longitude`
     - `# of cases`, `# of adverse events`, `risk-adjusted rate`
     - (Optional) `quality` or similar metrics

2. **Distance Calculation**  
   - Uses a Haversine formula to compute how far each hospital is from the user's chosen lat/lon.
   - Filters out hospitals beyond the user’s max travel distance.

3. **Prioritization Logic**  
   - **Enhanced Priority Weighting (RandomForest approach)**  
     - Encodes disease/priority, scales numeric features, and trains a random forest.  
     - Increases the multiplier for the priority feature so that “What’s most important” strongly affects which hospital is chosen.  
   - **OR**  
   - **Custom Scoring (Direct Formula)**  
     - For safety, fewer adverse events is better.  
     - For experience, higher # of cases.  
     - For quality, “better than expected” > “as expected” > “worse.”  
     - Incorporates distance as a penalty so closer facilities rank higher when priorities tie.

4. **Flask Endpoint**  
   - A POST endpoint `/api/predict` that accepts JSON:
     ```json
     {
       "disease": "Acute Stroke",
       "priority": "safety",
       "distance": 10,
       "user_lat": 32.71,
       "user_lon": -117.16
     }
     ```
   - Returns JSON with the recommended hospital(s) or an error if none match.


   ## Backend Dependencies

Here are the core Python libraries used in the backend to process the hospital CSV data and serve recommendations:

- **Pandas**  
  - For reading CSV files, cleaning and transforming the data, and handling imputation of missing values.
- **Scikit-learn**  
  - Provides the RandomForestClassifier (if using the machine-learning approach) and tools like `StandardScaler` for feature scaling.
- **Joblib**  
  - Used to serialize (save/load) the trained model and its associated encoders or scalers.
- **Math**  
  - For the Haversine formula to calculate distances between user and hospital coordinates.
- **Flask** (and optionally **Flask-RESTful**)  
  - To create the API endpoint that receives user input (disease, priority, distance, lat/lon) and returns a recommended hospital.



With this architecture, “What’s most important to you?” now drives the final recommendation more effectively while maintaining the overall workflow of data loading, distance filtering, and hospital output.
