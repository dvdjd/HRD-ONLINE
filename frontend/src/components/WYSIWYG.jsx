import { useState, useRef, useMemo } from "react"
import JoditEditor from "jodit-react"
import HTMLReactParser from "html-react-parser"
const WYSIWYG = () => {
    const editor = useRef(null)
    const [content, setContent] = useState('')
  return (
    <>
        <JoditEditor ref={editor} value={content} onChange={newContent => setContent(newContent)}/>
    </>
  )
}

export default WYSIWYG 