import { jsPDF } from 'jspdf';

export const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Hello world!', 10, 10);
    doc.save('a4.pdf');
}

