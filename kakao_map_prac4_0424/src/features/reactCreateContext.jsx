// Context 정의
import React from 'react';
const MidPointContext = React.createContext();

// Context 공급자 생성
function MidPointContextProvider({ children }) {
  const [midPointProp, setMidPointProp] = React.useState('');

  return (
    <MidPointContext.Provider value={{ midPointProp, setMidPointProp }}>
      {children}
    </MidPointContext.Provider>
  );
}

// B 컴포넌트에서 Context 사용
import React from 'react';
import { MidPointContext } from './MidPointContext';

function BComponent() {
  const { midPointProp } = React.useContext(MidPointContext);

  return <div>{midPointProp}</div>;
}

// A 컴포넌트에서 Context 값 변경
import React from 'react';
import { MidPointContext } from './MidPointContext';

function AComponent() {
  const { setMidPointProp } = React.useContext(MidPointContext);

  const handleClick = () => {
    const midPointPropValue = 'myValue';
    setMidPointProp(midPointPropValue);
  };

  return <button onClick={handleClick}>값 변경하기</button>;
}

// 컴포넌트 트리에 Context 공급자 배치
import React from 'react';
import { MidPointContextProvider } from './MidPointContextProvider';
import BComponent from './BComponent';

function App() {
  return (
    <MidPointContextProvider>
      <BComponent />
    </MidPointContextProvider>
  );
}
