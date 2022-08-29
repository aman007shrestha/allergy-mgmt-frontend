export interface IUserData {
  email: string
  password: string
}
export interface userState {
  user: string | null
  isLoading: boolean
}
export interface IPosts {
  allergy_id: number
  name: string
  symptoms: string
  severity: number
  image: string
  created_at: Date
  user_table_id: 1
}
export interface IAllergyState {
  allergies: IPosts[] | []
  isLoading: false
}
export type IAllergyToInsert = Omit<
  IPosts,
  'allergy_id' | 'created_at' | 'user_table_id'
>
