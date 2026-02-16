import jsPDF from "jspdf";

interface Port {
  name: string;
  city?: string | null;
  country?: string | null;
  latitude: number | null;
  longitude: number | null;
}

interface ItineraryStop {
  dayNumber: number;
  arrivalTime: string | null;
  departureTime: string | null;
  port: Port;
}

interface Ship {
  name: string;
  passengerCapacity: number;
  yearBuilt: number;
  tonnage: number;
}

interface Company {
  name: string;
}

interface Itinerary {
  name: string;
  duration: number;
  startDate: string;
  endDate: string;
  description: string | null;
}

interface ExportData {
  ship: Ship;
  company: Company;
  itinerary: Itinerary;
  stops: ItineraryStop[];
}

export async function exportItineraryToPDF(data: ExportData) {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Colors
  const primaryColor: [number, number, number] = [99, 102, 241]; // #6366f1
  const darkColor: [number, number, number] = [15, 23, 42]; // #0f172a
  const grayColor: [number, number, number] = [100, 116, 139]; // #64748b

  // Header with logo and title
  pdf.setFillColor(...primaryColor);
  pdf.rect(0, 0, pageWidth, 40, "F");
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont("helvetica", "bold");
  pdf.text("Dockly", margin, 20);
  
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.text("Seu guia completo de cruzeiros", margin, 28);

  yPosition = 50;

  // Ship Information
  pdf.setTextColor(...darkColor);
  pdf.setFontSize(18);
  pdf.setFont("helvetica", "bold");
  pdf.text(data.ship.name, margin, yPosition);
  yPosition += 8;

  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(...grayColor);
  pdf.text(data.company.name, margin, yPosition);
  yPosition += 10;

  // Ship Details Box
  pdf.setDrawColor(...primaryColor);
  pdf.setLineWidth(0.5);
  pdf.rect(margin, yPosition, pageWidth - 2 * margin, 25);
  
  pdf.setFontSize(10);
  pdf.setTextColor(...darkColor);
  const detailsY = yPosition + 8;
  pdf.text(`Capacidade: ${data.ship.passengerCapacity.toLocaleString()} passageiros`, margin + 5, detailsY);
  pdf.text(`Ano: ${data.ship.yearBuilt}`, margin + 5, detailsY + 6);
  pdf.text(`Tonelagem: ${data.ship.tonnage.toLocaleString()} GT`, margin + 5, detailsY + 12);
  
  yPosition += 35;

  // Itinerary Title
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(...primaryColor);
  pdf.text(data.itinerary.name, margin, yPosition);
  yPosition += 8;

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(...grayColor);
  const startDate = new Date(data.itinerary.startDate).toLocaleDateString("pt-BR");
  const endDate = new Date(data.itinerary.endDate).toLocaleDateString("pt-BR");
  pdf.text(`${startDate} - ${endDate} (${data.itinerary.duration} noites)`, margin, yPosition);
  yPosition += 10;

  if (data.itinerary.description) {
    pdf.setFontSize(9);
    pdf.setTextColor(...grayColor);
    const descLines = pdf.splitTextToSize(data.itinerary.description, pageWidth - 2 * margin);
    pdf.text(descLines, margin, yPosition);
    yPosition += descLines.length * 5 + 5;
  }

  // Itinerary Stops Table
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(...darkColor);
  pdf.text("Itinerário Detalhado", margin, yPosition);
  yPosition += 8;

  // Table Header
  pdf.setFillColor(240, 240, 245);
  pdf.rect(margin, yPosition, pageWidth - 2 * margin, 8, "F");
  
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(...darkColor);
  pdf.text("Dia", margin + 3, yPosition + 5.5);
  pdf.text("Porto", margin + 15, yPosition + 5.5);
  pdf.text("Chegada", margin + 90, yPosition + 5.5);
  pdf.text("Partida", margin + 120, yPosition + 5.5);
  
  yPosition += 10;

  // Table Rows
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);

  for (const stop of data.stops) {
    // Check if we need a new page
    if (yPosition > pageHeight - 30) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setTextColor(...darkColor);
    pdf.text(String(stop.dayNumber), margin + 3, yPosition + 4);
    
    const portName = stop.port.name;
    const portLocation = stop.port.city && stop.port.country 
      ? `${stop.port.city}, ${stop.port.country}`
      : "";
    
    pdf.text(portName, margin + 15, yPosition + 4);
    if (portLocation) {
      pdf.setTextColor(...grayColor);
      pdf.setFontSize(8);
      pdf.text(portLocation, margin + 15, yPosition + 8);
      pdf.setFontSize(9);
    }
    
    pdf.setTextColor(...darkColor);
    pdf.text(stop.arrivalTime || "-", margin + 90, yPosition + 4);
    pdf.text(stop.departureTime || "-", margin + 120, yPosition + 4);
    
    // Separator line
    pdf.setDrawColor(220, 220, 230);
    pdf.setLineWidth(0.1);
    pdf.line(margin, yPosition + 10, pageWidth - margin, yPosition + 10);
    
    yPosition += portLocation ? 12 : 10;
  }

  // Footer
  const footerY = pageHeight - 15;
  pdf.setFontSize(8);
  pdf.setTextColor(...grayColor);
  pdf.text("Gerado por Dockly - Seu guia completo de cruzeiros", margin, footerY);
  pdf.text(new Date().toLocaleDateString("pt-BR"), pageWidth - margin - 20, footerY);

  // Save PDF
  const fileName = `${data.ship.name.replace(/\s+/g, "_")}_${data.itinerary.name.replace(/\s+/g, "_")}.pdf`;
  pdf.save(fileName);
}
