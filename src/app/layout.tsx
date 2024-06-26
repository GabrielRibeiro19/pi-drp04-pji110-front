import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '../contexts/AuthContex'

import ProviderQueryClient from '../contexts/QueriesContext'
import { CreateCurriculumContextProvider } from '@/contexts/CreateCurriculumContext'
import { NetworkStatusNotifier } from '@/utils/networkStatusNotifier'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Curriculum 42',
  description: 'Projeto integrador UNIVESP',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <NetworkStatusNotifier />
        <ToastContainer />
        <ProviderQueryClient>
          <AuthProvider>
            <CreateCurriculumContextProvider>
              {children}
            </CreateCurriculumContextProvider>
          </AuthProvider>
        </ProviderQueryClient>
      </body>
    </html>
  )
}
