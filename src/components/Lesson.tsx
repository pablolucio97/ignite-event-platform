import { CheckCircle, Lock } from 'phosphor-react'
import { format, isPast } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom';


interface ILessonProps {
    title: string;
    availableAt: Date;
    type: 'live' | "class"
    slug: string
}

export function Lesson(props: ILessonProps) {

    const isLessonAvailable = isPast(props.availableAt)
    const formattedAvailableDate = format(props.availableAt, "eeee - dd 'de' MMMM 'de' yyyy", {
        locale: ptBr
    })

    const { slug } = useParams<{ slug: string }>()

    const isLessonActive = slug === props.slug

    return (
        <Link to={`/event/lesson/${props.slug}`} className='group'>
            <span className="text-gray-300">
                {formattedAvailableDate}
            </span>
            <div className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 
            ${isLessonActive ? 'bg-green-500' : ''}`}>
                <header className="flex items-center justify-between">
                    {
                        isLessonAvailable ?
                            (<span className="text-sm text-blue-500 font-medium flex gap-2">
                                <CheckCircle size={20} />
                                Conteúdo liberado
                            </span>)
                            :
                            (
                                <span className="text-sm text-orange-500 font-medium flex gap-2">
                                    <Lock size={20} />
                                    Em breve
                                </span>
                            )
                    }
                    <span className="text-xs roundedpy-[0.125rem] px-2 text-white border border-green-300 font-bold">{props.type === 'live' ? 'AO VIVO' : `AULA PRÁTICA`}</span>
                </header>
                <strong className="text-gray-200 mt-5 block">{props.title}</strong>
            </div>
        </Link>
    )
}