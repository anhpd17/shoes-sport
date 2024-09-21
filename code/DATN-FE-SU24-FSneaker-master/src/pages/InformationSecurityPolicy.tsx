import BreadCrumb from '@/components/breadcrumb'
import { Typography } from 'antd'

const { Paragraph, Title } = Typography

const InformationSecurityPolicy = () => {
    const breadcrumbLinks = [{ title: 'Chính Sách Bảo Mật Thông Tin' }]
    return (
        <div className="pb-10">

        <BreadCrumb links={breadcrumbLinks} />
        <div className='app-container mt-3'>
            
            <Title level={4}>Chính Sách Bảo Mật Thông Tin</Title>
            <Paragraph strong>CHÍNH SÁCH BẢO MẬT</Paragraph>
            <Paragraph strong>a. Mục đích thu thập thông tin cá nhân</Paragraph>

            <Paragraph>
                <p>Việc thu thập dữ liệu trên website bao gồm:</p>
                <ul>
                    <li>Họ tên</li>
                    <li>Email</li>
                    <li>Số điện thoại</li>
                    <li>Địa chỉ</li>
                </ul>
                <p>
                    Mục đích: để chúng tôi liên hệ xác nhận khi khách hàng đăng ký mua hàng trên website nhằm đảm bảo
                    quyền lợi cho cho khách hàng.
                </p>
                <p>
                    Khách hàng sẽ tự chịu trách nhiệm về bảo mật và lưu giữ mọi hoạt động sử dụng dịch vụ dưới tên đăng
                    ký, mật khẩu và email của mình. Ngoài ra, khách hàng có trách nhiệm thông báo kịp thời cho FNEAKER
                    SPORT về những hành vi sử dụng trái phép, lạm dụng, vi phạm bảo mật thông tin của bên thứ ba để có
                    biện pháp giải quyết phù hợp.
                </p>
            </Paragraph>

            <Paragraph strong>b. Phạm vi sử dụng thông tin</Paragraph>
            <Paragraph>
                <p>
                    Thông tin cá nhân thu thập được sẽ chỉ được sử dụng trong nội bộ Cửa hàng. Chúng tôi có thể chia sẻ
                    tên và địa chỉ của quý khách cho dịch vụ chuyển phát nhanh hoặc nhà cung cấp của chúng tôi để có thể
                    giao hàng cho quý khách.
                </p>
                <p>FNEAKER SPORT sử dụng thông tin khách hàng cung cấp để:</p>
                <ul>
                    <li>Cung cấp các dịch vụ liên quan đến khách hàng. </li>
                    <li>Gửi các thông báo về các hoạt động trao đổi thông tin giữa khách hàng và FNEAKER SPORT.</li>
                    <li>
                        Ngăn ngừa các hoạt động phá hoại tài khoản người dùng của khách hàng hoặc các hoạt động giả mạo
                        khách hàng.
                    </li>
                    <li>Liên lạc và giải quyết với khách hàng trong những trường hợp đặc biệt.</li>
                    <li>
                        Trong trường hợp có yêu cầu của pháp luật có thẩm quyền thì FNEAKER SPORT có trách nhiệm hợp tác
                        cung cấp thông tin cá nhân khách hàng bao gồm: Viện kiểm sát, tòa án, cơ quan công an điều tra
                        liên quan đến hành vi vi phạm pháp luật nào đó của khách hàng. Ngoài ra, không ai có quyền xâm
                        phạm vào thông tin cá nhân của khách hàng.
                    </li>
                </ul>
            </Paragraph>

            <Paragraph strong>c. Thời gian lưu trữ thông tin</Paragraph>
            <Paragraph>
                <p>
                    FNEAKER SPORT sẽ lưu trữ các thông tin cá nhân do khách hàng cung cấp trên hệ thống nội bộ của chúng
                    tôi trong quá trình cung cấp dịch vụ cho khách hàng hoặc cho đến khi hoàn thành mục đích thu thập
                    thông tin hoặc khi khách hàng có yêu cầu hủy các thông tin đã cung cấp.
                </p>
            </Paragraph>

            <Paragraph strong>d. Những người hoặc tổ chức có thể được tiếp cận với thông tin đó</Paragraph>
            <Paragraph>
                <p>
                    Đối tượng được tiếp cận với thông tin cá nhân của khách hàng thuộc một trong những trường hợp sau:
                </p>

                <ul>
                    <li>Ban quản trị website</li>
                    <li>Khách hàng sở hữu thông tin cá nhân đó</li>
                    <li>Các cơ quan Pháp luật Việt Nam có thẩm quyền (khi được yêu cầu)</li>
                    <li>
                        Các đối tác có ký hợp động với FNEAKER SPORT để thực hiện một phần dịch vụ. Các đối tác này sẽ
                        nhận được những thông tin theo thỏa thuận hợp đồng (có thể một phần hoặc toàn bộ thông tin tùy
                        theo điều khoản hợp đồng) để tiến hành hỗ trợ người dùng sử dụng dịch vụ do cửa hàng cung cấp.
                    </li>
                </ul>
            </Paragraph>

            <Paragraph strong>e. Địa chỉ của đơn vị thu thập và quản lý thông tin</Paragraph>
            <Paragraph>
                <p>Cửa hàng FNEAKER SPORT:</p>

                <ul>
                    <li>Địa chỉ: Số 1, Trịnh Văn Bô, Phương Canh, Nam Từ Liêm, Hà Nội</li>
                    <li>Điện thoại: (+84) 377 485 926</li>
                    <li>Email: fneakershop@gmail.com</li>
                </ul>
            </Paragraph>

            <Paragraph strong>
                f. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân của mình
            </Paragraph>
            <Paragraph>
                <p>
                    FNEAKER SPORT hiểu rằng quyền lợi của khách hàng trong việc bảo vệ thông tin cá nhân cũng chính là
                    trách nhiệm của chúng tôi nên trong bất kỳ trường hợp có thắc mắc, góp ý nào liên quan đến chính
                    sách bảo mật của website FNEAKER SPORT và liên quan đến việc thông tin cá nhân bị sử dụng sai mục
                    đích hoặc phạm vi đã thông báo, vui lòng liên hệ qua số hotline: (+84) 377 485 926 hoặc email:
                    fneakershop@gmail.com
                </p>
            </Paragraph>
            </div>
        </div>
    )
}

export default InformationSecurityPolicy
