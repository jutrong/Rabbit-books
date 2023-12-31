import { useState, useEffect, useCallback } from 'react';
import { SERVER_URL, deleteFetch, getFetch } from '../../../utils';

const MypageOrder = () => {
    const [items, setItems] = useState([]);
    const getMyOrders = useCallback(async () => {
        const json = await getFetch(`${SERVER_URL}/api/orders`);
        console.log(json);
        setItems(json?.userOrder);
    }, []);
    const cancelData = async (itemId) => {
        const json = await deleteFetch(`${SERVER_URL}/api/orders/${itemId}`);
        if (json?.orderId) {
            setItems((prev) =>
                prev.filter((item) => item._id !== json.orderId),
            );
        } else {
            alert('주문 취소가 실패했습니다');
        }
    };

    useEffect(() => {
        getMyOrders();
    }, [getMyOrders]);

    return (
        <div className="main_container_wrap">
            <strong>주문배송조회</strong>
            <div className="search con_wrap tracking">
                <div className="search_container">
                    <div className="search_box">
                        <div className="table_box">
                            <table className="type1 txt_left1">
                                <colgroup>
                                    <col width="*" />
                                    <col width="280px" />
                                    <col width="280px" />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>상품 정보</th>
                                        <th>배송 정보</th>
                                        <th>고객 센터</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items &&
                                        items.length > 0 &&
                                        items.map((item) => (
                                            <OrderBook
                                                item={item}
                                                key={item._id}
                                                cancelData={cancelData}
                                            />
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const OrderBook = ({ item, cancelData }) => {
    const cancel = () => {
        cancelData(item._id);
    };
    return (
        <>
            {item.products.map((product) => (
                <tr className="orderBooks" key={product._id}>
                    <td>
                        <div className="book_info_box">
                            <img
                                src={SERVER_URL + product.imgPath}
                                alt="책 이미지"
                            />
                            <div className="book_info">
                                <ul className="book_tag_list">
                                    {/* <li>
                            <span className="green">
                                주문 일자 -
                                2023.03.03
                            </span>
                        </li> */}
                                    <li>
                                        <span className="sky">
                                            주문 번호 - {product._id}
                                        </span>
                                    </li>
                                </ul>
                                <strong className="book_info_title">
                                    {product.name}
                                </strong>
                                <p className="author">
                                    {product.author} &#183;{' '}
                                    {product.categoryName}
                                </p>
                                <div className="pay">
                                    <strong>
                                        {product.price.toLocaleString()}
                                    </strong>
                                    원 / 수량&nbsp;&nbsp;
                                    <b>{product.quantity}</b>개
                                </div>

                                <p className="order_title">구매자 정보</p>
                                <ul className="order_list">
                                    <li>
                                        주문자 &#183;&nbsp;
                                        <b>박유나</b>
                                    </li>
                                    <li>
                                        휴대폰 &#183;&nbsp;
                                        <b>
                                            {item.phone
                                                .replace(
                                                    /^(\d{0,3})(\d{0,4})(\d{0,4})$/g,
                                                    '$1-$2-$3',
                                                )
                                                .replace(/\-{1,2}$/g, '')}
                                        </b>
                                    </li>
                                    <li>
                                        배송지 &#183;&nbsp;
                                        <b>{item.address}</b>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </td>
                    <td>
                        <button className="white_btn w_120" onClick={cancel}>
                            주문취소
                        </button>
                    </td>
                    <td>
                        <button className="black_btn w_156">반품접수</button>
                        <button className="blue_btn w_156 martop_10">
                            1:1문의
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
};
export default MypageOrder;
