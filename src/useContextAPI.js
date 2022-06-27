import { apiList } from "./apiList"
import {useFetchAPI} from './useFetchAPI'

function useContextAPI(props: any) {

    const {
        createApi = {},
        viewApi = {},
        updateApi = {},
        deleteApi = {},
    } = apiList({
        size: 10,
        page: 1,
    })

    const {
        fetchedResponse: createAPIResponse = [],
        isLoading: createAPIIsLoading,
        fetchNow: createAPIFetchNow,
    } = useFetchAPI(createApi)

    const {
        fetchedResponse: viewAPIResponse = [],
        isLoading: viewAPIIsLoading,
        fetchNow: viewAPIFetchNow,
    } = useFetchAPI(viewApi)

    const {
        fetchedResponse: updateAPIResponse = [],
        isLoading: updateAPIIsLoading,
        fetchNow: updateAPIFetchNow,
    } = useFetchAPI(updateApi)

    const {
        fetchedResponse: deleteAPIResponse = [],
        isLoading: deleteAPIIsLoading,
        fetchNow: deleteAPIFetchNow,
    } = useFetchAPI(deleteApi)

    return {
        createAPIResponse,
        viewAPIResponse,
        updateAPIResponse,
        deleteAPIResponse,
        createAPIIsLoading,
        viewAPIIsLoading,
        updateAPIIsLoading,
        deleteAPIIsLoading,
        createAPIFetchNow,
        viewAPIFetchNow,
        updateAPIFetchNow,
        deleteAPIFetchNow
    }
}

export {useContextAPI}