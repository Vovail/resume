import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const downloadFile = (url, filename) => {
  const a = document.createElement('a');
  if (typeof a.download === 'string') {
    a.download = filename;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    window.open(url);
  }
};

export const downloadHTMLElementAsPDF = async (htmlElement, filename) => {
  if (!htmlElement) return;
  const fileName = filename
    ? `${filename}.pdf`
    : `resume-${new Date().toLocaleString('default', { year: 'numeric', month: '2-digit' })}.pdf`;
  const canvas = await html2canvas(htmlElement, { scale: 2, ignoreElements: (e) => e.classList.contains('hide-for-print') });
  const imgData = canvas.toDataURL('image/png');
  const imgWidth = 210;
  const pageHeight = 295;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;

  const pdf = new jsPDF({ unit: 'mm' });
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }
  pdf.save(fileName);
};

export const downloadHTMLElementAsImage = async (htmlElement, filename, type = 'png') => {
  if (!htmlElement) return;
  const fileName = filename
    ? `${filename}.${type}`
    : `resume-${new Date().toLocaleString('default', { year: 'numeric', month: '2-digit' })}.${type}`;  
  const canvas = await html2canvas(htmlElement, { scale: 2, ignoreElements: (e) => e.classList.contains('hide-for-print') });
  const imgData = canvas.toDataURL(`image/${type}`);
  downloadFile(imgData, fileName);
};
