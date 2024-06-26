'use client'

import { CollapseProps } from '@/@types/collapse'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

export function Collapse({
  title = 'Vazio',
  content = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, exercitationem nihil recusandae qui facere aut architecto molestias, impedit asperiores alias corrupti ullam eveniet inventore.',
  type = 'default',
  link,
  experience,
  education,
  custom,
  skill,
}: CollapseProps) {
  const [open, setOpen] = useState(false)

  if (type === 'default') {
    return (
      <Collapsible.Root
        defaultOpen
        className="border rounded-md w-full text-center hover:bg-neutral-900 duration-300"
        open={open}
        onOpenChange={setOpen}
      >
        <div
          className={`flex items-center p-4 cursor-pointer justify-between ${open && 'pb-3'}`}
          onClick={() => setOpen(!open)}
        >
          {title}
          <Collapsible.Trigger asChild>
            <IoIosArrowDown
              size={20}
              className={`${open && 'rotate-180'} duration-300`}
            />
          </Collapsible.Trigger>
        </div>

        <Collapsible.Content className="CollapsibleContent">
          <div
            className="p-4 text-left border-t"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Collapsible.Content>
      </Collapsible.Root>
    )
  }

  if (type === 'education') {
    return (
      <Collapsible.Root
        defaultOpen
        className="border rounded-md p-4 w-full text-center hover:bg-neutral-900 duration-300"
        open={open}
        onOpenChange={setOpen}
      >
        <div
          className={`flex items-center cursor-pointer justify-between ${open && 'pb-3'}`}
          onClick={() => setOpen(!open)}
        >
          {title}
          <Collapsible.Trigger asChild>
            <IoIosArrowDown
              size={20}
              className={`${open && 'rotate-180'} duration-300`}
            />
          </Collapsible.Trigger>
        </div>

        <Collapsible.Content className="CollapsibleContent">
          <div className="py-4 text-left border-t">
            <div>
              <p>Instituição: {education?.institution}</p>
              <p>Curso: {education?.course}</p>
              <p>Período: {education?.period}</p>
              <p>Descrição: {education?.description}</p>
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    )
  }

  if (type === 'experience') {
    return (
      <Collapsible.Root
        defaultOpen
        className="border rounded-md p-4 w-full text-center hover:bg-neutral-900 duration-300"
        open={open}
        onOpenChange={setOpen}
      >
        <div
          className={`flex items-center cursor-pointer justify-between ${open && 'pb-3'}`}
          onClick={() => setOpen(!open)}
        >
          {title}
          <Collapsible.Trigger asChild>
            <IoIosArrowDown
              size={20}
              className={`${open && 'rotate-180'} duration-300`}
            />
          </Collapsible.Trigger>
        </div>

        <Collapsible.Content className="CollapsibleContent">
          <div className="py-4 text-left border-t">
            <div>
              <p>Empresa: {experience?.company}</p>
              <p>Cargo: {experience?.position}</p>
              <p>Período: {experience?.period}</p>
              <p>Descrição: {experience?.description}</p>
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    )
  }

  if (type === 'links') {
    return (
      <Collapsible.Root
        defaultOpen
        className="border rounded-md p-4 w-full text-center hover:bg-neutral-900 duration-300"
        open={open}
        onOpenChange={setOpen}
      >
        <div
          className={`flex items-center cursor-pointer justify-between ${open && 'pb-3'}`}
          onClick={() => setOpen(!open)}
        >
          {link?.name}
          <Collapsible.Trigger asChild>
            <IoIosArrowDown
              size={20}
              className={`${open && 'rotate-180'} duration-300`}
            />
          </Collapsible.Trigger>
        </div>

        <Collapsible.Content className="CollapsibleContent">
          <div className="py-4 text-left border-t">
            <div>
              <p>Nome: {link?.name}</p>
              <p>URL: {link?.url}</p>
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    )
  }

  if (type === 'skills') {
    return (
      <Collapsible.Root
        defaultOpen
        className="border rounded-md p-4 w-full text-center hover:bg-neutral-900 duration-300"
        open={open}
        onOpenChange={setOpen}
      >
        <div
          className={`flex items-center cursor-pointer justify-between ${open && 'pb-3'}`}
          onClick={() => setOpen(!open)}
        >
          {skill?.name}
          <Collapsible.Trigger asChild>
            <IoIosArrowDown
              size={20}
              className={`${open && 'rotate-180'} duration-300`}
            />
          </Collapsible.Trigger>
        </div>
      </Collapsible.Root>
    )
  }

  if (type === 'custom') {
    return (
      <Collapsible.Root
        defaultOpen
        className="border rounded-md p-4 w-full text-center hover:bg-neutral-900 duration-300"
        open={open}
        onOpenChange={setOpen}
      >
        <div
          className={`flex items-center cursor-pointer justify-between ${open && 'pb-3'}`}
          onClick={() => setOpen(!open)}
        >
          {custom?.title}
          <Collapsible.Trigger asChild>
            <IoIosArrowDown
              size={20}
              className={`${open && 'rotate-180'} duration-300`}
            />
          </Collapsible.Trigger>
        </div>

        <Collapsible.Content className="CollapsibleContent">
          <div className="py-4 text-left border-t">
            <div>
              <p>Título: {custom?.title}</p>
              <p>Descrição: {custom?.description}</p>
              <p>Tipo: {custom?.topicType?.type}</p>
              {custom?.topicType?.type === 'graphic' && (
                <>
                  <p>Descrição: {custom.topicType.description}</p>
                  <p>Porcentagem: {custom.topicType.percentage}</p>
                  <p>Cor: {custom.topicType.color}</p>
                </>
              )}
              {custom?.topicType?.type === 'topics' && (
                <>
                  <p>Tópicos</p>
                  {custom?.topicType?.topics?.map((topic) => (
                    <p key={topic}>{topic}</p>
                  ))}
                </>
              )}
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    )
  }
}
