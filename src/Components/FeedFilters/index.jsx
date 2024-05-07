import { memo, useContext, useEffect, useState } from 'react'
import { FeedContext } from '../../Utils/FeedContext'
import { Filter } from '../Filter';

import './style.css'

const FeedFilterComponent = () => {

    const { filterValues, setAppliedFilters } = useContext(FeedContext);

    const allRoles = Object.keys(filterValues.jobRole || {})
    const allLocations = Object.keys(filterValues.location || {})
    const minExperiences = Object.keys(filterValues.minExp || {}).sort((a, b) => a - b);
    const companyNames = Object.keys(filterValues.companyName || {}).sort()
    const minSalaries = Object.keys(filterValues.minJdSalary || {}).sort((a, b) => a - b);

    const [selectedRoles, selectRoles] = useState([]);
    const [locations, setLocations] = useState([]);
    const [experience, setExperience] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [selectedMinSalary, selectMinSalary] = useState([]);

    useEffect(() => {
        setAppliedFilters({
            jobRole: selectedRoles,
            location: locations,
            minExp: experience,
            companyName: companies,
            minJdSalary: selectedMinSalary
        })
    }, [selectedRoles, locations, experience, companies, selectedMinSalary, setAppliedFilters])

    return (
        <section className='feed-filters' >
            <Filter
                allOptions={allRoles}
                onSelectOption={option => selectRoles([...selectedRoles, option])}
                deleteOption={option => selectRoles(roles => roles.filter(c => c !== option))}
                selectedOptions={selectedRoles}
                placeholder="Roles" />

            <Filter
                allOptions={allLocations}
                onSelectOption={option => setLocations([...locations, option])}
                deleteOption={option => setLocations(locations => locations.filter(c => c !== option))}
                selectedOptions={locations}
                placeholder="Location" />

            <Filter
                allOptions={minExperiences}
                onSelectOption={option => setExperience([Number(option)])}
                selectedOptions={experience}
                deleteOption={() => setExperience([])}
                placeholder="Experience" />

            <Filter
                allOptions={minSalaries}
                onSelectOption={option => selectMinSalary([Number(option)])}
                selectedOptions={selectedMinSalary}
                deleteOption={() => selectMinSalary([])}
                isSalary
                placeholder="Minimum Base Pay Salary" />

            <Filter
                allOptions={companyNames}
                onSelectOption={option => setCompanies([...companies, option])}
                selectedOptions={companies}
                deleteOption={option => setCompanies(companies => companies.filter(c => c !== option))}
                placeholder="Company" />

        </section>
    )
}

export const FeedFilters = memo(FeedFilterComponent);