import Tabs from 'components/tabs'
import { useToast, icons } from 'components/toast'
import type { NextPage } from 'next'
import { trpc, client } from 'utils/trpc'

const AppContent = () => {
  const { addToast } = useToast()
  const coursesQuery = trpc.useQuery(['courses.getAll'])
  const createCourse = trpc.useMutation('courses.create')
  console.log({ data: coursesQuery.data })

  function handleCreateCourse() {
    createCourse.mutate(
      {
        title: '',
        description: '',
        modules: [],
        slug: ''
      },
      {
        onSuccess: () => {
          client.invalidateQueries(['courses.getAll'])
        }
      }
    )
  }

  return (
    <div>
      <div>
        <button onClick={handleCreateCourse} className="bg-red-500 p-4">
          Create course
        </button>

        <button
          onClick={() => {
            addToast({ icon: icons.success, message: 'Success' })
          }}
          className="mx-8 bg-blue-500 p-4"
        >
          click to create a toast
        </button>
      </div>

      <h1>Tab example</h1>
      <div className="border-2 border-red-500">
        <Tabs
          active={0}
          tabs={[
            {
              name: 'Tab 1',
              children: <div>Tab 1 content</div>
            },
            {
              name: 'Tab 2',
              children: <div>Tab 2 content</div>
            },
            {
              name: 'Tab 3',
              children: <div>Tab 3 content</div>
            }
          ]}
        />
      </div>
      <pre>{JSON.stringify(coursesQuery.data, null, 2)}</pre>
    </div>
  )
}

const Home: NextPage = () => {
  return <AppContent />
}

export default Home
