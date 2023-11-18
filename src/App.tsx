import { gql, useQuery } from '@apollo/client'

interface ILesson {
  id: string;
  title: string;
}

function App() {

  const GET_LESSONS_QUERY = gql`
    query{
      lessons{
        id
        title
      },
      teachers{
        id
        name
      }
    }
  `
  const { data } = useQuery<{lessons: ILesson[]}>(GET_LESSONS_QUERY)

  return (
    <>
      <ul>
        {data?.lessons.map(item => (
          <li>{item.title}</li>
        ))}
      </ul>
    </>
  )
}

export default App
