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
  export interface VehicleType {
    VehicleTypeId: number;
    VehicleTypeName: string;
  }
  
  export interface Model {
    Model_ID: number;
    Model_Name: string;
  }