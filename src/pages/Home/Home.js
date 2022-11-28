import React, { useState, useEffect } from 'react';
import '../../global.scss';
import './Home.scss';

import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';

// import BannerSliderHot from '../../pages/product/ticket/BannerSlider/BannerSliderHot';
import BannerSliderHot from './Carousel/Card_Carousel';
import BannerSliderNewest from '../../pages/Home/BannerSlider/BannerSliderNewest';
// import BannerSliderNewest from './Carousel/Carousel';
import ButtonSign from '../../pages/product/ticket/ButtonSign/ButtonSign';
import TagSiteButton from './TagButton/TagSiteButton';
import TagFoodButton from './TagButton/TagFoodButton';
import TagStayButton from './TagButton/TagStayButton';
import TagTicketButton from './TagButton/TagTicketButton';
import TagStayInput from './TagInput/TagInput';
import TagInput from './TagInput/TagInput2';
import TagStayDatePickerIn from './TagStayDatePicker/TagStayDatePicker';
import TagStayDatePickerOut from './TagStayDatePicker/TagStayDatePicker';
import TagSelectDays from './TagSelect/TagSelectDays';
import TagSelectRooms from './TagSelect/TagSelectRooms';
import TagStaySearchBtn from './ButtonSearch/ButtonSearch';
import TagSearchBtn from './ButtonSearch/ButtonSearch';
import { useLocation } from 'react-router-dom';

function Home() {
  const [bgClassName, setBgClassName] = useState(
    'home_bg_absolute home_bg_ticket'
  );

  const [searchStayClassname, setSearchStayClassname] = useState(
    'home_tags_input1_hidden'
  );

  const [searchOtherClassname, setSearchOtherClassname] =
    useState('home_tags_input2');

  const changeBgItinerary = function () {
    setBgClassName('home_bg_absolute home_bg_itinerary');
  };

  const changeBgFood = function () {
    setBgClassName('home_bg_absolute home_bg_food');
  };

  const changeBgStay = function () {
    setBgClassName('home_bg_absolute home_bg_stay');
  };

  const changeBgTicket = function () {
    setBgClassName('home_bg_absolute home_bg_ticket');
  };

  const searchStay = function () {
    setSearchStayClassname('home_tags_input1 ');
    setSearchOtherClassname('home_tags_input2_hidden');
  };

  const searchOthers = function () {
    setSearchStayClassname('home_tags_input1_hidden ');
    setSearchOtherClassname('home_tags_input2');
  }

  const stayChange = function () {
    changeBgStay();
    searchStay();
  };

  const ItineraryChange = function () {
    changeBgItinerary();
    searchOthers();
  };

  const FoodChange = function () {
    changeBgFood();
    searchOthers();
  };

  const TicketChange = function () {
    changeBgTicket();
    searchOthers();
  };

  // const changeFoodColor = function () {
  //   setLogoColor('home_bg_text_wrap home_logo_color');
  // }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="home-part1">
            <div className={bgClassName}>
              <div className="home_bg_text_wrap">
                <div className="home_bg_text_time">Time</div>
                <div className="home_bg_text_travel">Travel</div>
              </div>
            </div>
            {/* 標籤icons部分 */}
            <div className="home_tags">
              <div onClick={ItineraryChange} className="tag_unit">
                <TagSiteButton />
              </div>
              <div onClick={FoodChange} className="tag_unit">
                <TagFoodButton />
              </div>
              <div onClick={stayChange} className="tag_unit">
                <TagStayButton />
              </div>
              <div onClick={TicketChange} className="tag_unit">
                <TagTicketButton />
              </div>
            </div>
            {/* 2個搜尋的框框 */}
            {/* <div className="searchBar"> */}
            {/* 填選區1 */}
            <div className={searchStayClassname}>
              <div className="tag_input_unit1">
                <div className="home_tag_input_tittle1">目的地</div>
                <div className="home_tag_input1">
                  <TagStayInput />
                </div>
              </div>
              <div className="tag_input_unit2">
                <div className="home_tag_input_tittle2">入住時間</div>
                <div className="home_tag_input2">
                  <TagStayDatePickerIn />
                </div>
              </div>
              <div className="tag_input_unit3">
                <div className="home_tag_input_tittle3">退房時間</div>
                <div className="home_tag_input3">
                  <TagStayDatePickerOut />
                </div>
              </div>
              <div className="tag_input_unit4">
                <div className="home_tag_input_tittle4">天數</div>
                <div className="home_tag_input4">
                  <TagSelectDays className="TagSelectDays" />
                </div>
              </div>
              <div className="tag_input_unit5">
                <div className="home_tag_input_tittle5">房數</div>
                <div className="home_tag_input5">
                  <TagSelectRooms />
                </div>
              </div>
              <div className="tag_input_unit6">
                <div className="home_tag_input_tittle6"></div>
                <div className="home_tag_input6">
                  <TagStaySearchBtn />
                </div>
              </div>
            </div>

            {/* 填選區2 */}
            <div className={searchOtherClassname}>
              <div className="tag_input_unit1">
                <div className="home_tag_input_tittle1"></div>
                <div className="home_tag2_input1">
                  <TagInput />
                </div>
              </div>

              <div className="tag_input_unit6">
                <div className="home_tag_input_tittle6"></div>
                <div className="home_tag_input6">
                  <TagSearchBtn />
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>

          <div className="home-part2">
            <div>
              <h1>最新優惠</h1>
            </div>
          </div>

          <div className="container">
            <BannerSliderNewest />
          </div>

          <div className="home-part3">
            <div>
              <h1>熱門商品</h1>
            </div>
          </div>

          <div className="container">
            <BannerSliderHot />
          </div>

          <div className="home-part4">
            <div className=" feature-card ">
              <div className=" feature-circle  fc-bg1"></div>
              <h5>防疫旅館</h5>
            </div>
            <div className=" feature-card ">
              <div className=" feature-circle fc-bg2"></div>
              <h5>戶外露營</h5>
            </div>
            <div className=" feature-card ">
              <div className=" feature-circle fc-bg3"></div>
              <h5>親子旅遊</h5>
            </div>
            <div className=" feature-card ">
              <div className=" feature-circle fc-bg4"></div>
              <h5>樂園專區</h5>
            </div>
            <div className=" feature-card ">
              <div className=" feature-circle fc-bg5"></div>
              <h5>吃到飽餐廳</h5>
            </div>
          </div>

          <div className="home-part5">
            <div className="home-why-us row">
              <h1 className="why-us-tittle">為什麼選擇TimeTravel?</h1>
              <p className="why-us-p">
                你知道世界上有超過百萬名自由行旅客選擇TimeTravel作為旅遊規劃網站嗎？
                <br></br>
                他們透過TimeTravel找到安全又安心的體驗行程！
              </p>
              <ButtonSign />
            </div>
            <div className="home-why-us-bg">
              <div className="home-why-us-bg-opacity"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
