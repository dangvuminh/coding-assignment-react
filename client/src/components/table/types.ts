import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type ColumnType = {
  field: string;
  label: string;
  type?: 'boolean';
};

export type DataTableType = {
    columns: ColumnType[];
    rows: any[];
    action: {nodes: {
        icon: (row: unknown) => IconProp;
        title: (row: unknown) => string;
        onClick: (row: unknown) => void;
    }[]};
    onRowSelect?: (row: unknown) => void;
    width?: number;
}