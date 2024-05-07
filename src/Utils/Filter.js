// Used for Filtering out Jobs based on Filters Applied.
export const filterJobListByAppliedFilters = (list, appliedFilters) => list.filter(obj => {
    for (const [key, value] of Object.entries(appliedFilters)) {
      if (value.length === 0 || key === 'minJdSalary' || key === 'minExp') continue;

      if (!value.includes(obj[key])) {
        return false;
      }

    }

    const salaryCondition = appliedFilters['minJdSalary'][0] ? (obj['minJdSalary'] || 0) >= appliedFilters['minJdSalary'][0] : true
    const expCondition = appliedFilters['minExp'][0] ? (obj['minExp'] || 0) >= appliedFilters['minExp'][0] : true

    return salaryCondition && expCondition && true;
  });