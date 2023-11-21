import { gql, useQuery } from '@apollo/client'
import '@vime/core/themes/default.css'
import { DefaultUi, Player, Youtube } from '@vime/react'
import {
    CaretRight,
    DiscordLogo,
    FileArrowDown,
    Lightning
} from 'phosphor-react'

interface VideoProps {
    lessonSlug: string
}

interface GetLessonBySlugResponse {
    lesson: {
        title: string;
        videoId: string;
        description: string;
        teacher: {
            bio: string;
            avatarURL: string;
            name: string;
        }
    }
}

export function Video(props: VideoProps) {


    const GET_LESSON_BY_SLUG_QUERY = gql`
    query GetLessonBySlug($slug: String){
        lesson(where: {slug: $slug}){
            title
            videoId
            description
            teacher{
                bio
                avatarURL
                name
            }
        }
    }
    `

    const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {
        variables:{
            slug: props.lessonSlug
        }
    })

    if (!data) {
        return (
            <div className='flex-1'>
                <p>Carregando...</p>
            </div>
        )
    }

    return (
        <div className='flex-1'>
            <div className="bg-black flex justify-center">
                <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
                    <Player>
                        <Youtube
                            videoId={data.lesson.videoId}
                        />
                        <DefaultUi />
                    </Player>
                </div>
            </div>

            <div className="p-8 max-w-[1100px] mx-auto">
                <div className="flex items-start gap-16">
                    <div className="flex-1">
                        <h1 className="text-2xl- font-bold">
                            {data.lesson.title}
                        </h1>
                        <p className="mt-4 text-gray-200 leading-relaxed">
                            {data.lesson.description}
                        </p>
                        <div className="flex items-center gap-4 mt-6">
                            <img
                                src={data.lesson.teacher.avatarURL}
                                alt="ignite-lab"
                                className='rounded-full border-blue-500 h-16 w-16 mb-4'
                            />
                        </div>
                        <div className="leading-relaxed">
                            <strong className="font-bold text">{data.lesson.teacher.name}a</strong>
                            <span className="text-gray-200 text-sm block">{data.lesson.teacher.bio}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <a href="#" className="p-4 text-sm bg-green-500 flex items-center border font-bold uppercase justify-center gap-2 hover:bg-green-700">
                            <DiscordLogo
                                size={24}
                            />
                            Comunidade do Discord
                        </a>
                        <a href="#" className="p-4 text-sm bg-none border-blue-500 border flex items-center font-bold uppercase justify-center  gap-2">
                            <Lightning
                                size={24}
                            />
                            Acesse o desafio
                        </a>
                    </div>
                </div>
                <div className="gap-8 mt-12 mb-8 grid grid-cols-2">
                    <a href="#" className='bg-gray-600 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-500'>
                        <div className="bg-green-700 p-6 h-full flex items-center">
                            <FileArrowDown size={40} />
                        </div>
                        <div className="py-6 leading-relaxed">
                            <strong className='text-2-xl'>
                                Material complementar
                                <p className='text-sm text-gray-300'>
                                    Acesse o material complementar da aula
                                </p>
                            </strong>
                        </div>
                        <div className='h-full p-6 flex items-center'>
                            <CaretRight size={24} />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}