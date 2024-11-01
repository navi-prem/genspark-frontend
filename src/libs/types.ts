export type Task = { blob_key: string, name: string, res_key: string | null, status: string };
export type TaskArray = Task[];

export type DocumentSection = {
  title: string;
  status: string;
  reason: string;
};

