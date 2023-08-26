import React, { useMemo } from "react";

export const useMergeTable = (table: any, field: any) => {
    const tableMap = useMemo(() => {
        return table.reduce((prev: any, row: any) => {
            if (prev?.[row[field]]) {
                prev[row[field]]++;
            } else {
                prev = { ...prev, [`${row[field]}`]: 1 };
            }
            return prev;
        }, {});
    }, [table])
    return tableMap;
};