export interface RouteProps {
    name?: string;
    path: string;
    element: React.FC;
    children?: RouteProps[] | null;
    authority?: boolean;
  }
  
  export interface DataCookie {
    name: string;
    value: string;
    expDay: number;
  }