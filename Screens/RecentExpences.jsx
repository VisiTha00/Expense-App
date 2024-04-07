import { Text } from "react-native";
import ExpencesOutput from "../Components/ExpencesOutput";
import { useExpenseContext } from "../Contexts/ExpenseContext";
import { useEffect, useState } from "react";
import { fetchExpenses } from "../Utils/http";

function RecentExpences() {
  const { setExpences, expences } = useExpenseContext();
  //const [fetchedExpences, setFetchedExpences] = useState([]);

  useEffect(() => {
    async function getExpenses() {
      const response = await fetchExpenses();
      // setFetchedExpences(response);
      setExpences(response);
    }
    getExpenses();
  }, []);

  const recentExpences = expences.filter((expence) => {
    const today = new Date();
    const expenceDate = new Date(expence.date);
    const diffTime = Math.abs(today - expenceDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  });

  return (
    <ExpencesOutput expences={recentExpences} expencePeriod="Last 7 days" />
  );
}

export default RecentExpences;
