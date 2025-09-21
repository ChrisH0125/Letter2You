export default function LetterForm() {
  // We'll probably need to return whatever's typed into the text area, because that's going to be the letter
  return (
      <form className="p-4 w-[26vw] h-[40vh] border rounded bg-[#2B1917]">
        <textarea className="border-2 border-dotted border-gray-400 p-4 w-full h-full resize-none bg-transparent text-white placeholder-gray-300" 
        placeholder = "Write something sentimental :)"/>
      </form>
  )
}
