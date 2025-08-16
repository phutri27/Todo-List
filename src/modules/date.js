import { format, differenceInCalendarDays } from "date-fns";

export function formatDate(date){
    const data = format(date, "MMM dd, yyyy");
    return data;
}

export function differenceInDays(currentDate, dueDate){
    const result = differenceInCalendarDays(dueDate, currentDate);
    if (result === 0)
        return "Today";
    else if (result < 0)
        return "Overdue " + -result + " Days"; 
    return result + " Days";
}




