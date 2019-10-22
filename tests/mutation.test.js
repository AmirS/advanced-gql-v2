const gql = require('graphql-tag')
const createTestServer = require('./helper')
const CREATE_POST = gql`
  mutation {
    createPost(input: {message: "Hello"}) {
      message
    }
  }
`

describe('mutations', () => {
  test('createPost', async () => {
    const {mutate} = createTestServer({
      user: {id: 1},
      models: {
        Post: {
          createOne() {
			  return {
				  message: "Hello"
			  }
		  }
        }
      }
    })

    const res = await mutate({query: CREATE_POST})
    expect(res).toMatchSnapshot()
  })
})
