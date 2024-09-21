import { Input as AntdInputNumber, InputProps as AntdInputNumberProps } from 'antd'

export interface InputNumberProps extends AntdInputNumberProps {}

const InputNumber: React.FC<InputNumberProps> = (props) => {
    return (
        <AntdInputNumber
            type='number'
            onKeyDown={(event) => {
                const re = /^[0-9\b]+$/
                if (!re.test(event.key) && event.key !== 'Backspace') {
                    event.preventDefault()
                }
            }}
            {...props}
        />
    )
}

export default InputNumber
