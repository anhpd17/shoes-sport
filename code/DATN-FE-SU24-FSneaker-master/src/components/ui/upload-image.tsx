import { PlusOutlined } from '@ant-design/icons'
import type { GetProp, UploadFile, UploadProps } from 'antd'
import { Upload } from 'antd'
import React, { useState } from 'react'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
    })

export interface UploadImageProps {
    multiple?: boolean
    onChange?: (data: string[] | string | undefined) => void
}

const UploadImage: React.FC<UploadImageProps> = (props) => {
    const { multiple = false, onChange } = props

    const [fileList, setFileList] = useState<UploadFile[]>([])

    const handleChange: UploadProps['onChange'] = async ({ file, fileList: newFileList }) => {
        if (!multiple) {
            const imgBase64 = file.status === 'removed' ? undefined : await getBase64(file as FileType)

            onChange?.(imgBase64)
        } else {
            let imgs: string[] = []
            newFileList.forEach(async (e) => {
                console.log(e)
                const base64 = await getBase64(e?.originFileObj as FileType)
                imgs.push(base64)
            })
            onChange?.(imgs)
        }
        setFileList(newFileList)
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type='button'>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    )

    const showUploadButton = () => {
        if (multiple === true) return true
        return !(fileList.length !== 0)
    }
    return (
        <>
            <Upload
                // maxCount={1}
                accept='image/png, image/jpeg'
                multiple={multiple}
                listType='picture-card'
                fileList={fileList}
                onChange={handleChange}
                showUploadList={{
                    showPreviewIcon: false
                }}
                beforeUpload={() => {
                    return false
                }}
            >
                {showUploadButton() && uploadButton}
            </Upload>
        </>
    )
}

export default UploadImage
