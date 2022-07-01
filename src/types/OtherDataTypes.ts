export type InitialStateType = {
     
  data: Object[]  ,
  loading?: Boolean,
  error?:Object[]  ,
  isLoggedIn?:Boolean

}
 export type ActionType = {
  type?:String,
payload?:Object[] ,
isLoggedIn?:Boolean 
}
export type DispatchType = (action: ActionType) => void;
export type ReducerType = {
  state: InitialStateType;
  dispatch: DispatchType;
};
