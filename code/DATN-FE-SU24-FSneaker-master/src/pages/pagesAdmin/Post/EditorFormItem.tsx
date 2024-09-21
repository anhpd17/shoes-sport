import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

const EditorFormItem = ({ value, onChange }: any) => {
    const onContentChange = (content: string) => {
        if (content === '<p><br></p>') {
            onChange('')
        } else {
            onChange(content)
        }
    }

    return <SunEditor setContents={value} onChange={onContentChange} placeholder='Nội dung bài viết' height='300' />
}

export default EditorFormItem
