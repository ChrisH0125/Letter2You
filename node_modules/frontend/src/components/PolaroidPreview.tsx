export default function PolaroidPreview({ text }: { text: string }) {
  return (
    <div className="bg-white p-4 shadow-md w-48"> 
      <div className="text-sm">{text}</div>
    </div>
  )
}
