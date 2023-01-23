import { Check } from "phosphor-react";
import * as CheckBox from '@radix-ui/react-checkbox';
import { FormEvent, useState } from 'react'
import { api } from "../lib/axios";

const avaliableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

export function NewHabitForm() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  async function createNewHabit(event: FormEvent) {
    event.preventDefault()

    if (!title || weekDays.length === 0) {
      return

    }

    await api.post('habits', {
      title, weekDays
    })

    setTitle('')
    setWeekDays([])

    alert('Hábito criado com sucesso!')
  }
  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekDay)
      setWeekDays(weekDaysWithRemovedOne)
    } else {
      const weekDaysWithAddedOne = [...weekDays, weekDay]

      setWeekDays(weekDaysWithAddedOne)
    }
  }

  return (
    <form
      className="w-full flex flex-col my-6"
      onSubmit={createNewHabit}
    >
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>
      <input
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className='flex flex-col gap-2 mt-3'>

        {avaliableWeekDays.map((weekDay, index) => (

          <CheckBox.Root
            key={weekDay}
            className='flex items-center gap-3 group focus:outline-none'
            checked={weekDays.includes(index)}
            onCheckedChange={() => handleToggleWeekDay(index)}
          >
            <div className='w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 group-data-[state=checked] transition-colors group-focus:outline-none group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background'>
              <CheckBox.Indicator>
                <Check
                  size={20}
                  className='text-white'
                />
              </CheckBox.Indicator>
            </div>

            <span className='text-white leading-tight '>
              {weekDay}
            </span>
          </CheckBox.Root>
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font font-semibold bg-green-600 hover:bg-green-500 transition-colors transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}