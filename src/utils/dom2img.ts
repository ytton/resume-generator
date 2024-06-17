import html2canvas from 'html2canvas'

interface DomToImageOptions {
  type?: 'png' | 'jpeg' | 'webp'
  quality?: number
}

function dom2img(
  dom: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>,
  fileName: string,
  options: DomToImageOptions = {}
): Promise<void> {
  const { type = 'png', quality = 3 } = options

  const elements: HTMLElement[] =
    typeof dom === 'string'
      ? [document.querySelector(dom)!]
      : 'length' in dom
      ? Array.from(dom)
      : [dom]

  return Promise.all(
    elements.map(async (element) => {
      const scrollHeight = element.scrollHeight
      const scrollWidth = element.scrollWidth

      const canvas = await html2canvas(element, {
        scale: quality,
        width: scrollWidth,
        height: scrollHeight
      })
      const imgData = canvas.toDataURL(`image/${type}`, quality)

      const link = document.createElement('a')
      link.download = `${fileName}.${type}`
      link.href = imgData
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
  ).then(() => {
    console.log('Image(s) downloaded successfully')
  })
}

export default dom2img
