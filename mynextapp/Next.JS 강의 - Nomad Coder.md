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

#2 Practice Project
#2.0 Patterns 

많은 사람들이 Next.JS를 이용할 때 따르는 아주 흔한 패턴을 해보자.

[components/Layout.js]
import NavBar from "./NavBar";

export default function Layout({ children }) {
    return <>
    <NavBar />
    <div>{children}</div>
    </>
}

children이란, react.js가 제공하는 prop이다. 하나의 component를 또 다른 component 안에 넣을 때 쓸 수 있다.

[_app.js]
export default function App({Component, pageProps}){
    return (
    <Layout>
        <Component {...pageProps} />
    </Layout>
    );
}
_app.js파일인데 Layout의 children은 <Component {...pageProps} /> 이 부분이다.
_app.js에는 무언가 많이 들어간다. global로 임포트 해야할 것들. google analytics나 검색엔진에 관한 것, 스크립트 분석 등등. 그러니까 아주 큰 react.js component를 사용하기보다는 Layout component에다 만들어 준다. Layout에 스타일을 줄 수도 있다.

우선 먼저 Next.JS가 제공하는 head component를 사용. Next.js는 이런 작은 패키지들을 쓸 수 있다. -> 만약 create react-app으로 작업하고 있다면 react helmet을 다운 받아야 했을 것이다. 그 말은, 우리의 프로젝트와는 별개인 새로운 컴포넌트, 코드, 오류 등이 생긴다는 거다. 하지만 우리의 경우에는 모든 요소가 Next.js의 우산 아래에 존재하니까, 한 군데 통일되어 있는게 좋다. 이 component 안에 들어가는 모든 것들이 우리의 html의 head 안에 보여질 거다.
[index.js]
import Head from "next/head";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Home | Next Movies</title>
            </Head>
            <h1 className="active">Hello</h1>
        </div>
    );
}
-> 이거를 About page, … 모든 page에 다 넣어줄 수 는 없다. 그래서 Seo 컴포넌트 만들고 커스터마이즈 해서 활용.

근데 Seo import하니까 이런 오류 ->Warning: A title element received an array with more than 1 element as children. 
 <Head>
<title>{`${title}`} | Next Movies</title>
</Head>
이렇게 수정하니 오류 해결.
[Index.js]
import Seo from "@/components/Seo";

export default function Home() {
    return (
        <div>
            <Seo title="Home" />
            <h1 className="active">Hello</h1>
        </div>
    );
}
[about.js]
import Seo from '@/components/Seo'

export default function about() {
    return (
        <div>
            <Seo title="About" />
            <h1>about</h1>
        </div>
    )
}


#2.1 Fetching Data
이미지 파일 public에 넣어두고 경로는 /{이미지파일이름} 이렇게만 하면 된다.
Next.js를 이용해 API keys 숨기기.

create react app을 사용했다면 react를 import해줘야 하는데, 여기서는 useState를 사용하지 않으면 react를 Import할 필요 없다.

#2.2 Redirect and Rewrite
Next.js를 이용해 API keys 숨기기. 여기서 진짜 해봄. 

get /api/find

[next.config.js]

const API_KEY = "d6a4bc48f364c0414fdafb71f660b184";

const nextConfig = {
  reactStrictMode: true,
  async redirects(){           <-리다이렉트해준다
    return [
      {
        source: "/contact/:path*", <-source는 원하는 곳( :path를 붙일 수도, *은 그 뒤에 오는거 모든 것 catch (destination으로 가져온다는 말)
        destination: "/form", <- 그 답으로 가는 곳
        permanent: false, <- 이것도 꼭 적어준다. 이 redirect가 영구적인지 아닌지 결정. 브라우저나 검색엔진이 이 정보를 기억하는지 여부가 결정된다. 
      }
    ]
  },
  async rewrites(){ <- redirects 는 url이 바뀌면서 변하는게 클라이언트가 봤지만 rewrites는 destination으로 가도 url은 변하지 않는다.
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      }

    ]
  }

}


[gitignore]
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# local env files
.env*.local

# vercel
.vercel
.env.   <- env 파일 gitignore에 넣어야한다.

redirects = source의 URL을 destination으로 바꿔서 연결해줌
rewrites = 실제 URL은 destination 이지만 source라고 구라침

#2.3 Server Side Rendering
[index.js]
export async function getServerSideProps(){  <-여기서 getServerSideProps라는 이름은 절대 바뀔 수 없다. export 빼먹으면 안 된다. 여기 이 자리에 어떤 코드를 쓰던지 간에 그 코드는 server에서 돌아가게 된다. client가 아니라. 즉 api key를 여기다가 숨겨도 된다.
  
}

export default function Home({results}) {
..

export async function getServerSideProps(){
  const { results } = await (await fetch(`/api/movies`)).json();
  return {
    props: {
      results,
    }
  }
}

우리가 여기서 무엇을 return하던지, results를 props로써 page에게 주게 된다. 원한다면 server side를 통해 props를 page로 보낼 수 있다. 이게 _app.js의 pageProps가 필요한 이유다.

#2.4 Recap
search engine은 SSR을 좋아한다. 소스코드에서 html로 된 api data들 다 보기때문에.

#2.5 Dynamic Routes
/movies url 만들고 싶으면 pages폴더 안에 movies.js파일 만들어주면 된다. 페이지가 하나라면 폴더를 만들필요 없다. 그렇지만
/movies/all url은 pages폴더 안에 movies라는 폴더 만들고 index.js만들면 /movies url이 되고 all.js만들면 /movies/all 이 된다. nested router (중첩라우터)같은 거다.

Next.js에서는 page에 대괄호([param])를 추가하여 Dynamic Route를 생성할 수 있다.
/movies/1, /movies/abc 등과 같은 모든 경로는 pages/movies/[id].js와 일치한다.


#2.6 Movie Detail
Navigating하는 방법 2가지. 

1. <Link>로 하는 방법.

export default function Home({ results }) {
  return (
    <div className="container">
    <Seo title="Home" />
    {results?.map((movie) => (
      <Link legacyBehavior href={`/movies/${movie.id}`} key={movie.id}>
        <a>
          <div className="movie">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
            <h4>{movie.original_title}</h4>
          </div>
        </a>
      </Link>
    ))}

2. useRouter로 하는 방법.
export default function Home({ results }) {
  const router = useRouter();
  const onClick = (id) => {
    router.push(`/movies/${id}`)
  }
  return (
    <div className="container">
    <Seo title="Home" />
    {results?.map((movie) => ( 
          <div onClick = {() => onClick(movie.id)} className="movie" key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
            <h4>
              <Link legacyBehavior href={`/movies/${movie.id}`}>
              <a> {movie.original_title} </a>
              </Link>
              </h4>
          </div>
    ))}

@@@@@next.config.js를 수정했으면 서버를 다시 껐다가 켜야한다.@@@@@

[id.js]
export default function Detail() {
    const router = useRouter();
    console.log("router",router);
    return (
        <div>
            <h4>{router.query.title || "Loading..."}</h4>
            {/* 크롬의 시크릿모드로 상세페이지로 곧바로 들어오면 Loading뜸. 
            router.query.title이 존재하지 않기 때문에 */}
        </div>
    );


#2.7 Catch All 
catch-all URL은 뭐든 캐치해내는 URL이다. URL에 영화제목을 넣고싶다(SEO에 좋음) 그러면 이걸 쓰면 좋다. -> 유저가 홈페이지에서 클릭 통해 상세페이지에 들어오지 않더라도 영화제목을 볼 수 있다. 영화제목을 URL에서 가져올 것이기 때문. 이전에는 상세페이지에서 영화제목을 보려면 홈페이지에서 클릭을 해서 상세페이지로 넘어와야만 했다. 근데 catch-all URL쓰면 홈페이지 클릭해서 들어오지 않더라도 상세페이지에서 영화 제목을 볼 수 있다.

[id].js의 파일 명을 바꾼다. […Id].js


cognito모드(시크릿모드)에서 곧바로 상세페이지 접속시 에러 (이 페이지가 백엔드에서 pre-render되기 때문, server에서 미리 렌더링된다. 그리고 서버에는 router.query.params이 존재하지 않는다. router.query.params은 서버에서 아직 배열이 아니다. 그래서 || [] 추가 해줌.)
[…params.js]
const [title, id] = router.query.params || [];
이렇게 하면 오류 없는 이유는 이거는 우리가 client-side rendering만 해준 것이다.

#2.8 404 Pages
pages폴더에 404.js만들고 함수이름은 아무거나 지정해주면 된다.

[404.js]
export default function NotFound() {
    return "what are u doing here mate?";
}
