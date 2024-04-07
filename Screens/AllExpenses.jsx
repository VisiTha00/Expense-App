import { StyleSheet, Text } from "react-native";
import ExpencesOutput from "../Components/ExpencesOutput";
import { useExpenseContext } from "../Contexts/ExpenseContext";
import { fetchExpenses } from "../Utils/http";
import { useEffect, useState } from "react";
import Error from "./Error";
import Spinner from "./Spinner";

function AllExpenses() {
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

  function handleError() {
    setMessage(null);
  }

  if (message !== null) {
    return <Error message={message} handleError={handleError} />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return <ExpencesOutput expences={expences} expencePeriod="All" />;
}

export default AllExpenses;
