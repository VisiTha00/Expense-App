import { createContext, useContext, useReducer } from "react";

const ExpenseContext = createContext();

const initialState = {
  expences: [
    {
      id: "e1",
      description: "Two Books",
      amount: 100.0,
      date: "2022-02-28",
    },
    {
      id: "e2",
      description: "New Headphones",
      amount: 250.0,
      date: "2023-05-28",
    },
    {
      id: "e3",
      description: "A Cupboard",
      amount: 550.0,
      date: "2022-04-20",
    },
    {
      id: "e4",
      description: "A New Laptop",
      amount: 2500.0,
      date: "2023-10-20",
    },
    {
      id: "e5",
      description: "Two Books",
      amount: 100.0,
      date: "2024-02-01",
    },
    {
      id: "e6",
      description: "New Headphones",
      amount: 250.0,
      date: "2024-01-28",
    },
    {
      id: "e7",
      description: "A Cupboard",
      amount: 550.0,
      date: "2022-04-20",
    },
    {
      id: "e8",
      description: "A New Laptop",
      amount: 2500.0,
      date: "2023-10-20",
    },
  ],
};

function Reducer(state, action) {
  switch (action.type) {
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
