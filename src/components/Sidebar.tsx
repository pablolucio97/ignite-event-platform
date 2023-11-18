import { gql, useQuery } from '@apollo/client';
import { Lesson } from "./Lesson";

interface ILessonsQueryResponse {
    lessons: {
        id: string;
        slug: string;
        title: string;
        lessonType: 'live' | `class`;
        availableAt: string;
    }[]
}

export function Sidebar() {

    const GET_LESSONS_QUERY = gql`
        query{
            lessons(orderBy: availableAt_ASC, stage: PUBLISHED){
                id
                title
                lessonType
                slug
                availableAt
            }
        }
    `

    const { data } = useQuery<ILessonsQueryResponse>(GET_LESSONS_QUERY)

    return (
        <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
            <span className="block font-bold text-2xl pb-6 mb-6 border-b border-gray-500 ">
                Sidebar
            </span>
            <div className="flex flex-col gap-8">
                {
                    data?.lessons.map(lesson => (
                        <Lesson
                            key={lesson.id}
                            availableAt={new Date(lesson.availableAt)}
                            slug={lesson.slug}
                            title={lesson.title}
                            type={lesson.lessonType}
                        />
                    ))
                }
            </div>
        </aside>
    )
}