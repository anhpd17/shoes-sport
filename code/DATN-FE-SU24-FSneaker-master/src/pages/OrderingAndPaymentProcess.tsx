import BreadCrumb from '@/components/breadcrumb'
import { Typography } from 'antd'

const { Paragraph, Title } = Typography

const OrderingAndPaymentProcess = () => {
     const breadcrumbLinks = [{ title: 'Quy trình đặt hàng và thanh toán' }]
    return (
        <div className='pb-10'>
            <BreadCrumb links={breadcrumbLinks} />
            <div className='app-container mt-3'>
                <Title level={4}>Quy trình đặt hàng và thanh toán</Title>
                <Paragraph>Quy trình đặt hàng và thanh toán:</Paragraph>

                <Paragraph strong>Cách 1: Thanh toán sau (COD – giao hàng và thu tiền tận nơi):</Paragraph>
                <Paragraph>
                    <strong>Bước 1:</strong> Người mua tìm hiểu thông tin về sản phẩm, dịch vụ được đăng tin;
                    <br />
                    <strong>Bước 2:</strong> Người mua xác thực đơn hàng (điện thoại, tin nhắn, email);
                    <br />
                    <strong>Bước 3:</strong> FSNEAKER SPORT xác nhận thông tin Người mua;
                    <br />
                    <strong>Bước 4:</strong> FSNEAKER SPORT chuyển hàng;
                    <br />
                    <strong>Bước 5:</strong> Người mua nhận hàng và thanh toán.
                    <br />
                    Với hình thức thanh toán khi nhận hàng, bạn sẽ chỉ thanh toán khi đơn hàng đến tay của bạn và bạn
                    chỉ cần trả đúng số tiền in trên hóa đơn. Nếu bạn thấy giá trị trên hóa đơn không chính xác, bạn vui
                    lòng liên hệ lại ngay cho chúng tôi qua số hotline: (+84) {``}
                </Paragraph>

                <Paragraph strong>Cách 2: Thanh toán online qua thẻ tín dụng, chuyển khoản:</Paragraph>
                <Paragraph>
                    <strong>Bước 1:</strong> Người mua tìm hiểu thông tin về sản phẩm, dịch vụ được đăng tin;
                    <br />
                    <strong>Bước 2:</strong> Người mua xác thực đơn hàng (điện thoại, tin nhắn, email);
                    <br />
                    <strong>Bước 3:</strong> Người bán xác nhận thông tin Người mua;
                    <br />
                    <strong>Bước 4:</strong> Ngưởi mua thanh toán qua số tài khoản do FSNEAKER SPORT cung cấp;
                    <br />
                    <strong>Bước 5:</strong> FSNEAKER SPORT chuyển hàng;
                    <br />
                    <strong>Bước 6:</strong> Người mua nhận hàng.
                    <br />
                    Đối với hình thức này, sau khi bạn đã tạo đơn hàng thành công ở trên website bạn vui lòng chuyển
                    khoản tổng giá trị đơn hàng qua tài khoản sau đây:
                    <br />
                    Tên chủ tài khoản: {``}
                    <br />
                    Số tài khoản: {``}
                    <br />
                    Ngân hàng: {``}
                    <br />
                    <strong>Lưu ý:</strong> Khi bạn chuyển khoản, vui lòng nhập mã đơn hàng của bạn tại mục “Ghi chú”.
                    <br />
                    Sau khi bạn đã thanh toán và chuyển khoản xong, chúng tôi sẽ giao hàng đến cho bạn theo thời gian
                    quy định tại “Chính Sách Giao Hàng” của chúng tôi.
                </Paragraph>
            </div>
        </div>
    )
}

export default OrderingAndPaymentProcess
