import { store } from '@/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {

  const router =  useRouter();
  
  const goToCartPage = () => {
      router.push('/cart')
  }
  return (
      <Provider store={store}>
          
        <div className="bg-white">
              
          <div className="mx-auto max-w-2xl px-2 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8" > 
           
                <Component {...pageProps} />

          </div>

        </div>

      </Provider>
  )
}
