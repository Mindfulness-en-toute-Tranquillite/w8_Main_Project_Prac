import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.NEXT_PUBILC_KAKAOMAP_KEY}&libraries=services,clusterer,drawing`}
          strategy="beforeInteractive"
        />
      </body>
    </Html>
  )
}
