import load from '../../action/index/Action'

/*存储用户ID*/
export function userIdStore(id =-1,action:load.UserStore){
  switch (action.type){
    case "userId":
      return action.id;
    default:
      return id;
  }
}
