const settings = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const, // Aqui usei o 'as const' para garantir o tipo correto
    },
  },
  scales: {
    x: {
      display: false,
      reverse: true,
    },
    y: {
      ticks: {
        callback: function (tickValue: string | number) {
          return typeof tickValue === 'number'
            ? tickValue.toFixed(2)
            : tickValue; // Isso agora retorna uma string
        },
      },
    },
  },
};

export default settings;
