yarn create next-app

#1. Framework overview
#1.1 Library vs Framework

Framework와 Library의 차이
library는 개발자로서 니가 사용하는 것. 니가 library를 불러와서 니가 library를 사용해서 무언가를 한다.
그런데 framework는 너의 코드를 불러오는 것. 
framwork에서는 니가 코드를 적절한 곳에 잘 적으면 framework는 너의 코드를 불러와서 모든 걸 동작하게 한다.
library를 사용할 떄는, 니가 워하는 대로 코드를 작성할 수 있고, 니가 사용하고 싶을 때 사용할 수 있다.
Framework는 코드를 어떤 곳에 넣으면, framework가 그 코드를 부르는 형태.
react.js는 우리가 원할 때 부르고 원할 때 사용하는 library이고, framework는 약간 집 같은 것인데, 내가 코드를 적절한 곳에 넣어야 하는 것. 내가 그 집을 수정할 수는 없어. library는 router등등 을 내가 마음대로 만들고 이름도 route말고 다른 거로 할 수 도 있어.

#1.2 Pages
components의 이름은 중요하지 않다. 중요한 것은 그게 export default여야 한다는 점. default로 하지 않으면 url타고 들어갔을 때 그 페이지 오류난다. 
그리고 pages의 이름도 중요. url의 이름은 pages의 이름이 될 것이다.
404 error page도 커스텀 가능. create react-app을 사용하면 404 page 직접 만들어야 한다. 

index파일은 우리앱의 홈페이지로 연결시켜준다. ‘/‘ url표시. /index아니다.
.js랑 .jsx 차이? .js에서도 꼭 다 import해줄 필요 없다.?

#1.2 Static Pre Rendering

Next.js의 가장 좋은 기능 중 하나는 앱에 있는 페이지들이 미리 렌더링이 된다는 점. 이것들은 정적(static)으로 생성된다.
create cream-app은 client-side render를 하는 앱을 만든다. 
너의 브라우저가 유저가 보는 UI를 만드는 모든 것을 한다는 것을 의미. 이건 유저가 보는 HTML 소스코드 안에 들어있지 않다. Browsers get the JS, client-side JS will build all the UI. Actual empty div. 브라우저가 자바스크립트,react 등 모든 것을 fetch한 후에야 UI가 보인다. 
<->
Next.js는 server-side render
They do have real HTML like <div><h1>Hello</h1></div> 그래서 유저가 유저가 매우 느린 열결 하거나 자바스크립트가 비활성화가 되어도 적어도 유저는 some HTML은 볼 수 있다. CSR처럼 흰화면이 아니라.

hydration

페이지를 딱 열면 바로 보게 되는 것은 바로 HTML. 그리고나서 react.js가 클라이언트로 전송 됐을 때, 이게 react.js앱이 되는 것. react.js를 프론트엔드 안에서 실행하는 이런 걸 hydration이라고 부른다. 왜냐하면 next.js는 react.js를 백엔드에서 동작시켜서 이 페이지를 미리 만드는데, 이게 component들을 render시킨다. 렌더링이 끝났을 때 그건 HTML이 되고 next.js는 그 HTML을 페이지의 소스코드에 넣어준다. 그럼 유저는 자바스크립트와 react.js가 로딩되지 않았더라도 콘텐츠를 볼 수 있게 된다. 그리고 react.js가 로딩 되었을 때, 기본저으로 이미 존재하는 것들과 연결이 되어서 일반적인 react.js앱이 된다. 그러면 구 방면 모두에서 좋다. 유저가 웹사이트에 가면 초기 상태의 component로 된 미리 생성된 pre-generated HTML page를 보게 되고, 그리고 상호작용이 일어나면 react.js는 그걸 받아서 아주 잘 동작하게 된다. 자 그럼 내가 자바스크립트를 비활성화하면 어떻게 될까? 동작은 안하지만 유저들은 적어도 어떤 것들은 볼 수 있다. 이런게 SEO에 매우 좋다. 구글 같은 검색엔진에게도 유저에게도 너무 좋다. 유저들이 너의 웹사이트에 가면 이미 무언가가 있다는 거. 유저가 코드를 다운 받아 react를 실행시키길 기다리지 않아도 돼.

#1.3 Routing 

We gonna make navigation component

NextJS는 <a>태그인 anchor쓰지 마라. Link쓴다. 그러면 페이지 옮길 때 웹사이트를 새로고침 할 필요 없다. 훨씬 빠름.
Link에 css style도 적용 가능.
useRouter hook쓰면 location에 대한 정보들 갖는다.

#1.4 CSS Modules

CSS방법은 여러가지. 직접 style해서 꾸며주는 것도 있지만 CSS Modules이용.
만들던 파일 안에 ~~~.modules.css라는 파일 만든다. ~~~~는 중요치 않고 modules.css중요
NavBar.modules.css파일에 
.nav {
    display: flex;
    justify-content: space-between;
    background-color: tomato;
}
이런 식으로 적고 NavBar.js파일에서  
import styles from "./NavBar.module.css"
임포트 하고
<nav className={styles.nav}> 
이런식으로 불러온다.
이런 패턴을 CSS Modules 라고 한다. 클래스이름을 추가할 때, 텍스트로 적지 않는다. 자바스크립트 오브젝트에서의 프로퍼티 형식으로 적는다.
실상 HTML열어보면 <nav class=“NavBar_nav_0Biy0”>으로 마지막은 무작위 텍스트. 이러면 어떤 충돌도 x. 다른 컴포넌트에서 nav라는 클래스 이름을사용해도 충돌 없다. 이름 충돌 걱정없이 계속 쓸 수 있다.
[NavBar.module.css]
.active {
    color: tomato;
}

[NavBar.js]
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./NavBar.module.css"

export default function NavBar(){
    const router = useRouter();
    // console.log(router)
    return <nav>
        <Link 
        className={router.pathname === "/" ? styles.active : ""}
        href="/">Home
        </Link>

        <Link 
        className={router.pathname === "/about" ? styles.active : ""}
        href="/about">About Us</Link>
    </nav>
} 

이렇게도 가능

조건부 삽입으로 2가지 가능. 
또는 그냥 배열을 삽입해도 된다. []배열괄호치고 .join(“ “) (한칸 띄우고 “ “) 해준다.
join()은 한 배열을 다른 한 문자열로 바꾸는 방법.

import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./NavBar.module.css"

export default function NavBar(){
    const router = useRouter();
    // console.log(router)
    return <nav>
        <Link 
        className={`${styles.link} ${router.pathname === "/" ? styles.active : ""}`}
        href="/">Home
        </Link>

        <Link 
        className={`${styles.link} ${router.pathname === "/about" ? styles.active : ""}`}
        href="/about">About Us</Link>
    </nav> 
} 

#1.5 Styles JSX

Styles JSX는 어플리케이션에 styles를 추가하는 또 다른 방식. NextJS의 고유의 방법.

<style>태그는 그냥 일반 HTML태그. 그리고 
<style jsx>{`
여기다가 적어준다.
`}

이거 역시 전의 비디오에서 봤던 거 처럼 모듈들이 독립적이다. 파일 import 필요없다. 태그 이름 생각할 필요 없고 부모컴포넌트가 그 클래스 이름 사용하고 있을지라도 상관 없다. 이 스타일들은 오직 그 컴포넌트 내부로 범위가 한정된다. scoped된다.

Link 에 legacyBehavior 를 넣어주시면 a 태그 사용이 가능하고 스타일도 입힐 수 있다. 

import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar(){
    const router = useRouter();
    // console.log(router)
    return <nav>
        <Link legacyBehavior
        href="/">
        <a
        className={router.pathname === "/" ? "active":""}
        >Home</a>
        </Link>

        <Link legacyBehavior
        href="/about">
        <a
        className={router.pathname === "/about" ? "active":""}
        >About Us</a>
        </Link>
        <style jsx>{`
        nav {
            background-color: tomato;
        }
        a {
            text-decoration: none;
        }
        .active {
            color: yellow;
        }
        `}</style>
    </nav>
} 

#1.6 Custom App

어플리케이션에 Global Styles를 추가하는 법을 배울 거다. -> 그러기 위해서는 Next.JS의 굉장히 중요한 컨셉 알아야 한다.
App Component & App Page.
styles JSX는 그 컴포넌트안에서 scoped된다. 부모컴포넌트에서 스타일을 주었을 지라도. 근데 우리는 전역으로 스타일을 주는게 필요할 때가 있다. font-size나 font-color, font-family 같은 것들.

import NavBar from "../components/NavBar";


export default function Home() {
    return (
        <div>
            <NavBar />
            <h1 className="active">Hello</h1>
            <style jsx global>{`
            a {
                color: white;
            }
            `}</style>
        </div>
    );
}
이렇게 하면 home페이지의 About Us는 하얀색링크로 된다. 그렇지만 클릭하고 들어가면 Home은 하얀색으로 안 된다. 그냥 리액트에서는 이 부분 생각할 필요 없는데 Next.JS에서는 페이지 별로 생각해야한다. home링크 하얀색 안 되는 이유는 클릭하면 페이지 URL자체가 달라진다. 그래서 렌더링되고 있는 컴포넌트 또한 다른 놈인 거다. 그래서 진짜 전역적인 스타일링은 아니다. 
App Component는 일종의 어떤 컴포넌트의 청사진이다. NextJS가 모든 페이지를 렌더링할 수 있게 하는. 이거는 내장이 되어있는데 이걸 customise하려면 어떤 파일 하나 만들어야 한다. 
_app.js
NextJS는 About이 랜더링되기 전에, 먼저 _app.js를 본다. _app.js => blueprint (어떻게 페이지가 있어야 하는지. 어떤 컴포넌트가 어떤 페이지에 있어야만 하는지.)
NextJS는 이 파일을 자동적으로 불러낼 거다. 프레임워크는 내 코드를 불러온다.  즉, NextJS는 내 _app.js를 불러올 거고, NextJS는 이 함수를 부를 거다. with 2 props. One would be Component, the other would be pageProps.

//이게 기본적인 어플리케이션 컴포넌트의 기본적인 기능.
 export default function App({Component, pageProps}){
     return <Component {...pageProps} />
 }


Globals.css를 임포트하고 싶으면, 내 페이지나 컴포넌트 내에 css를 임포트하고 싶다면, 반드시 그건 module이어야만 한다. 하지만 만약 커스텀 App 컴포넌트가 있는 이곳 _app.js에서라면 모든 Global Styles를 임포트 할 수 있다.

[_app.js]
import NavBar from "@/components/NavBar";
import "../styles/globals.css";

export default function App({Component, pageProps}){
    return (
    <div>
        <NavBar />
        <Component {...pageProps} />
        <style jsx global>{`
            a {
                color: white;
            }
            `}</style>
    </div>
    );
}

#1.7 Recap

Library는 우리가 사용하는것. 내가 호출하는 것.
Frame work는 Frame work가 내 코드를 호출한다. 즉, 나는 그 코드를 특정 장소에 넣고, 프레임워크의 룰에 따르기만 한다면, 프레임워크가 내 코드를 호출하고, 모든 게 잘 작동할 거다.

create-react-app에서는 모든 게 클라이언트 사이드 렌더링(CSR). 브라우저가 모든 걸 그려야한다.
NextJS 어플리케이션에서는 페이지들이 미리 만들어진다. 내 컴포넌트의 초기 상태는 자동적으로 렌더링된 상태가 된다.
Rehydration. NextJS는 페이지들을 pre-generation(사전생성)한다. 그래서 유저에게 그 HTML을 보여주고, 그 후에 ReactJS는 프론트엔드에 나타날 거고 ReactJS가 주도권을 갖게 된다.
