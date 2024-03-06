# PDF Text and Image Extraction Project

## Introduction

This project aims to extract text and images from PDF files using Python. It utilizes libraries such as PyPDF2, PyMuPDF (fitz), OpenCV, and Tesseract OCR for this purpose. The extracted text and images can be utilized for various purposes like text analysis, image processing, or content extraction.

## Setup

To run this project on your local computer, follow these steps:

1. **Install XAMPP**: Download and install XAMPP, which provides an Apache web server and PHP interpreter. You can download it from [here](https://www.apachefriends.org/index.html).

2. **Setup XAMPP**: Once installed, start the XAMPP control panel and start the Apache server.

3. **Project Setup**:
   - Clone or download this repository to your local machine.
   - Navigate to the downloaded folder and copy the contents to the `htdocs` folder inside the XAMPP installation directory (typically located at `C:\xampp\htdocs`).

4. **Python Environment Setup**:
   - Ensure Python 3.x is installed on your system.
   - Install the required Python packages by running `pip install -r requirements.txt` in your command line or terminal.

5. **Tesseract OCR Installation**:
   - Install Tesseract OCR software on your computer. You can download it from [here](https://github.com/tesseract-ocr/tesseract).
   - Set the path to the Tesseract executable (`tesseract.exe`) in the `pytesseract.pytesseract.tesseract_cmd` variable in the `main.py` file.

## Running the Project

1. **Start XAMPP**:
   - Start the XAMPP control panel and ensure Apache server is running.

2. **Configure Python Interpreter**:
   - Open the `main.py` file located in the `cgi-bin/Pymain` folder.
   - Update the shebang line (`#!`) at the top of the file with the correct path to your Python interpreter.

3. **Execute the Project**:
   - Copy the `Pymain` folder to the `cgi-bin` directory inside the XAMPP installation directory (typically located at `C:\xampp\cgi-bin`).
   - Open a web browser and navigate to `http://localhost/<project_folder>/main.py`.
   - Replace `<project_folder>` with the name of the folder you copied to the `htdocs` directory.
   - This will execute the `main.py` script, which will extract text and images from the specified PDF file and display the results in the browser.

## Project Description

This website utilizes Tesseract OCR to scan words from images present inside PDF files, as well as words present in the PDF text itself. It supports Urdu, Telugu, and English languages for both image and PDF text extraction.

## Notes

- The extracted images will be saved in the `Output` folder within the project directory.
- The extracted text will be displayed on the webpage generated by the Python CGI script.
- Make sure to adjust any file paths or configurations according to your system setup.
- For any issues or errors, refer to the troubleshooting section or seek assistance from the project maintainers.

## Troubleshooting

- If the project does not run as expected, ensure that all dependencies are installed correctly and paths are set up accurately.
- Check the Apache error logs for any specific errors related to CGI execution or file permissions.
- Ensure that the necessary permissions are set for the project directory and its subdirectories to allow file reading, writing, and execution.

By following these steps, you should be able to set up and run the PDF text and image extraction project locally on your computer using XAMPP.
