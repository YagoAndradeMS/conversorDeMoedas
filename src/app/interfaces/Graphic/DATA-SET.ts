export default interface DataSet {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    tension: number;
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}
