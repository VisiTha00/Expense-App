import { createContext, useContext, useReducer } from "react";

const ExpenseContext = createContext();

const initialState = { expences: [] };

function Reducer(state, action) {
  switch (action.type) {
    case "SET":
      return { ...state, expences: action.payload };
    case "ADD":
      return { ...state, expences: [...state.expences, action.payload] };
    case "DELETE":
      return {
        ...state,
        expences: state.expences.filter(
          (expence) => expence.id !== action.payload
        ),
      };
    case "UPDATE":
      return {
        ...state,
        expences: state.expences.map((expence) =>
          expence.id === action.payload.id ? action.payload : expence
        ),
      };
    default:
      throw new Error("Invalid Action");
  }
}

function ExpenseContextProvider({ children }) {
  const [state, dispatch] = useReducer(Reducer, initialState);

  function setExpences(data) {
    dispatch({ type: "SET", payload: data });
  }
  function addExpence(data) {
    dispatch({ type: "ADD", payload: data });
  }

  function deleteExpence(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpence(data) {
    dispatch({ type: "UPDATE", payload: data });
  }

  return (
    <ExpenseContext.Provider
      value={{
        expences: state.expences,
        addExpence,
        deleteExpence,
        updateExpence,
        setExpences,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export default ExpenseContextProvider;

export function useExpenseContext() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error(
      "useExpenseContext must be used within a ExpenseContextProvider"
    );
  }
  return context;
}
