import { useEffect, useState } from "react";
import { FilterType } from "../../../../Models/FilterType";
import CheckBox from "../../../InputArea/CheckBox/CheckBox";
import "./CompaniesFilter.css";

interface CompaniesFilterProps {
    companies: string[];
}

export default function CompaniesFilter(props:CompaniesFilterProps): JSX.Element {

    const [companies, setCompanies] = useState<string[]>([]);

    useEffect(() => {
        setCompanies(Array.from(new Set(props.companies)));
    },[props.companies])

    return (
        <div className="CompaniesFilter">
            <p>Companies </p>
			{companies.map(c => <CheckBox key={c} filterKey={FilterType.COMPANIES} filterValue={c} />)}
        </div>
    );
}