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
                          <span className="PlaceChecked"> {checkedPlace?.place_name} </span>
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
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                }}
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
                            <span className="PlaceChecked">&quot; {checkedPlace?.place_name} &quot;</span>
                          ) : (
                            <span className="PlaceUnchecked" style={{ color: `${LightTheme.FONT_SECONDARY}` }}>목록에서 선택해 주세요.</span>
                          )}
                    </AppointmentPlaceWrapper>
                    <p className="ShowDateText">
                      <span className="textRed">{nickName}</span>님이 선택하신
                      약속 날짜는
                      <span className="textRed">
                        {moment(value).format('YYYY년 MM월 DD일')}
                      </span>
                      입니다.
                    </p>
                    <div
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      <ButtonText
                        size="lg"
                        variant="primary"
                        label="약속잡기"
                        onClick={selectAppointmentHandler}
                        style={{ marginTop: '5vh' }}
                      />
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