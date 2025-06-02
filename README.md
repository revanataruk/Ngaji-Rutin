# 📸 Ngaji Rutin — Document Moments, Store Stories
**Ngaji Rutin** is a custom website developed to automatically and efficiently document friendship moments. Built from scratch without CMS, this website focuses on time-based photo galleries directly integrated with **Google Drive** through **Google Apps Script**, enabling photo upload and display without requiring conventional backend.

---

## 🛠️ Behind the Scenes: How the Website Works
This website is built with a lightweight yet functional stack:

### 🧩 Frontend:
- **HTML + Tailwind CSS**: Clean structure and responsive design
- **Vanilla JavaScript**: For dynamic interactions (modal, validation, scroll)
- **Custom Upload UI**: Photo upload form + date input & password

### ☁️ Backend & Storage:
- **Google Apps Script**: Handles direct upload process to Google Drive, automatic file renaming, and data validation
- **Google Drive API**: Used as cloud storage and photo source for gallery
- **Spreadsheet Logging** *(optional)*: To record metadata of uploaded files (if monitoring is needed)

---

## 🔍 Main Features
- ✅ **Automatic Upload to Google Drive**  
  Files uploaded through the form go directly to the designated Drive folder without users seeing the Drive interface.

- ✅ **File Name Validation**  
  Users must rename files according to `dd-mm-yyyy` format. Upload is blocked if format is incorrect.

- ✅ **Minimum 3 People in Photo**  
  This is an internal rule. Upload is valid only if photo contains at least 3 members—displayed as a warning in UI.

- ✅ **Dynamic Gallery**  
  Gallery displays **25 latest photos**, grouped by upload date. Old photos remain stored in Drive.

- ✅ **Inspect Photo Modal**  
  Click photos to view large-size preview, complete with elegant close button.

- ✅ **Smooth UX**  
  - Scroll-to-top button  
  - Hover effects on gallery  
  - Gallery limited to `max-height` to keep focus on stories below

---

## 📆 Project Timeline
- 💡 Initial idea emerged: **August 27, 2024**
- 📐 UI/UX research and design: September–October 2024
- 💤 Temporarily discontinued for several months
- 🚀 Launch and go live: **April 10, 2025**

---

## 👨‍💻 Developer Notes
This project was developed as internal documentation, but built with standards like public web applications. The objectives are:
- Implementing **serverless architecture** via Google Apps Script
- Exploring seamless integration between custom frontend and Google Drive
- Maintaining simple file structure that's easy to maintain and expand

> This web doesn't depend on external databases, but runs entirely on Google ecosystem—making it lightweight, cost-effective, and flexible.

---

## 📌 Final Notes
Ngaji Rutin is a project born from real needs: storing moments efficiently and enjoyably. Built with heart by one developer, for one gang that will never be replaced.

> *"Because it's not just the photos that are saved, but all the stories behind them."*
