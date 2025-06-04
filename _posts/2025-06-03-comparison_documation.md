---
layout: tailwind
title: Summary Dashboard
description: Dashboard comparing hospital metrics and YouTube engagement via Flask API
permalink: /notebooks/summary_dashboard/
---

# Summary Dashboard: Hospital & YouTube Data Comparison

> A dynamic dashboard that visualizes and compares hospital performance metrics and YouTube engagement statistics using a tabbed interface powered by Flask, TailwindCSS, and Chart.js.

---

## Frontend (HTML + JavaScript + TailwindCSS)

This dashboard contains two main tabs: one for comparing hospital metrics and another for comparing YouTube channel engagement. Both use data fetched from a Flask backend and rendered dynamically using Chart.js.

### Dashboard Functionality

1. **Tabbed Interface**  
   - Toggles between Hospital and YouTube panels  
   - Controlled via `classList` toggling and event listeners

2. **Hospital Comparison Panel**
   - **Load Dataset**  
     - `GET /api/comparison`  
     - Columns normalized on backend (uppercase, underscore-delimited)  
     - Dropdowns populated dynamically from response
   - **Data Visualization**  
     - Grouped bar chart showing:
       - `# of Adverse Events`
       - `# of Cases`
       - `Risk-Adjusted Rate`
     - Chart updates based on dropdown selection
   - **User Feedback**  
     - Error messages and fallback when data is unavailable

3. **YouTube Comparison Panel**
   - **File List Dropdowns**  
     - `GET /api/youtube/files`  
     - Lists all available CSV files in `/data/yt/`
   - **Load Dataset**  
     - `GET /api/youtube/data/<filename>`  
     - Extracts stats from each file:
       - Views, Likes, Comments
       - Likes per View (%)
       - Views per Comment
   - **Data Visualization**  
     - Chart.js bar chart showing side-by-side comparison  
     - Custom tooltips and responsive design

---

## Backend (Flask + Pandas)

The backend exposes two sets of endpoints: one for hospital metrics and one for YouTube engagement data. Both serve data from CSV files, cleaned and normalized using Pandas.

### API Endpoints

#### `/api/comparison` (GET)

- Reads from: `data/comparisondata.csv`
- Normalizes column names (uppercased, trimmed, spaces replaced)
- Returns JSON response:
```json
{
  "success": true,
  "count": 300,
  "data": [
    {
      "HOSPITAL": "Example Hospital",
      "PERFORMANCE_MEASURE": "Heart Surgery Mortality",
      "#_OF_ADVERSE_EVENTS": 7,
      "#_OF_CASES": 150,
      "RISK-ADJUSTED_RATE": 4.7
    }
  ]
}
```

---

#### `/api/youtube/files` (GET)

- Reads from: `data/yt/` directory
- Lists all `.csv` files in the directory
- Returns JSON response:
```json
{
  "success": true,
  "files": ["MayoClinic.csv", "DoctorMike.csv", "..."]
}
```

---

#### `/api/youtube/data/<filename>` (GET)

- Reads from: `data/yt/<filename>`
- Cleans data using Pandas:
  - Uppercases and sanitizes column headers
  - Replaces null values with empty strings
- Returns JSON response:
```json
{
  "success": true,
  "data": [
    {
      "CHANNELTITLE": "Mayo Clinic",
      "VIEWCOUNT": "450000",
      "LIKECOUNT": "12000",
      "COMMENTCOUNT": "800",
      "DURATIONSEC": "360"
    }
  ]
}
```
