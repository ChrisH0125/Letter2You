export default function LetterForm() {
  // We'll probably need to return whatever's typed into the text area, because that's going to be the letter
  return (
      <form className="p-2 w-150 h-100 border rounded bg-[#2B1917]">
        <textarea className="border p-7 w-full h-full resize-none" 
        placeholder = "Write something sentimental :)"/>
      </form>
  )
}
