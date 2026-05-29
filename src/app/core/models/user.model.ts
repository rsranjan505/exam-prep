
export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  mobile?: string;
  login_token?: string;
  city_id?: number | null;
  state_id?: number | null;
  pincode?: string;
  is_active?: boolean;
  roles: Role[];
}

export interface Role {
  id: string;
  name: string;
  guard?: string;
}
