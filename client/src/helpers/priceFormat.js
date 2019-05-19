export default function (x) {
  const parts = x.toString().split('.');
  const decimalPart = (parts[1] ? parts[1] : '00');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${parts[0]  },${  decimalPart}`;
}
