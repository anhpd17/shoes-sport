import { useEffect, useState } from "react";
import BreadCrumb, { IBreadCrumb } from "@/components/breadcrumb";
import instance from "@/core/api";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Rate } from "antd";
import { Modal } from 'antd'

const OrderDetail = () => {
    const { id: orderID } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [detailOrder, setDetailOrder] = useState(null);
    const getUserID = () => {
        const storedUser = localStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : {};
        const userID = user?._id || "";
        return userID;
    };
    const [cancelObj, setCancelObj] = useState(null);
    const [reviewObj, setReviewObj] = useState({
        userId: getUserID(),
        orderId: "", //id của oder
        reviews: [],
    });
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleOk = async () => {
        let { orderID, paymentMethod } = cancelObj;
        setIsModalOpen(false);
        try {
            await instance.patch(`api/order/update-order/${orderID}`, {
                orderStatus: 'cancel'
            })
            toast.success('Hủy đơn hàng thành công')
            fetchData()
        } catch (error) {
            toast.error(`Không thể hủy đơn hàng do trạng thái của đơn hàng này đã được thay đổi`)
        }
        fetchData()
    }
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };
    const formatMoney = (money: number) => {
        return money?.toLocaleString() || 0;
    };

    const fetchData = async () => {
        try {
            const response = await instance.get(`api/order/orders/${orderID}`);
            setDetailOrder(response.data.data);
        } catch (error) {
            console.log(error);
            toast.error("Lỗi không lấy được dữ liệu đơn hàng");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const cancelOrder = async () => {
        event?.stopPropagation();
        setIsModalOpen(true)

    };
    let ratingStarObj = [];

    const onSelectOrderToReview = () => {
        event?.stopPropagation();
        setReviewObj({
            userId: getUserID(),
            orderId: detailOrder?._id,
            reviews: detailOrder?.productDetails
                ?.filter((x) => !x.isRated)
                .map((x: any) => {
                    return {
                        productId: x.productId,
                        content: "",
                        rating: 0
                    };
                })
        });
        ratingStarObj = detailOrder.productDetails?.map((x: any) => 0);
        console.log(reviewObj);
        setShowReviewForm(true);
    };

    const convertToVN = (statusName: string) => {
        const enumStatusPaid = {
            unpaid: "Chưa thanh toán",
            paid: "Đã thanh toán",
        }
        return enumStatusPaid[statusName] || "Chưa xác định";
    }

    const submitReview = async () => {
        console.log(reviewObj);
        let objReviewSubmit = {
            ...reviewObj,
            reviews: reviewObj?.reviews
                ?.filter((x: any) => x.content)
                .map((x: any) => {
                    return {
                        productId: x.productId,
                        content: x.content,
                        rating: x.rating
                    };
                }),
        };
        if (!objReviewSubmit.reviews.length) {
            toast.error("Bạn chưa đánh giá sản phẩm nào");
            return;
        }
        try {
            await instance.post("api/review/reviews", objReviewSubmit);
            toast.error("Bạn đã đánh giá thành công");
            setShowReviewForm(false);
            fetchData();
        } catch (error) {
            console.log(error);
            toast.error("Có lỗi xảy ra");
        }
    };
    const breadcrumb: IBreadCrumb[] = [
        {
            title: "Lịch sử đơn hàng",
            link: "/orders",
        },
        {
            title: detailOrder?.codeOrders || detailOrder?._id
        },
    ];

    return (
        <div>
            <BreadCrumb links={breadcrumb} />
            {/* Form Danh gia */}
            {showReviewForm ? (
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        aria-hidden="true"
                    ></div>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div
                                            className="mt-3 text-center sm:mt-0 sm:text-left"
                                            style={{ width: "100%" }}
                                        >
                                            {/* TITLE */}
                                            <h3
                                                className="text-base font-semibold leading-6 text-gray-900 text-[24px]"
                                                id="modal-title"
                                            >
                                                Đánh giá đơn hàng của bạn
                                            </h3>
                                            {/* CONTENT POPUP */}
                                            <div className="box-product h-[400px]" style={{ overflowY: "auto" }}>
                                                {detailOrder?.productDetails?.map((product, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="my-2 border border-1 p-2 rounded border-gray"
                                                        >
                                                            <h4 className="font-bold">{product.productName}</h4>
                                                            <Rate
                                                                className="my-2"
                                                                value={ratingStarObj[index]}
                                                                onChange={(newValue: number) => {
                                                                    ratingStarObj[index] = newValue;
                                                                    reviewObj.reviews[index].rating = newValue;
                                                                }}
                                                            />
                                                            <textarea
                                                                style={{
                                                                    width: "100%"
                                                                }}
                                                                className="border border-1 p-2 w-100 mt-1"
                                                                placeholder="Bình luận của bạn"
                                                                onChange={(e) => {
                                                                    reviewObj.reviews[index].content = e.target.value
                                                                }}
                                                            ></textarea>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Footer */}
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        onClick={() => submitReview()}
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                    >
                                        Đồng ý
                                    </button>
                                    <button
                                        onClick={() => setShowReviewForm(false)}
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    >
                                        Hủy bỏ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
            {/* Chi tiet don hang */}
            <div className="max-w-screen-xl m-auto text-[20px] ">
                <div className="cart my-5 mx-0">
                    <div className="cart__content ">
                        <div className="cart__content--title py-4 flex justify-between">
                            <h3 className="content--title text-[28px] font-bold">
                                Chi tiết đơn hàng - Mã đơn hàng/ID: {detailOrder?.codeOrders || detailOrder?._id}
                            </h3>
                        </div>
                        <div className="receive-info mb-5 flex items-center gap-x-[120px]">
                            {/* Người nhận */}
                            <div>
                                <h3 className="font-bold text-red-700">Thông tin người nhận</h3>
                                <div className="receive-info__content--info flex flex-col gap-y-[12px] mt-5">
                                    <p className="text-[16px]">
                                        <span className="font-bold">Họ và tên: </span>
                                        {detailOrder?.name}
                                    </p>
                                    <p className="text-[16px]">
                                        <span className="font-bold">Số điện thoại: </span>
                                        {detailOrder?.phone && `0${detailOrder.phone}`}
                                    </p>
                                    <p className="text-[16px]">
                                        <span className="font-bold">Địa chỉ: </span>
                                        {detailOrder?.address}
                                    </p>
                                    <p className="text-[16px]">
                                        <span className="font-bold">Email: </span>
                                        {detailOrder?.user_id?.email}
                                    </p>
                                </div>
                            </div>
                            {/* Tình trạng đơn hàng */}
                            <div>
                                <h3 className="font-bold text-red-700">Tình trạng đơn hàng</h3>
                                <div className="receive-info__content--info flex flex-col gap-y-[12px] mt-5">
                                    <p className="text-[16px]">
                                        <span className="font-bold">
                                            Trạng thái:{" "}
                                            {(() => {
                                                switch (detailOrder?.orderStatus) {
                                                    case 'pending':
                                                        return 'Chờ xác nhận'
                                                    case 'waiting':
                                                        return 'Đã xác nhận'
                                                    case 'cancel':
                                                        return 'Hủy bỏ'
                                                    case 'delivering':
                                                        return 'Đang giao hàng'
                                                    case 'done':
                                                        return 'Giao hàng thành công'
                                                    case 'fail':
                                                        return 'Giao hàng thất bại'
                                                    default:
                                                        return detailOrder?.orderStatus
                                                }
                                            })()}
                                        </span>
                                    </p>
                                    <p className="text-[16px]">
                                        <span className="font-bold">Phương thức thanh toán: </span>
                                        {detailOrder?.paymentMethod}
                                    </p>
                                    <p className="text-[16px]">
                                        <span className="font-bold">Đã thanh toán: </span>
                                        {convertToVN(detailOrder?.paymentStatus)}
                                    </p>
                                    <p className="text-[16px]">
                                        <span className="font-bold">Ngày đặt đơn: </span>
                                        {formatDate(detailOrder?.createdAt)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="cart__content--oder rounded">
                            <h3 className="font-bold text-red-700 mb-5">Danh sách sản phẩm</h3>

                            <div
                                className="order-box border border-2 rounded mb-5 border-slate-300"
                                key={detailOrder?._id}
                            >
                                {detailOrder?.productDetails.map((product, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="order-box__info flex items-center justify-between px-[16px]"
                                        >
                                            <div className="order-detail-info flex items-center mt-2">
                                                <img src={product.image} alt="" className="h-[86px] w-[86px] " />
                                                <div className="order-detail-info__content ml-5">
                                                    <Link
                                                        to={`/products/${product.productId}`}
                                                        className="text-[16px] custom-focus"
                                                    >
                                                        <h3 className="font-bold text-[18px]">{product.productName}</h3>
                                                    </Link>
                                                    <p className="text-[16px]">Phân loại hàng: {product.sizeName}</p>
                                                    <p className="text-[18px]">x{product.quantityOrders}</p>
                                                </div>
                                            </div>
                                            <div className="order-detail-price flex items-center gap-x-[12px]">
                                                <span className="line-through text-[14px]">
                                                    {formatMoney(product.price)}₫
                                                </span>
                                                <h4 className="text-red-500">
                                                    {formatMoney(product.promotionalPrice)}₫
                                                </h4>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className="flex items-center justify-between pl-[16px] mt-3">
                                    <h4 className="text-[14px] italic"></h4>
                                    <h3 className="text-right pr-[16px] text-[18px] mb-1">
                                        Thành tiền:{" "}
                                        <span className="text-red-500">
                                            {formatMoney(detailOrder?.total_price || 0)}₫
                                        </span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="order-box__tool--btn flex gap-x-[12px] items-center justify-center flex-col gap-y-4 mb-4">
                {(() => {
                    if (["pending"].includes(detailOrder?.orderStatus)) {
                        return (
                            <button
                                onClick={() => {
                                    setCancelObj({
                                        orderID: detailOrder._id,
                                        paymentMethod: detailOrder.paymentMethod
                                    })
                                    cancelOrder()
                                }}
                                className="h-[36px] border border-red-500 text-red-500 bg-white outline-none hover:bg-red-500 hover:text-white transition-all rounded-md w-[320px] text-[16px]"
                            >
                                Hủy đơn hàng
                            </button>
                        )
                    }
                })()}
                {(() => {
                    if (detailOrder?.orderStatus == "done" && !detailOrder?.isRated) {
                        return (
                            <button
                                onClick={() => onSelectOrderToReview()}
                                className="text-[16px] h-[36px] border border-red-500 text-white bg-red-500 outline-none hover:opacity-90 transition-all rounded-md w-[320px]"
                            >
                                Đánh giá
                            </button>
                        )
                    } else if (detailOrder?.isRated && detailOrder?.orderStatus == "done") {
                        return <div className="text-[14px] text-red-500">Đơn hàng đã được đánh giá</div>
                    }
                })()}
            </div>
            {/* Model Confirm Hủy đơn hàng */}
            <Modal title="Thông báo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Khi đồng ý hủy đơn hàng bạn sẽ không được hoàn tiền của đơn hàng đã đặt. Bạn có chắc chắn muốn hủy không?</p>
            </Modal>
        </div>
    );
};

export default OrderDetail;