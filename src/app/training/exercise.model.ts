export interface Exericse {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date;
  state?: 'Completed' | 'cancelled' | null;
}
