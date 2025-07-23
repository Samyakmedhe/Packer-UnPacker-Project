# 📦 Packer-Unpacker Project

A full-stack web application for **packing** multiple files into a custom `.pak` archive format and **unpacking** `.pak` archives back into their original contents.

---

## 🔧 Technologies Used

### ⚙️ Backend (Java)

- Java 
- `HttpServer` from `com.sun.net.httpserver`
- Apache Commons FileUpload
- Custom file format handling logic (Packer/Unpacker)

### 🌐 Frontend (Angular)

<img width="1710" height="985" alt="Screenshot 2025-07-23 at 3 52 17 PM" src="https://github.com/user-attachments/assets/b33e4a1b-88c7-4852-a5de-da459b50ab11" />

- Angular CLI
- Tailwind CSS for styling
- File upload via `HttpClient`
- Dynamic UI for packing/unpacking

---

## 🚀 Features

- ✅ Upload multiple files and pack into a `.pak` archive
- ✅ Upload a `.pak` file and download the unpacked contents as a `.zip`
- ✅ Cross-Origin Resource Sharing (CORS) enabled
- ✅ Download response directly in the browser

---

## 🗂️ Project Structure

## 📁 Project Structure

Backend/
├── MainServer.java
├── FileHandler.java
├── Packer.java
├── Unpacker.java
└── lib/                           
packer-unpacker-ui/
├── src/
│   └── app/
│       └── file-upload/
├── tailwind.config.js
└── angular.json

## 🧪 How to Run

### 🖥️ Backend (Java)

1. Navigate to `Backend/` folder.
2. Compile Java files with dependencies:

   ```bash
   javac -cp ".:lib/*" *.java
   java -cp ".:lib/*" MainServer

### 🖥️ Frontend (Angular)
Navigate to packer-unpacker-ui/
: Install dependencies:
: npm install
: Run the Angular development server:
```bash
    ng serve -o

