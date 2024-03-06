#!C:\Users\ASUS\AppData\Local\Programs\Python\Python312\python.exe

import sys
import cv2
import numpy as np
sys.stdout.reconfigure(encoding='utf-8')
from PIL import Image
import io
import pytesseract
import os
import fitz
import PyPDF2

def print_html_header():
    print("Content-Type: text/html; charset=utf-8\n") 
    print("<html><head><title>CGI Output</title></head><body>")

def print_html_footer():
    print("</body></html>")

pytesseract.pytesseract.tesseract_cmd = r'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'

tessdata_path = r'C:\\Program Files\\Tesseract-OCR\\tessdata'

os.environ['TESSDATA_PREFIX'] = tessdata_path

def read_text_from_pdf(pdf_path):
    text = ""
    with open(pdf_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            page_text = page.extract_text().strip()
            page_text = "<br>".join(page_text.splitlines())
            text += page_text + "<br>"
    return text


def extract_text_from_image(image_bytes, language='tel'):
    try:
        image = Image.open(io.BytesIO(image_bytes))
        text = pytesseract.image_to_string(image, lang=language)
        text_with_br_tags = "<br>".join(text.strip().splitlines())
        return text_with_br_tags
    except Exception as e:
        print(f"Error extracting text from image: {e}")
        return ""
    
def grayscale(image):
    return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

def extract_images_and_text_from_pdf(pdf_path, output_folder):
    try:
        pdf_document = fitz.open(pdf_path)

        for page_num in range(pdf_document.page_count):
            page = pdf_document[page_num]

            image_list = page.get_images(full=True)

            for image_index, img in enumerate(image_list):
                image_index += 1

                base_image = pdf_document.extract_image(img[0])
                image_bytes = base_image["image"]

                image_filename = f"{output_folder}page{page_num + 1}_image{image_index}.png"
                with open(image_filename, "wb") as image_file:
                    image_file.write(image_bytes)

                img = cv2.imdecode(np.frombuffer(image_bytes, np.uint8), cv2.IMREAD_COLOR)
                gray_image = grayscale(img)
                cv2.imwrite(f"Output/page{page_num + 1}_image{image_index}.jpg", gray_image) 
                thresh, im_bw = cv2.threshold(gray_image, 110, 230, cv2.THRESH_BINARY)
                cv2.imwrite(f"Output/page{page_num + 1}_image{image_index}.jpg", im_bw)

                image_name = f"page{page_num + 1}_image{image_index}.jpg"
                text = extract_text_from_image(image_bytes, language='eng+tel+urd') 
                print(f"Extracted Text from {image_name}:<br>")
                print(f"<p>{text}</p><br><br>")

    except Exception as e:
        print(f"Error extracting text from PDF: {e}")

    finally:
        if pdf_document:
            pdf_document.close()

if __name__ == "__main__":
    pdf_path = "Uploads/uploads.pdf"
    output_folder = "Output\\"
    print_html_header()

    result_text = read_text_from_pdf(pdf_path)
    print(result_text)
    extract_images_and_text_from_pdf(pdf_path, output_folder)

    print_html_footer()
