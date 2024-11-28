import { useSearchParams } from "react-router-dom";
import { getDateSevenDaysAgo } from "../libs";
import { useEffect, useState } from "react";

const DateRange = () => {
    const sevenDaysAgo = getDateSevenDaysAgo();

    const [searchParams, setSearchParams] = useSearchParams();

    const [dateFrom, setDateFrom] = useState(() => {
        const df = searchParams.get('df');

        return df && new Date(df).getTime() <= new Date().getTime()
        ? df
        : sevenDaysAgo || new Date().toISOString().split('T')[0];
    });

    const [dateTo, setDateTo] = useState(() => {
        const dt = searchParams.get('dt');

        return dt && new Date(dt).getTime() >= new Date(dateFrom).getTime()
        ? dt
        : new Date().toISOString().split('T')[0];
    });
    useEffect(() => {
        setSearchParams({
            df: dateFrom,
            dt: dateTo,
        });
    }, [dateFrom, dateTo]);

    const handleDateFromChange = (e) => {
        const df = e.target.value;
        setDateFrom(df);
        // If the selected "From" date is greater than the current "To" date, reset "To"
        if (new Date(df).getTime() > new Date(dateTo).getTime()) {
            setDateTo(df);
        }
    };

    const handleDateToChange = (e) => {
        const dt = e.target.value;
        setDateTo(dt);
        // If the selected "To" date is less than the current "From" date, reset "From"
        if (new Date(dt).getTime() < new Date(dateFrom).getTime()) {
            setDateFrom(dt);
        }
    };
    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
                <label
                className="block text-sm mb-2 text-gray-700 dark:text-gray-400"
                 htmlFor="dateFrom">
                    From
                 </label>
                <input
                    className="inputStyles"
                    name="dateFrom"
                    type="date"
                    max={dateTo || undefined}
                    value={dateFrom}
                    onChange={handleDateFromChange}
                />
            </div>

            <div className="flex items-center gap-1">
                <label
                className="block text-sm mb-2 text-gray-700 dark:text-gray-400"
                 htmlFor="dateTo">
                    To
                 </label>
                <input
                    className="inputStyles"
                    name="dateTo"
                    type="date"
                    min={dateFrom}
                    value={dateTo}
                    onChange={handleDateToChange}
                />
            </div>
        </div>
    );
};

export default DateRange;