function apiList(props) {
  return {
    createApi : {
      init: false,
      url: `https://jsonplaceholder.typicode.com/posts`,
      options: {
        method: 'POST',
        queryParams: {},
        ...props
      },
    },

    viewApi : {
      init: false,
      url: `https://jsonplaceholder.typicode.com/posts`,
      options: {
        method: 'GET',
        queryParams: {},
        ...props
      },
    },

    updateApi : {
      init: false,
      url: `https://jsonplaceholder.typicode.com/posts/ID`,
      options: {
        method: 'PATCH',
        queryParams: {},
        ...props
      },
    },

    deleteApi : {
      init: false,
      url: `https://jsonplaceholder.typicode.com/posts/ID`,
      options: {
        method: 'DELETE',
        queryParams: {},
        ...props
      },
    },  
  }
}

export { apiList };