export interface Brand {
    Make_ID: number;
    Make_Name: string;
  }
  
  export interface ApiResponse<T> {
    Count: number;
    Message: string;
    SearchCriteria: string | null;
    Results: T[];
  }
  