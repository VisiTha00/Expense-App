import { Text } from "react-native";
import ExpencesOutput from "../Components/ExpencesOutput";
import { useExpenseContext } from "../Contexts/ExpenseContext";

function RecentExpences() {
  const { expences } = useExpenseContext();
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
