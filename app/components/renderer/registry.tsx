import Container from "../ui/Container";
import Table from "../ui/Table";
import Chart from "../ui/Chart";
import FilterBar from "../ui/FilterBar";

export const registry = {
  container: Container,
  table: Table,
  chart: Chart,
  filterBar: FilterBar,
} as const;