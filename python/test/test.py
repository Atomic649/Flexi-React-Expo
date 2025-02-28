import fitz  # PyMuPDF
import re
import pandas as pd

# Function to extract text from PDF
def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

# Function to extract short date pattern (DD/MM/YY)
def get_short_date(text):
    short_date_pattern = re.compile(r'\d{2}/\d{2}/\d{2}')
    matches = short_date_pattern.findall(text)
    return matches

# Main function
def main(pdf_path):
    text = extract_text_from_pdf(pdf_path)
    print("Extracted Text:\n", text)  # Print the extracted text
    short_dates = get_short_date(text)
    print("Short Dates:\n", short_dates)  # Print the extracted short dates

# Replace 'AcctSt.pdf' with your PDF file path
pdf_path = '/Volumes/LACIES/Flexi-React-Expo/python/pdf/AcctSt.pdf'
main(pdf_path)