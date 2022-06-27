import { useEffect, useMemo, useState } from 'react'

function useFetchAPI(props) {
  const {
    url = '',
    init = true,
    options : defaultOptions = {},
  } = props

  const [isLoading, setIsLoading] = useState(false)
  const [fetchedResponse, setFetchedResponse] = useState({})

  const fetchAPI = async (
    url,
    options,
  ) => {
    const {
      method,
      body,
      headers = {},
    } = options

    const fetchOptions = {}
    fetchOptions.method = method
    fetchOptions.headers = new Headers(headers)
    fetchOptions.body = body
    fetchOptions.credentials = 'same-origin'
    
    try {
      const fetchStatus = async (response) => {
        if (response?.status === 204) {
          return { status: 204 }
        } else if (response?.status === 504) {
          return { status: 504 }
        } else if (response?.status === 502) {
          return { status: 502, message: 'Invalid Response' }
        }
        const data = (await response.json()) || {}
        data.status = data.status !== undefined ? data.status : response?.status
        if (!response.ok) {
          return Promise.reject(data)
        } else {
          const headers = await response.headers
          if (data?.headers) {
            data.headers = headers
          }
        }
        return data
      }
      const fetchResponse = await fetch(url, fetchOptions).then(fetchStatus)
      return fetchResponse
    } catch (e) {
      console.error('Caught Error at makeFetch:', e)
      return {
        error: 'failed',
        status: e?.status || e?.responseCode,
        responseCode: e?.responseCode || '',
      }
    }
  }

  const fetchNow = async (
    data
  ) => {
    setIsLoading(true)

    let updatedOptions = data
    let actualURL = url

    if (updatedOptions && updatedOptions?.pathParams?.length > 0) {
      updatedOptions?.pathParams.forEach((item) => {
        const { key = '', value = '' } = item
        actualURL = actualURL.replace(key, value)
      })
    }

    updatedOptions = {...defaultOptions, ...data}
    const response = await fetchAPI(actualURL, updatedOptions)
    setFetchedResponse(response)
    setIsLoading(false)
  }

  useMemo(async () => {
    if (init === true) {
      await fetchNow(defaultOptions)
    }
  }, [])

  return {
    isLoading,
    fetchedResponse,
    fetchNow,
    setFetchedResponse,
    setIsLoading,
  }
}

export { useFetchAPI }
export default useFetchAPI
