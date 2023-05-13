import React from 'react';
import Calendar from 'react-calendar';
import moment from 'moment/moment';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import { cookies } from '@shared/cookie';
import { useRouter } from 'next/router';
import { Link } from 'react-scroll';
import { WebWrapper, WebWrapperHeight } from '@components/Atoms/Wrapper';
import { ButtonText } from '@components/Atoms/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LightTheme } from '@components/Themes/theme';
import ApporintmentModal from '@components/Modals/AppointmentModal';
import { createPortal } from 'react-dom';
import { FlexRow } from '@components/Atoms/Flex';
import { apis } from '@shared/axios';

const MapAppointment = ({checkedPlace}) => {
  const router = useRouter();
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  //버튼으로 보내줄 값들
  const [appointment, setAppointment] = useState('');
  const { address_name, category_group_code, category_group_name, category_name, distance, id, phone, place_name, place_url, road_address_name, x, y } = checkedPlace;
  const mapRequestDto = {
    address_name,
    category_group_code,
    category_group_name,
    category_name,
    distance,
    apiId: id,
    phone,
    place_name,
    place_url,
    road_address_name,
    x,
    y,
    selectedDate: appointment,
  };

  const selectAppointmentHandler = () => {
    const formattedDate = moment(value).format('YYYY-MM-DD');
    setAppointment(formattedDate);
    const updatedMapRequestDto = {
      ...mapRequestDto,
      selectedDate: formattedDate,
    };
    mutate(updatedMapRequestDto);
  };
  // console.log("selectedDate", selectedDate)
  console.log("appointment", appointment)
  console.log("mapRequestDto", mapRequestDto)
  //
  const token = cookies.get('access_token');
  const { mutate } = useMutation({
    mutationFn: async (payload) => {
      console.log("payload",payload)
      const data = await apis.post('/my-page/schedule', payload, {
        headers: {
          Access_Token: `${token}`,
        },
      }
      );
      return data;
    },
    onSuccess: (data) => {
    if (data.data.statusCode == 200) {
      setShowModal(true);
    }
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  useEffect(() => {
    const token = cookies.get('access_token');
    setIsLoginMode(token);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 달력 관련 로직
  const [value, onChange] = useState(new Date());
  console.log("value", value)
  const mark = ['2023-04-20', '2023-04-28'];
  const clickDayHandler = (value, event) => {
    alert(`Clicked day:  ${moment(value).format('YYYY-MM-DD')}`);
  };
  //value -> 원래 형태 'YYYY년 MM월 DD일' , 'YYYY-MM-DD', 'MM-DD' 이런식으로 변경이 가능합니다

  const nickName =
    typeof window !== 'undefined'
      ? localStorage.getItem('nick_name') ?? ''
      : '';

  return (
    <WebWrapper style={{marginTop: '150px'}}>
      <WebWrapperHeight>
        <FlexRow style={{maxWidth: '100wh'}}>
          {!isLoginMode ? (
            <div>
              <StWebBg onClick={() => {scrollToTop()}}></StWebBg>
              <div style={{filter: 'blur(6px)', opacity: '0.1'}}>
                <WebWrapper style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                  <Div className="calendar-container">
                    <Calendar
                      onChange={onChange}
                      value={value}
                      calendarType="US"
                      formatDay={(locale, date) => moment(date).format('DD')}
                      className="mx-auto w-full text-sm border-b"
                    />
                    <div>
                      <AppointmentPlaceWrapper>
                        <div className="AppointmentPlace">중간 위치에 있는 술집을 선택해 주세요.</div>
                        {checkedPlace ? (
                          <span className="PlaceChecked">" {checkedPlace?.place_name} "</span>
                        ) : (
                          <span className="PlaceUnchecked" style={{color: `${LightTheme.FONT_SECONDARY}`}}>목록에서 선택해 주세요.</span>
                        )}
                      </AppointmentPlaceWrapper>
                      <p className="ShowDateText">
                        <span className="textRed">{nickName}</span>님이 선택하신 약속
                        날짜는
                        <span className="textRed">
                          {moment(value).format('YYYY년 MM월 DD일')}
                        </span>
                        입니다.
                      </p>
                      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <ButtonText
                          size="lg"
                          variant="primary"
                          label="약속잡기"
                          onClick={() => {
                            selectAppointmentHandler();
                          }}
                          style={{marginTop: '5vh'}}
                        />
                      </div>
                    </div>
                  </Div>
                  <div style={{position: 'relative'}}>
                    {showModal &&
                      createPortal(
                        <ApporintmentModal onClose={() => setShowModal(false)} />,
                        document.body,
                      )}
                  </div>
                </WebWrapper>
              </div>
            </div>
          ) : (
            <div>
              <WebWrapper
                style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
              >
                <Div className="calendar-container">
                  <Calendar
                    //196 줄의 핸들러 함수 -> 날짜 얼럿이 뜹니다.
                    //onChange={clickDayHandler}
                    //유즈스테이트로 달력에서 누른 날의 밸류 값이 밑에 글씨로 떠오릅니다.
                    onChange={onChange}
                    value={value}
                    //일에서 토요일로 요일을 정렬해줍니다.
                    calendarType="US"
                    //1일 2일 의 일자를 화면상에서 뺴줍니다.
                    formatDay={(locale, date) => moment(date).format('DD')}
                    className="mx-auto w-full text-sm border-b"
                  />
                  <div>
                    <AppointmentPlaceWrapper>
                      <div className="AppointmentPlace">중간 위치에 있는 술집을 선택해 주세요.</div>
                          {checkedPlace ? (
                            <span className="PlaceChecked">" {checkedPlace?.place_name} "</span>
                          ) : (
                            <span className="PlaceUnchecked" style={{ color: `${LightTheme.FONT_SECONDARY}` }}>목록에서 선택해 주세요.</span>
                          )}
                    </AppointmentPlaceWrapper>
                      <p className="ShowDateText">
                        <span className="textRed">{nickName}</span>님이 선택하신 약속
                        날짜는
                        <span className="textRed">
                          {moment(value).format('YYYY년 MM월 DD일')}
                        </span>
                        입니다.
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <ButtonText size="lg" variant="primary" label="약속잡기"
                        onClick={selectAppointmentHandler}
                        style={{  marginTop: '5vh' }}/>
                      </div>
                  </div>
                </Div>
                <div>
                  {showModal &&
                    createPortal(
                      <ApporintmentModal onClose={() => setShowModal(false)} />,
                      document.body,
                    )}
                </div>
              </WebWrapper>
            </div>
          )}
        </FlexRow>
      </WebWrapperHeight>
    </WebWrapper>
  );
};

export default MapAppointment;