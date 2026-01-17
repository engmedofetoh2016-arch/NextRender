export type DataSourceKey = "orders" | "revenue";

export type UISchema =
  | ContainerNode
  | TableNode
  | ChartNode
  | FilterBarNode;

export type ContainerNode = {
  type: "container";
  title?: string;
  children: UISchema[];
};

export type TableNode = {
  type: "table";
  title?: string;
  data: DataSourceKey; // بيربط بالـ backend capability
  columns: { key: string; label: string }[];
};

export type ChartNode = {
  type: "chart";
  title?: string;
  data: DataSourceKey;
  chartType: "line" | "bar";
  xKey: string;
  yKey: string;
};

export type FilterBarNode = {
  type: "filterBar";
  target: DataSourceKey; 
  fields: { key: string; label: string; type: "text" | "select" }[];
};