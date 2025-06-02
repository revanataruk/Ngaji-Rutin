# 📸 Ngaji Rutin — Document Moments, Store Stories

**Custom Serverless Photo Gallery with Google Drive Integration**

Ngaji Rutin is a custom-built website designed to automatically and efficiently document friendship moments. Built entirely from scratch without CMS, this website features a time-based photo gallery directly integrated with **Google Drive** through **Google Apps Script**, enabling seamless photo uploads and displays without requiring conventional backend infrastructure.

---

## 🌟 Features

- ✅ **Automatic Google Drive Upload**  
  Files uploaded through the form go directly to designated Drive folder without users accessing Drive interface
- ✅ **Smart File Name Validation**  
  Enforces `dd-mm-yyyy` format for uploaded files with automatic validation blocking
- ✅ **Group Photo Validation**  
  Internal rule requiring minimum 3 people in photos with UI warning system
- ✅ **Dynamic Gallery Display**  
  Shows 25 latest photos grouped by upload date while maintaining all photos in Drive storage
- ✅ **Elegant Photo Modal**  
  Click-to-view large-size photo preview with smooth interactions
- ✅ **Smooth User Experience**  
  Scroll-to-top functionality, hover effects, and optimized gallery height management

---

## 🛠️ Tech Stack

### Frontend:
- **HTML + Tailwind CSS**: Clean structure with responsive utility-first design
- **Vanilla JavaScript**: Dynamic interactions, modal management, and form validation
- **Custom Upload UI**: Intuitive photo upload form with date input and password protection

### Backend & Storage:
- **Google Apps Script**: Serverless backend handling direct uploads, file renaming, and data validation
- **Google Drive API**: Cloud storage solution and photo source for dynamic gallery
- **Google Spreadsheet**: Optional metadata logging for uploaded file monitoring

### Architecture:
- **Serverless Design**: Runs entirely on Google ecosystem without traditional server infrastructure
- **Cost-Effective**: No database or hosting costs, leveraging Google's free tier services

---

## 📁 Project Structure

```
├── index.html          
├── NR 1.css
├── NR 1.js
└── README.md
```

---

## 🔧 How It Works

### Upload Process:
1. **File Selection**: User selects photo with date and password
2. **Validation**: JavaScript validates file format and naming convention
3. **Google Apps Script**: Handles secure upload to designated Drive folder
4. **Automatic Renaming**: Files renamed according to date format rules
5. **Gallery Update**: New photos appear in gallery within refresh cycle

### Gallery System:
- **Dynamic Loading**: Fetches latest 25 photos from Google Drive
- **Date Grouping**: Photos organized by upload date for better navigation
- **Modal Preview**: Full-size photo viewing with elegant overlay
- **Responsive Design**: Optimized for various screen sizes

---

## 📅 Project Timeline

- 💡 **Initial Concept**: August 27, 2024
- 📐 **UI/UX Research & Design**: September–October 2024
- 💤 **Development Hiatus**: Several months of project pause
- 🚀 **Launch & Go Live**: April 10, 2025

---

## 🎯 Project Objectives

This project was developed to explore:
- **Serverless Architecture** implementation via Google Apps Script
- Seamless integration between custom frontend and Google Drive ecosystem
- Cost-effective, scalable photo gallery solution without traditional backend
- Simple file structure that's easy to maintain and expand

> *This application runs entirely on Google ecosystem—making it lightweight, cost-effective, and highly flexible for future enhancements.*

---

## 🚀 Development Status

- ✅ **Core Functionality**: Fully implemented and tested
- ✅ **Google Integration**: Complete Drive API and Apps Script integration
- ✅ **UI/UX**: Responsive design with smooth interactions
- 🔄 **Optimization**: Ongoing performance improvements and feature additions

---

## 👨‍💻 Developer Notes

This project serves as internal documentation but is built with public web application standards. Key technical achievements:

- **Zero Server Costs**: Entirely serverless architecture
- **Automatic Scaling**: Google's infrastructure handles traffic spikes
- **Simple Maintenance**: Minimal codebase with clear separation of concerns
- **Flexible Storage**: Unlimited photo storage through Google Drive

---

## 📬 Contact & Contributions

For questions, suggestions, or collaboration opportunities:

- **Email**: [diwangkararevan@gmail.com](mailto:diwangkararevan@gmail.com)
- **GitHub**: [@revanataruk](https://github.com/revanataruk)

---

## 📄 License

This project is developed as a custom internal documentation solution with open development practices.
