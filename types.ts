export type User = "Alex" | "Ally";

export type Weight = {
  id: number;
  date: Date;
  user: User;
  reading: number;
};

export type Payload = {
  date: string;
  user: User;
  reading: number;
};
