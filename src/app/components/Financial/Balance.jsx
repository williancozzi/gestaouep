import React from "react";

const Balance = ({ totalIncome, totalExpense }) => {
  const balance = totalIncome - totalExpense;

  const formattedBalance = balance.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div style={{ margin: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Total de receitas:</h2>
        <h2>
          <span style={{ color: "blue" }}>
            + {parseFloat(totalIncome).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </h2>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Total de despesas:</h2>
        <h2>
          <span style={{ color: "darkred" }}>
            - {parseFloat(totalExpense).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </h2>
      </div>
      <hr />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Balancete:</h1>
        <h1 style={{ color: balance > 0 ? "blue" : "darkred" }}>
          R$ {formattedBalance}
        </h1>
      </div>
    </div>
  );
};

export default Balance;
