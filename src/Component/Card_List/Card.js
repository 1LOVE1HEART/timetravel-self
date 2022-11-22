import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Star from '../../icon/star.svg';
import Heart from '../../icon/heart_gray.svg';
import PinkHeart from '../../icon/heart.svg';
//引入卡片輪播資料
import { FOOD_CARD_ITEM1 } from '../../config.js';
export default function Card1() {
  const [like, setLike] = useState(false);
  const toggleLike = () => setLike(!like);

  const [foodCardData, setFoodCardData] = useState({});

  const path = window.location.pathname.split('/');
  const sid = path[2];

  async function getData() {
    const foodCardItem1 = await axios.get(FOOD_CARD_ITEM1 + sid);
    setFoodCardData(foodCardItem1.data);
  }
  useEffect(() => {
    getData();
  }, [Location]);
  return (
    <Card className="Card" style={{ width: '20rem' }}>
      <Card.Img variant="top" className="foodCardData1Img" />
      <button className="Heart_Btn" onClick={toggleLike}>
        <img src={like ? PinkHeart : Heart} className="Card_Heart" alt="" />
      </button>
      <Card.Body>
        <Card.Title className="Card_Title">
          {foodCardData.product_name}
        </Card.Title>
        <Card.Text className="Card_Text">
          <Card.Img src={Star} className="Star_icon" />
          <span class="Card_Score">4.5/5</span>
        </Card.Text>
        <h2 variant="primary" className="Card_Price">
          NT${foodCardData.p_discounted_price}
        </h2>
      </Card.Body>
    </Card>
  );
}
