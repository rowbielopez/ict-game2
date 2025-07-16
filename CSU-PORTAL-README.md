# CSU Student Learning Portal

## Overview
A modern, interactive, and responsive student portal interface built with ReactJS for Cagayan State University. The portal features a clean, professional design suitable for academic use.

## Features

### 🎨 Design & Branding
- **Black background** with gradient effects
- **White text** for optimal readability
- **Yellow gold (#FFDF00)** buttons and highlighted elements
- **Maroon (#800000)** headers, accents, and section borders
- **Cagayan State University** branding and logo

### 📱 Responsive Design
- Mobile-friendly layout
- Responsive grid system
- Touch-friendly interface
- Smooth animations and transitions

### 🔐 Login System
- **Student ID Number** input field
- **Full Name** input field
- **Course Selection** dropdown with two options:
  - Teaching in ICT
  - Introduction to ICT Specializations 1
- **Lesson Selection** (only for Introduction to ICT course)
  - Lesson 1: **Enabled** and selectable
  - Lessons 2-9: **Disabled** with "Coming Soon" status

### ✨ Interactive Elements
- **Animated form** with fade-in/slide-up effects
- **Form validation** - all fields required
- **Prominent Start Lesson button** in yellow gold
- **Tooltip indicators** for disabled lessons
- **Visual lesson status grid** showing availability

### 🔧 Technical Features
- **React Hooks** (useState, useEffect) for state management
- **Local Storage** integration for user data persistence
- **Accessibility support** with keyboard navigation
- **ARIA labels** and semantic HTML
- **Clean, modular CSS** with responsive breakpoints

## Usage

1. **Enter Student Information**
   - Input your official CSU Student ID Number
   - Enter your complete registered name

2. **Select Course**
   - Choose from "Teaching in ICT" or "Introduction to ICT Specializations 1"

3. **Choose Lesson** (for Introduction to ICT only)
   - Select from available lessons
   - Currently only Lesson 1 is enabled

4. **Start Learning**
   - Click the prominent "Start Lesson" button
   - Data is automatically saved to localStorage

## File Structure
```
src/
├── CSUHomePage.js       # Main portal component
├── csu-portal.css       # Portal-specific styles
├── App.js              # Main application component
├── lesson1_game.js     # Quiz game component
└── index.js            # Application entry point
```

## Development

### Running the Application
```bash
npm start
```

### Building for Production
```bash
npm run build
```

### Git Workflow
```bash
git add .
git commit -m "feat: description"
git push origin main
```

## Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Accessibility
- Keyboard navigation support
- Screen reader compatible
- High contrast mode support
- Focus indicators
- Semantic HTML structure

---

**© 2025 Cagayan State University. All rights reserved.**
