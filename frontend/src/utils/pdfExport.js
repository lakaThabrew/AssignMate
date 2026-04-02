import { jsPDF } from "jspdf";
import "jspdf-autotable";

const generatePDF = (data) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFillColor(99, 102, 241); // #6366f1
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text("AssignMate Pro - Evaluation Report", 20, 25);
  
  doc.setTextColor(30, 41, 59); // Slate 800
  doc.setFontSize(12);
  doc.text(`Assignment: ${data.assignmentName}`, 20, 50);
  doc.text(`Score: ${data.scorePredicted}/100`, 20, 57);
  doc.text(`Plagiarism Risk: ${data.plagiarismRisk}`, 20, 64);
  doc.text(`Date: ${new Date(data.createdAt).toLocaleDateString()}`, 20, 71);

  // Rubric Table
  const tableRows = data.rubricBreakdown.map(item => [
    item.criterion,
    `${item.weight}%`,
    item.status.toUpperCase(),
    item.score,
    item.supportingEvidence
  ]);

  doc.autoTable({
    startY: 80,
    head: [['Criterion', 'Weight', 'Status', 'Score', 'Evidence']],
    body: tableRows,
    theme: 'grid',
    headStyles: { fillColor: [99, 102, 241] },
    alternateRowStyles: { fillColor: [248, 250, 252] },
  });

  // Insights
  let currentY = doc.lastAutoTable.finalY + 15;
  
  doc.setFontSize(16);
  doc.text("Key Insights", 20, currentY);
  currentY += 10;

  doc.setFontSize(11);
  doc.text("Strengths:", 20, currentY);
  data.strengths.forEach((s) => {
    currentY += 7;
    doc.text(`\u2022 ${s}`, 25, currentY);
    if (currentY > 270) { doc.addPage(); currentY = 20; }
  });

  currentY += 10;
  doc.text("Suggestions for Improvement:", 20, currentY);
  data.suggestions.forEach((s) => {
    currentY += 7;
    doc.text(`\u2022 ${s}`, 25, currentY);
    if (currentY > 270) { doc.addPage(); currentY = 20; }
  });

  doc.save(`${data.assignmentName.replace(/\s+/g, '_')}_Report.pdf`);
};

export default generatePDF;
