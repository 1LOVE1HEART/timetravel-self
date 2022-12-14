import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import map1 from './../../../icon/map.svg';
import NavBar from '../../../layout/NavBar';
import Footer from '../../../layout/Footer';
import { Container } from 'react-bootstrap';
import SiteCarousel from './Carousel/SiteCarousel';
import BreadCrumb from '../../../Component/BreadCrumb/BreadCrumb';
// import SiteDes from './SiteDes';
import HashChange from './HashChange';
import { ReactComponent as CalendarAdd } from '../../../icon/calendar+add.svg';
import './Site-detail.scss';
// import './Carousel/SiteCarousel.scss';
import {
  SITE_DETAIL,
  ITINERARY_ADDITEM,
  ITINERARY_LIST,
  ITINERARY_ADDLIST,
  SITE_IMG,
} from './site-config';

import Heart from '../../../icon/heart_gray.svg';
import PinkHeart from '../../../icon/heart.svg';
import Calendar from '../../../icon/calendar+add.svg';
import Map_icon from '../../../icon/map_blue.svg';
import Map_Green_icon from '../../../icon/map.svg';
import Food_icon from '../../../icon/food_blue.svg';
import Site_icon from '../../../icon/itinerary_blue.svg';
import Phone_icon from '../../../icon/iphone.svg';
import Star_icon from '../../../icon/star.svg';
import { useFoodContext } from '../food/FoodContext/FoodContext.js';

function SiteDetail() {
  const { collect, setCollect } = useFoodContext();
  const [siteData, setSiteData] = useState('');
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [img3, setImg3] = useState('');
  const [img4, setImg4] = useState('');
  const [img5, setImg5] = useState('');
  const [like, setLike] = useState(false);
  const toggleLike = () => setLike(!like);
  const location = useLocation();
  const path = window.location.pathname.split('/');
  const sid = path[2];
  const [allPart, setAllPart] = useState({});
  const [isScroll, setIsScroll] = useState(false);

  const Site_part0 = useRef();
  const Site_part1 = useRef();
  const Site_part2 = useRef();
  const Site_part3 = useRef();
  const Site_part4 = useRef();

  window.addEventListener('scroll', () => {
    if (isScroll === false) {
      setIsScroll(true);
    }
  });
  useEffect(() => {
    if (isScroll) {
      let part0 = Site_part0.current.offsetTop;
      let part1 = Site_part1.current.offsetTop;
      let part2 = Site_part2.current.offsetTop;
      let part3 = Site_part3.current.offsetTop;
      let part4 = Site_part4.current.offsetTop;
      // console.log(part0, part1, part2, part3, part4);
      setAllPart({
        part0: part0,
        part1: part1,
        part2: part2,
        part3: part3,
        part4: part4,
        bodyOffsetY: document.body.offsetHeight,
      });
    }
  }, [isScroll]);

  async function getData() {
    const response = await axios.get(SITE_DETAIL + sid);
    setSiteData(response.data);
    const img1 = response.data.img1.split(',')[0];
    setImg1(img1);
    const img2 = response.data.img1.split(',')[1];
    setImg2(img2);
    const img3 = response.data.img1.split(',')[2];
    setImg3(img3);
    const img4 = response.data.img1.split(',')[3];
    setImg4(img4);
    const img5 = response.data.img1.split(',')[4];
    setImg5(img5);
  }

  const [userData, setUserData] = useState([]);

  async function userDatas() {
    if (localStorage.getItem('auth') !== null) {
      const membersid = JSON.parse(localStorage.getItem('auth')).sid;
      const response = await axios.get(ITINERARY_LIST + '/' + membersid);
      setUserData(response.data);
    }
  }

  const [formData, setFormData] = useState({
    list_number: 0,
    day: 1,
    sequence: 10,
    category: 1,
    category_id: 239 + +sid,
    time: null,
  });

  useEffect(() => {
    getData();
    userDatas();
  }, [location]);

  const mySubmit = async () => {
    // ?????????????????? ???????????????
    if (localStorage.getItem('auth') === null) {
      return await Swal.fire({
        title: '????????????',
        confirmButtonText: '????????????',
        confirmButtonColor: '#59d8a1',
        showCancelButton: true,
        cancelButtonText: '????????????',
        cancelButtonColor: '#D9D9D9',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location = '/logIn';
        }
      });
    }
    let selOptions = {};
    let j = 1;
    userData.map((el, i) => {
      selOptions[i] = el.list_name;
      j++;
    });
    const newOpt = { ...selOptions, newList: `????????????` };
    const { value: selected } = await Swal.fire({
      title: '??????????????????????',
      input: 'select',
      inputOptions: newOpt,
      inputPlaceholder: '',
      confirmButtonText: '??????',
      confirmButtonColor: '#59d8a1',
      showCancelButton: true,
      cancelButtonText: '??????',
      cancelButtonColor: '#D9D9D9',
    });
    console.log(selected);

    if (selected === 'newList') {
      const { value: listname } = await Swal.fire({
        title: '??????????????????',
        input: 'text',
        inputValue: `????????????${j}`,
        confirmButtonText: '??????',
        confirmButtonColor: '#59d8a1',
        allowOutsideClick: false,
        inputValidator: (value) => {
          if (!value) {
            return '?????????????????????';
          }
        },
      });

      const membersid = JSON.parse(localStorage.getItem('auth')).sid;
      const listNumber = uuidv4();
      const { data } = await axios.post(ITINERARY_ADDLIST, {
        member_sid: membersid,
        list_number: listNumber,
        list_name: listname,
        day: 1,
        status: 1,
      });
      if (data.success) {
        const { data } = await axios.post(ITINERARY_ADDITEM, {
          list_number: listNumber,
          day: 1,
          sequence: 10,
          category: 1,
          category_id: 239 + +sid,
          time: null,
        });
        if (data.success) {
          Swal.fire({
            icon: 'success',
            title: `????????????`,
            confirmButtonText: '??????',
            confirmButtonColor: '#59d8a1',
          });
        } else {
          console.log('error1');
        }
      }
    } else if (selected <= userData.length) {
      setFormData({
        list_number: userData[selected].list_number,
        day: 1,
        sequence: 10,
        category: 1,
        category_id: 239 + +sid,
        time: null,
      });
      const { data } = await axios.post(ITINERARY_ADDITEM, {
        list_number: userData[selected].list_number,
        day: 1,
        sequence: 10,
        category: 1,
        category_id: 239 + +sid,
        time: null,
      });
      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: `?????????${selOptions[selected]}`,
          confirmButtonText: '??????',
          confirmButtonColor: '#59d8a1',
        });
      } else {
        console.log('error2');
      }
    }
  };

  const [position, setPosition] = useState(null);

  async function getPosition() {
    const response = await axios.get(SITE_DETAIL + sid);
    const lat = response.data.lat;
    const lng = response.data.lng;
    setPosition([lat, lng]);
    const img1 = response.data.img1.split(',')[0];
    setImg1(img1);
    const img2 = response.data.img1.split(',')[1];
    setImg2(img2);
    const img3 = response.data.img1.split(',')[2];
    setImg3(img3);
    const img4 = response.data.img1.split(',')[3];
    setImg4(img4);
    const img5 = response.data.img1.split(',')[4];
    setImg5(img5);
    // console.log([lat, lng]);
  }
  const customMarker1 = new L.Icon({
    iconUrl: map1,
    iconSize: [40, 40],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
  });

  // console.log(siteData.img1);
  // console.log(siteData.img1.split(','));

  useEffect(() => {
    getPosition();
  }, [location]);

  return (
    <>
      <NavBar />
      <div style={{ marginTop: '160px' }}></div>

      <Container ref={Site_part0} id="Site_part0" style={{ marginTop: '80px' }}>
        <BreadCrumb siteData={siteData} />
        <SiteCarousel
          img1={img1}
          img2={img2}
          img3={img3}
          img4={img4}
          img5={img5}
        />
        <div className="container ">
          <div className="product_name d-flex">
            <div className="product_name_title">
              <h1>{siteData.name}</h1>
            </div>

            <div className="Heart_Calendar_icon d-flex">
              {/* <button className="HeartBtn" onClick={toggleLike}>
                <img
                  src={like ? PinkHeart : Heart}
                  className="Heart_icon"
                  alt=""
                />
              </button> */}
              <div style={{ paddingRight: '20px' }}>
                <button
                  className="HeartBtn"
                  onClick={() => {
                    const member_sid = JSON.parse(
                      localStorage.getItem('auth')
                    ).sid;
                    const product_sid = siteData.sid;
                    const collect_product_name = siteData.name;

                    //???????????????????????????
                    if (collect.includes(siteData.name)) {
                      axios.post(
                        'http://localhost:3001/productAll/DelCollect',
                        {
                          member_sid: member_sid,
                          product_sid: product_sid,
                          collect_product_name: collect_product_name,
                        }
                      );
                      console.log('????????????');
                      //??????????????????
                      setCollect(
                        collect.filter((el) => {
                          return el !== siteData.name;
                        })
                      );
                    } else {
                      //????????????????????????
                      axios.post(
                        'http://localhost:3001/productAll/AddCollect',
                        {
                          member_sid: member_sid,
                          product_sid: product_sid,
                          collect_product_name: collect_product_name,
                        }
                      );
                      console.log('????????????');
                      //????????????????????????,????????????????????????
                      setCollect([...collect, siteData.name]);
                    }
                  }}
                >
                  <img
                    src={collect.includes(siteData.name) ? PinkHeart : Heart}
                    style={{ width: '40px', height: '40px' }}
                    alt=""
                  />
                </button>
              </div>
              <div className="icon">
                <CalendarAdd
                  className="noActiveHotelCalendarAdd"
                  onClick={() => {
                    mySubmit();
                  }}
                />
              </div>
              {/* <button
                className="CalendarBtn"
                onClick={() => {
                  mySubmit();
                }}
              >
                <img src={Calendar} className="Calendar_icon" alt="" />
              </button> */}
            </div>
          </div>
          <div
            className="container location d-flex "
            style={{ justifyContent: 'space-between' }}
          >
            <div className="map_cate d-flex " style={{ alignItems: 'center' }}>
              <div className="map d-flex">
                <img src={Map_icon} alt="" className="Map_icon" />
                <p style={{ padding: 0 }}>
                  {siteData.city_name} | {siteData.area_name}
                </p>
              </div>
              <div className="cate d-flex" style={{ alignItems: 'center' }}>
                <img src={Site_icon} alt="" className="Food_icon" />
                <p style={{ padding: 0 }}>{siteData.site_category_name}</p>
              </div>
            </div>
            <div>
              {/* <button type="button" className="btn btn-secondary">
                ??????????????????
              </button> */}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', marginTop: '80px' }}>
          <div className="siteDesCon col-lg-8" style={{ marginRight: 'auto' }}>
            <h2 ref={Site_part1} id="Site_part1">
              ????????????
            </h2>
            <p style={{ margin: '14px 0' }}>{siteData.description}</p>
            <p style={{ margin: '14px 0' }}>
              ??????2??????3?????????????????????????????????????????????
              ??????4?????????????????????????????????????????????
              ??????11??????12???????????????????????????????????????
              ?????????????????????????????????...??????????????????????????????
            </p>
            <div className="siteDetailSpace"></div>
            <h2 ref={Site_part2} id="Site_part2">
              ????????????
            </h2>
            <p style={{ margin: '14px 0' }}>
              ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????1955?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
            </p>
            <img src={SITE_IMG + '/' + img2} alt={'/'} />
            <p style={{ margin: '14px 0' }}>
              ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
            </p>
            <img src={SITE_IMG + '/' + img3} alt={'/'} />
            <p style={{ margin: '14px 0' }}>
              ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
            </p>
            <img src={SITE_IMG + '/' + img4} alt={'/'} />
            <p style={{ margin: '14px 0' }}>
              ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
            </p>
            <img src={SITE_IMG + '/' + img5} alt={'/'} />

            <div className="siteDetailSpace"></div>
            <h2 ref={Site_part3} id="Site_part3">
              ????????????
            </h2>
            <p style={{ margin: '14px 0' }}>??????:{siteData.map}</p>
            <p style={{ margin: '14px 0' }}>
              ????????????????????? ???????????????1????????????????????????13???????????????????????????
              ???????????????1???????????????13???????????????????????????
              ???????????????1???????????????22???????????????????????????(??????????????????)????????????????????????5???????????????????????????
              ???????????????1????????????704???????????????????????????(??????????????????)????????????????????????5???????????????????????????
              ?????????????????????(?????????)???927???????????????????????????(??????????????????)????????????????????????5???????????????????????????
              ????????????????????????????????????963???????????????????????????(??????????????????)????????????????????????5???????????????????????????
              <br />
              ?????????????????????
              ??????????????????15???????????????????????????????????????????????????????????????????????????
              ???64????????????????????????????????????????????????????????????????????????????????????????????????????????????
            </p>
            {position === null ? (
              ''
            ) : (
              <div id="map" style={{ margin: '20px 0' }}>
                <MapContainer
                  center={[
                    siteData.lat || 25.033028,
                    siteData.lng || 121.563593,
                  ]}
                  zoom={14}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={position} icon={customMarker1}></Marker>
                </MapContainer>
              </div>
            )}
            {/* <div id="map" style={{ margin: '20px 0' }}>
        <MapContainer
          center={[siteData.lat || 25.033028, siteData.lng || 121.563593]}
          zoom={14}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} icon={customMarker1}></Marker>
        </MapContainer>
      </div> */}
            {/* <Map lat={siteData.lat} lng={siteData.lng} /> */}
            <div className="siteDetailSpace"></div>
            <h2 ref={Site_part4} id="Site_part4">
              ????????????
            </h2>
            <p>
              ????????? <br />
              09:30 - 18:00 <br />
              ????????? <br />
              09:30 - 17:00 <br />
              ????????? <br />
              09:30 - 17:00 <br />
              ????????? <br />
              09:30 - 17:00 <br />
              ????????? <br />
              09:30 - 17:00 <br />
              ????????? <br />
              09:30 - 17:00 <br />
              ????????? <br />
              09:30 - 18:00 <br />
            </p>
          </div>
          {/* <SiteDes siteData={siteData} allPart={allPart} /> */}
          <div className="col-lg-3">
            <HashChange allPart={allPart} />
          </div>

          {/* <div
            className="hashchange col-lg-3"
            style={{
              // width: '240px',
              // marginLeft: '10px',
              alignItems: 'center',
              color: ' #8a8a8a',
            }}
          >
            <div>
              <p>????????????</p>
            </div>
            <div>
              <Link to={'#sec2'}>????????????</Link>
            </div>
            <div>
              <Link to={'#sec3'}>????????????</Link>
            </div>
            <div>
              <Link to={'#sec4'}>????????????</Link>
            </div>
            <div>
              <Link to={'#sec0'}>????????????</Link>
            </div>
          </div> */}
        </div>
      </Container>
      <div className="siteDetailSpace"></div>
      <Footer />
    </>
  );
}

export default SiteDetail;
