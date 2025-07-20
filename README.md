# 🌌 Cosmic Explorer

![Banner](.)

**A Real-Time Space Mission Dashboard**  
Designed and built for **Nebula Nexus** by Club Cosmos

---

## Problem Statement

> **Problem Statement 8:**  
> Design a web-based dashboard that visualizes live or simulated space mission data, such as satellite telemetry, ISS location, Mars weather, or asteroid tracking.

---

## Project Overview

**Cosmic Explorer** is an elegant, data-rich web dashboard that brings space exploration data to everyone. Whether you’re following the path of the International Space Station, checking Mars weather, tracking potentially hazardous asteroids, or viewing daily space highlights, Cosmic Explorer provides a seamless, real-time gateway to the universe.

---

## Features

- **Live ISS Tracking**: See the real-time position, altitude, and speed of the International Space Station on an interactive map.
- **Mars Weather Module**: Current reports and atmospheric data straight from Mars via NASA’s Insight API.
- **Asteroid & NEO Visualizer**: Track near-Earth objects and asteroids with up-to-date information.
- **APOD Integration**: View NASA’s Astronomy Picture of the Day with stunning imagery and educational descriptions.
- **High-Res Satellite Imagery**: Explore Earth from above with satellite map overlays.
- **Animated Visuals**: Immerse yourself in dynamic backgrounds like VANTA Globe and Dots for a futuristic experience.
- **Responsive & Minimal UI**: Dark mode, mobile-friendly, tabbed navigation.

---

## Live Preview

> [COSMIC EXPLORER - VERCEL](https://cosmic-explorer-seven.vercel.app/)

---

## Technology Stack

| Layer            | Technology                  |
|------------------|----------------------------|
| Frontend         | React (Next.js structure)  |
| Styling          | Tailwind CSS               |
| Visualization    | VANTA.js, Chart.js         |
| Maps             | Leaflet.js / MapTiler / OpenSteetMap |
| APIs             | NASA Open APIs, WhereTheISS.at |
| Hosting          | Vercel                     |
| CI/CD            | GitHub Actions             |

---

## Getting Started

### 1. **Clone the Repository**
      ```bash
      git clone https://github.com/your-username/cosmic-explorer.git
      cd cosmic-explorer
      ```

### 2. Install Dependencies
       ```bash
       npm install
       ```

### 3. Configure Environment

- Register for a [NASA API key](https://api.nasa.gov/).
- Register for MapTiler [MapTiler](https://www.maptiler.com/).


### 4. Run Locally
       ```bash
       npm run dev
       ```
- Visit `http://localhost:3000` in your browser.

### 5. Build for Production
       ```bash
       npm run build
       ```

- Deploy to Firebase or any preferred hosting service.

---

## Usage

- **Home/Landing**: Animated background with dashboard CTA, featuring APOD and navigation.
- **Dashboard**:  
  - ISS Live Tracker: Map, telemetry data, and stats.
  - Mars Weather: Latest weather, atmospheric trends, rover images.
  - Asteroid Tracker: Table and visual alerts for upcoming asteroid approaches.
  - Satellite Imagery: Earth high-resolution live and archival views.
  - Satellite Telemetry: View Operational satellites info.

- **Auto-refresh**: Real-time data modules update automatically.
- **Responsive UI**: Works on desktop and mobile.

---

## API Integration

| Module            | Data Source                                       |
|-------------------|---------------------------------------------------|
| ISS Tracking      | [WhereTheISS.at](https://wheretheiss.at/w/developer) |
| Mars Weather      | [NASA Insight API](https://api.nasa.gov/)         |
| Asteroid Data     | [Asteroids NeoWs](https://api.nasa.gov/)          |
| Satellite Imagery | [GIBS imagery](https://api.nasa.gov/)             |
| MapTiler          | [MapTiler](https://www.maptiler.com/)             |
---

## Contributing

1. Fork the repository
2. Make your changes in a new branch
3. Submit a pull request

---

## 👥 Credits
Special thanks to the amazing team behind COSMIC EXPLORER:
 
👨‍💻 [HB Singh Chaudhary (M4YH3M-DEV)](https://github.com/M4YH3M-DEV/) 
 
👨‍💻 [BIGBEASTISHANK (Pranjal)](https://bigbeastishank.com/) 

---
