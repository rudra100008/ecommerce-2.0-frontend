export const monthlyProfitData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Profit",
      data: [18400, 22100, 19800, 25600, 31200, 28900, 34100, 38500, 33200, 41800, 38900, 48255],
      borderColor: "#f97316",
      backgroundColor: "rgba(249, 115, 22, 0.08)",
      borderWidth: 2,
      pointBackgroundColor: "#f97316",
      pointBorderColor: "#f97316",
      pointRadius: 3,
      pointHoverRadius: 5,
      fill: true,
      tension: 0.4,
    },
  ],
};

export const monthlySalesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Orders",
      data: [320, 410, 375, 490, 560, 520, 615, 700, 590, 780, 710, 890],
      backgroundColor: "rgba(249, 115, 22, 0.15)",
      hoverBackgroundColor: "rgba(249, 115, 22, 0.35)",
      borderColor: "#f97316",
      borderWidth: 1.5,
      borderRadius: 6,
      borderSkipped: false,
    },
  ],
};