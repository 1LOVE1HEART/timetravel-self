import React from 'react';

function HotelCardInfo({
  hotelRepresent,
  setHotelRepresent,
  hotelMobile,
  setHotelMobile,
}) {
  return (
    <div className="card-wrap">
      <div className="card-body">
        <h2>入住資訊</h2>
        <div className="d-flex align-items-end ">
          <div className="me-3">
            <p
              onClick={() => {
                setHotelRepresent('生日哥');
                setHotelMobile('0922334567');
              }}
            >
              入住代表人
            </p>
            <input
              className="input form-control"
              type={'text'}
              placeholder={'中文姓名'}
              value={hotelRepresent}
              onChange={(e) => {
                const name = e.target.value;
                setHotelRepresent(name);
                // console.log(name);
              }}
            />
          </div>
        </div>
        <div className="my-4">
          <p>入住人姓名必須與證件顯示完全相同。</p>
          <p>入住時請以中文姓名為準。</p>
        </div>
        <div>
          <div>
            <p>手機號碼</p>
            <input
              className="input form-control"
              type={'tel'}
              placeholder={'請輸入正確的手機號碼'}
              value={hotelMobile}
              onChange={(e) => {
                const mobile = e.target.value;
                setHotelMobile(mobile);
                // console.log(mobile);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelCardInfo;
