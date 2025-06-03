---
layout: tailwind
title: Data Search
description: Description of the new data analytics feature
permalink: /notebooks/figma/search
---
# Hospital Search Interface


> Created a responsive, searchable hospital listing page with filters for location, specialty, insurance, treatments, and patient ratings—styled using TailwindCSS and structured for Jekyll integration.

---

## Frontend (HTML + TailwindCSS)

This feature is a static frontend component integrated into a Jekyll layout. It's designed for an intuitive user experience, offering form-based filtering and styled result cards for nearby hospitals.

###  Key Features

1. **Theme Section**
   - Gradient background header with large, bold title and subtitle
   - Sets the tone for a modern healthcare experience

2. **Search Filters**
   - Input/select fields for:
     - Location
     - Specialty
     - Insurance Provider
     - Procedure/Treatment
     - Minimum Rating
   - Responsive grid layout
   - Accessible form labels and interactive focus states

3. **Hospital Cards**
   - Each result card includes:
     - Featured image
     - Name, location, and distance
     - Average star rating (visual + numeric)
     - Highlighted specialties (tag badges)
     - Status ("Accepting new patients")
     - "View Details" link
     
![Hospital Search Interface](https://i.postimg.cc/8cw4mbCK/Screenshot-2025-04-10-at-9-12-22-AM.png)

4. **Metrics Dashboard**
   - Displays hospital performance stats:
     - Patient Satisfaction
     - Wait Time
     - Success Rate
     - Average Rating
   - Uses Tailwind utility classes for consistent styling and layout

5. **User Support **
   - Help section with two actionable buttons:
     - "Call an Advisor"
     - "Chat Now"
   - Paired with a visually engaging support image

---

##  Purpose & Future Integration

The current version is fully static and UI-focused, ideal for a prototype or front-end showcase. It is designed to be extended with JavaScript or API integration in future versions (real-time data filtering, search queries).

---
