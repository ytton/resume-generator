import PdfViewer from '@/components/pdfViwer'

function index() {
  return (
    <div className="h-[100vh]">
      <PdfViewer>
        <div className="w-full bg-red-300 ">
          {Array.from({ length: 30 }, (_, ind) => (
            <div>box1-line{ind + 1}</div>
          ))}
        </div>
        <div className="w-full bg-red-400 ">
          {Array.from({ length: 200 }, (_, ind) => (
            <div>box2-line{ind + 1}</div>
          ))}
        </div>
        <div className="w-full bg-red-500 ">
          {Array.from({ length: 30 }, (_, ind) => (
            <div>box3-line{ind + 1}</div>
          ))}
        </div>
        <div className="w-full bg-green-300 ">
          {Array.from({ length: 50 }, (_, ind) => (
            <div>box4-line{ind + 1}</div>
          ))}
        </div>
        <div className="w-full bg-green-400 ">
          {Array.from({ length: 50 }, (_, ind) => (
            <div>box5-line{ind + 1}</div>
          ))}
        </div>
        <div className="w-full bg-green-500 ">
          {Array.from({ length: 50 }, (_, ind) => (
            <div>box6-line{ind + 1}</div>
          ))}
        </div>
        <div className="bg-blue-300 h-[80vh] w-full">box8</div>
        <div className="bg-green-400 h-[90vh] w-full">box9</div>
        <div className="bg-green-500 h-[100vh] w-full">box10</div>
        <div className="bg-green-600 h-[200vh] w-full">box11</div>
      </PdfViewer>
    </div>
  )
}

export default index
