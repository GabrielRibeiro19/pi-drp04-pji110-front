'use client'

import { ButtonBack } from '@/components/Buttons/back'
import { ModalRegister } from '@/components/Modals/register'
import Link from 'next/link'
import { toast } from 'react-toastify'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ReCAPTCHA from 'react-google-recaptcha'
import { BiLoaderAlt } from 'react-icons/bi'
import { useContext, useEffect, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { AuthContext } from '@/contexts/AuthContex'
import { useRouter } from 'next/navigation'

const schema = z.object({
  email: z.string().email('Digite um email válido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
})

type schemaLoginProps = z.infer<typeof schema>

export default function Login() {
  const { signIn, isAuthenticated } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
  const [recaptchaKey, setRecaptchaKey] = useState<number>(0) // Variável para recriar o reCAPTCHA

  const handleRecaptchaChange = (value: string | null) => {
    // Esta função será chamada quando o usuário completar o reCAPTCHA com sucesso.
    setRecaptchaValue(value)
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<schemaLoginProps>({
    resolver: zodResolver(schema),
  })

  async function handleLogin(data: schemaLoginProps) {
    setIsSubmitting(true)

    if (recaptchaValue === null) {
      toast.error('Preencha o re-captcha.')
      setIsSubmitting(false)
      return
    }

    const fnSignIn = await signIn(data)

    // Incrementa a chave do reCAPTCHA para recriá-lo
    setRecaptchaKey(recaptchaKey + 1)

    reset()

    setIsSubmitting(false)

    if (fnSignIn) {
      router.push('/dashboard')
    }
  }

  return (
    <main className="w-full">
      <div className="w-full flex justify-center py-16" id="quem-somos">
        <div className="max-w-screen-md w-full flex flex-col gap-4 items-center px-4 md:px-0">
          <ButtonBack />
          <h2 className="text-xl font-bold">Bem-vindo!</h2>
          <div className="w-full flex justify-center md:justify-end">
            <Link
              href="/dashboard"
              className="border py-2 px-8 rounded-md hover:bg-secondary hover:text-primary duration-300"
            >
              Continuar sem cadastro
            </Link>
          </div>
          <h3 className="text-center md:text-left w-full text-xl">
            Faça seu login
          </h3>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="border rounded-md p-4 w-full text-center"
          >
            <div className="w-full flex flex-col gap-4">
              <label htmlFor="login" className="text-left">
                Email
              </label>
              <input
                placeholder="Digite seu e-mail"
                id="login"
                {...register('email')}
                className="border rounded-md p-4 w-full bg-transparent"
              />
              {errors.email && (
                <p className="text-red-500 text-center md:text-left font-medium">
                  {errors.email.message}
                </p>
              )}
              <label htmlFor="password" className="text-left">
                Senha
              </label>
              <div className="relative">
                <input
                  placeholder="Digite sua senha"
                  {...register('password')}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="border rounded-md p-4 w-full bg-transparent"
                />
                {showPassword ? (
                  <FaRegEyeSlash
                    size={20}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute cursor-pointer right-4 bottom-[30%] text-secondary"
                  />
                ) : (
                  <FaRegEye
                    size={20}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute cursor-pointer right-4 bottom-[30%] text-secondary"
                  />
                )}
              </div>
              {errors.password && (
                <p className="text-red-500 text-center md:text-left font-semibold">
                  {errors.password.message}
                </p>
              )}
              <ReCAPTCHA
                key={recaptchaKey}
                sitekey="6LfAsJ8pAAAAAE3xoB7M7CMpzsJ9pyCc8a7r7N6I"
                onChange={handleRecaptchaChange}
                className="max-w-[300px]"
              />
              <div className="w-full flex justify-end">
                {isSubmitting ? (
                  <div className="cursor-not-allowed flex justify-center border py-2 w-full md:w-1/3 px-8 rounded-md">
                    <BiLoaderAlt
                      className="animate-spin cursor-not-allowed"
                      color="#fff"
                      size={25}
                    />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="border py-2 w-full md:w-1/3 px-8 rounded-md hover:bg-secondary hover:text-primary duration-300"
                  >
                    Entrar
                  </button>
                )}
              </div>
            </div>
          </form>
          <div className="flex flex-col gap-4 w-full items-center md:items-start">
            <p className="text-lg font-medium">Não tem cadastro?</p>
            <ModalRegister />
          </div>
        </div>
      </div>
    </main>
  )
}
