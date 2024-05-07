import { useContext, useEffect } from "react"
import { FeedContext } from "./FeedContext"

// Used to Create Values to Select Filter Options from, based on Downloaded Job List.
export const useCatchFilterValues = (jobsList = []) => {

    const { setFilterValues } = useContext(FeedContext)
  
    useEffect(() => {
      const allFilterOptions = {
        location: {},
        jobRole: {},
        companyName: {},
        minExp: {},
        minJdSalary: {}
      }
  
      jobsList.forEach(jobElement => {
        Object.keys(allFilterOptions).forEach(filterKey => {
          const value = jobElement[filterKey]
          if (value) {
            allFilterOptions[filterKey][value] = (allFilterOptions[filterKey][value] || 0) + 1
          }
        })
      })
      setFilterValues(allFilterOptions);
    }, [jobsList, setFilterValues])
  }