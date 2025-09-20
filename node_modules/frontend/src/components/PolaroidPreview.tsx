import littleGuy from '../assets/littleGuy.png'
// placeholder image, remove when we figure out how to pass images
export default function PolaroidPreview(){
  return (
    <div className="bg-white w-30 h-35 p-2 flex flex-col items-center relative"> 
      {/* six seven */}
      <div className = "bg-black w-6/7 h-6/7 flex items-center justify-center">
        {/* Bottom line is a placeholder for the image variable that'll be passed in*/}
        <img src = {littleGuy} alt = "Attached image" className="pr-[1px] pl-[1px] pt-[1px] pb-[0px]  object-scale-down"/> 
      </div>
      {/* Replace the bottom placeholder text with the image description variable that will be passed in */}
      <p className = "absolute text-[#2B1917] bottom-2 text-center text-xs">Image description </p>
    </div>
  )
}
