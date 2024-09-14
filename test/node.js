const PDFDocument = require('pdfkit');
const fs = require('fs');

// Function to save PDF from string
function savePdfFromString(text, outputPath) {
  // Create a new PDF document
  const doc = new PDFDocument();

  // Pipe the document to a write stream to save the file
  doc.pipe(fs.createWriteStream(outputPath));

  // Add text to the PDF
  doc.fontSize(12).text(text, 100, 100);

  // Finalize the document and end the stream
  doc.end();

  console.log(`PDF saved to ${outputPath}`);
}

// Example usage
const myText = 'This is a sample PDF generated from a string in Node.js!';
savePdfFromString(myText, 'output.pdf');
