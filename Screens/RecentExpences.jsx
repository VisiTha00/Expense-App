import { Text } from "react-native";
import ExpencesOutput from "../Components/ExpencesOutput";
import { useExpenseContext } from "../Contexts/ExpenseContext";
import { useEffect, useState } from "react";
import { fetchExpenses } from "../Utils/http";
import Spinner from "./Spinner";
import Error from "./Error";

function RecentExpences() {
  const { setExpences, expences } = useExpenseContext();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(null);
  //const [fetchedExpences, setFetchedExpences] = useState([]);

  useEffect(() => {
    async function getExpenses() {
      try {
        const response = await fetchExpenses();
        // setFetchedExpences(response);
        setExpences(response);
      } catch (error) {
        setMessage("There is an error occured while fetching the data");
      }
      setIsLoading(false);
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

  function handleError() {
    setMessage(null);
  }

  if (message !== null) {
    return <Error message={message} handleError={handleError} />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ExpencesOutput expences={recentExpences} expencePeriod="Last 7 days" />
  );
}

export default RecentExpences;
