import React, { useEffect } from 'react';
import './BuyButton.scss';
import { useHotelContext } from '../Context/HotelContext';
import { useHotelCart } from './../../../cart/utils/useCart';
import Swal from 'sweetalert2';
function BuyButton() {
  const { addItem } = useHotelCart();
  const {
    roomCounts,
    hotelRoomPrice,
    hotelListData,
    pickDate,
    allStar,
    roomsChooseName,
  } = useHotelContext();
  const items = {
    id: hotelListData.sid,
    name: hotelListData.product_name,
    price: hotelRoomPrice,
    checkin: pickDate.startTime,
    checkout: pickDate.endTime,
    quantity: roomCounts,
    rate: allStar,
    type: roomsChooseName,
  };
  return (
    <>
      <div className="BookingBarPriceAndButton">
        <button
          className="BottomBar_Buy_Right "
          style={{ backgroundColor: '#63D2FF' }}
          onClick={() => {
            Swal.fire({
              icon: 'success',
              title: '已加入購物車！',
            });
            addItem(items);
            // console.log(roomsChooseName);
            // console.log(allStar);
          }}
        >
          加入購物車
        </button>
      </div>
      <div className="noMarginRight BookingBarPriceAndButton">
        <button
          className="BottomBar_Buy_Right "
          style={{ backgroundColor: '#59d8a1' }}
        >
          立即訂購
        </button>
      </div>
    </>
  );
}

export default BuyButton;
