---
layout: tailwind
title: Data Analytics Feature
description: Description of the new data analytics feature 
menu: nav/home.html
permalink: /notebooks/data_analytics/
---

# Hospital Data Analytics 

> Build a dashboard to load, display, filter, and visualize hospital-related data from a pre-cleaned CSV via a Flask API.

---

## Frontend (HTML + JavaScript + TailwindCSS)

This feature loads hospital data from a Flask backend that serves a CSV file converted to JSON. The frontend supports dynamic filtering and visual analysis.

### Dashboard Functionality

1. **Load Dataset**  
   - Data is fetched on page load from a backend endpoint:  
     `GET /api/analytics`  
   - Uses `fetch()` with async/await and handles status states (loading, error, empty).

2. **Data Display**
   - Table rendering with headers auto-generated from dataset keys
   - Dynamic row creation using JavaScript
   - Responsive design using TailwindCSS classes

3. **Filtering Logic**
   - Filter by:
     - `Hospital`
     - `Procedure`
     - `Rating`
   - Dynamic population of filter options based on dataset
   - Apply/reset filters to update the table content

4. **User Experience Enhancements**
   - Status message panel (`loading`, `error`, `no data found`)
   - Smooth transitions and hover effects
   - Graceful fallback when no matching data is found

---

## Backend (Flask + Pandas)

The Flask backend serves the hospital dataset from a static CSV file. The CSV file's data was cleaned using Pandas.

### API Endpoint

#### `/api/analytics` (GET)

- Reads from: `data/hospitaldatamodified.csv`
- Returns JSON response:
```json
{
  "success": true,
  "count": 1000,
  "data": [ { "HOSPITAL": "...", "PROCEDURE": "...", "RATING": 4.5, ... } ]
}
