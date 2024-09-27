export interface Category {
    title: string;
    class: string;
    items: userScore[];
  }



interface userScore{
    name: string, 
    time: number
}