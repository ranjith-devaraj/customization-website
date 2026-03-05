# 👕 T-Shirt Designer Web App

A modern **T-Shirt customization web application** built with **React, Vite, Tailwind CSS, and Fabric.js**.
Users can design custom T-shirts by adding **text, images, colors**, and preview both **front and back views** before downloading the final design.

---

## 🚀 Features

* 🎨 **Custom T-Shirt Designer**
* 🧵 **Front & Back Shirt Editing**
* ✏️ **Add Text with Custom Fonts**
* 🖼 **Upload Images or Logos**
* 🎯 **Drag, Resize, Rotate Design Elements**
* 🧥 **Change Shirt Colors**
* 📐 **Printable Design Area Guide**
* 🗂 **Layer Management Panel**
* 🗑 **Delete Selected Elements**
* 📥 **Download Final Shirt Design**

---

## 🖥 Tech Stack

| Technology   | Purpose                     |
| ------------ | --------------------------- |
| React        | UI Framework                |
| Vite         | Fast Development Build Tool |
| Tailwind CSS | Styling                     |
| Fabric.js    | Canvas Design Engine        |
| TypeScript   | Type Safety                 |
| Zustand      | State Management            |

---

## 📂 Project Structure

```
design-my-shirt
│
├── public
│   └── images
│       ├── front-shirt.png
│       └── back-shirt.png
│
├── src
│   ├── components
│   │   ├── editor
│   │   │   ├── ShirtEditor.tsx
│   │   │   ├── Toolbar.tsx
│   │   │   ├── LayersPanel.tsx
│   │   │   ├── TextEditor.tsx
│   │   │   ├── UploadImage.tsx
│   │   │   ├── ColorPicker.tsx
│   │   │   ├── FrontBackToggle.tsx
│   │   │   └── DownloadDesign.tsx
│   │   └── ui
│
├── pages
│   ├── Index.tsx
│   └── NotFound.tsx
│
├── hooks
├── lib
├── App.tsx
└── main.tsx
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/ranjith-devaraj/customization-website.git
```

Navigate into the project:

```bash
cd customization-website
```

Install dependencies:

```bash
npm install
```

```basb
 npm install fabric@5.3.0
```

Start the development server:

```bash
npm run dev
```

The app will run on:

```
http://localhost:8080
```

---

## 🎨 How It Works

1. Select **Front or Back view** of the shirt.
2. Add **text or upload images**.
3. Move and resize elements inside the **printable area**.
4. Change the **shirt color**.
5. Manage layers in the **Design Elements panel**.
6. Download the final shirt design.

---

## 📸 Preview

Example UI:

* Left panel → Design tools
* Center → T-shirt canvas preview
* Right panel → Layer management

---

## 📦 Build for Production

To build the project:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## 🧑‍💻 Author

**Ranjith Devaraj**

* B.Tech AI & Data Science
* Web Developer & Data Analyst

GitHub:
https://github.com/ranjith-devaraj

---

## ⭐ Future Improvements

* Undo / Redo history
* Drag-and-drop image uploads
* Mobile responsive editor
* Export high-resolution print files
* Product mockup previews

---

## 📄 License

This project is open-source and available under the **MIT License**.
## Project Perview
<img width="1918" height="928" alt="image" src="https://github.com/user-attachments/assets/6b50b92e-dc0c-4370-9d68-e5e3a0955ace" />
## ✅ Result 
<img width="1500" height="3060" alt="tshirt-design (4)" src="https://github.com/user-attachments/assets/54090cb7-cfbb-461a-be91-d737b7ef49c6" />
