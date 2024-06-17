import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface DomToPdfOptions {
  orientation?: 'portrait' | 'landscape'
  unit?: 'pt' | 'mm' | 'cm' | 'in'
  format?: 'a3' | 'a4' | 'a5' | 'letter' | 'legal'
  quality?: number
}

function dom2pdf(
  dom: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>,
  fileName: string,
  options?: DomToPdfOptions
): Promise<void>
function dom2pdf(dom: string, fileName: string, options?: DomToPdfOptions): Promise<void>
function dom2pdf(dom: HTMLElement, fileName: string, options?: DomToPdfOptions): Promise<void>
function dom2pdf(
  dom: HTMLElement[] | NodeListOf<HTMLElement>,
  fileName: string,
  options?: DomToPdfOptions
): Promise<void>

async function dom2pdf(
  dom: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>,
  fileName: string,
  options: DomToPdfOptions = {}
): Promise<void> {
  const { orientation = 'portrait', unit = 'pt', format = 'a4', quality = 3 } = options

  const pdf = new jsPDF(orientation, unit, format)
  const elements: HTMLElement[] =
    typeof dom === 'string'
      ? [document.querySelector(dom)!]
      : 'length' in dom
      ? Array.from(dom)
      : [dom]

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i]
    const canvas = await html2canvas(element, { scale: quality, allowTaint: true })
    const imgData = canvas.toDataURL('image/jpeg', quality)
    const imgProps = pdf.getImageProperties(imgData)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight)

    if (i < elements.length - 1) {
      pdf.addPage()
    }
  }

  pdf.save(`${fileName}.pdf`)
}

export default dom2pdf
