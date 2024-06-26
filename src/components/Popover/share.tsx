'use client'

import { ICurriculum } from '@/@types/curriculum'
import { AuthContext } from '@/contexts/AuthContex'
import * as Popover from '@radix-ui/react-popover'
import Link from 'next/link'
import { useContext } from 'react'
import { FaChevronDown, FaX } from 'react-icons/fa6'
import { ModalShareLink } from '../Modals/shareLink'

interface IPopoverShare {
  keyCurriculum: string
  isMy?: boolean
  data: ICurriculum
}
export function PopoverShare({
  keyCurriculum,
  isMy = false,
  data,
}: IPopoverShare) {
  const { user } = useContext(AuthContext)

  const idUser = user?.user_id ? user.user_id : 0
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="p-2 bg-transparent text-secondary border border-secondary rounded-full w-12 h-12 flex justify-center items-center hover:bg-secondary hover:text-primary duration-300 cursor-pointer"
          aria-label="Update dimensions"
        >
          <FaChevronDown size={25} />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="rounded p-5 w-[260px] bg-secondary shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <div className="flex flex-col gap-2.5">
            <p className="text-primary font-medium mb-2.5 text-center">
              Menu de ações
            </p>
            <Link
              href={`/curriculum/${idUser}/${keyCurriculum}`}
              // href={`/curriculum/${id}`}
              className="px-6 py-2 rounded-md border border-primary text-center text-primary font-semibold hover:bg-primary hover:text-secondary duration-300"
            >
              Visualizar
            </Link>
            {isMy && (
              <Link
                href={`/curriculum/editar/${idUser}/${keyCurriculum}`}
                className="px-6 py-2 rounded-md border border-primary text-center text-primary font-semibold hover:bg-primary hover:text-secondary duration-300"
              >
                Editar
              </Link>
            )}
            <ModalShareLink
              configDataProps={{
                title: data.name + ' - Curriculum42 -',
                link: `https://curriculum42-univesp-pi.vercel.app/curriculum/0/${data.key}`,
              }}
            />
          </div>
          <Popover.Close
            className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-primary absolute top-[5px] right-[5px] hover:bg-primary hover:text-secondary duration-300 cursor-pointer"
            aria-label="Close"
          >
            <FaX />
          </Popover.Close>
          <Popover.Arrow className="fill-secondary" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
